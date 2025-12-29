'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError('Password tidak cocok')
            return
        }

        if (password.length < 6) {
            setError('Password minimal 6 karakter')
            return
        }

        setLoading(true)

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Registrasi gagal')
            }

            // Redirect to login after successful registration
            router.push('/login?registered=true')
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
                        Daftar dan mulai review kode Anda
                    </p>
                </div>

                <div className="card">
                    <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Buat Akun Baru</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Nama Lengkap</label>
                            <input
                                type="text"
                                className="input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                required
                            />
                        </div>

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
                                placeholder="Minimal 6 karakter"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Konfirmasi Password</label>
                            <input
                                type="password"
                                className="input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Ketik ulang password"
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
                            {loading ? 'Memproses...' : 'Daftar'}
                        </button>

                        <div style={{ textAlign: 'center', fontSize: '0.875rem' }}>
                            <span style={{ color: 'var(--color-text-tertiary)' }}>
                                Sudah punya akun?{' '}
                            </span>
                            <Link
                                href="/login"
                                style={{
                                    color: 'var(--color-primary-light)',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                }}
                            >
                                Masuk di sini
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
