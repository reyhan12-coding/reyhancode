'use client'

import { useState } from 'react'

export interface CodeDiffProps {
    codeBefore?: string
    codeAfter?: string
    language: string
}

export default function CodeDiff({ codeBefore, codeAfter, language }: CodeDiffProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        if (codeAfter) {
            await navigator.clipboard.writeText(codeAfter)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    if (!codeBefore && !codeAfter) {
        return null
    }

    return (
        <div style={{ marginTop: '1rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.75rem',
            }}>
                <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    margin: 0,
                }}>
                    Perbandingan Kode
                </h4>
                {codeAfter && (
                    <button
                        onClick={handleCopy}
                        className="btn btn-secondary"
                        style={{
                            padding: '0.375rem 0.75rem',
                            fontSize: '0.75rem',
                        }}
                    >
                        {copied ? '✓ Disalin' : '📋 Salin Kode Perbaikan'}
                    </button>
                )}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: codeBefore && codeAfter ? '1fr 1fr' : '1fr',
                gap: '1rem',
            }}>
                {codeBefore && (
                    <div>
                        <div style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: 'var(--color-danger)',
                            marginBottom: '0.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                        }}>
                            ❌ Sebelum
                        </div>
                        <pre className="code-block" style={{
                            margin: 0,
                            borderLeft: '3px solid var(--color-danger)',
                        }}>
                            <code>{codeBefore}</code>
                        </pre>
                    </div>
                )}

                {codeAfter && (
                    <div>
                        <div style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: 'var(--color-success)',
                            marginBottom: '0.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                        }}>
                            ✅ Sesudah
                        </div>
                        <pre className="code-block" style={{
                            margin: 0,
                            borderLeft: '3px solid var(--color-success)',
                        }}>
                            <code>{codeAfter}</code>
                        </pre>
                    </div>
                )}
            </div>
        </div>
    )
}
