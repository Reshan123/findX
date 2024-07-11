import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Box, Avatar, useMediaQuery, useTheme, styled } from '@mui/material';
import { People, Class, PostAdd, ExitToApp } from '@mui/icons-material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner'; // Import the LoadingSpinner component
import ReLoginMessage from './TokenExpiredOverlay';

const drawerWidth = 240;

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  // padding: theme.spacing(3),
  // marginLeft: drawerWidth,
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
  // flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
  },
}));

const LogoImage = styled('img')({
  height: '40px', // Adjust height as needed
  marginRight: '10px', // Add margin for spacing
});

const AvatarContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  '& .online-indicator': {
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: 'green',
    border: '2px solid white',
  },
}));

function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        setIsLoggedIn(true); // Update login status
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login')
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <CssBaseline />
      <AppBarStyled position="sticky">
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
          <AvatarContainer>
            <Avatar alt="Admin" src="/static/images/avatar/1.jpg" />
            {isLoggedIn && <div className="online-indicator" />} {/* Green online status indicator */}
          </AvatarContainer>
        </Toolbar>
      </AppBarStyled>
      <Box sx={{ display: 'flex' }}>
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
            {/* <ListItem button component={Link} to="/courseContent">
            <ListItemIcon><Class /></ListItemIcon>
            <ListItemText primary="Content Management" />
          </ListItem> */}
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
      </Box>
      <ReLoginMessage />
    </Box>
  );
}

export default Dashboard;
