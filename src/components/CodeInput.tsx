'use client'

import { useState } from 'react'

export interface CodeInputProps {
    onAnalyze: (data: {
        code: string
        language: string
        sourceType: string
        fileName?: string
        githubUrl?: string
        mode: 'beginner' | 'professional'
    }) => void
    isLoading: boolean
}

export default function CodeInput({ onAnalyze, isLoading }: CodeInputProps) {
    const [activeTab, setActiveTab] = useState<'paste' | 'upload' | 'github'>('paste')
    const [code, setCode] = useState('')
    const [language, setLanguage] = useState('javascript')
    const [mode, setMode] = useState<'beginner' | 'professional'>('beginner')
    const [fileName, setFileName] = useState('')
    const [githubUrl, setGithubUrl] = useState('')
    const [githubPath, setGithubPath] = useState('')
    const [githubToken, setGithubToken] = useState('')
    const [error, setError] = useState('')
    const [loadingGithub, setLoadingGithub] = useState(false)

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const ext = file.name.split('.').pop()?.toLowerCase()
        if (!['js', 'jsx', 'ts', 'tsx', 'py'].includes(ext || '')) {
            setError('Format file tidak didukung. Gunakan: .js, .ts, .py')
            return
        }

        setError('')
        const text = await file.text()
        setCode(text)
        setFileName(file.name)

        // Auto-detect language
        if (ext === 'ts' || ext === 'tsx') {
            setLanguage('typescript')
        } else if (ext === 'py') {
            setLanguage('python')
        } else {
            setLanguage('javascript')
        }
    }

    const handleGithubFetch = async () => {
        setError('')
        setLoadingGithub(true)

        try {
            const response = await fetch('/api/github/fetch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    repoUrl: githubUrl,
                    filePath: githubPath,
                    token: githubToken || undefined,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Gagal mengambil file')
            }

            setCode(data.content)
            setLanguage(data.language)
            setFileName(data.fileName)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoadingGithub(false)
        }
    }

    const handleAnalyze = () => {
        if (!code.trim()) {
            setError('Kode tidak boleh kosong')
            return
        }

        setError('')
        onAnalyze({
            code,
            language,
            sourceType: activeTab,
            fileName: fileName || undefined,
            githubUrl: activeTab === 'github' ? githubUrl : undefined,
            mode,
        })
    }

    return (
        <div className="card">
            <h2 style={{ marginBottom: '1.5rem' }}>Input Kode untuk Dianalisis</h2>

            {/* Tabs */}
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'paste' ? 'active' : ''}`}
                    onClick={() => setActiveTab('paste')}
                >
                    📝 Paste Kode
                </button>
                <button
                    className={`tab ${activeTab === 'upload' ? 'active' : ''}`}
                    onClick={() => setActiveTab('upload')}
                >
                    📁 Upload File
                </button>
                <button
                    className={`tab ${activeTab === 'github' ? 'active' : ''}`}
                    onClick={() => setActiveTab('github')}
                >
                    🐙 Dari GitHub
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'paste' && (
                <div>
                    <div className="form-group">
                        <label className="form-label">Paste kode Anda di sini:</label>
                        <textarea
                            className="textarea"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="// Contoh: function calculateTotal(items) { ... }"
                            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem' }}
                        />
                    </div>
                </div>
            )}

            {activeTab === 'upload' && (
                <div>
                    <div className="form-group">
                        <label className="form-label">Upload file (.js, .ts, .py):</label>
                        <input
                            type="file"
                            accept=".js,.jsx,.ts,.tsx,.py"
                            onChange={handleFileUpload}
                            className="input"
                            style={{ cursor: 'pointer' }}
                        />
                        {fileName && (
                            <div style={{
                                marginTop: '0.5rem',
                                fontSize: '0.875rem',
                                color: 'var(--color-success)',
                            }}>
                                ✓ File dimuat: {fileName}
                            </div>
                        )}
                    </div>
                    {code && (
                        <div className="form-group">
                            <label className="form-label">Preview kode:</label>
                            <textarea
                                className="textarea"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem' }}
                            />
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'github' && (
                <div>
                    <div className="form-group">
                        <label className="form-label">URL Repository GitHub:</label>
                        <input
                            type="text"
                            className="input"
                            value={githubUrl}
                            onChange={(e) => setGithubUrl(e.target.value)}
                            placeholder="https://github.com/username/repo"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Path File:</label>
                        <input
                            type="text"
                            className="input"
                            value={githubPath}
                            onChange={(e) => setGithubPath(e.target.value)}
                            placeholder="src/index.js"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            GitHub Token (Opsional - untuk private repo):
                        </label>
                        <input
                            type="password"
                            className="input"
                            value={githubToken}
                            onChange={(e) => setGithubToken(e.target.value)}
                            placeholder="ghp_..."
                        />
                    </div>
                    <button
                        onClick={handleGithubFetch}
                        disabled={loadingGithub || !githubUrl || !githubPath}
                        className="btn btn-secondary"
                        style={{ marginBottom: '1rem' }}
                    >
                        {loadingGithub ? 'Mengambil...' : '📥 Ambil File dari GitHub'}
                    </button>
                    {code && (
                        <div className="form-group">
                            <label className="form-label">Preview kode:</label>
                            <textarea
                                className="textarea"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem' }}
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Language Selection */}
            <div className="form-group">
                <label className="form-label">Bahasa Pemrograman:</label>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="select"
                >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                </select>
            </div>

            {/* Mode Selection */}
            <div className="form-group">
                <label className="form-label">Mode Analisis:</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                    }}>
                        <input
                            type="radio"
                            name="mode"
                            value="beginner"
                            checked={mode === 'beginner'}
                            onChange={(e) => setMode(e.target.value as 'beginner' | 'professional')}
                            style={{ cursor: 'pointer' }}
                        />
                        <span>🎓 Mode Pemula (penjelasan detail)</span>
                    </label>
                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                    }}>
                        <input
                            type="radio"
                            name="mode"
                            value="professional"
                            checked={mode === 'professional'}
                            onChange={(e) => setMode(e.target.value as 'beginner' | 'professional')}
                            style={{ cursor: 'pointer' }}
                        />
                        <span>💼 Mode Profesional (ringkas & teknis)</span>
                    </label>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="alert alert-error">
                    {error}
                </div>
            )}

            {/* Analyze Button */}
            <button
                onClick={handleAnalyze}
                disabled={isLoading || !code.trim()}
                className="btn btn-primary"
                style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
            >
                {isLoading ? (
                    <>
                        <span className="spinner" style={{ width: '1rem', height: '1rem' }}></span>
                        Menganalisis Kode...
                    </>
                ) : (
                    <>🚀 Analisis Kode</>
                )}
            </button>
        </div>
    )
}
