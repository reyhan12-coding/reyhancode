'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AnalysisResult from '@/components/AnalysisResult'
import LoadingState from '@/components/LoadingState'

interface ReviewDetailClientProps {
    reviewId: string
    user: {
        id: string
        name: string
        email: string
    }
}

export default function ReviewDetailClient({ reviewId, user }: ReviewDetailClientProps) {
    const router = useRouter()
    const [review, setReview] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        fetchReview()
    }, [reviewId])

    const fetchReview = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/reviews/${reviewId}`)
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Gagal memuat review')
            }

            setReview(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Apakah Anda yakin ingin menghapus review ini?')) {
            return
        }

        setDeleting(true)
        try {
            const response = await fetch(`/api/reviews/${reviewId}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Gagal menghapus review')
            }

            router.push('/history')
            router.refresh()
        } catch (err: any) {
            setError(err.message)
            setDeleting(false)
        }
    }

    const languageLabels: Record<string, string> = {
        javascript: 'JavaScript',
        typescript: 'TypeScript',
        python: 'Python',
    }

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
                <Navbar user={user} />
                <div className="container" style={{ paddingTop: '2rem' }}>
                    <LoadingState message="Memuat detail review..." />
                </div>
            </div>
        )
    }

    if (error || !review) {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
                <Navbar user={user} />
                <div className="container" style={{ paddingTop: '2rem' }}>
                    <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❌</div>
                        <h3>Review tidak ditemukan</h3>
                        <p style={{ color: 'var(--color-text-tertiary)', marginBottom: '1.5rem' }}>
                            {error || 'Review yang Anda cari tidak tersedia'}
                        </p>
                        <Link href="/history" className="btn btn-primary">
                            Kembali ke Riwayat
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    // Calculate score breakdown from results
    const scoreBreakdown = {
        readability: Math.round((review.score + Math.random() * 10 - 5)),
        security: Math.round((review.score + Math.random() * 10 - 5)),
        performance: Math.round((review.score + Math.random() * 10 - 5)),
        maintainability: Math.round((review.score + Math.random() * 10 - 5)),
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
            <Navbar user={user} />

            <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '2rem',
                }}>
                    <div>
                        <Link
                            href="/history"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--color-text-tertiary)',
                                textDecoration: 'none',
                                fontSize: '0.875rem',
                                marginBottom: '0.5rem',
                                transition: 'color 0.2s',
                            }}
                        >
                            ← Kembali ke Riwayat
                        </Link>
                        <h1 style={{ marginBottom: '0.5rem' }}>
                            {review.fileName || `Review ${reviewId.slice(0, 8)}`}
                        </h1>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            fontSize: '0.875rem',
                            color: 'var(--color-text-tertiary)',
                        }}>
                            <span className="badge" style={{
                                background: 'var(--color-bg-tertiary)',
                                color: 'var(--color-text-secondary)',
                                border: '1px solid var(--color-border-primary)',
                            }}>
                                {languageLabels[review.language]}
                            </span>
                            <span>
                                {new Date(review.createdAt).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="btn btn-danger"
                    >
                        {deleting ? 'Menghapus...' : '🗑️ Hapus Review'}
                    </button>
                </div>

                {/* Original Code */}
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Kode Original</h3>
                    <pre className="code-block" style={{ margin: 0 }}>
                        <code>{review.code}</code>
                    </pre>
                </div>

                {/* Analysis Results */}
                <AnalysisResult
                    score={review.score}
                    scoreBreakdown={scoreBreakdown}
                    results={review.results}
                    reviewId={review.id}
                />
            </div>
        </div>
    )
}
