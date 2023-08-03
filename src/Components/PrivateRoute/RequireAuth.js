import React from 'react';
import {
  useAuthState,
  useSendEmailVerification,
} from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../Firebase/firebase.config';
import { Box, Button, Typography } from '@mui/material';

const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [sendEmailVerification, sending] = useSendEmailVerification(auth);
  const location = useLocation();
  const sendVerification = async () => {
    await sendEmailVerification();
    alert(`Check ${user.email} for varification code`);
  };
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '70vh',
        }}
      >
        <Typography variant='h6'>Loading...</Typography>
      </Box>
    );
  }

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
  }
  if (!user.emailVerified) {
    return (
      <Box className='container'>
        <Button
          variant='contained'
          sx={{ backgroundColor: '#182f59', mt: 3, mb: 2 }}
          onClick={sendVerification}
        >
          {sending ? 'Sending...' : 'Re-send verification email'}
        </Button>
      </Box>
    );
  }
  return children;
};

export default RequireAuth;
