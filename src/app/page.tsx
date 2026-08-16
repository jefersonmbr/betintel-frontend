'use client'

import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material'
import GameCard from '@/components/GameCard'
import { useGames } from '@/hooks/useGames'

export default function Home() {
  const { data: games, isLoading, isError } = useGames()

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Jogos de Hoje
        </Typography>

        {isLoading && <CircularProgress />}
        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Não foi possível carregar os jogos. Verifique se o backend está rodando.
          </Alert>
        )}

        {games?.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </Box>
    </Container>
  );
}
