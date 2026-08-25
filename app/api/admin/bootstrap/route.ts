import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const ADMIN_EMAIL = 'admin@pastelboer.com'
const ADMIN_PASSWORD = 'admin@pastelboer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (body?.username !== 'admin' || body?.password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } },
    )

    const { data: users, error: listError } = await supabase.auth.admin.listUsers({ perPage: 1000 })
    if (listError) return NextResponse.json({ error: 'auth_unavailable' }, { status: 500 })

    const existing = users.users.find((user) => user.email?.toLowerCase() === ADMIN_EMAIL)
    if (existing) {
      const { error } = await supabase.auth.admin.updateUserById(existing.id, {
        password: ADMIN_PASSWORD,
        email_confirm: true,
        user_metadata: { username: 'admin' },
      })
      if (error) return NextResponse.json({ error: 'admin_update_failed' }, { status: 500 })
    } else {
      const { error } = await supabase.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        email_confirm: true,
        user_metadata: { username: 'admin' },
      })
      if (error) return NextResponse.json({ error: 'admin_create_failed' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }
}
