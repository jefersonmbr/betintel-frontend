'use client';

import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Snackbar,
  Divider,
  CircularProgress,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import Link from 'next/link'
import { Game } from '@/types/game'
import { getBestOdd } from '@/lib/odds'
import { computeMarketAnalysis } from '@/lib/analysis'
import { apiBaseUrl } from '@/lib/api'
import { useAlerts, useCreateAlert } from '@/hooks/useAlerts'
import { useAuth } from '@/contexts/AuthContext'

type Props = {
  game: Game,
}

export default function GameDetailsCard({ game }: Props) {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const { data: alerts } = useAlerts(Boolean(user))
  const createAlert = useCreateAlert()

  const bestOdd = getBestOdd(game)
  const analysis = computeMarketAnalysis(game)
  const oddsByBookmaker = game.odds
    .filter((odd) => odd.market === 'MATCH_RESULT' && odd.selection === 'HOME')
    .slice()
    .sort((a, b) => b.value - a.value)

  const [targetOdd, setTargetOdd] = useState(String(bestOdd?.value ?? 2.0))

  const alertsForThisGame = alerts?.filter((alert) => alert.gameId === game.id).length ?? 0

  const handleCreateAlert = () => {
    createAlert.mutate(
      {
        gameId: game.id,
        market: 'MATCH_RESULT',
        selection: 'HOME',
        targetOdd: Number(targetOdd),
      },
      { onSuccess: () => setOpen(true) }
    )
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
            {oddsByBookmaker.map((odd) => (
              <Stack
                key={odd.bookmakerId}
                direction="row"
                sx={{ justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography
                  sx={{ fontWeight: odd.value === bestOdd?.value ? 700 : 400 }}
                >
                  {odd.bookmaker.name}: {odd.value}
                </Typography>
                <Button
                  size="small"
                  variant={odd.value === bestOdd?.value ? 'contained' : 'outlined'}
                  component="a"
                  href={`${apiBaseUrl}/go/${odd.bookmakerId}/${game.id}`}
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
            Análise de Mercado
          </Typography>
          {analysis ? (
            <>
              <Typography sx={{ mb: 1 }}>
                Probabilidade implícita (Casa vencer): {analysis.impliedProbability}%
              </Typography>
              <Typography sx={{ mb: 1 }}>
                Confiança do mercado: {analysis.confidence}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 3, display: 'block' }}>
                Calculado a partir da melhor odd de {analysis.bookmakersCount} casa(s) — inclui a margem da casa,
                não é previsão de resultado.
              </Typography>
            </>
          ) : (
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Sem odds suficientes pra calcular a análise.
            </Typography>
          )}
          {user ? (
            <>
              <Typography sx={{ mb: 3 }}>
                Alertas salvos pra esse jogo: {alertsForThisGame}
              </Typography>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Odd alvo"
                  type="number"
                  size="small"
                  value={targetOdd}
                  onChange={(event) => setTargetOdd(event.target.value)}
                  slotProps={{ htmlInput: { step: 0.01, min: 1 } }}
                  sx={{ width: 120 }}
                />
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleCreateAlert}
                  disabled={createAlert.isPending || !targetOdd}
                >
                  {createAlert.isPending ? <CircularProgress size={20} /> : 'Criar alerta'}
                </Button>
              </Stack>
            </>
          ) : (
            <Button variant="outlined" fullWidth component={Link} href="/login">
              Entrar pra criar alerta
            </Button>
          )}
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
