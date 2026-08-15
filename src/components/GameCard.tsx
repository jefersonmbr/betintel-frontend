import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from '@mui/material'
import Link from 'next/link'
import { Game } from '@/types/game'
import { bookmakersMock } from '@/mocks/bookmakers'
import { getBestOdd } from '@/lib/odds'

type Props = {
  game: Game,
}

export default function GameCard({ game }: Props) {
  const bestOdd = getBestOdd(game)
  const bookmaker = bestOdd
    ? bookmakersMock.find((item) => item.id === bestOdd.bookmakerId)
    : null

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
          {bookmaker ? ` (${bookmaker.name})` : ''}
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
            href={bookmaker?.affiliateUrl ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            disabled={!bookmaker}
          >
            Apostar agora
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
