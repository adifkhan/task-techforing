import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { signOut } from 'firebase/auth';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import auth from '../../../Firebase/firebase.config';
import useCategories from '../../../Hooks/useCategories';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  minWidth: 320,
  maxHeight: 'calc(100vh - 8em)',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  overflowY: 'scroll',
};

export default function CreateJobModal(props) {
  const { open, handleClose } = props;
  const [categories] = useCategories();

  const [jobInfo, setJobInfo] = useState({
    title: '',
    category: '',
    location: '',
    vacancy: '',
    salary: '',
    description: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('https://task-techforing-server.vercel.app/jobpost', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(jobInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          handleClose();
          alert('Your Job Post Created Successfully');
        } else {
          signOut(auth);
        }
      });
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box component='form' onSubmit={handleSubmit} sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type='text'
                id='title'
                label='Job Title'
                name='title'
                onChange={(e) =>
                  setJobInfo({ ...jobInfo, title: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Category</InputLabel>
                <Select
                  labelId='select-label'
                  label='Category'
                  onChange={(e) =>
                    setJobInfo({ ...jobInfo, category: e.target.value })
                  }
                >
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type='text'
                id='location'
                label='Job Location'
                name='location'
                onChange={(e) =>
                  setJobInfo({ ...jobInfo, location: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type='number'
                id='vacancy'
                label='Vacancy'
                name='vacancy'
                onChange={(e) =>
                  setJobInfo({ ...jobInfo, vacancy: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type='number'
                id='salary'
                label='Salary'
                name='salary'
                onChange={(e) =>
                  setJobInfo({ ...jobInfo, salary: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                type='text'
                id='description'
                label='Job Description'
                name='description'
                onChange={(e) =>
                  setJobInfo({ ...jobInfo, description: e.target.value })
                }
              />
            </Grid>
          </Grid>
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
            Add Post
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
