import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axiosInstance from '../hooks/axiosInstance'; // Import the Axios instance
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
  Rating,
  Switch,
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    title: '',
    image: null,
    price: '',
    rating: 0,
    shortDescription: '',
    longDescription: '',
  });
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState('success'); // success or error
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get('/getAllCourses');
      setCourses(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axiosInstance.delete(`/deleteCourse/${id}`, {
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

  const handlePinCourse = async (id) => {
    try {
      await axiosInstance.put(`/pin/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchCourses();
      showMessage('Course pinned successfully', 'success');
    } catch (error) {
      console.error('Error pinning course:', error);
      showMessage('Error pinning course', 'error');
    }
  };

  const handleUnpinCourse = async (id) => {
    try {
      await axiosInstance.put(`/unpin/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchCourses();
      showMessage('Course unpinned successfully', 'success');
    } catch (error) {
      console.error('Error unpinning course:', error);
      showMessage('Error unpinning course', 'error');
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
    setNewCourse({
      title: '',
      image: null,
      price: '',
      rating: 0,
      shortDescription: '',
      longDescription: '',
    });
    setImagePreview(null); // Reset image preview
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
        setNewCourse({ ...newCourse, image: file });
        setImagePreview(reader.result); // Set image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCourse = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newCourse.title);
      formData.append('price', newCourse.price);
      formData.append('rating', newCourse.rating);
      formData.append('shortDescription', newCourse.shortDescription);
      formData.append('longDescription', newCourse.longDescription);
      if (newCourse.image) {
        formData.append('image', newCourse.image);
      }

      await axiosInstance.post('/add/course', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    setNewCourse({
      title: course.title,
      price: course.price,
      rating: course.rating,
      shortDescription: course.shortDescription,
      longDescription: course.longDescription,
      image: course.image,
    });
    setImagePreview(`http://localhost:3001/uploads/${course.image}`); // Set image preview for update
  };

  const handleCloseUpdateDialog = () => {
    setSelectedCourse(null);
    setOpenUpdateDialog(false);
    setNewCourse({
      title: '',
      image: null,
      price: '',
      rating: 0,
      shortDescription: '',
      longDescription: '',
    });
    setImagePreview(null); // Reset image preview
  };

  const handleUpdateCourse = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newCourse.title);
      formData.append('price', newCourse.price);
      formData.append('rating', newCourse.rating);
      formData.append('shortDescription', newCourse.shortDescription);
      formData.append('longDescription', newCourse.longDescription);
      if (newCourse.image) formData.append('image', newCourse.image);

      await axiosInstance.put(`/updateCourse/${selectedCourse._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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

  const handleAddContentClick = (courseId) => {
    navigate(`/add-content/${courseId}`);
  };

  const handleManageContentClick = (courseId) => {
    navigate(`/manage-content/${courseId}`);
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
      <TableCell>Image</TableCell> {/* New Image Column */}
      <TableCell>Title</TableCell>
      <TableCell>Price</TableCell>
      <TableCell>Rating</TableCell>
      <TableCell>Short Description</TableCell>
      <TableCell>Long Description</TableCell>
      <TableCell>Pinned</TableCell>
      <TableCell>Actions</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {courses.map((course) => (
      <TableRow key={course._id}>
        <TableCell>
          <img src={`http://localhost:3001/courseImages/${course.image}`}  style={{ width: 50, height: 50 }} alt="Course" />
        </TableCell>
        <TableCell>{course.title}</TableCell>
        <TableCell>{course.price}</TableCell>
        <TableCell>
          <Rating value={course.rating} readOnly />
        </TableCell>
        <TableCell>{course.shortDescription}</TableCell>
        <TableCell>{course.longDescription}</TableCell>
        <TableCell>
          <Switch
            checked={course.pinned}
            onChange={() => (course.pinned ? handleUnpinCourse(course._id) : handlePinCourse(course._id))}
            color="primary"
          />
        </TableCell>
        <TableCell>
          <IconButton onClick={() => handleOpenUpdateDialog(course)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleOpenConfirmDialog(course)}>
            <Delete />
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleManageContentClick(course._id)}
            sx={{ marginLeft: 1 }}
          >
            Manage Content
          </Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
      </TableContainer>

      {/* Add Course Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Course</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={newCourse.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            value={newCourse.price}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Rating
            name="rating"
            value={newCourse.rating}
            onChange={(e, newValue) => setNewCourse({ ...newCourse, rating: newValue })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Short Description"
            name="shortDescription"
            value={newCourse.shortDescription}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Long Description"
            name="longDescription"
            value={newCourse.longDescription}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="raised-button-file"
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload Image
            </Button>
          </label>
          {imagePreview && (
            <img src={imagePreview} alt="Preview" style={{ marginTop: 10, maxWidth: '100%' }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddCourse} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Course Dialog */}
      <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Update Course</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={newCourse.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            value={newCourse.price}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Rating
            name="rating"
            value={newCourse.rating}
            onChange={(e, newValue) => setNewCourse({ ...newCourse, rating: newValue })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Short Description"
            name="shortDescription"
            value={newCourse.shortDescription}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Long Description"
            name="longDescription"
            value={newCourse.longDescription}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="raised-button-file-update"
          />
          <label htmlFor="raised-button-file-update">
            <Button variant="contained" color="primary" component="span">
              Upload Image
            </Button>
          </label>
          {imagePreview && (
            <img src={imagePreview} alt="Preview" style={{ marginTop: 10, maxWidth: '100%' }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateCourse} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this course?</Typography>
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
    </Box>
  );
}

export default CourseManagement;

