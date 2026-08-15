import { Market, Selection } from '@/types/odd'

export type AlertStatus = 'ativo' | 'disparado' | 'cancelado';

export type Alert = {
  gameId: number;
  market: Market;
  selection: Selection;
  targetOdd: number;
  status: AlertStatus;
  createdAt: string;
  triggeredAt?: string;
  triggeredBookmakerId?: string;
}
