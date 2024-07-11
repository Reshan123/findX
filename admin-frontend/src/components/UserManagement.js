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
  Switch,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/system';
import { Edit } from '@mui/icons-material';

const Card = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState(''); // State to hold admin password for validation
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/admin/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSuspendToggle = async (userId, suspended) => {
    try {
      const endpoint = suspended
        ? `http://localhost:3001/api/admin/admin/unsuspend/${userId}`
        : `http://localhost:3001/api/admin/admin/suspend/${userId}`;

      const response = await axios.put(
        endpoint,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setUsers(users.map(user => (user._id === userId ? { ...user, suspended: !suspended } : user)));
      setSnackbar({ open: true, message: 'User status updated successfully', severity: 'success' });
      console.log(response.data.message);
    } catch (error) {
      setSnackbar({ open: true, message: 'Error updating user status', severity: 'error' });
      console.error('Error updating user status:', error);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
        const response = await axios.put(
            `http://localhost:3001/api/admin/admin/updatePassword`,
            {
                userId: selectedUser._id,
                newPassword,
                loggedAdminPassword: adminPassword, // Assuming adminPassword is logged admin's password
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );
        console.log(response.data.message);
        setOpen(false);
        setSnackbar({ open: true, message: 'Password updated successfully', severity: 'success' });
    } catch (error) {
        setSnackbar({ open: true, message: 'Error updating password', severity: 'error' });
        console.error('Error updating password:', error);
    }
};


  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    setNewPassword('');
    setAdminPassword(''); // Reset admin password field on close
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Suspended</TableCell>
              <TableCell>Update Password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.user_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Switch
                    checked={user.suspended}
                    onChange={() => handleSuspendToggle(user._id, user.suspended)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleClickOpen(user)} color="primary">
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a new password for {selectedUser && selectedUser.user_name}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Admin Password"
            type="password"
            fullWidth
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePasswordUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default UserManagement;
