import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth'
import HistoryClient from './HistoryClient'

export default async function HistoryPage() {
    const user = await getServerSession()

    if (!user) {
        redirect('/login')
    }

    return <HistoryClient user={user} />
}
