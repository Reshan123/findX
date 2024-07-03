import React from 'react';
import { Box, Button, Typography, styled } from '@mui/material';
import useAxiosInterceptor from '../hooks/useAxiosInterceptor';

const Overlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: theme.zIndex.drawer + 2, // Ensure overlay is above the drawer
}));

const MessageContainer = styled(Box)({
  textAlign: 'center',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '8px',
});

const ReLoginMessage = () => {
  const { showReloginMessage, handleRelogin } = useAxiosInterceptor();

  if (!showReloginMessage) {
    return null;
  }

  return (
    <Overlay>
      <MessageContainer>
        <Typography variant="h6">Session Expired</Typography>
        <Typography sx={{ mb: 2 }}>Please log in again to continue.</Typography>
        <Button variant="contained" color="primary" onClick={handleRelogin}>
          Log In
        </Button>
      </MessageContainer>
    </Overlay>
  );
};

export default ReLoginMessage;
