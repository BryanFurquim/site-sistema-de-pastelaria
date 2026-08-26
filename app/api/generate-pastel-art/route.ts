import { NextResponse } from 'next/server'

export async function GET() {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'OPENAI_API_KEY não configurada.' }, { status: 500 })
  }

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-image-1',
      prompt: 'Apetitosa fotografia editorial de um pastel brasileiro artesanal recém-frito, dourado e crocante, aberto revelando recheio generoso de carne com queijo derretido, ao lado de pequenos potes com catupiry, milho, azeitonas e molho de pimenta, toalha xadrez vermelha e amarela, luz quente de balcão de pastelaria, composição premium, fundo escuro elegante, sem texto, sem logotipos, formato horizontal 4:3',
      size: '1024x1024',
      quality: 'auto',
    }),
  })

  if (!response.ok) {
    return NextResponse.json({ error: 'Não foi possível gerar a arte.' }, { status: response.status })
  }

  const data = await response.json()
  return NextResponse.json({ url: data.data?.[0]?.url ?? null })
}
