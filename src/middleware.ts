import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'default-secret-key-change-in-production'
)

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('auth-token')
    const { pathname } = request.nextUrl

    // Public routes
    const publicRoutes = ['/login', '/register']
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

    // If accessing public route with valid token, redirect to dashboard
    if (isPublicRoute && token) {
        try {
            await jwtVerify(token.value, JWT_SECRET)
            return NextResponse.redirect(new URL('/dashboard', request.url))
        } catch (error) {
            // Invalid token, continue to public route
        }
    }

    // Protected routes
    const protectedRoutes = ['/dashboard', '/history', '/settings']
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

    if (isProtectedRoute) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        try {
            await jwtVerify(token.value, JWT_SECRET)
            return NextResponse.next()
        } catch (error) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
