'use client';

import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Snackbar,
} from '@mui/material'
import { useState, useSyncExternalStore } from 'react'
import { Game } from '@/types/game'

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

  const handleCreateAlert = () => {
    const savedAlerts = JSON.parse(
      localStorage.getItem('alerts') || '[]'
    )
    const newAlert = {
      gameId: game.id,
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
          <Typography sx={{ mb: 1 }}>
            Horário: {game.time}
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Melhor odd: {game.odd}
          </Typography>
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
            <Button variant="contained" fullWidth>
              Apostar agora
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleCreateAlert}
            >
              Criar alerta
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
