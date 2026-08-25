import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import OwnerDashboard from './owner-dashboard'

export default async function OwnerAreaPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/areadono/login')
  return <OwnerDashboard />
}
