import { Odd } from '@/types/odd'

export type Game = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  startTime: string;
  odds: Odd[];
}
