import { Game } from '@/types/game'
import { Market, Odd, Selection } from '@/types/odd'

export function getBestOdd(
  game: Game,
  market: Market = 'MATCH_RESULT',
  selection: Selection = 'HOME'
): Odd | null {
  const candidates = game.odds.filter(
    (odd) => odd.market === market && odd.selection === selection
  )

  if (candidates.length === 0) {
    return null
  }

  return candidates.reduce((best, current) =>
    current.value > best.value ? current : best
  )
}
