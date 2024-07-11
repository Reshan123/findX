import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../hooks/axiosInstance';
import {
  Typography,
  TextField,
  Button,
  Snackbar,
  Box,
  Grid,
  Alert,
} from '@mui/material';

function AddContent() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null); // State to store course details
  const [contentTitle, setContentTitle] = useState('');
  const [contentDescription, setContentDescription] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [file, setFile] = useState(null); // State to handle file upload
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState('success'); // success or error

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = async () => {
    try {
      const response = await axiosInstance.get(`/getCourse/${courseId}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const handleAddContent = async () => {
    try {
      const formData = new FormData();
      formData.append('courseId', courseId);
      formData.append('title', contentTitle);
      formData.append('description', contentDescription);
      formData.append('youtubeLink', youtubeLink);
      if (file) formData.append('file', file);

      console.log('FormData values:');
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      await axiosInstance.post('courseContent/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      resetForm();
      showMessage('Content added successfully', 'success');
    } catch (error) {
      console.error('Error adding content:', error);
      showMessage('Error adding content', 'error');
    }
  };

  const resetForm = () => {
    setContentTitle('');
    setContentDescription('');
    setYoutubeLink('');
    setFile(null);
  };

  const showMessage = (msg, severity) => {
    setMessage(msg);
    setSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (!course) {
    return null; // Render loading indicator or handle case where course details are not yet fetched
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Typography variant="h4" gutterBottom>
        Add Content for Course {course.title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Course ID"
            variant="outlined"
            fullWidth
            value={courseId}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Content Title"
            variant="outlined"
            fullWidth
            value={contentTitle}
            onChange={(e) => setContentTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Content Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={contentDescription}
            onChange={(e) => setContentDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="YouTube Link"
            variant="outlined"
            fullWidth
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <input
            type="file"
            accept=".pdf,.zip"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddContent}
          >
            Add Content
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddContent;
