import { Bookmaker } from '@/types/bookmaker'

export type Market = 'MATCH_RESULT';

export type Selection = 'HOME' | 'DRAW' | 'AWAY';

export type Odd = {
  id: string;
  gameId: string;
  bookmakerId: string;
  bookmaker: Bookmaker;
  market: Market;
  selection: Selection;
  value: number;
  updatedAt: string;
}
