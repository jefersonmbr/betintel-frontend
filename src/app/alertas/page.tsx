'use client'

import {
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
} from '@mui/material'
import { useEffect, useReducer } from 'react'
import { gamesMock } from '@/mocks/games'

type Alert = {
  gameId: number,
  createdAt: string,
  targetOdd: string,
  status: string,
}

function reducer(_: Alert[], action: Alert[]) {
  return action
}

export default function AlertasPage() {
  const [alerts, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    const savedAlerts = JSON.parse(
      localStorage.getItem('alerts') || '[]'
    )
    dispatch(savedAlerts)
  }, [])

  const handleDeleteAlert = (createdAt: string) => {
    const savedAlerts: Alert[] = JSON.parse(
      localStorage.getItem('alerts') || '[]'
    )
    const updatedAlerts = savedAlerts.filter(
      alert => alert.createdAt !== createdAt
    )
    localStorage.setItem(
      'alerts',
      JSON.stringify(updatedAlerts)
    )
    dispatch(updatedAlerts)
  }

  const handleTriggerAlert = (createdAt: string) => {
    const savedAlerts: Alert[] = JSON.parse(
      localStorage.getItem('alerts') || '[]'
    )
    const updatedAlerts = savedAlerts.map(alert =>
      alert.createdAt === createdAt
        ? { ...alert, status: 'disparado' }
        : alert
    )
    localStorage.setItem(
      'alerts',
      JSON.stringify(updatedAlerts)
    )
    dispatch(updatedAlerts)
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 10 }}>
      <Typography variant="h5" gutterBottom>
        Meus Alertas
      </Typography>
      <Stack spacing={2}>
        {alerts.length === 0 ? (
          <Typography>
            Nenhum alerta criado
          </Typography>
        ) : (
          alerts.map((alert, index) => (
            <Card key={index}>
              <CardContent>
                <Typography>
                  {gamesMock.find(game => game.id === alert.gameId)?.homeTeam}
                  {' '}x{' '}
                  {gamesMock.find(game => game.id === alert.gameId)?.awayTeam}
                </Typography>
                <Typography>
                  Odd alvo: {alert.targetOdd}
                </Typography>

                <Typography>
                  Status: {alert.status}
                </Typography>
                <Typography>
                  Criado em:{' '}{new Date(alert.createdAt).toLocaleString('pt-BR')}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleDeleteAlert(alert.createdAt)}
                >
                  Excluir
                </Button>
                {' '}{' '}
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleTriggerAlert(alert.createdAt)}
                >
                  Simular disparo
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>
    </Container>
  )
}
