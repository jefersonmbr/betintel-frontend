'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Container, Typography, TextField, Button, Stack, Alert } from '@mui/material'
import { isAxiosError } from 'axios'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await login(email, password)
      router.push('/perfil')
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 401) {
        setError('E-mail ou senha inválidos')
      } else {
        setError('Não foi possível entrar. Verifique se o backend está rodando.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 10 }}>
      <Typography variant="h5" gutterBottom>
        Entrar
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="E-mail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Senha"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
          <Typography variant="body2">
            Não tem conta?{' '}
            <Link href="/cadastro">Cadastre-se</Link>
          </Typography>
        </Stack>
      </form>
    </Container>
  )
}
