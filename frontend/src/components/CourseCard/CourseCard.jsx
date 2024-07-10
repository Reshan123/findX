import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import courseImage from '../../assets/courseImage.jpg'
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import Rating from 'react-rating'
import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';

export default function CourseCard({ course }) {
    
    const navigate = useNavigate();
    
    const goToMoreDetailsPage = () => {
        navigate("/coursemoredetails/" + course._id)
    }

    const theme = useTheme()

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={() => {goToMoreDetailsPage()}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={courseImage}
                    alt="green iguana"
                />
                <CardContent onClick={() => {goToMoreDetailsPage()}}>
                    <Typography gutterBottom variant="h5" component="div">
                        {course.title || "Course Title"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {course.shortDescription || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel blanditiis est, sequi eveniet ratione excepturi nobis numquam magni. Tempora velit voluptatum qui, ab magni minima temporibus placeat eos aut error?"}
                    </Typography>
                    <Box mt={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Typography>
                            <Rating initialRating={course.rating || 2} readonly emptySymbol={<TiStarOutline style={{ fontSize: "1rem", color: theme.palette.mode === 'dark' ? '#FFF' : '#000' }} />} fullSymbol={<TiStarFullOutline style={{ fontSize: "1rem", color: theme.palette.mode === 'dark' ? '#FFF' : '#000' }} />} />
                        </Typography>
                        <Typography variant='subtitle1'>
                            {course.discountedPrice ? (<><span>{"LKR " + Intl.NumberFormat('en-US').format(course.price) || "LKR 1,500"}</span>{"LKR " + Intl.NumberFormat('en-US').format(course.discountedPrice) || "LKR 1,500"}</>) : (<>{"LKR " + Intl.NumberFormat('en-US').format(course.price) || "LKR 1,500"}</>)}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}