import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 240,
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#080452',
    },
    secondary: {
      main: '#dec909',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
