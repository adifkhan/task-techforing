import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';
import auth from '../../Firebase/firebase.config';
import useToken from '../../Hooks/useToken';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

const Register = () => {
  const [termsStatus, setTermsStatus] = useState(false);
  const [confirmpassword, setConfirmPassword] = useState('');
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [token] = useToken(user);

  useEffect(() => {
    if (token) {
      signOut(auth);
      localStorage.removeItem('accessToken');
      navigate('/login');
    }
  }, [token, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createUserWithEmailAndPassword(userInfo.email, userInfo.password);
    await updateProfile({ displayName: userInfo.name });
  };
  let errorMessage = '';
  if (error || updateError) {
    errorMessage = (
      <Typography variant='caption' sx={{ color: 'red' }}>
        {error?.message || updateError.message}
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
            Register
          </Typography>
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete='given-name'
                  name='name'
                  required
                  fullWidth
                  id='name'
                  label='Name'
                  autoFocus
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type='email'
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  id='confirmpassword'
                  autoComplete='new-password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value='allowExtraEmails'
                      name='terms'
                      color='primary'
                      onChange={() => setTermsStatus(!termsStatus)}
                    />
                  }
                  label='Agree to terms and conditions'
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
              disabled={
                termsStatus === false ||
                userInfo.password !== confirmpassword ||
                confirmpassword === ''
              }
            >
              {loading || updating ? 'Registering...' : 'Register'}
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
