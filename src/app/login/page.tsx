'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Login gagal')
            }

            router.push('/dashboard')
            router.refresh()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: 'linear-gradient(135deg, var(--color-bg-primary), var(--color-bg-secondary))',
        }}>
            <div style={{ maxWidth: '440px', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                        ReyhanCODE
                    </h1>
                    <p style={{ color: 'var(--color-text-tertiary)', margin: 0 }}>
                        AI-Powered Code Review Assistant
                    </p>
                </div>

                <div className="card">
                    <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Masuk ke Akun Anda</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="nama@email.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {error && (
                            <div className="alert alert-error">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary"
                            style={{ width: '100%', marginBottom: '1rem' }}
                        >
                            {loading ? 'Memproses...' : 'Masuk'}
                        </button>

                        <div style={{ textAlign: 'center', fontSize: '0.875rem' }}>
                            <span style={{ color: 'var(--color-text-tertiary)' }}>
                                Belum punya akun?{' '}
                            </span>
                            <Link
                                href="/register"
                                style={{
                                    color: 'var(--color-primary-light)',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                }}
                            >
                                Daftar di sini
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
