'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Navbar({ user }: { user: { name: string; email: string } }) {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
            router.push('/login')
            router.refresh()
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    return (
        <nav style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--glass-border)',
            position: 'sticky',
            top: 0,
            zIndex: 50,
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.5rem',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                    <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                        <h2 className="gradient-text" style={{ margin: 0, fontSize: '1.5rem' }}>
                            ReyhanCODE
                        </h2>
                    </Link>

                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <Link href="/dashboard" style={{
                            color: 'var(--color-text-secondary)',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            transition: 'color 0.2s',
                        }}>
                            Dashboard
                        </Link>
                        <Link href="/history" style={{
                            color: 'var(--color-text-secondary)',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            transition: 'color 0.2s',
                        }}>
                            Riwayat
                        </Link>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: 'var(--color-text-primary)',
                        }}>
                            {user.name}
                        </div>
                        <div style={{
                            fontSize: '0.75rem',
                            color: 'var(--color-text-tertiary)',
                        }}>
                            {user.email}
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                    >
                        Keluar
                    </button>
                </div>
            </div>
        </nav>
    )
}
