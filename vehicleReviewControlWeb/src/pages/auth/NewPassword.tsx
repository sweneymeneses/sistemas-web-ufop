// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Container, Typography, Card, useTheme, alpha } from '@mui/material';
// layouts

// components
import Page from '../../components/Page';
// sections
import { NewPasswordForm } from '../../sections/auth/new-password';
// assets

import Logo from 'src/components/Logo';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function NewPassword() {
  const theme = useTheme();
  return (
    <Page title="Nova senha">

      <Container>
        <ContentStyle>
        <Card sx={{ boxShadow:  `0 0 1em ${alpha(theme.palette.grey[900], 0.2)}`, 
        padding: theme.spacing(3),
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center', 
        alignItems: 'center'}}>
          <Logo />

          <Typography variant="h3" gutterBottom>
            Pedido enviado com sucesso!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Nós enviamos um e-mail com um código de 6 dígitos para seu e-mail.
            <br />
            Por favor coloque o código abaixo para verificar seu e-mail.
            
          </Typography>

          <Box sx={{ mt: 5, mb: 3 }}>
            <NewPasswordForm />
          </Box>

          <Typography variant="body2">
            Não recebeu o código? &nbsp;
            <Link variant="subtitle2" onClick={() => {}}>
              Reenviar código
            </Link>
          </Typography>
          </Card>
        </ContentStyle>
      </Container>
    </Page>
  );
}
