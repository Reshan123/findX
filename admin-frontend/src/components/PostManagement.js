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
  Alert,
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';

function PostManagement() {
  const [posts, setPosts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', description: '', image: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState('success'); // success or error

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/post/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/post/delete/posts/${selectedPost._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchPosts();
      setOpenDeleteDialog(false);
      showMessage('Post deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting post:', error);
      showMessage('Error deleting post', 'error');
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewPost({ title: '', description: '', image: null });
    setImagePreview(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewPost({ ...newPost, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageCancel = () => {
    setImagePreview(null);
    setNewPost({ ...newPost, image: null });
  };

  const handleAddPost = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('title', newPost.title);
    formData.append('description', newPost.description);
    if (newPost.image) {
      formData.append('image', newPost.image);
    }
  
    try {
      const response = await axios.post('http://localhost:3001/api/post/create/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      console.log('post Data', response.data);
  
      fetchPosts();
      handleCloseDialog();
      showMessage('Post added successfully', 'success');
    } catch (error) {
      console.error('Error adding post:', error);
      showMessage('Error adding post', 'error');
    }
  };

  const handleOpenUpdateDialog = (post) => {
    setSelectedPost(post);
    setOpenUpdateDialog(true);
    setNewPost({ title: post.title, description: post.description, image: post.image });
    setImagePreview(post.image);
  };

  const handleCloseUpdateDialog = () => {
    setSelectedPost(null);
    setOpenUpdateDialog(false);
    setNewPost({ title: '', description: '', image: null });
    setImagePreview(null);
  };

  const handleUpdatePost = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newPost.title);
      formData.append('description', newPost.description);
      if (newPost.image) {
        formData.append('image', newPost.image);
      }

      await axios.put(`http://localhost:3001/api/post/update/posts/${selectedPost._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      fetchPosts();
      handleCloseUpdateDialog();
      showMessage('Post updated successfully', 'success');
    } catch (error) {
      console.error('Error updating post:', error);
      showMessage('Error updating post', 'error');
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

  const handleOpenDeleteDialog = (post) => {
    setSelectedPost(post);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedPost(null);
    setOpenDeleteDialog(false);
  };

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Post Management</Typography>
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
            {posts.map((post) => (
              <TableRow key={post._id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.description}</TableCell>
                <TableCell>
                  <img
                    src={`http://localhost:3001/uploads/${post.image}`}
                    alt={post.title}
                    style={{ width: 100, height: 'auto' }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDeleteDialog(post)} color="secondary">
                    <Delete />
                  </IconButton>
                  <IconButton onClick={() => handleOpenUpdateDialog(post)} color="primary">
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            value={newPost.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            value={newPost.description}
            onChange={handleInputChange}
          />
          <input type="file" accept="image/*" name="image" onChange={handleImageChange} />
          {imagePreview && (
            <div>
              <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 200, marginTop: 10 }} />
              <Button onClick={handleImageCancel} color="secondary">Cancel Image</Button>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddPost} color="primary">
            Add Post
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Update Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            value={newPost.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            value={newPost.description}
            onChange={handleInputChange}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <div>
              <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 200, marginTop: 10 }} />
              <Button onClick={handleImageCancel} color="secondary">Cancel Image</Button>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdatePost} color="primary">
            Update Post
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this post?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeletePost} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PostManagement;
