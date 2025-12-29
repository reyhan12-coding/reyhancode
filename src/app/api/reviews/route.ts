import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const user = await getServerSession()
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const language = searchParams.get('language')
        const search = searchParams.get('search')

        const skip = (page - 1) * limit

        // Build where clause
        const where: any = { userId: user.id }

        if (language) {
            where.language = language
        }

        if (search) {
            where.OR = [
                { fileName: { contains: search, mode: 'insensitive' } },
                { code: { contains: search, mode: 'insensitive' } },
            ]
        }

        // Get reviews
        const [reviews, total] = await Promise.all([
            prisma.codeReview.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: {
                    _count: {
                        select: { results: true },
                    },
                },
            }),
            prisma.codeReview.count({ where }),
        ])

        return NextResponse.json({
            reviews,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        console.error('Get reviews error:', error)
        return NextResponse.json(
            { error: 'Terjadi kesalahan pada server' },
            { status: 500 }
        )
    }
}
