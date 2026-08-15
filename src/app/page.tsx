'use client'

import { Container, Typography, Box } from '@mui/material'
import GameCard from '@/components/GameCard'
import { gamesMock } from '../mocks/games'

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Jogos de Hoje
        </Typography>

        {gamesMock.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </Box>
    </Container>
  );
}
