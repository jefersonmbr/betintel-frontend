'use client'

import { Container, Typography, Box, Button, Alert } from '@mui/material'
import { usePushNotifications } from '@/hooks/usePushNotifications'

export default function PerfilPage() {
  const { permission, isSubscribed, isLoading, isSupported, subscribe } = usePushNotifications()

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 10 }}>
      <Typography variant="h5" gutterBottom>
        Perfil
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Typography color="text.secondary">
          Login e gerenciamento de conta em breve.
        </Typography>
      </Box>

      <Typography variant="h6" gutterBottom>
        Notificações
      </Typography>

      {!isSupported && (
        <Alert severity="warning">
          Seu navegador não suporta notificações push.
        </Alert>
      )}

      {isSupported && permission === 'denied' && (
        <Alert severity="error">
          Notificações bloqueadas. Habilite nas configurações do navegador pra esse site.
        </Alert>
      )}

      {isSupported && permission !== 'denied' && (
        <>
          {isSubscribed ? (
            <Alert severity="success">
              Notificações ativadas — você vai ser avisado quando um alerta disparar.
            </Alert>
          ) : (
            <Button variant="contained" onClick={subscribe} disabled={isLoading}>
              {isLoading ? 'Ativando...' : 'Ativar notificações de alerta'}
            </Button>
          )}
        </>
      )}
    </Container>
  )
}
