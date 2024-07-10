import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeContext } from '../../context/ThemeContext';

function NavBar() {
    const { user, addUser } = useUserContext();
    const { appTheme, setAppTheme } = useThemeContext();
    const navigate = useNavigate();
    const theme = useTheme();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const scrollToTop = () => window.scroll(0, 0);

    const logout = () => {
        scrollToTop();
        addUser([]);
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify([]));
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[200], boxShadow: 'none' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        onClick={() => navigate('/')}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                        }}
                    >
                        <Avatar alt="Logo" src={logo} />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/'); }}>
                                <Typography textAlign="center" color={theme.palette.mode === 'dark' ? 'common.white' : 'common.black'}>Home</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/courses'); }}>
                                <Typography textAlign="center" color={theme.palette.mode === 'dark' ? 'common.white' : 'common.black'}>Courses</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        onClick={() => navigate('/')}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                        }}
                    >
                        <Avatar alt="Logo" src={logo} />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <MenuItem onClick={() => navigate('/')}>
                            <Typography textAlign="center" color={theme.palette.mode === 'dark' ? 'common.white' : 'common.black'}>Home</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/courses')}>
                            <Typography textAlign="center" color={theme.palette.mode === 'dark' ? 'common.white' : 'common.black'}>Courses</Typography>
                        </MenuItem>
                    </Box>

                    {(!user || user.length === 0) ? (
                        <Box sx={{ display: 'flex', flexGrow: 0, gap: '5px' }}>
                            <MenuItem onClick={() => setAppTheme(curr => curr === 'darkTheme' ? 'lightTheme' : 'darkTheme')}>
                                <IconButton>{appTheme === "darkTheme" ? <LightModeIcon /> : <DarkModeIcon />}</IconButton>
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/signin')}>
                                <Typography textAlign="center" color={theme.palette.mode === 'dark' ? 'common.white' : 'common.black'}>Signin</Typography>
                            </MenuItem>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', flexGrow: 0, gap: '5px' }}>
                            <MenuItem onClick={() => setAppTheme(curr => curr === 'darkTheme' ? 'lightTheme' : 'darkTheme')}>
                                <IconButton>{appTheme === "darkTheme" ? <LightModeIcon /> : <DarkModeIcon />}</IconButton>
                            </MenuItem>
                            <Tooltip title="Open settings">
                                <Button onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Profile Icon" src="" />&nbsp;
                                    <Typography variant='caption'>{user[1] && (`${user[1].first_name} ${user[1].last_name}`)}</Typography>
                                </Button>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/profile'); }}>
                                    <Typography textAlign="center" color={theme.palette.mode === 'dark' ? 'common.white' : 'common.black'}>Profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/settings'); }}>
                                    <Typography textAlign="center" color={theme.palette.mode === 'dark' ? 'common.white' : 'common.black'}>Settings</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => { handleCloseUserMenu(); logout(); }}>
                                    <Typography textAlign="center" color={theme.palette.mode === 'dark' ? 'common.white' : 'common.black'}>Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;
