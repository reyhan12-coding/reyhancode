import { Octokit } from '@octokit/rest'

export interface GitHubFileResult {
    content: string
    language: string
    fileName: string
}

export async function fetchFileFromGitHub(
    repoUrl: string,
    filePath: string,
    token?: string
): Promise<GitHubFileResult> {
    try {
        // Parse GitHub URL
        // Expected formats:
        // https://github.com/owner/repo
        // https://github.com/owner/repo/blob/main/path/to/file.js
        const urlPattern = /github\.com\/([^\/]+)\/([^\/]+)/
        const match = repoUrl.match(urlPattern)

        if (!match) {
            throw new Error('URL GitHub tidak valid')
        }

        const owner = match[1]
        const repo = match[2].replace('.git', '')

        const octokit = new Octokit({
            auth: token || undefined,
        })

        // Get file content
        const { data } = await octokit.repos.getContent({
            owner,
            repo,
            path: filePath,
        })

        if (Array.isArray(data) || data.type !== 'file') {
            throw new Error('Path harus merujuk ke file, bukan folder')
        }

        // Decode base64 content
        const content = Buffer.from(data.content, 'base64').toString('utf-8')

        // Detect language from file extension
        const extension = filePath.split('.').pop()?.toLowerCase()
        let language = 'javascript'

        if (extension === 'ts' || extension === 'tsx') {
            language = 'typescript'
        } else if (extension === 'py') {
            language = 'python'
        } else if (extension === 'js' || extension === 'jsx') {
            language = 'javascript'
        }

        return {
            content,
            language,
            fileName: filePath.split('/').pop() || 'file',
        }
    } catch (error) {
        console.error('GitHub fetch error:', error)
        if (error instanceof Error) {
            throw new Error(`Gagal mengambil file dari GitHub: ${error.message}`)
        }
        throw new Error('Gagal mengambil file dari GitHub')
    }
}
