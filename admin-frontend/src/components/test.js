import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../hooks/axiosInstance';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Snackbar,
  Button,
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';

function ManageCourseContent() {
  const { courseId } = useParams(); // Get the courseId from the URL
  const [courseName, setCourseName] = useState('');
  const [contents, setContents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editContent, setEditContent] = useState(null);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState('success'); // success or error
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [contentToDelete, setContentToDelete] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newContent, setNewContent] = useState({
    title: '',
    description: '',
    youtubeLink: '',
    file: null,
  });

  useEffect(() => {
    fetchCourseDetails();
    fetchContents();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      const response = await axiosInstance.get(`/getCourse/${courseId}`);
      setCourseName(response.data.title);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const fetchContents = async () => {
    try {
      const response = await axiosInstance.get(`/courseContent/courseContent/${courseId}`);
      setContents(response.data);
    } catch (error) {
      console.error('Error fetching contents:', error);
    }
  };

  const handleDeleteContent = async (id) => {
    try {
      await axiosInstance.delete(`/courseContent/deleteContent/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchContents();
      showMessage('Content deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting content:', error);
      showMessage('Error deleting content', 'error');
    }
  };

  const handleEditContent = (content) => {
    setEditContent(content);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditContent(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditContent({ ...editContent, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditContent({ ...editContent, file });
  };

  const handleUpdateContent = async () => {
    const formData = new FormData();
    formData.append('title', editContent.title);
    formData.append('description', editContent.description);
    formData.append('youtubeLink', editContent.youtubeLink);
    if (editContent.file) {
      formData.append('file', editContent.file);
    }

    try {
      await axiosInstance.put(`/courseContent/updateContent/${editContent._id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchContents();
      handleCloseDialog();
      showMessage('Content updated successfully', 'success');
    } catch (error) {
      console.error('Error updating content:', error);
      showMessage('Error updating content', 'error');
    }
  };

  const handleOpenConfirmDialog = (content) => {
    setContentToDelete(content);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setContentToDelete(null);
    setOpenConfirmDialog(false);
  };

  const handleConfirmDelete = () => {
    if (contentToDelete) {
      handleDeleteContent(contentToDelete._id);
    }
    handleCloseConfirmDialog();
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewContent({
      title: '',
      description: '',
      youtubeLink: '',
      file: null,
    });
  };

  const handleAddContentChange = (e) => {
    const { name, value } = e.target;
    setNewContent({ ...newContent, [name]: value });
  };

  const handleAddFileChange = (e) => {
    const file = e.target.files[0];
    setNewContent({ ...newContent, file });
  };

  const handleSubmitAddContent = async () => {
    const formData = new FormData();
    formData.append('title', newContent.title);
    formData.append('description', newContent.description);
    formData.append('youtubeLink', newContent.youtubeLink);
    formData.append('courseId', courseId);
    if (newContent.file) {
      formData.append('file', newContent.file);
    }

    try {
      await axiosInstance.post(`courseContent/add`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchContents();
      handleCloseAddDialog();
      showMessage('Content added successfully', 'success');
    } catch (error) {
      console.error('Error adding content:', error);
      showMessage('Error adding content', 'error');
    }
  };

  const showMessage = (msg, severity) => {
    setMessage(msg);
    setSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">{courseName} - Manage Course Content</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleOpenAddDialog}
        >
          Add Content
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>YouTube Link</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contents.map((content) => (
              <TableRow key={content._id}>
                <TableCell>{content.title}</TableCell>
                <TableCell>{content.description}</TableCell>
                <TableCell>
                  <a href={content.youtubeLink} target="_blank" rel="noopener noreferrer">
                    {content.youtubeLink}
                  </a>
                </TableCell>
                <TableCell>
                  {content.file && (
                    <a href={content.file} target="_blank" rel="noopener noreferrer">
                      {content.file.split('/').pop()}
                    </a>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditContent(content)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleOpenConfirmDialog(content)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Content Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Content</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={editContent?.title || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={editContent?.description || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="YouTube Link"
            name="youtubeLink"
            value={editContent?.youtubeLink || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <input
            type="file"
            accept=".pdf,.zip"
            name="file"
            onChange={handleFileChange}
            style={{ marginTop: '16px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateContent} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this content?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Content Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add Content</DialogTitle>
        <DialogContent>
          <TextField
            label="Course ID"
            name="courseId"
            value={courseId}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Title"
            name="title"
            value={newContent.title}
            onChange={handleAddContentChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={newContent.description}
            onChange={handleAddContentChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="YouTube Link"
            name="youtubeLink"
            value={newContent.youtubeLink}
            onChange={handleAddContentChange}
            fullWidth
            margin="normal"
          />
          <input
            type="file"
            accept=".pdf,.zip"
            name="file"
            onChange={handleAddFileChange}
            style={{ marginTop: '16px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitAddContent} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ManageCourseContent;
