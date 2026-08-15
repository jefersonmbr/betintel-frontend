'use client';

import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Snackbar,
  Divider,
} from '@mui/material'
import { useState, useSyncExternalStore } from 'react'
import { Game } from '@/types/game'
import { Alert } from '@/types/alert'
import { bookmakersMock } from '@/mocks/bookmakers'
import { getBestOdd } from '@/lib/odds'

type Props = {
  game: Game,
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback)
}

function getSnapshot() {
  const savedAlerts = JSON.parse(
    localStorage.getItem('alerts') || '[]'
  )

  return savedAlerts.length;
}

function getServerSnapshot() {
  return 0
}

export default function GameDetailsCard({ game }: Props) {
  const [open, setOpen] = useState(false)
  const alertsCount = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )

  const bestOdd = getBestOdd(game)
  const oddsByBookmaker = game.odds
    .filter((odd) => odd.market === 'MATCH_RESULT' && odd.selection === 'HOME')
    .map((odd) => ({
      odd,
      bookmaker: bookmakersMock.find((item) => item.id === odd.bookmakerId),
    }))
    .sort((a, b) => b.odd.value - a.odd.value)

  const handleCreateAlert = () => {
    const savedAlerts: Alert[] = JSON.parse(
      localStorage.getItem('alerts') || '[]'
    )
    const newAlert: Alert = {
      gameId: game.id,
      market: 'MATCH_RESULT',
      selection: 'HOME',
      targetOdd: 2.0,
      status: 'ativo',
      createdAt: new Date().toISOString(),
    }
    const updatedAlerts = [...savedAlerts, newAlert]
    localStorage.setItem(
      'alerts',
      JSON.stringify(updatedAlerts)
    )
    window.dispatchEvent(new Event('storage'))
    setOpen(true)
  }

  return (
    <>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {game.homeTeam} x {game.awayTeam}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Liga: {game.league}
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Horário: {new Date(game.startTime).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>

          <Typography variant="h6" sx={{ mb: 2 }}>
            Odds por casa (Resultado Final — Casa)
          </Typography>
          <Stack spacing={1} sx={{ mb: 3 }}>
            {oddsByBookmaker.map(({ odd, bookmaker }) => (
              <Stack
                key={odd.bookmakerId}
                direction="row"
                sx={{ justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography
                  sx={{ fontWeight: odd.value === bestOdd?.value ? 700 : 400 }}
                >
                  {bookmaker?.name ?? odd.bookmakerId}: {odd.value}
                </Typography>
                <Button
                  size="small"
                  variant={odd.value === bestOdd?.value ? 'contained' : 'outlined'}
                  component="a"
                  href={bookmaker?.affiliateUrl ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apostar
                </Button>
              </Stack>
            ))}
          </Stack>

          <Divider sx={{ mb: 3 }} />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Análise IA
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Probabilidade: 54%
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Sugestão: Over 1.5 gols
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Confiança: Alta
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Alertas salvos: {alertsCount}
          </Typography>
          <Stack spacing={2}>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleCreateAlert}
            >
              Criar alerta (odd alvo: 2.0)
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        message="Alerta criado com sucesso"
        onClose={() => setOpen(false)}
      />
    </>
  );
}
