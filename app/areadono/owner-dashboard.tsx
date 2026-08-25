'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Order = { id: string; customer_name: string; customer_phone: string | null; items: { name: string; quantity: number }[]; total: number; status: string; created_at: string }
const labels: Record<string, string> = { recebido: 'Recebido', em_preparo: 'Em preparo', pronto: 'Pronto', entregue: 'Entregue', cancelado: 'Cancelado' }

export default function OwnerDashboard() {
  const supabase = createClient()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  async function loadOrders() { const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false }); setOrders((data as Order[]) || []); setLoading(false) }
  useEffect(() => { loadOrders(); const channel = supabase.channel('owner-orders-live').on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, loadOrders).subscribe(); return () => { supabase.removeChannel(channel) } }, [supabase])
  async function updateStatus(id: string, status: string) { await supabase.from('orders').update({ status }).eq('id', id); loadOrders() }
  async function logout() { await supabase.auth.signOut(); window.location.href = '/areadono/login' }
  return <main className="min-h-screen bg-[#F5F7F2] px-6 py-10 text-[#24352B]"><div className="mx-auto max-w-5xl"><header className="flex items-start justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[.2em] text-[#E85D3F]">Pastel do Zé</p><h1 className="mt-2 font-serif text-4xl font-bold">Pedidos da casa</h1><p className="mt-2 text-[#627067]">Atualização automática em tempo real.</p></div><button onClick={logout} className="rounded-xl border border-[#DDE4D9] bg-white px-4 py-3 text-sm font-bold">Sair</button></header><section className="mt-10 grid gap-4">{loading ? <p>Carregando pedidos...</p> : orders.length === 0 ? <div className="rounded-3xl bg-white p-10 text-center"><h2 className="font-serif text-2xl font-bold">Nenhum pedido ainda</h2><p className="mt-2 text-[#627067]">Os novos pedidos aparecerão aqui automaticamente.</p></div> : orders.map((order) => <article key={order.id} className="rounded-3xl bg-white p-6 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm font-bold text-[#E85D3F]">Pedido #{order.id.slice(0, 8)}</p><h2 className="mt-1 font-serif text-2xl font-bold">{order.customer_name}</h2><p className="text-sm text-[#627067]">{order.customer_phone || 'Telefone não informado'} · {new Date(order.created_at).toLocaleString('pt-BR')}</p></div><select value={order.status} onChange={(event) => updateStatus(order.id, event.target.value)} className="rounded-xl border border-[#DDE4D9] bg-[#EAF0E5] px-3 py-2 font-bold"><option value="recebido">{labels.recebido}</option><option value="em_preparo">{labels.em_preparo}</option><option value="pronto">{labels.pronto}</option><option value="entregue">{labels.entregue}</option><option value="cancelado">{labels.cancelado}</option></select></div><div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#EEF1EB] pt-4"><p className="text-sm">{order.items.map((item) => `${item.quantity}x ${item.name}`).join(', ')}</p><strong className="text-lg text-[#E85D3F]">R$ {Number(order.total).toFixed(2).replace('.', ',')}</strong></div></article>)}</section></div></main>
}
