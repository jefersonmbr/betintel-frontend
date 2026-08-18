import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
} from '@mui/material'
import Link from 'next/link'
import { Game } from '@/types/game'
import { getBestOdd } from '@/lib/odds'
import { apiBaseUrl } from '@/lib/api'
import TeamBadge from '@/components/TeamBadge'

type Props = {
  game: Game,
}

export default function GameCard({ game }: Props) {
  const bestOdd = getBestOdd(game)

  return (
    <Card sx={{ mb: 2, borderRadius: 3 }} elevation={1}>
      <CardContent>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
          <TeamBadge teamName={game.homeTeam} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {game.homeTeam} x {game.awayTeam}
          </Typography>
          <TeamBadge teamName={game.awayTeam} />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Horário: {new Date(game.startTime).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
          <Chip
            color="success"
            size="small"
            label={bestOdd ? `Melhor odd: ${bestOdd.value}` : 'Sem odds'}
          />
          {bestOdd && (
            <Typography variant="body2" color="text.secondary">
              {bestOdd.bookmaker.name}
            </Typography>
          )}
        </Stack>
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
