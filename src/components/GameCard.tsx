import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from '@mui/material'
import Link from 'next/link'
import { Game } from '@/types/game'
import { getBestOdd } from '@/lib/odds'
import { apiBaseUrl } from '@/lib/api'

type Props = {
  game: Game,
}

export default function GameCard({ game }: Props) {
  const bestOdd = getBestOdd(game)

  return (
    <Card sx={{ mb: 2, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6">
          {game.homeTeam} x {game.awayTeam}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Horário: {new Date(game.startTime).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Melhor odd: {bestOdd ? bestOdd.value : '—'}
          {bestOdd ? ` (${bestOdd.bookmaker.name})` : ''}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            component={Link}
            href={`/jogos/${game.id}`}
          >
            Ver análise
          </Button>
          <Button
            variant="outlined"
            component="a"
            href={bestOdd ? `${apiBaseUrl}/go/${bestOdd.bookmakerId}/${game.id}` : '#'}
            target="_blank"
            rel="noopener noreferrer"
            disabled={!bestOdd}
          >
            Apostar agora
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
