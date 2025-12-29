import { NextRequest, NextResponse } from 'next/server'
import { fetchFileFromGitHub } from '@/lib/github'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { repoUrl, filePath, token } = body

        if (!repoUrl || !filePath) {
            return NextResponse.json(
                { error: 'URL repository dan path file harus diisi' },
                { status: 400 }
            )
        }

        const result = await fetchFileFromGitHub(repoUrl, filePath, token)

        return NextResponse.json(result)
    } catch (error) {
        console.error('GitHub fetch API error:', error)
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Gagal mengambil file dari GitHub'
            },
            { status: 500 }
        )
    }
}
