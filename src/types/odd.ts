export type Market = 'MATCH_RESULT';

export type Selection = 'HOME' | 'DRAW' | 'AWAY';

export type Odd = {
  bookmakerId: string;
  market: Market;
  selection: Selection;
  value: number;
  updatedAt: string;
}
