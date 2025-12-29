'use client'

export interface SeverityBadgeProps {
    severity: 'low' | 'medium' | 'high'
    size?: 'sm' | 'md'
}

export default function SeverityBadge({ severity, size = 'md' }: SeverityBadgeProps) {
    const icons = {
        low: '🟢',
        medium: '🟡',
        high: '🔴',
    }

    const labels = {
        low: 'Rendah',
        medium: 'Sedang',
        high: 'Tinggi',
    }

    return (
        <span
            className={`badge badge-${severity}`}
            style={{
                padding: size === 'sm' ? '0.125rem 0.5rem' : '0.25rem 0.75rem',
                fontSize: size === 'sm' ? '0.625rem' : '0.75rem',
            }}
        >
            {icons[severity]} {labels[severity]}
        </span>
    )
}
