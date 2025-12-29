'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import SeverityBadge from '@/components/SeverityBadge'

interface CodeReview {
    id: string
    language: string
    sourceType: string
    fileName?: string
    score: number
    createdAt: string
    code: string
    _count: {
        results: number
    }
}

interface HistoryClientProps {
    user: {
        id: string
        name: string
        email: string
    }
}

export default function HistoryClient({ user }: HistoryClientProps) {
    const [reviews, setReviews] = useState<CodeReview[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filterLanguage, setFilterLanguage] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        fetchReviews()
    }, [page, filterLanguage, searchQuery])

    const fetchReviews = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '10',
            })

            if (filterLanguage) params.append('language', filterLanguage)
            if (searchQuery) params.append('search', searchQuery)

            const response = await fetch(`/api/reviews?${params}`)
            const data = await response.json()

            if (response.ok) {
                setReviews(data.reviews)
                setTotalPages(data.pagination.totalPages)
            }
        } catch (error) {
            console.error('Failed to fetch reviews:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setPage(1)
        fetchReviews()
    }

    const getScoreSeverity = (score: number): 'low' | 'medium' | 'high' => {
        if (score >= 80) return 'low'
        if (score >= 60) return 'medium'
        return 'high'
    }

    const languageLabels: Record<string, string> = {
        javascript: 'JavaScript',
        typescript: 'TypeScript',
        python: 'Python',
    }

    const sourceTypeLabels: Record<string, string> = {
        paste: 'Paste',
        upload: 'Upload',
        github: 'GitHub',
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
            <Navbar user={user} />

            <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ marginBottom: '0.5rem' }}>📚 Riwayat Review Kode</h1>
                    <p style={{ color: 'var(--color-text-tertiary)', margin: 0 }}>
                        Lihat semua analisis kode yang pernah Anda lakukan
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        flexWrap: 'wrap',
                        alignItems: 'flex-end',
                    }}>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <label className="form-label">Cari:</label>
                            <form onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    className="input"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Nama file atau kode..."
                                />
                            </form>
                        </div>

                        <div style={{ minWidth: '150px' }}>
                            <label className="form-label">Bahasa:</label>
                            <select
                                className="select"
                                value={filterLanguage}
                                onChange={(e) => {
                                    setFilterLanguage(e.target.value)
                                    setPage(1)
                                }}
                            >
                                <option value="">Semua</option>
                                <option value="javascript">JavaScript</option>
                                <option value="typescript">TypeScript</option>
                                <option value="python">Python</option>
                            </select>
                        </div>

                        <button
                            onClick={() => {
                                setSearchQuery('')
                                setFilterLanguage('')
                                setPage(1)
                                fetchReviews()
                            }}
                            className="btn btn-secondary"
                        >
                            Reset Filter
                        </button>
                    </div>
                </div>

                {/* Reviews List */}
                {loading ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                    }}>
                        <div className="spinner" style={{ margin: '0 auto', width: '3rem', height: '3rem' }}></div>
                        <p style={{ marginTop: '1rem', color: 'var(--color-text-tertiary)' }}>
                            Memuat riwayat...
                        </p>
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📭</div>
                        <h3>Belum ada riwayat review</h3>
                        <p style={{ color: 'var(--color-text-tertiary)', marginBottom: '1.5rem' }}>
                            Mulai analisis kode pertama Anda di dashboard
                        </p>
                        <Link href="/dashboard" className="btn btn-primary">
                            Ke Dashboard
                        </Link>
                    </div>
                ) : (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {reviews.map((review) => {
                                const codePreview = review.code.split('\n').slice(0, 3).join('\n')
                                const scoreColor = review.score >= 80
                                    ? 'var(--color-success)'
                                    : review.score >= 60
                                        ? 'var(--color-warning)'
                                        : 'var(--color-danger)'

                                return (
                                    <Link
                                        key={review.id}
                                        href={`/history/${review.id}`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <div className="card-solid" style={{
                                            transition: 'all 0.2s ease',
                                            cursor: 'pointer',
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start',
                                                marginBottom: '1rem',
                                            }}>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.75rem',
                                                        marginBottom: '0.5rem',
                                                    }}>
                                                        <h3 style={{ margin: 0, fontSize: '1.125rem' }}>
                                                            {review.fileName || `Review ${review.id.slice(0, 8)}`}
                                                        </h3>
                                                        <span className="badge" style={{
                                                            background: 'var(--color-bg-tertiary)',
                                                            color: 'var(--color-text-tertiary)',
                                                            border: '1px solid var(--color-border-primary)',
                                                        }}>
                                                            {languageLabels[review.language]}
                                                        </span>
                                                    </div>
                                                    <div style={{
                                                        fontSize: '0.75rem',
                                                        color: 'var(--color-text-tertiary)',
                                                    }}>
                                                        {new Date(review.createdAt).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                        {' • '}
                                                        {sourceTypeLabels[review.sourceType]}
                                                        {' • '}
                                                        {review._count.results} temuan
                                                    </div>
                                                </div>

                                                <div style={{ textAlign: 'center', minWidth: '80px' }}>
                                                    <div style={{
                                                        fontSize: '1.75rem',
                                                        fontWeight: 800,
                                                        color: scoreColor,
                                                        lineHeight: 1,
                                                    }}>
                                                        {review.score}
                                                    </div>
                                                    <div style={{
                                                        fontSize: '0.625rem',
                                                        color: 'var(--color-text-tertiary)',
                                                        marginTop: '0.25rem',
                                                    }}>
                                                        Skor
                                                    </div>
                                                </div>
                                            </div>

                                            <pre className="code-block" style={{
                                                fontSize: '0.75rem',
                                                margin: 0,
                                                maxHeight: '80px',
                                                overflow: 'hidden',
                                            }}>
                                                <code>{codePreview}{review.code.split('\n').length > 3 ? '\n...' : ''}</code>
                                            </pre>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginTop: '2rem',
                            }}>
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="btn btn-secondary"
                                >
                                    ← Sebelumnya
                                </button>
                                <span style={{
                                    padding: '0 1rem',
                                    color: 'var(--color-text-secondary)',
                                }}>
                                    Halaman {page} dari {totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="btn btn-secondary"
                                >
                                    Selanjutnya →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
