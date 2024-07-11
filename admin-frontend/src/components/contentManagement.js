import React, { useState, useEffect } from 'react';
import axiosInstance from '../hooks/axiosInstance';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Grid,
  Box,
  Snackbar,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  boxShadow: theme.shadows[3],
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
}));

const StyledLink = styled('a')(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

function CoursesWithContent() {
  const [coursesWithContent, setCoursesWithContent] = useState([]);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentContent, setCurrentContent] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteContentId, setDeleteContentId] = useState(null);

  useEffect(() => {
    fetchCoursesWithContent();
  }, []);

  const fetchCoursesWithContent = async () => {
    try {
      const response = await axiosInstance.get('/courseContent/courses-with-content');
      setCoursesWithContent(response.data);
    } catch (error) {
      console.error('Error fetching courses with content:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const showMessage = (msg, severity) => {
    setMessage(msg);
    setSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleEditContent = (content) => {
    setCurrentContent(content);
    setOpenEditDialog(true);
  };

  const handleDeleteContent = (contentId) => {
    setDeleteContentId(contentId);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteContent = async () => {
    try {
      await axiosInstance.delete(`/courseContent/deleteContent/${deleteContentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchCoursesWithContent();
      showMessage('Content deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting content:', error);
      showMessage('Error deleting content', 'error');
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteContentId(null);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setCurrentContent(null);
  };

  const handleSaveContent = async () => {
    try {
      const { _id, title, description, youtubeLink, file } = currentContent;
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('youtubeLink', youtubeLink);
      if (file instanceof File) {
        formData.append('file', file);
      }

      await axiosInstance.put(`/courseContent/updateContent/${_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      fetchCoursesWithContent();
      handleCloseEditDialog();
      showMessage('Content updated successfully', 'success');
    } catch (error) {
      console.error('Error updating content:', error);
      showMessage('Error updating content', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setCurrentContent({ ...currentContent, file: files[0] });
    } else {
      setCurrentContent({ ...currentContent, [name]: value });
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={message}
        severity={severity}
      />
      <Typography variant="h4" gutterBottom>
        Courses and Content
      </Typography>
      <Grid container spacing={2}>
        {coursesWithContent.map(({ course, contents }) => (
          <Grid item xs={12} key={course._id}>
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
              <Typography variant="h5" gutterBottom>
                {course.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                {course.description}
              </Typography>
              <Grid container spacing={2}>
                {contents.map((content) => (
                  <Grid item xs={12} sm={6} md={4} key={content._id}>
                    <StyledCard>
                      <StyledCardContent>
                        <Typography variant="h6" gutterBottom>
                          {content.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" paragraph>
                          {content.description}
                        </Typography>
                        <StyledLink href={content.youtubeLink} target="_blank" rel="noopener noreferrer">
                          YouTube Link
                        </StyledLink>
                        {content.file && (
                          <StyledLink href={content.file} target="_blank" rel="noopener noreferrer">
                            Download File
                          </StyledLink>
                        )}
                      </StyledCardContent>
                      <StyledCardActions>
                        <IconButton color="primary" onClick={() => handleEditContent(content)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDeleteContent(content._id)}>
                          <Delete />
                        </IconButton>
                      </StyledCardActions>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this content?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteContent} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Content Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Content</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the fields below to update the content.
          </DialogContentText>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            value={currentContent?.title || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={currentContent?.description || ''}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
          <TextField
            margin="dense"
            label="YouTube Link"
            name="youtubeLink"
            value={currentContent?.youtubeLink || ''}
            onChange={handleChange}
            fullWidth
          />
          <input
            type="file"
            accept=".pdf,.zip"
            name="file"
            onChange={handleChange}
            style={{ marginTop: '16px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveContent} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CoursesWithContent;
