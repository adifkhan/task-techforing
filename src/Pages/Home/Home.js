import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import JobAccordion from './JobAccordion/JobAccordion';
import bgImage from '../../images/breadcrumb-bg.jpg';
import CreateJobModal from './CreateJobModal/CreateJobModal';

const Home = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Box
        sx={{
          height: '100px',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
        }}
      ></Box>
      <Box
        sx={{
          mt: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{ width: '50px', height: '5px', backgroundColor: '#16FF00' }}
        ></Box>
        <Typography
          variant='h5'
          sx={{
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          BROWSE OPEN POSITIONS BY CATEGORY
        </Typography>
        <Typography
          variant='subtitle2'
          sx={{
            fontWeight: '400',
          }}
        >
          We are always on the lookout for talented people
        </Typography>

        <Button
          type='submit'
          variant='contained'
          sx={{
            backgroundColor: '#182f59',
            mt: 3,
            mb: 2,
            '&:hover': {
              backgroundColor: '#182f59',
            },
          }}
          onClick={handleOpen}
        >
          + Add Job Post
        </Button>
      </Box>
      <Box
        sx={{
          width: {
            xs: 350,
            sm: 550,
            md: 700,
            lg: 800,
          },
          mx: 'auto',
        }}
      >
        <JobAccordion />
      </Box>
      <CreateJobModal open={open} handleClose={handleClose} />
    </Box>
  );
};

export default Home;
