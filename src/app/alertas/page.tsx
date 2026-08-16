'use client'

import {
  Container,
  Typography,
  Stack,
  CircularProgress,
  Alert as MuiAlert,
  Tabs,
  Tab,
  Button,
} from '@mui/material'
import { useState } from 'react'
import Link from 'next/link'
import { useAlerts } from '@/hooks/useAlerts'
import { useAuth } from '@/contexts/AuthContext'
import { AlertStatus } from '@/types/alert'
import AlertCard from '@/components/AlertCard'

type FilterValue = AlertStatus | 'todos'

const filters: { value: FilterValue, label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'ativo', label: 'Ativos' },
  { value: 'disparado', label: 'Disparados' },
  { value: 'cancelado', label: 'Cancelados' },
]

export default function AlertasPage() {
  const { user, isLoading: isAuthLoading } = useAuth()
  const { data: alerts, isLoading, isError } = useAlerts(Boolean(user))
  const [filter, setFilter] = useState<FilterValue>('todos')

  const filteredAlerts = alerts?.filter(
    (alert) => filter === 'todos' || alert.status === filter
  )

  if (isAuthLoading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, mb: 10, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    )
  }

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, mb: 10 }}>
        <Typography variant="h5" gutterBottom>
          Meus Alertas
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Entre com sua conta pra ver e criar alertas.
        </Typography>
        <Button variant="contained" component={Link} href="/login">
          Entrar
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 10 }}>
      <Typography variant="h5" gutterBottom>
        Meus Alertas
      </Typography>

      <Tabs
        value={filter}
        onChange={(_, value: FilterValue) => setFilter(value)}
        sx={{ mb: 2 }}
        variant="scrollable"
      >
        {filters.map((item) => (
          <Tab key={item.value} value={item.value} label={item.label} />
        ))}
      </Tabs>

      {isLoading && <CircularProgress />}
      {isError && (
        <MuiAlert severity="error" sx={{ mb: 2 }}>
          Não foi possível carregar os alertas. Verifique se o backend está rodando.
        </MuiAlert>
      )}

      <Stack spacing={2}>
        {filteredAlerts?.length === 0 && (
          <Typography>
            Nenhum alerta {filter === 'todos' ? 'criado' : `com esse status`}
          </Typography>
        )}
        {filteredAlerts?.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </Stack>
    </Container>
  )
}
