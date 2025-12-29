'use client'

export default function LoadingState({ message = 'Menganalisis kode...' }: { message?: string }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 2rem',
            gap: '1.5rem',
        }}>
            <div style={{
                position: 'relative',
                width: '80px',
                height: '80px',
            }}>
                <div className="spinner" style={{
                    width: '80px',
                    height: '80px',
                    borderWidth: '4px',
                }}></div>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '2rem',
                }}>
                    🤖
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--color-primary-light)',
                    marginBottom: '0.5rem',
                }}>
                    {message}
                </h3>
                <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-tertiary)',
                    margin: 0,
                }}>
                    AI sedang menganalisis kode Anda dengan detail
                </p>
            </div>

            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginTop: '1rem',
            }}>
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="pulse"
                        style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: 'var(--color-primary)',
                            animationDelay: `${i * 0.2}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
