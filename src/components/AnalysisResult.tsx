'use client'

import { useState } from 'react'
import SeverityBadge from './SeverityBadge'
import CodeDiff from './CodeDiff'

export interface ReviewResult {
    id: string
    category: string
    severity: 'low' | 'medium' | 'high'
    title: string
    description: string
    suggestion: string
    codeBefore?: string
    codeAfter?: string
    reasoning: string
    line?: number
}

export interface AnalysisResultProps {
    score: number
    scoreBreakdown: {
        readability: number
        security: number
        performance: number
        maintainability: number
    }
    results: ReviewResult[]
    reviewId: string
}

export default function AnalysisResult({ score, scoreBreakdown, results, reviewId }: AnalysisResultProps) {
    const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set())
    const [filterSeverity, setFilterSeverity] = useState<string>('all')
    const [filterCategory, setFilterCategory] = useState<string>('all')

    const toggleExpanded = (id: string) => {
        const newExpanded = new Set(expandedResults)
        if (newExpanded.has(id)) {
            newExpanded.delete(id)
        } else {
            newExpanded.add(id)
        }
        setExpandedResults(newExpanded)
    }

    const categoryLabels: Record<string, string> = {
        code_smell: '🧹 Code Smell',
        security: '🔒 Keamanan',
        performance: '⚡ Performa',
        best_practice: '✨ Best Practice',
    }

    const severityOrder = { high: 3, medium: 2, low: 1 }

    const filteredResults = results
        .filter((r) => filterSeverity === 'all' || r.severity === filterSeverity)
        .filter((r) => filterCategory === 'all' || r.category === filterCategory)
        .sort((a, b) => severityOrder[b.severity] - severityOrder[a.severity])

    const scoreColor = score >= 80 ? 'var(--color-success)' : score >= 60 ? 'var(--color-warning)' : 'var(--color-danger)'

    return (
        <div className="fade-in">
            {/* Overall Score */}
            <div className="card" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Hasil Analisis Kode</h2>

                <div style={{
                    position: 'relative',
                    width: '160px',
                    height: '160px',
                    margin: '0 auto 2rem',
                }}>
                    <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="none"
                            stroke="var(--color-bg-tertiary)"
                            strokeWidth="12"
                        />
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="none"
                            stroke={scoreColor}
                            strokeWidth="12"
                            strokeDasharray={`${(score / 100) * 440} 440`}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dasharray 1s ease' }}
                        />
                    </svg>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                    }}>
                        <div style={{
                            fontSize: '3rem',
                            fontWeight: 800,
                            color: scoreColor,
                            lineHeight: 1,
                        }}>
                            {score}
                        </div>
                        <div style={{
                            fontSize: '0.875rem',
                            color: 'var(--color-text-tertiary)',
                            marginTop: '0.25rem',
                        }}>
                            Skor Kualitas
                        </div>
                    </div>
                </div>

                {/* Score Breakdown */}
                <div className="grid grid-4" style={{ gap: '1rem' }}>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary-light)' }}>
                            {scoreBreakdown.readability}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>
                            Readability
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary-light)' }}>
                            {scoreBreakdown.security}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>
                            Security
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary-light)' }}>
                            {scoreBreakdown.performance}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>
                            Performance
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary-light)' }}>
                            {scoreBreakdown.maintainability}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>
                            Maintainability
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
            }}>
                <div>
                    <label className="form-label" style={{ marginBottom: '0.5rem' }}>Filter Severity:</label>
                    <select
                        value={filterSeverity}
                        onChange={(e) => setFilterSeverity(e.target.value)}
                        className="select"
                        style={{ width: 'auto' }}
                    >
                        <option value="all">Semua</option>
                        <option value="high">Tinggi</option>
                        <option value="medium">Sedang</option>
                        <option value="low">Rendah</option>
                    </select>
                </div>
                <div>
                    <label className="form-label" style={{ marginBottom: '0.5rem' }}>Filter Kategori:</label>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="select"
                        style={{ width: 'auto' }}
                    >
                        <option value="all">Semua</option>
                        <option value="code_smell">Code Smell</option>
                        <option value="security">Keamanan</option>
                        <option value="performance">Performa</option>
                        <option value="best_practice">Best Practice</option>
                    </select>
                </div>
            </div>

            {/* Results */}
            <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                    Temuan ({filteredResults.length})
                </h3>
            </div>

            {filteredResults.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                    <h3>Tidak ada masalah ditemukan!</h3>
                    <p style={{ margin: 0 }}>Kode Anda sudah sangat baik dengan filter yang dipilih.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {filteredResults.map((result) => (
                        <div key={result.id} className="card-solid">
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                marginBottom: '1rem',
                            }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '1.5rem' }}>
                                            {categoryLabels[result.category]?.split(' ')[0] || '📝'}
                                        </span>
                                        <h4 style={{ margin: 0, flex: 1 }}>{result.title}</h4>
                                        <SeverityBadge severity={result.severity} />
                                    </div>
                                    <div style={{
                                        fontSize: '0.75rem',
                                        color: 'var(--color-text-tertiary)',
                                        marginBottom: '0.75rem',
                                    }}>
                                        {categoryLabels[result.category] || result.category}
                                        {result.line && ` • Baris ${result.line}`}
                                    </div>
                                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
                                        {result.description}
                                    </p>
                                </div>
                            </div>

                            {/* AI Reasoning Panel */}
                            <div style={{
                                background: 'var(--color-bg-tertiary)',
                                border: '1px solid var(--color-border-primary)',
                                borderLeft: '3px solid var(--color-primary)',
                                borderRadius: 'var(--radius-md)',
                                padding: '1rem',
                                marginBottom: '1rem',
                            }}>
                                <div style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    color: 'var(--color-primary-light)',
                                    marginBottom: '0.5rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                }}>
                                    🤖 Penjelasan AI
                                </div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                                    {result.reasoning}
                                </p>
                            </div>

                            {/* Suggestion */}
                            <div style={{
                                background: 'rgba(34, 197, 94, 0.05)',
                                border: '1px solid rgba(34, 197, 94, 0.2)',
                                borderRadius: 'var(--radius-md)',
                                padding: '1rem',
                                marginBottom: '1rem',
                            }}>
                                <div style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    color: 'var(--color-success)',
                                    marginBottom: '0.5rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                }}>
                                    💡 Saran Perbaikan
                                </div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                                    {result.suggestion}
                                </p>
                            </div>

                            {/* Code Diff */}
                            {(result.codeBefore || result.codeAfter) && (
                                <CodeDiff
                                    codeBefore={result.codeBefore}
                                    codeAfter={result.codeAfter}
                                    language="javascript"
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
