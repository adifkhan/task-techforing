import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

const PostDetails = () => {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/post-details?postId=${postId}`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPostDetails(data));
  }, [postId]);
  console.log(postDetails);
  return (
    <div>
      <Box
        sx={{
          width: 800,
          mx: 'auto',
          mt: 5,
          p: 3,
          border: '2px solid gray',
          borderRadius: 5,
        }}
      >
        <Typography variant='h6' sx={{ fontWeight: 600 }}>
          Job Title: {postDetails.title}
        </Typography>
        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
          Location: {postDetails.location}
        </Typography>
        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
          Salary: {postDetails.salary} tk
        </Typography>
        <Typography variant='body1' sx={{ fontWeight: 500 }}>
          {postDetails.description}
        </Typography>
      </Box>
    </div>
  );
};

export default PostDetails;
