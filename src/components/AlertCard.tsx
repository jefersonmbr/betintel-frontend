'use client'

import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { Alert } from '@/types/alert'
import { useCancelAlert, useDeleteAlert, useTriggerAlert, useUpdateAlert } from '@/hooks/useAlerts'

type Props = {
  alert: Alert,
}

const statusLabel: Record<Alert['status'], string> = {
  ativo: 'ativo',
  disparado: 'disparado',
  cancelado: 'cancelado',
}

export default function AlertCard({ alert }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(String(alert.targetOdd))

  const deleteAlert = useDeleteAlert()
  const cancelAlert = useCancelAlert()
  const triggerAlert = useTriggerAlert()
  const updateAlert = useUpdateAlert()

  const isActive = alert.status === 'ativo'

  const handleSaveEdit = () => {
    updateAlert.mutate(
      { id: alert.id, targetOdd: Number(editValue) },
      { onSuccess: () => setIsEditing(false) }
    )
  }

  return (
    <Card>
      <CardContent>
        <Typography>
          {alert.game.homeTeam} x {alert.game.awayTeam}
        </Typography>

        {isEditing ? (
          <Stack direction="row" spacing={1} sx={{ my: 1, alignItems: 'center' }}>
            <TextField
              label="Odd alvo"
              type="number"
              size="small"
              value={editValue}
              onChange={(event) => setEditValue(event.target.value)}
              slotProps={{ htmlInput: { step: 0.01, min: 1 } }}
              sx={{ width: 120 }}
            />
            <Button size="small" variant="contained" onClick={handleSaveEdit} disabled={updateAlert.isPending}>
              Salvar
            </Button>
            <Button size="small" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
          </Stack>
        ) : (
          <Typography>
            Odd alvo: {alert.targetOdd}
          </Typography>
        )}

        <Typography>
          Status: {statusLabel[alert.status]}
        </Typography>
        {alert.status === 'disparado' && alert.triggeredBookmaker && (
          <Typography>
            Disparado em: {alert.triggeredBookmaker.name}
          </Typography>
        )}
        <Typography sx={{ mb: 1 }}>
          Criado em:{' '}{new Date(alert.createdAt).toLocaleString('pt-BR')}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
          {isActive && !isEditing && (
            <Button variant="outlined" size="small" onClick={() => setIsEditing(true)}>
              Editar
            </Button>
          )}
          {isActive && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => cancelAlert.mutate(alert.id)}
              disabled={cancelAlert.isPending}
            >
              Cancelar
            </Button>
          )}
          <Button
            variant="outlined"
            size="small"
            onClick={() => deleteAlert.mutate(alert.id)}
          >
            Excluir
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => triggerAlert.mutate(alert.id)}
            disabled={!isActive}
          >
            Simular disparo
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
