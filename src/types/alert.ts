import { Market, Selection } from '@/types/odd'
import { Bookmaker } from '@/types/bookmaker'

export type AlertStatus = 'ativo' | 'disparado' | 'cancelado';

// Shape retornado por GET /alerts (com `game`/`triggeredBookmaker` populados).
// POST e PATCH /trigger devolvem um objeto mais enxuto - por isso as
// mutations invalidam a query da lista em vez de usar a resposta direto.
export type Alert = {
  id: string;
  gameId: string;
  game: {
    id: string;
    homeTeam: string;
    awayTeam: string;
    league: string;
    startTime: string;
  };
  market: Market;
  selection: Selection;
  targetOdd: number;
  status: AlertStatus;
  createdAt: string;
  triggeredAt: string | null;
  triggeredBookmakerId: string | null;
  triggeredBookmaker: Bookmaker | null;
}

export type CreateAlertInput = {
  gameId: string;
  market: Market;
  selection: Selection;
  targetOdd: number;
}
