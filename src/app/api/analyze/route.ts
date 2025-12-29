import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { analyzeCode } from '@/lib/ai-analyzer'

export async function POST(request: NextRequest) {
    try {
        // Authenticate user
        const user = await getServerSession()
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { code, language, sourceType, fileName, githubUrl, mode } = body

        // Validation
        if (!code || !language || !sourceType) {
            return NextResponse.json(
                { error: 'Kode, bahasa, dan sumber harus diisi' },
                { status: 400 }
            )
        }

        const validLanguages = ['javascript', 'typescript', 'python']
        if (!validLanguages.includes(language.toLowerCase())) {
            return NextResponse.json(
                { error: 'Bahasa tidak didukung. Pilih: JavaScript, TypeScript, atau Python' },
                { status: 400 }
            )
        }

        const validSourceTypes = ['paste', 'upload', 'github']
        if (!validSourceTypes.includes(sourceType.toLowerCase())) {
            return NextResponse.json(
                { error: 'Tipe sumber tidak valid' },
                { status: 400 }
            )
        }

        const analysisMode = mode === 'professional' ? 'professional' : 'beginner'

        // Perform AI analysis
        const analysis = await analyzeCode(code, language, analysisMode)

        // Save to database
        const codeReview = await prisma.codeReview.create({
            data: {
                userId: user.id,
                language: language.toLowerCase(),
                sourceType: sourceType.toLowerCase(),
                code,
                score: analysis.score,
                fileName: fileName || null,
                githubUrl: githubUrl || null,
            },
        })

        // Save results
        const reviewResults = await Promise.all(
            analysis.results.map((result) =>
                prisma.reviewResult.create({
                    data: {
                        reviewId: codeReview.id,
                        category: result.category,
                        severity: result.severity,
                        title: result.title,
                        description: result.description,
                        suggestion: result.suggestion,
                        codeBefore: result.codeBefore || null,
                        codeAfter: result.codeAfter || null,
                        reasoning: result.reasoning,
                        line: result.line || null,
                    },
                })
            )
        )

        return NextResponse.json({
            reviewId: codeReview.id,
            score: analysis.score,
            scoreBreakdown: analysis.scoreBreakdown,
            results: reviewResults,
            message: 'Analisis berhasil',
        })
    } catch (error) {
        console.error('Analysis error:', error)
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Terjadi kesalahan saat analisis'
            },
            { status: 500 }
        )
    }
}
