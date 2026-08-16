import { Container, Typography, Box } from '@mui/material'

export const metadata = {
  title: 'Política de Privacidade — BetIntel',
}

export default function PrivacidadePage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 10 }}>
      <Typography variant="h5" gutterBottom>
        Política de Privacidade
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Última atualização: agosto de 2026
      </Typography>

      <Box sx={{ '& > *': { mb: 2 } }}>
        <Typography>
          Esta política explica quais dados o BetIntel coleta e como eles são
          usados, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
        </Typography>

        <Typography variant="h6">Dados que coletamos hoje</Typography>
        <Typography>
          Atualmente, os alertas de odd que você cria ficam salvos apenas
          localmente no seu navegador (localStorage) — não enviamos esses
          dados para nossos servidores. Não utilizamos cookies de rastreamento
          nem ferramentas de analytics de terceiros no momento.
        </Typography>
        <Typography>
          Quando registramos um clique em &quot;Apostar agora&quot; (para fins
          de parceria de afiliados com os operadores), guardamos apenas o
          evento do clique — qual casa e qual jogo — sem associá-lo a dados
          pessoais, já que o BetIntel ainda não possui sistema de login.
        </Typography>

        <Typography variant="h6">Sites de terceiros</Typography>
        <Typography>
          Ao clicar em links para operadores parceiros, você sai do BetIntel e
          passa a estar sujeito à política de privacidade daquele site, que
          pode coletar dados próprios (como IP, cadastro, dados de pagamento).
          Não temos controle sobre esse tratamento.
        </Typography>

        <Typography variant="h6">Seus direitos</Typography>
        <Typography>
          Você pode limpar os dados salvos no seu navegador a qualquer momento
          (removendo o alerta pela própria tela de Alertas, ou limpando os
          dados do site nas configurações do navegador). Se o BetIntel passar
          a coletar dados em servidor no futuro (ex: com login de usuário),
          esta política será atualizada e você poderá solicitar acesso,
          correção ou exclusão dos seus dados a qualquer momento.
        </Typography>

        <Typography variant="h6">Alterações</Typography>
        <Typography>
          Esta política pode ser atualizada conforme o serviço evolui. A
          versão vigente é sempre a publicada nesta página.
        </Typography>

        <Typography variant="h6">Contato</Typography>
        <Typography>contato@betintel.app</Typography>
      </Box>
    </Container>
  )
}
