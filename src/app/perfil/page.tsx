'use client'

import { Container, Typography, Box, Button, Alert, Stack, CircularProgress } from '@mui/material'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { usePushNotifications } from '@/hooks/usePushNotifications'

export default function PerfilPage() {
  const { user, isLoading: isAuthLoading, logout } = useAuth()
  const { permission, isSubscribed, isLoading, isSupported, subscribe } = usePushNotifications()

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 10 }}>
      <Typography variant="h5" gutterBottom>
        Perfil
      </Typography>

      {isAuthLoading && <CircularProgress />}

      {!isAuthLoading && !user && (
        <Box sx={{ mb: 4 }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Entre ou crie uma conta pra salvar seus alertas e receber notificações.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" component={Link} href="/login">
              Entrar
            </Button>
            <Button variant="outlined" component={Link} href="/cadastro">
              Criar conta
            </Button>
          </Stack>
        </Box>
      )}

      {!isAuthLoading && user && (
        <>
          <Box sx={{ mb: 4 }}>
            <Typography sx={{ mb: 1 }}>
              {user.name ? `Olá, ${user.name}` : 'Logado'}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              {user.email}
            </Typography>
            <Button variant="outlined" onClick={logout}>
              Sair
            </Button>
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
        </>
      )}
    </Container>
  )
}
