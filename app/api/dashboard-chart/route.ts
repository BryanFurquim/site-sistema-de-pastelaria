import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY_4) return NextResponse.json({ error: 'Configuração indisponível.' }, { status: 503 })
  try {
    const { revenue, topProducts } = await request.json()
    const result = await generateText({
      model: openai('gpt-4o-mini'),
      system: 'Você é um diretor de arte de dashboards Power BI. Responda apenas JSON válido com as chaves title, subtitle e accent. accent deve ser uma cor hexadecimal acessível e próxima de amarelo/dourado. Não altere valores, métricas ou dados.',
      prompt: `Sugira uma apresentação clara para um dashboard de faturamento. Faturamento do mês: R$ ${Number(revenue || 0).toFixed(2)}. Produtos principais: ${JSON.stringify(topProducts || [])}.`,
    })
    const parsed = JSON.parse(result.text.replace(/```json|```/g, '').trim())
    return NextResponse.json({ title: String(parsed.title || 'Faturamento do mês'), subtitle: String(parsed.subtitle || 'Acompanhe sua evolução e seus produtos de maior impacto.'), accent: /^#[0-9a-f]{6}$/i.test(parsed.accent) ? parsed.accent : '#F5C518' })
  } catch {
    return NextResponse.json({ error: 'Não foi possível personalizar o gráfico.' }, { status: 502 })
  }
}
