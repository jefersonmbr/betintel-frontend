import { Odd } from '@/types/odd'

export type Game = {
  id: number;
  homeTeam: string;
  awayTeam: string;
  league: string;
  startTime: string;
  odds: Odd[];
}
