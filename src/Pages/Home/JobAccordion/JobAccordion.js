import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Paper, Stack } from '@mui/material';
import useCategories from '../../../Hooks/useCategories';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function JobAccordion() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [categories] = useCategories();
  const [jobPosts, setJobPosts] = useState([]);
  const getJobPosts = (category) => {
    fetch(`http://localhost:5000/jobpost?category=${category}`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setJobPosts(data));
  };

  const navigatePostDetails = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <Box
      sx={{
        my: 5,
      }}
    >
      <Stack spacing={1}>
        {categories?.map((category) => (
          <Accordion
            expanded={expanded === `panel${category._id}`}
            key={category._id}
            sx={{
              border: '1px solid rgba(0,0,0,.3)',
              borderRadius: 1,
              backgroundColor: 'rgba(0,0,0,.05)',
            }}
            onChange={handleChange(`panel${category._id}`)}
          >
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls='panel1bh-content'
              id='panel1bh-header'
              onClick={() => getJobPosts(category.name)}
            >
              <Typography>{category.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1}>
                {jobPosts.map((post) => (
                  <Paper
                    key={post._id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      px: 2,
                      cursor: 'pointer',
                    }}
                    onClick={() => navigatePostDetails(post._id)}
                  >
                    <Typography sx={{ p: 1 }}>{post.title}</Typography>
                    <Box>
                      <IconButton aria-label='edit' sx={{ color: 'black' }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label='delete'
                        sx={{ ml: 2, color: 'black' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Box>
  );
}
