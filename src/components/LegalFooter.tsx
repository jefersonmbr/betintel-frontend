'use client'

import { Box, Typography, Link as MuiLink } from '@mui/material'
import Link from 'next/link'

export default function LegalFooter() {
  return (
    <Box component="footer" sx={{ px: 3, py: 3, mb: 8, textAlign: 'center' }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
        BetIntel é um comparador de odds — não somos uma casa de apostas.
        Não processamos apostas nem pagamentos: ao clicar em &quot;Apostar
        agora&quot; você é redirecionado para o site de um operador licenciado.
      </Typography>
      <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 700 }}>
        Apostas esportivas são proibidas para menores de 18 anos.
        Jogue com responsabilidade.
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
        <MuiLink component={Link} href="/termos">Termos de Uso</MuiLink>
        {' · '}
        <MuiLink component={Link} href="/privacidade">Política de Privacidade</MuiLink>
      </Typography>
    </Box>
  )
}
