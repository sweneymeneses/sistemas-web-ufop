import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Container, Typography, useTheme, alpha, Card, Box } from '@mui/material';
// layouts

// // routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
// sections
import { ResetPasswordForm } from '../../sections/auth/reset-password';
import Logo from 'src/components/Logo';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const theme = useTheme();
  return (
    <Page title="Redefinir senha">
      <Container>
        <ContentStyle>
          <Card
            sx={{
              boxShadow: `0 0 1em ${alpha(theme.palette.grey[900], 0.2)}`,
              padding: theme.spacing(3),
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              textAlign: 'center',
              alignItems: 'center',
            }}
          >
            <Logo height="100px" width="100px" />
            <Typography variant="h3" paragraph mt={3}>
              Esqueceu sua senha?
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
              Por favor entre com o e-mail associado a sua conta e nós vamos enviar um e-mail para
              redefinir sua senha.
            </Typography>

            <ResetPasswordForm />
            <Button
              fullWidth
              size="large"
              component={RouterLink}
              to={PATH_AUTH.login}
              sx={{ mt: 1 }}
            >
              Voltar
            </Button>
          </Card>
        </ContentStyle>
      </Container>
    </Page>
  );
}
