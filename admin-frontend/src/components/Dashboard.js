import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Box, Avatar, useMediaQuery, useTheme } from '@mui/material';
import { People, Class, PostAdd, ExitToApp } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner'; // Import the LoadingSpinner component
import ReLoginMessage from './TokenExpiredOverlay';

const drawerWidth = 240;

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: drawerWidth,
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1),
}));

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
  },
}));

const LogoImage = styled('img')({
  height: '40px', // Adjust height as needed
  marginRight: '10px', // Add margin for spacing
});

function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login')
      } else {
        // Optionally verify the token with the server
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login')
  };

  if (loading) {
    return <LoadingSpinner />; // Use the LoadingSpinner component
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarStyled position="fixed">
        <Toolbar>
          <LogoImage src="/images/logo.jpeg" alt="Logo" /> {/* Replace with your actual logo image path */}
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
            component={Link}
            to="/"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Admin Dashboard
          </Typography>
          <Avatar alt="Admin" src="/static/images/avatar/1.jpg" />
        </Toolbar>
      </AppBarStyled>
      <DrawerStyled
        variant={isMobile ? 'temporary' : 'permanent'}
        ModalProps={{ keepMounted: true }}
      >
        <DrawerHeader>
          <Typography variant="h6">Admin Panel</Typography>
        </DrawerHeader>
        <List>
          <ListItem button component={Link} to="/users">
            <ListItemIcon><People /></ListItemIcon>
            <ListItemText primary="Users Management" />
          </ListItem>
          <ListItem button component={Link} to="/courses">
            <ListItemIcon><Class /></ListItemIcon>
            <ListItemText primary="Course Management" />
          </ListItem>
          <ListItem button component={Link} to="/posts">
            <ListItemIcon><PostAdd /></ListItemIcon>
            <ListItemText primary="Post Management" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </DrawerStyled>
      <Main>
        <DrawerHeader />
        <Outlet />
      </Main>
      <ReLoginMessage />
    </Box>
  );
}

export default Dashboard;
