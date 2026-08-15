import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from '@mui/material'
import Link from 'next/link'

type Props = {
  id: number,
  homeTeam: string,
  awayTeam: string,
  time: string,
  odd: number,
}

export default function GameCard({
  id,
  homeTeam,
  awayTeam,
  time,
  odd,
}: Props) {
  return (
    <Card sx={{ mb: 2, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6">
          {homeTeam} x {awayTeam}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Horário: {time}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Melhor odd: {odd}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            component={Link}
            href={`/jogos/${id}`}
          >
            Ver análise
          </Button>
          <Button variant="outlined">
            Apostar agora
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
