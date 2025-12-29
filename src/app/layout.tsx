import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'ReyhanCODE - AI-Powered Code Review Assistant',
    description: 'Platform AI untuk menganalisis dan mereview kode program secara otomatis dengan saran perbaikan yang jelas dan terstruktur.',
    keywords: 'code review, AI, code analysis, code quality, review kode, analisis kode',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="id">
            <body>{children}</body>
        </html>
    )
}
