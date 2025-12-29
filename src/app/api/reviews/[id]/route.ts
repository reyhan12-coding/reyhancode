import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const user = await getServerSession()
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const review = await prisma.codeReview.findUnique({
            where: {
                id: params.id,
                userId: user.id, // Ensure user owns this review
            },
            include: {
                results: {
                    orderBy: [
                        { severity: 'desc' },
                        { createdAt: 'asc' },
                    ],
                },
            },
        })

        if (!review) {
            return NextResponse.json(
                { error: 'Review tidak ditemukan' },
                { status: 404 }
            )
        }

        return NextResponse.json(review)
    } catch (error) {
        console.error('Get review error:', error)
        return NextResponse.json(
            { error: 'Terjadi kesalahan pada server' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const user = await getServerSession()
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Verify ownership
        const review = await prisma.codeReview.findUnique({
            where: {
                id: params.id,
                userId: user.id,
            },
        })

        if (!review) {
            return NextResponse.json(
                { error: 'Review tidak ditemukan' },
                { status: 404 }
            )
        }

        // Delete (results will cascade)
        await prisma.codeReview.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ message: 'Review berhasil dihapus' })
    } catch (error) {
        console.error('Delete review error:', error)
        return NextResponse.json(
            { error: 'Terjadi kesalahan pada server' },
            { status: 500 }
        )
    }
}
