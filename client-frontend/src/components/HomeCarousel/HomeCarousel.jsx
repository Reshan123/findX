import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import courseImage from '../../assets/courseImage.jpg'

import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { usePostContext } from '../../context/PostContext';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const getDate = (date) => {
    const newDate = new Date(date)

    return newDate
}

function HomeCarousel() {

    const { posts } = usePostContext()
    const backendServerURL = import.meta.env.VITE_SERVER_URL


    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [images, setImages] = React.useState([]);

    React.useEffect(() => {
        if(posts){
            const filteredList = posts.filter( post => post.pinned )
            setImages(filteredList)
        }
    }, [])

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ flexGrow: 1, maxHeight: '500' }}>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                interval={2000}
            >
                {images.map((step, index) => ( step.pinned &&
                    <div key={index}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Paper sx={{ display: {md: 'grid'}, gridTemplateColumns: {md: '40vw 59vw'},  }}>
                                <Box
                                    component="img"
                                    sx={{
                                        display: 'block',
                                        overflow: 'hidden',
                                        width: 1,
                                        // height: '75vh',
                                        //   maxWidth: 400,
                                    }}
                                    src={`${backendServerURL}/${step.image}`}
                                    alt={step.title}
                                />
                                <Card sx={{ width: 1 }}>
                                    <CardContent sx={{ height: 1, width: 3/4, margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {`${getDate(step.createdAt).getFullYear()} ${months[getDate(step.createdAt).getMonth()]} ${String(getDate(step.createdAt).getDate()).padStart(2, '0')}`}
                                        </Typography>
                                        <Typography variant="h3" component="div">
                                            {step.title}
                                        </Typography>
                                        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            adjective
                                        </Typography> */}
                                        <Typography variant="body1" >
                                            {step.description}
                                        </Typography>
                                    </CardContent>
                                    {/* <CardActions>
                                        <Button size="small">Learn More</Button>
                                    </CardActions> */}
                                </Card>
                            </Paper>
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
    );
}

export default HomeCarousel;





// [
//     {
//         title: "Title 1",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit iusto nobis consequatur. Magni cum, qui veritatis nesciunt maxime natus aut blanditiis expedita illo repellendus ex explicabo saepe, fugit exercitationem nobis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit iusto nobis consequatur. Magni cum, qui veritatis nesciunt maxime natus aut blanditiis expedita illo repellendus ex explicabo saepe, fugit exercitationem nobis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit iusto nobis consequatur. Magni cum, qui veritatis nesciunt maxime natus aut blanditiis expedita illo repellendus ex explicabo saepe, fugit exercitationem nobis!",
//         createdAt: "2024-07-03T20:43:54.213Z",
//         imgPath: courseImage
//     },
//     {
//         title: "Title 2",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit iusto nobis consequatur. Magni cum, qui veritatis nesciunt maxime natus aut blanditiis expedita illo repellendus ex explicabo saepe, fugit exercitationem nobis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit iusto nobis consequatur. Magni cum, qui veritatis nesciunt maxime natus aut blanditiis expedita illo repellendus ex explicabo saepe, fugit exercitationem nobis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit iusto nobis consequatur. Magni cum, qui veritatis nesciunt maxime natus aut blanditiis expedita illo repellendus ex explicabo saepe, fugit exercitationem nobis!",
//         createdAt: "2024-07-03T20:43:54.213Z",
//         imgPath: courseImage,
//     },
//     {
//         title: "Title 3",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit iusto nobis consequatur. Magni cum, qui veritatis nesciunt maxime natus aut blanditiis expedita illo repellendus ex explicabo saepe, fugit exercitationem nobis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit iusto nobis consequatur. Magni cum, qui veritatis nesciunt maxime natus aut blanditiis expedita illo repellendus ex explicabo saepe, fugit exercitationem nobis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit iusto nobis consequatur. Magni cum, qui veritatis nesciunt maxime natus aut blanditiis expedita illo repellendus ex explicabo saepe, fugit exercitationem nobis!",
//         createdAt: "2024-07-03T20:43:54.213Z",
//         imgPath: courseImage,
//     },
//     {
//         title: "Title 4",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit iusto nobis consequatur. Magni cum, qui veritatis nesciunt maxime natus aut blanditiis expedita illo repellendus ex explicabo saepe, fugit exercitationem nobis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit iusto nobis consequatur. Magni cum, qui veritatis nesciunt maxime natus aut blanditiis expedita illo repellendus ex explicabo saepe, fugit exercitationem nobis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit iusto nobis consequatur. Magni cum, qui veritatis nesciunt maxime natus aut blanditiis expedita illo repellendus ex explicabo saepe, fugit exercitationem nobis!",
//         createdAt: "2024-07-03T20:43:54.213Z",
//         imgPath: courseImage,
//     },
// ]