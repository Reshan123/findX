import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const Card = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: '#1a237e', // Dark blue background
  color: '#fdd835', // Slight dark yellow text
}));

function AdminHome() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalUsers: 0,
    suspendedUsers: 0,
    totalCourses: 0,
  });

  useEffect(() => {
    // Fetch statistics from backend
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/admin/counts'); // Update with your backend endpoint
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <Typography variant="h6">Total Posts</Typography>
            <Typography variant="body2">{stats.totalPosts}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="body2">{stats.totalUsers}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <Typography variant="h6">Suspended Users</Typography>
            <Typography variant="body2">{stats.suspendedUsers}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <Typography variant="h6">Total Courses</Typography>
            <Typography variant="body2">{stats.totalCourses}</Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminHome;
