import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

import { useUserContext } from '../../context/UserContext';
import { useState } from 'react';

import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';

function Copyright(props) {
  const navigate = useNavigate();
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Create an account '}
      <Link color="inherit" onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>
        Sign Up
      </Link>
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.


export default function SignInSide() {

  const { addUser } = useUserContext()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const url = import.meta.env.VITE_SERVER_URL;
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    axios.post(`${url}/api/auth/user/signin`, {
      email: data.get('email'),
      password: data.get('password')
    })
      .then(res => {
        addUser([res.data.token, res.data.user])
        localStorage.setItem("user", JSON.stringify([res.data.token, res.data.user]))
        navigate("/")
      })
      .catch((err) => {
        if(err.response.status === 406){
          setError(err.response.data.message)
        } else {
          setError('Invalid Credentials')
        }
      })
  };

  return (
    <Grid container component="main" sx={{ minHeight: '80vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={false}
        md={false}
        sx={{
          backgroundImage: 'url(https://img.freepik.com/free-vector/e-learning-education-template-vector-technology-ad-banner_53876-125996.jpg?t=st=1718899967~exp=1718903567~hmac=a5910275db13ad6914b7bdfd2ae0c8229963fcd64176b364098fd93ff08c6a2e&w=1380)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={12} md={12} component={Paper} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <br />
          {error && (<Alert severity='error' variant='outlined' onClose={() => { setError('') }}>{error}</Alert>)}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                fullWidth
                name="password"
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={e => e.preventDefault}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
