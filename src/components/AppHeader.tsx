import { AppBar, Toolbar, Typography, Stack } from '@mui/material'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'

export default function AppHeader() {
  return (
    <AppBar position="sticky" color="primary" elevation={2}>
      <Toolbar>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <SportsSoccerIcon />
          <Typography
            variant="h6"
            component="span"
            sx={{ fontWeight: 800, letterSpacing: 0.5 }}
          >
            BetIntel
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
