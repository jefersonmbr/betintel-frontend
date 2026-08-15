'use client'

import {
  Typography,
  Card,
  CardContent,
  Stack,
} from '@mui/material'
import { useState } from 'react'

type Alert = {
  gameId: number,
  createdAt: string,
}

function getInitialAlerts(): Alert[] {
  return JSON.parse(
    localStorage.getItem('alerts') || '[]'
  )
}

export default function AlertsList() {
  const [alerts] = useState<Alert[]>(getInitialAlerts)

  if (alerts.length === 0) {
    return (
      <Typography>
        Nenhum alerta criado
      </Typography>
    )
  }

  return (
    <Stack spacing={2}>
      {alerts.map((alert, index) => (
        <Card key={index}>
          <CardContent>
            <Typography>
              Jogo ID: {alert.gameId}
            </Typography>

            <Typography>
              Criado em:{' '}
              {new Date(
                alert.createdAt
              ).toLocaleString('pt-BR')}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
