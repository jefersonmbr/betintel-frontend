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
          <GameCard
            key={game.id}
            id={game.id}
            homeTeam={game.homeTeam}
            awayTeam={game.awayTeam}
            time={game.time}
            odd={game.odd}
          />
        ))}
      </Box>
    </Container>
  );
}
