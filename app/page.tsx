'use client'

import { useState } from 'react'
import { ArrowRight, MapPin, ShoppingBag, Sparkles } from 'lucide-react'

const products = [
  ['Carne com queijo', 'Carne temperada, queijo derretido e azeitona.', 'R$ 12,90'],
  ['Frango cremoso', 'Frango desfiado, catupiry e milho.', 'R$ 13,90'],
  ['Palmito especial', 'Palmito, queijo, tomate e tempero da casa.', 'R$ 13,90'],
  ['Caldo de cana', 'Gelado e preparado na hora.', 'R$ 7,50'],
]

export default function Page() {
  const [menu, setMenu] = useState(false)
  return <main className="min-h-screen bg-[#FBF8F1] text-[#24352B]">
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
      <a href="#inicio" className="flex items-center gap-3"><span className="grid size-14 overflow-hidden rounded-2xl bg-white"><img src="/pastel-boer-logo.png" alt="Logo Pastel Boer" className="h-full w-full object-contain" /></span><span className="font-serif text-2xl font-bold">Pastel Boer</span></a>
      <nav className="hidden gap-8 text-sm font-bold lg:flex"><a href="#sobre">A casa</a><a href="#contato">Contato</a></nav>
      <button onClick={() => setMenu(true)} className="flex items-center gap-2 rounded-full bg-[#24352B] px-4 py-3 text-sm font-bold text-white"><ShoppingBag size={17} /> Pedir agora</button>
    </header>
    {!menu ? <>
      <section id="inicio" className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-20 pt-12 lg:grid-cols-2 lg:px-10 lg:pt-20"><div><div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#F4C95D]/40 px-4 py-2 text-sm font-bold"><Sparkles size={15} /> Feito na hora, do jeitinho que você gosta</div><h1 className="font-serif text-6xl font-bold leading-none tracking-tight sm:text-7xl">O pastel mais <span className="text-[#E85D3F]">caprichado</span> da cidade.</h1><p className="mt-7 max-w-lg text-lg leading-8 text-[#627067]">Massa crocante, recheio de verdade e aquele molho especial que só a gente tem. Estamos na R. Prosperidade, 375 - Jardim Boer I, Americana - SP.</p><button onClick={() => setMenu(true)} className="mt-8 flex items-center gap-3 rounded-full bg-[#E85D3F] px-6 py-4 font-bold text-white">Conheça nosso cardápio <ArrowRight size={18} /></button></div><div className="relative min-h-[390px] overflow-hidden rounded-[2.5rem] bg-[#24352B] shadow-xl"><img src="/pastel-boer-hero.png" alt="Pastel artesanal dourado com recheio generoso" className="h-full min-h-[390px] w-full object-cover" /><div className="absolute bottom-5 left-5 rounded-2xl bg-[#FBF8F1] px-4 py-3 text-sm font-bold shadow-lg">Recheio generoso. Crocância de verdade.</div></div></section>
      <section id="sobre" className="border-y border-[#DDE4D9] bg-[#EAF0E5] px-6 py-16"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center"><div className="order-2 overflow-hidden rounded-[2rem] bg-[#24352B] shadow-xl lg:order-1"><img src="/pastel-boer-flavors.png" alt="Pastéis crocantes com diversos recheios" className="h-full min-h-72 w-full object-cover" /></div><div className="order-1 flex flex-col gap-6 lg:order-2"><p className="text-sm font-bold uppercase tracking-[.2em] text-[#E85D3F]">Seu próximo pedido começa aqui</p><h2 className="font-serif text-4xl font-bold">Escolha seu sabor e peça agora.</h2><p className="leading-8 text-[#627067]">Pastel artesanal, massa crocante e recheio generoso. Carne com queijo, frango cremoso, palmito especial, doces e bebidas esperando por você.</p><button onClick={() => setMenu(true)} className="w-fit rounded-full bg-[#E85D3F] px-5 py-3 text-sm font-bold text-white">Fazer meu pedido agora <ArrowRight size={16} className="ml-2 inline" /></button></div></div></section>
    </> : <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10"><button onClick={() => setMenu(false)} className="mb-8 font-bold text-[#E85D3F]">← Voltar para a casa</button><h1 className="font-serif text-5xl font-bold">Escolha o seu favorito.</h1><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.map(([name, description, price]) => <article key={name} className="rounded-3xl border border-[#DDE4D9] bg-white p-5"><div className="grid h-32 place-items-center rounded-2xl bg-[#F4C95D]"><img src="/pastel-boer-hero.png" alt="Pastel" className="h-full w-full rounded-2xl object-cover" /></div><h2 className="mt-5 font-serif text-xl font-bold">{name}</h2><p className="mt-2 text-sm leading-6 text-[#627067]">{description}</p><strong className="mt-4 block text-[#E85D3F]">{price}</strong></article>)}</div></section>}
    <footer id="contato" className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-10 text-sm text-[#627067] lg:px-10"><MapPin size={18} /> R. Prosperidade, 375 - Jardim Boer I, Americana - SP, 13476-630</footer>
  </main>
}
