import { Game } from '@/types/game'
import { Market, Selection } from '@/types/odd'

export type MarketConfidence = 'Alta' | 'Média' | 'Baixa'

export type MarketAnalysis = {
  impliedProbability: number; // % de chance implícita na melhor odd (inclui margem da casa)
  confidence: MarketConfidence; // quanto as casas concordam entre si no preço
  bookmakersCount: number;
}

// Analise estatistica a partir das odds reais - nao e' previsao de resultado
// nem usa modelo de IA. "Confianca" mede consenso de mercado (o quanto as
// casas concordam no preco), nao a chance do time vencer.
export function computeMarketAnalysis(
  game: Game,
  market: Market = 'MATCH_RESULT',
  selection: Selection = 'HOME'
): MarketAnalysis | null {
  const values = game.odds
    .filter((odd) => odd.market === market && odd.selection === selection)
    .map((odd) => odd.value)

  if (values.length === 0) {
    return null
  }

  const best = Math.max(...values)
  const impliedProbability = Math.round((1 / best) * 100)

  const average = values.reduce((sum, value) => sum + value, 0) / values.length
  const variance = values.reduce((sum, value) => sum + (value - average) ** 2, 0) / values.length
  const spreadPercent = (Math.sqrt(variance) / average) * 100

  let confidence: MarketConfidence
  if (values.length < 2) {
    confidence = 'Baixa'
  } else if (spreadPercent < 2) {
    confidence = 'Alta'
  } else if (spreadPercent < 5) {
    confidence = 'Média'
  } else {
    confidence = 'Baixa'
  }

  return { impliedProbability, confidence, bookmakersCount: values.length }
}
