import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../images/logo.png';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/firebase.config';
import { Divider } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar
      position='static'
      sx={{
        backgroundColor: '#182f59',
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
            <img src={logo} alt='' width='40px' height='40px' />
            <Box sx={{ mx: 2 }}>
              <Typography
                variant='h6'
                noWrap
                component='a'
                href='/'
                sx={{
                  display: 'block',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                TechForing
              </Typography>
              <Typography
                variant='caption'
                noWrap
                component='a'
                href='/'
                sx={{
                  fontFamily: 'Poppins, sans-serif;',
                  fontWeight: 400,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Shaping Tomorrows Cybersecurity
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open Menu'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt='Remy Sharp'
                  src='https://i.ibb.co/0cxPv7z/Maynul-Islam-Adif.jpg'
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Box>
                    <Typography textAlign='start' sx={{ lineHeight: '10px' }}>
                      {user.displayName}
                    </Typography>
                    <Typography
                      textAlign='start'
                      variant='caption'
                      sx={{ lineHeight: '10px' }}
                    >
                      {user.email}
                    </Typography>
                  </Box>
                </MenuItem>
              )}
              <Divider />
              <MenuItem onClick={handleCloseUserMenu}>
                {user ? (
                  <Typography
                    textAlign='start'
                    sx={{ lineHeight: '10px' }}
                    onClick={() => signOut(auth)}
                  >
                    Sign Out
                  </Typography>
                ) : (
                  <Typography
                    textAlign='start'
                    sx={{ lineHeight: '10px' }}
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </Typography>
                )}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
