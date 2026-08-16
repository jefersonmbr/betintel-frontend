'use client'

import {
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  CircularProgress,
  Alert as MuiAlert,
} from '@mui/material'
import { useAlerts, useDeleteAlert, useTriggerAlert } from '@/hooks/useAlerts'

export default function AlertasPage() {
  const { data: alerts, isLoading, isError } = useAlerts()
  const deleteAlert = useDeleteAlert()
  const triggerAlert = useTriggerAlert()

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 10 }}>
      <Typography variant="h5" gutterBottom>
        Meus Alertas
      </Typography>

      {isLoading && <CircularProgress />}
      {isError && (
        <MuiAlert severity="error" sx={{ mb: 2 }}>
          Não foi possível carregar os alertas. Verifique se o backend está rodando.
        </MuiAlert>
      )}

      <Stack spacing={2}>
        {alerts?.length === 0 && (
          <Typography>
            Nenhum alerta criado
          </Typography>
        )}
        {alerts?.map((alert) => (
          <Card key={alert.id}>
            <CardContent>
              <Typography>
                {alert.game.homeTeam} x {alert.game.awayTeam}
              </Typography>
              <Typography>
                Odd alvo: {alert.targetOdd}
              </Typography>
              <Typography>
                Status: {alert.status}
              </Typography>
              {alert.status === 'disparado' && alert.triggeredBookmaker && (
                <Typography>
                  Disparado em: {alert.triggeredBookmaker.name}
                </Typography>
              )}
              <Typography>
                Criado em:{' '}{new Date(alert.createdAt).toLocaleString('pt-BR')}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => deleteAlert.mutate(alert.id)}
              >
                Excluir
              </Button>
              {' '}{' '}
              <Button
                variant="contained"
                size="small"
                onClick={() => triggerAlert.mutate(alert.id)}
                disabled={alert.status === 'disparado'}
              >
                Simular disparo
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  )
}
