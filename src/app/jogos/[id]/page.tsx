'use client';

import { Container } from '@mui/material'
import { useParams } from 'next/navigation'
import { gamesMock } from '@/mocks/games'
import GameDetailsCard from '@/components/GameDetailsCard'

export default function JogoDetalhePage() {
  const params = useParams()
  const id = params.id as string

  const game = gamesMock.find(
    (item) => item.id === Number(id)
  )

  if (!game) {
    return <div>Jogo não encontrado</div>
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <GameDetailsCard game={game} />
    </Container>
  )
}
