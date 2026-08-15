'use client'

import { Container, Typography, Box } from '@mui/material'

export default function PerfilPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 10 }}>
      <Typography variant="h5" gutterBottom>
        Perfil
      </Typography>
      <Box>
        <Typography color="text.secondary">
          Login e gerenciamento de conta em breve.
        </Typography>
      </Box>
    </Container>
  )
}
