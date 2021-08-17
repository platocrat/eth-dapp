import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Card, Stack, Link, Container, Typography, Grid, SvgIcon } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { LoginForm } from '../components/authentication/login';
import AuthSocial from '../components/authentication/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });
  const { isSubmitting, handleSubmit } = formik;
  return (
    <RootStyle title="Login | Minimal-UI">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack>
            <Typography variant="h4" gutterBottom align="center">
              Sign in to Support Children
            </Typography>
            <Container maxWidth="96px" justifyContent="center">
              <img src="/favicon/metamask.png" alt="metamask login" />
            </Container>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Login with MetaMask
            </LoadingButton>
          </Stack>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
