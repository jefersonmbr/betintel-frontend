import { Game } from '@/types/game'

export const gamesMock: Game[] = [
  {
    id: 1,
    homeTeam: 'Flamengo',
    awayTeam: 'Palmeiras',
    league: 'Brasileirão',
    startTime: '2026-08-15T19:30:00-03:00',
    odds: [
      { bookmakerId: 'betano', market: 'MATCH_RESULT', selection: 'HOME', value: 2.15, updatedAt: '2026-08-15T12:00:00-03:00' },
      { bookmakerId: 'kto', market: 'MATCH_RESULT', selection: 'HOME', value: 2.05, updatedAt: '2026-08-15T12:00:00-03:00' },
      { bookmakerId: 'betnacional', market: 'MATCH_RESULT', selection: 'HOME', value: 2.20, updatedAt: '2026-08-15T12:00:00-03:00' },
    ],
  },
  {
    id: 2,
    homeTeam: 'Santos',
    awayTeam: 'São Paulo',
    league: 'Brasileirão',
    startTime: '2026-08-15T21:00:00-03:00',
    odds: [
      { bookmakerId: 'betano', market: 'MATCH_RESULT', selection: 'HOME', value: 2.40, updatedAt: '2026-08-15T12:00:00-03:00' },
      { bookmakerId: 'kto', market: 'MATCH_RESULT', selection: 'HOME', value: 2.45, updatedAt: '2026-08-15T12:00:00-03:00' },
      { bookmakerId: 'betnacional', market: 'MATCH_RESULT', selection: 'HOME', value: 2.38, updatedAt: '2026-08-15T12:00:00-03:00' },
    ],
  },
  {
    id: 3,
    homeTeam: 'Corinthians',
    awayTeam: 'Grêmio',
    league: 'Copa do Brasil',
    startTime: '2026-08-15T18:00:00-03:00',
    odds: [
      { bookmakerId: 'betano', market: 'MATCH_RESULT', selection: 'HOME', value: 1.92, updatedAt: '2026-08-15T12:00:00-03:00' },
      { bookmakerId: 'kto', market: 'MATCH_RESULT', selection: 'HOME', value: 1.95, updatedAt: '2026-08-15T12:00:00-03:00' },
      { bookmakerId: 'betnacional', market: 'MATCH_RESULT', selection: 'HOME', value: 1.90, updatedAt: '2026-08-15T12:00:00-03:00' },
    ],
  },
]
