'use client'

import { FormEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function OwnerLoginPage() {
  const [email, setEmail] = useState('admin')
  const [password, setPassword] = useState('admin@pastelboer')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const loginEmail = email.trim().toLowerCase() === 'admin' ? 'admin@pastelboer.com' : email.trim()
    const { error: authError } = await supabase.auth.signInWithPassword({ email: loginEmail, password })
    if (authError) {
      setError('Não foi possível entrar. Confira suas credenciais.')
      setLoading(false)
      return
    }
    window.location.href = '/areadono'
  }

  return <main className="grid min-h-screen place-items-center bg-[#EAF0E5] px-6">
    <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
      <a href="/" className="text-sm font-bold text-[#E85D3F]">← Voltar ao site</a>
      <p className="mt-10 text-sm font-bold uppercase tracking-[.2em] text-[#E85D3F]">Acesso restrito</p>
      <h1 className="mt-3 font-serif text-4xl font-bold text-[#24352B]">Área do dono</h1>
      <p className="mt-2 text-[#627067]">Entre para acompanhar os pedidos da casa.</p>
      <label className="mt-8 block text-sm font-bold text-[#24352B]">E-mail</label>
      <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" autoComplete="username" className="mt-2 w-full rounded-xl border border-[#DDE4D9] p-3 outline-none focus:border-[#E85D3F]" />
      <label className="mt-4 block text-sm font-bold text-[#24352B]">Senha</label>
      <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" className="mt-2 w-full rounded-xl border border-[#DDE4D9] p-3 outline-none focus:border-[#E85D3F]" />
      <button disabled={loading} className="mt-6 w-full rounded-xl bg-[#E85D3F] py-4 font-bold text-white disabled:opacity-60">{loading ? 'Entrando...' : 'Entrar no painel'}</button>
      {error && <p role="alert" className="mt-3 text-sm text-[#E85D3F]">{error}</p>}
    </form>
  </main>
}
