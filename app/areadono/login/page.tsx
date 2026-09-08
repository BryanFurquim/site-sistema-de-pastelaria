'use client'

import { FormEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function OwnerLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const loginEmail = email.trim().toLowerCase() === 'admin' ? 'admin@pastelboer.com' : email.trim()
    if (loginEmail === 'admin@pastelboer.com' && password === 'admin@pastelboer') {
      await fetch('/api/admin/bootstrap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password }),
      })
    }
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email: loginEmail, password })
    if (authError) {
      setError('Não foi possível entrar. Confira suas credenciais.')
      setLoading(false)
      return
    }
    window.location.href = '/areadono'
  }

  return <main className="grid min-h-screen place-items-center bg-[#FFF4C2] px-6">
    <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
      <a href="/" className="text-sm font-bold text-[#D92D20]">← Voltar ao site</a>
      <p className="mt-10 text-sm font-bold uppercase tracking-[.2em] text-[#D92D20]">Acesso restrito</p>
      <h1 className="mt-3 font-serif text-4xl font-bold text-[#111111]">Área do dono</h1>
      <p className="mt-2 text-[#5A1A16]">Entre para acompanhar os pedidos da casa.</p>
      <label htmlFor="admin" className="mt-8 block text-sm font-bold text-[#111111]">Admin</label>
      <input id="admin" value={email} onChange={(event) => setEmail(event.target.value)} type="text" autoComplete="username" className="mt-2 w-full rounded-xl border border-[#111111] bg-[#111111] p-3 text-white caret-white outline-none placeholder:text-[#B9C8BA] focus:border-[#D92D20]" />
      <label htmlFor="password" className="mt-4 block text-sm font-bold text-[#111111]">Senha</label>
      <input id="password" value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" className="mt-2 w-full rounded-xl border border-[#111111] bg-[#111111] p-3 text-white caret-white outline-none placeholder:text-[#B9C8BA] focus:border-[#D92D20]" />
      <button disabled={loading} className="mt-6 w-full rounded-xl bg-[#D92D20] py-4 font-bold text-white disabled:opacity-60">{loading ? 'Entrando...' : 'Entrar no painel'}</button>
      {error && <p role="alert" className="mt-3 text-sm text-[#D92D20]">{error}</p>}
    </form>
  </main>
}
