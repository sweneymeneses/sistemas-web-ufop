// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Alert, Container, Typography, useTheme, alpha } from '@mui/material';

// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';

// sections
import { LoginForm } from '../../sections/auth/login';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  borderRadius: 0,
  maxWidth: 680,
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  const theme = useTheme();

  return (
    <Page title="Login">
      <RootStyle>
        {mdUp && (
          <SectionStyle>
            <Box
              sx={{
                height: '100%',
                width: '100%',
                background: alpha('#000', 0.4),
                display: 'flex',
                gap: theme.spacing(10),
                flexDirection: 'column',
                padding: theme.spacing(12),
                alignItems: 'center',
              }}
            >
              <Logo height="150px" width="150px" />
              <Typography
                variant="h3"
                sx={{ px: 5, mb: 5, color: theme.palette.common.white, textAlign: 'center' }}
              >
                Bem-vindo ao sistema de controle de revisão do veículo!
              </Typography>
            </Box>
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Card
              sx={{
                boxShadow: `0 0 1em ${alpha(theme.palette.grey[900], 0.2)}`,
                padding: theme.spacing(3),
              }}
            >
              <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    Faça login
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>Preencha com seus dados.</Typography>
                </Box>
              </Stack>

              <LoginForm />
            </Card>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
