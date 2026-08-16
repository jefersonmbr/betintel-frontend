'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Container, Typography, TextField, Button, Stack, Alert } from '@mui/material'
import { isAxiosError } from 'axios'
import { useAuth } from '@/contexts/AuthContext'

export default function CadastroPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await register(email, password, name || undefined)
      router.push('/perfil')
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 409) {
        setError('Esse e-mail já está cadastrado')
      } else if (isAxiosError(err) && err.response?.status === 400) {
        setError('A senha precisa ter pelo menos 8 caracteres')
      } else {
        setError('Não foi possível cadastrar. Verifique se o backend está rodando.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 10 }}>
      <Typography variant="h5" gutterBottom>
        Criar conta
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Nome (opcional)"
            value={name}
            onChange={(event) => setName(event.target.value)}
            fullWidth
          />
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
            helperText="Mínimo de 8 caracteres"
            required
            fullWidth
          />
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Cadastrando...' : 'Criar conta'}
          </Button>
          <Typography variant="body2">
            Já tem conta?{' '}
            <Link href="/login">Entrar</Link>
          </Typography>
        </Stack>
      </form>
    </Container>
  )
}
