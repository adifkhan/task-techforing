import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/firebase.config';
import useToken from '../../Hooks/useToken';

const defaultTheme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  let from = location.state?.from?.pathname || '/';

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [token] = useToken(user);

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    await signInWithEmailAndPassword(userInfo.email, userInfo.password);
  };
  let errorMessage = '';
  if (error) {
    errorMessage = (
      <Typography variant='caption' sx={{ color: 'red' }}>
        {error?.message}
      </Typography>
    );
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, password: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            {errorMessage}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{
                backgroundColor: '#182f59',
                mt: 3,
                mb: 2,
                '&:hover': {
                  backgroundColor: '#182f59',
                },
              }}
            >
              {loading ? 'Loging In...' : 'Login'}
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/register' variant='body2'>
                  New to TechForing? Register
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
