import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth'
import ReviewDetailClient from './ReviewDetailClient'

export default async function ReviewDetailPage({
    params,
}: {
    params: { id: string }
}) {
    const user = await getServerSession()

    if (!user) {
        redirect('/login')
    }

    return <ReviewDetailClient reviewId={params.id} user={user} />
}
