'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import CodeInput from '@/components/CodeInput'
import AnalysisResult from '@/components/AnalysisResult'
import LoadingState from '@/components/LoadingState'

interface DashboardClientProps {
    user: {
        id: string
        name: string
        email: string
    }
}

export default function DashboardClient({ user }: DashboardClientProps) {
    const [analysisData, setAnalysisData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleAnalyze = async (data: any) => {
        setError('')
        setIsLoading(true)
        setAnalysisData(null)

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Gagal menganalisis kode')
            }

            setAnalysisData(result)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
            <Navbar user={user} />

            <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
                {/* Welcome Section */}
                <div style={{ marginBottom: '2rem' }}>
                    <h1 className="gradient-text" style={{ marginBottom: '0.5rem' }}>
                        Selamat Datang, {user.name}! 👋
                    </h1>
                    <p style={{ color: 'var(--color-text-tertiary)', margin: 0 }}>
                        Analisis kode Anda dengan AI dan dapatkan saran perbaikan yang jelas dan terstruktur
                    </p>
                </div>

                {/* Code Input */}
                <CodeInput onAnalyze={handleAnalyze} isLoading={isLoading} />

                {/* Error Message */}
                {error && (
                    <div className="alert alert-error" style={{ marginTop: '2rem' }}>
                        {error}
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div style={{ marginTop: '2rem' }}>
                        <LoadingState />
                    </div>
                )}

                {/* Analysis Results */}
                {analysisData && !isLoading && (
                    <div style={{ marginTop: '2rem' }}>
                        <AnalysisResult
                            score={analysisData.score}
                            scoreBreakdown={analysisData.scoreBreakdown}
                            results={analysisData.results}
                            reviewId={analysisData.reviewId}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
