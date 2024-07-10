// import './styles.css'
import logo from '../../assets/logo.png'

// import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box, useTheme } from '@mui/material';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {

    const theme = useTheme();

    return (
        <>
            <Box sx={{ paddingBlock: '5px', backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[200] }}>
                <Grid sx={{ width: '90vw', marginInline: 'auto', marginBlock: '25px' }} container justifyContent={'space-between'} alignItems={'center'}>
                    <Grid item>
                        <Typography variant='body2'>
                            © FindX. All rights reserved.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={2}>
                            <Grid item>
                                <FacebookIcon />
                            </Grid>
                            <Grid item>
                                <InstagramIcon />
                            </Grid>
                            <Grid item>
                                <TwitterIcon />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Footer;