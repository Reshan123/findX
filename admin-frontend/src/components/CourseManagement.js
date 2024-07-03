import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Snackbar,
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', image: null });
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState('success'); // success or error

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/getAllCourses', {});
      setCourses(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/deleteCourse/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchCourses();
      showMessage('Course deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting course:', error);
      showMessage('Error deleting course', 'error');
    }
  };

  const handleOpenConfirmDialog = (course) => {
    setCourseToDelete(course);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setCourseToDelete(null);
    setOpenConfirmDialog(false);
  };

  const handleConfirmDelete = () => {
    if (courseToDelete) {
      handleDeleteCourse(courseToDelete._id);
    }
    handleCloseConfirmDialog();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewCourse({ title: '', description: '', image: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCourse({ ...newCourse, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCourse = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newCourse.title);
      formData.append('description', newCourse.description);
      formData.append('image', newCourse.image);

      await axios.post('http://localhost:3001/api/add/course', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      fetchCourses();
      handleCloseDialog();
      showMessage('Course added successfully', 'success');
    } catch (error) {
      console.error('Error adding course:', error);
      showMessage('Error adding course', 'error');
    }
  };

  const handleOpenUpdateDialog = (course) => {
    setSelectedCourse(course);
    setOpenUpdateDialog(true);
    setNewCourse({ title: course.title, description: course.description, image: course.image });
  };

  const handleCloseUpdateDialog = () => {
    setSelectedCourse(null);
    setOpenUpdateDialog(false);
    setNewCourse({ title: '', description: '', image: null });
  };

  const handleUpdateCourse = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newCourse.title);
      formData.append('description', newCourse.description);
      formData.append('image', newCourse.image);

      await axios.put(`http://localhost:3001/api/updateCourse/${selectedCourse._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      fetchCourses();
      handleCloseUpdateDialog();
      showMessage('Course updated successfully', 'success');
    } catch (error) {
      console.error('Error updating course:', error);
      showMessage('Error updating course', 'error');
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
        <Typography variant="h4">Course Management</Typography>
        <IconButton onClick={handleOpenDialog} color="primary">
          <Add />
        </IconButton>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>
                  <img
                    src={`http://localhost:3001/uploads/${course.image}`}
                    alt={course.title}
                    style={{ width: 100, height: 'auto' }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenConfirmDialog(course)} color="secondary">
                    <Delete />
                  </IconButton>
                  <IconButton onClick={() => handleOpenUpdateDialog(course)} color="primary">
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Course</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            value={newCourse.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            value={newCourse.description}
            onChange={handleInputChange}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {newCourse.image && (
            <img src={newCourse.image} style={{ maxWidth: '100%', maxHeight: 200, marginTop: 10 }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddCourse} color="primary">
            Add Course
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Update Course</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            value={newCourse.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            value={newCourse.description}
            onChange={handleInputChange}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {newCourse.image && (
            <img src={newCourse.image} alt="Preview" style={{ maxWidth: '100%', maxHeight: 200, marginTop: 10 }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateCourse} color="primary">
            Update Course
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete the course "{courseToDelete?.title}"?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CourseManagement;
