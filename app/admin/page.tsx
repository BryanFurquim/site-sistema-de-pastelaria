import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import OwnerDashboard from '@/app/areadono/owner-dashboard'
import OwnerLogin from '@/components/owner-login'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return <OwnerLogin />
  if (user.email?.toLowerCase() !== 'admin@pastelboer.com') {
    await supabase.auth.signOut()
    redirect('/admin')
  }
  return <OwnerDashboard />
}
