'use client'

import { FormEvent, useState } from 'react'
import { ArrowLeft, Eye, EyeOff, LockKeyhole } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function OwnerLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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

  return <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#101010] px-5 py-16 text-[#F5F1EA]">
    <a href="/" className="absolute left-5 top-5 inline-flex items-center gap-2 text-sm text-[#D7D2CB] transition hover:text-white"><ArrowLeft size={16} /> Voltar ao site</a>
    <div className="w-full max-w-[384px]">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="grid size-[68px] place-items-center overflow-hidden rounded-full border-4 border-[#2D2D2D] bg-[#1A1A1A] shadow-lg"><img src="/pastel-boer-logo.png" alt="Logo Pastel Boer" className="h-full w-full object-contain" /></div>
        <h1 className="mt-4 text-xl font-bold tracking-tight">Pastel Boer</h1>
        <p className="mt-1 text-sm text-[#858585]">Área do dono</p>
      </div>
      <form onSubmit={handleSubmit} className="rounded-2xl border border-[#303030] bg-[#1B1B1B] p-8 shadow-2xl">
        <div className="flex gap-3"><LockKeyhole className="mt-0.5 shrink-0 text-[#F5C518]" size={18} /><div><p className="text-sm font-bold">Acesso restrito</p><p className="mt-1 text-xs text-[#858585]">Entre para acompanhar os pedidos da casa.</p></div></div>
        <label htmlFor="admin" className="mt-7 block text-[11px] font-bold uppercase tracking-wider text-[#858585]">Usuário</label>
        <input id="admin" value={email} onChange={(event) => setEmail(event.target.value)} type="text" autoComplete="username" placeholder="Admin" className="mt-2 h-12 w-full rounded-xl border border-[#333333] bg-[#252525] px-4 text-sm text-white caret-white outline-none placeholder:text-[#858585] transition focus:border-[#F5C518]" />
        <label htmlFor="password" className="mt-4 block text-[11px] font-bold uppercase tracking-wider text-[#858585]">Senha</label>
        <div className="relative mt-2"><input id="password" value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="••••••••••••" className="h-12 w-full rounded-xl border border-[#333333] bg-[#252525] px-4 pr-12 text-sm text-white caret-white outline-none placeholder:text-[#858585] transition focus:border-[#F5C518]" /><button type="button" aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'} onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#858585] transition hover:text-white">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
        <button disabled={loading} className="mt-6 h-12 w-full rounded-xl bg-[#F5C518] text-sm font-bold text-[#171717] transition hover:bg-[#FFD52F] disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Entrando...' : 'Entrar no painel'}</button>
        {error && <p role="alert" className="mt-3 text-sm text-[#F2776D]">{error}</p>}
      </form>
    </div>
  </main>
}
