'use client';

import { Container, CircularProgress, Alert } from '@mui/material'
import { useParams } from 'next/navigation'
import { useGame } from '@/hooks/useGame'
import GameDetailsCard from '@/components/GameDetailsCard'

export default function JogoDetalhePage() {
  const params = useParams()
  const id = params.id as string

  const { data: game, isLoading, isError } = useGame(id)

  if (isLoading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    )
  }

  if (isError || !game) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">Jogo não encontrado</Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <GameDetailsCard game={game} />
    </Container>
  )
}
