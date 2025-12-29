import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
    const user = await getServerSession()

    if (!user) {
        redirect('/login')
    }

    return <DashboardClient user={user} />
}
