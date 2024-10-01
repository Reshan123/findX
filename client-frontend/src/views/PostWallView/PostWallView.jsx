import PostCard from '../../components/PostCard/PostCard';
import CourseCard from '../../components/CourseCard/CourseCard';
import ProfileCard from '../../components/ProfileCard/ProfileCard';

import { useCourseContext } from '../../context/CourseContext';
import { usePostContext } from '../../context/PostContext';

// import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

// import './PostWallView.css'
import { Typography } from '@mui/material';
// import { useTheme } from '@emotion/react';
// import HomeCarousel from '../../components/HomeCarousel/HomeCarousel';

const PostWallView = () => {

    const { courses } = useCourseContext();
    const { posts } = usePostContext();

    // const navigate = useNavigate();
    // const theme = useTheme();

    return (
        <>
            {/* <HomeCarousel /> */}
            <Container disableGutters maxWidth='lg' sx={{ marginBlock: '50px' }}>
                <Grid container spacing={3} alignItems={'stretch'} justifyContent={'center'}>
                    <Grid item lg={3.5} md={0} xs={0} sx={{ display: {xs: 'none', md: 'none', lg: 'block'} }}>
                        <ProfileCard sx={{ position: 'sticky', top: 100 }} />
                    </Grid>
                    <Grid item lg={5} md={7} xs={11}>
                        <Grid container direction={'column'} spacing={{ xs: 3 }} >
                            {/* <Typography sx={{ width: '90%', margin: 'auto', marginTop: '35px' }} variant='h6' alignSelf={'start'}>Pinned Posts</Typography>
                            <Divider sx={{ width: '90%', marginBottom: '0px', borderBottomWidth: '3px' }} />
                            {posts && posts.map(post => {
                                return (post.pinned && (
                                    <Grid item sx={{ width: '95%' }} key={post._id}>
                                        <PostCard post={post} />
                                    </Grid>)
                                )
                            })}
                            {posts.filter(post => post.pinned).length == 0 && (
                                <Grid item sx={{ width: '75%' }}>
                                    <Typography variant='subtitle1' color={theme.palette.grey[500]}>No Pinned Posts</Typography>
                                </Grid>
                            )} */}
                            <Typography sx={{ width: '100%', margin: 'auto', marginTop: '35px' }} variant='h6' alignSelf={'start'}>All Posts</Typography>
                            <Divider sx={{ width: '100%', marginBottom: '0px', borderBottomWidth: '3px' }} />
                            {posts && posts.map(post => {
                                return (
                                    <Grid item sx={{ width: { xs: '1', sm: '85%', md: '95%'} }} key={post._id}>
                                        <PostCard post={post} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                    <Grid item lg={3.5} md={4} >
                        <Grid container direction={'column'} spacing={{ xs: 3 }} alignItems={'center'} sx={{ position: 'sticky', top: 100 }}>
                        <Typography sx={{ width: '90%', margin: 'auto', marginTop: '35px' }} variant='h6' alignSelf={'start'}>Top Courses</Typography>
                        <Divider sx={{ width: '90%', marginBottom: '0px', borderBottomWidth: '3px' }} />
                            {courses && courses
                                .map((course) => (course.pinnedCourse &&
                                    (<Grid item key={course._id}>
                                        <CourseCard course={course} />
                                    </Grid>)
                                ))
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default PostWallView;