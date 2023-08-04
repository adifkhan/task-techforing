import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { signOut } from 'firebase/auth';
import auth from '../../Firebase/firebase.config';

const PostDetails = () => {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/post-details?postId=${postId}`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPostDetails(data.postInfo);
        } else {
          signOut(auth);
        }
      });
  }, [postId]);

  const handleDeletePost = (id) => {
    const confirmDelete = window.confirm('want ot delete this post?');
    if (confirmDelete) {
      fetch(`http://localhost:5000/post?id=${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            navigate('/');
            alert('Post Deleted!');
          } else {
            signOut(auth);
          }
        });
    }
  };
  return (
    <div style={{ padding: '0 10px' }}>
      <Box
        sx={{
          maxWidth: 800,
          mx: 'auto',
          mt: 5,
          p: 3,
          border: '2px solid gray',
          borderRadius: 5,
          position: 'relative',
        }}
      >
        <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
          <Tooltip title='Edit'>
            <IconButton aria-label='edit' sx={{ color: 'black' }}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete'>
            <IconButton
              aria-label='delete'
              sx={{ ml: 2, color: 'black' }}
              onClick={() => handleDeletePost(postId)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography variant='h6' sx={{ fontWeight: 600 }}>
          Job Title: {postDetails.title}
        </Typography>
        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
          Location: {postDetails.location}
        </Typography>
        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
          Vanancy: {postDetails.vacancy}
        </Typography>
        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
          Salary: {postDetails.salary} tk
        </Typography>
        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
          Descriotion:
        </Typography>
        <Typography variant='body1' sx={{ fontWeight: 500 }}>
          {postDetails.description}
        </Typography>
      </Box>
    </div>
  );
};

export default PostDetails;
