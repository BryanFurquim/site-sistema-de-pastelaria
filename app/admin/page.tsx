import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import OwnerDashboard from '@/app/areadono/owner-dashboard'
import OwnerLogin from '@/components/owner-login'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return <OwnerLogin />

  const isAdmin =
    user.app_metadata?.role === 'admin' ||
    user.email?.toLowerCase() === 'admin@pastelboer.com'

  if (!isAdmin) {
    await supabase.auth.signOut()
    redirect('/admin')
  }
  return <OwnerDashboard />
}
