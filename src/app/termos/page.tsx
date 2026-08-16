import { Container, Typography, Box } from '@mui/material'

export const metadata = {
  title: 'Termos de Uso — BetIntel',
}

export default function TermosPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 10 }}>
      <Typography variant="h5" gutterBottom>
        Termos de Uso
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Última atualização: agosto de 2026
      </Typography>

      <Box sx={{ '& > *': { mb: 2 } }}>
        <Typography>
          O BetIntel é um serviço informativo de comparação de odds (cotações)
          de apostas esportivas oferecidas por casas de apostas licenciadas no
          Brasil. Nosso objetivo é ajudar o usuário a encontrar a melhor odd
          disponível para um evento esportivo entre os operadores parceiros.
        </Typography>

        <Typography variant="h6">Não somos uma casa de apostas</Typography>
        <Typography>
          O BetIntel não organiza, processa ou intermedia apostas, e não
          movimenta valores em nome do usuário. Ao clicar em &quot;Apostar
          agora&quot;, você é redirecionado para o site do operador parceiro,
          onde a aposta é feita diretamente com ele, sujeita aos termos e
          condições daquele operador.
        </Typography>

        <Typography variant="h6">Links de afiliado</Typography>
        <Typography>
          Alguns links exibidos no BetIntel são links de afiliado: podemos
          receber uma comissão do operador parceiro quando você se cadastra
          ou aposta através deles. Isso não altera as odds, condições ou
          valores oferecidos a você.
        </Typography>

        <Typography variant="h6">Restrição de idade</Typography>
        <Typography>
          O uso do BetIntel e das plataformas de apostas parceiras é
          destinado exclusivamente a maiores de 18 anos.
        </Typography>

        <Typography variant="h6">Exatidão das informações</Typography>
        <Typography>
          As odds exibidas no BetIntel têm caráter informativo e podem sofrer
          pequenos atrasos em relação ao valor praticado no site do operador
          no momento da aposta. Sempre confirme a odd final na plataforma do
          operador antes de apostar.
        </Typography>

        <Typography variant="h6">Alterações</Typography>
        <Typography>
          Estes termos podem ser atualizados conforme o serviço evolui. A
          versão vigente é sempre a publicada nesta página.
        </Typography>

        <Typography variant="h6">Contato</Typography>
        <Typography>contato@betintel.app</Typography>
      </Box>
    </Container>
  )
}
