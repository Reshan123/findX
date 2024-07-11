import './CourseMoreDetailsView.css'
import courseImage from '../../assets/courseImage.jpg'

import { useParams } from 'react-router-dom';
import { useCourseContext } from '../../context/CourseContext';
import { useUserContext } from '../../context/UserContext';

import { useEffect, useState } from 'react';

import Rating from 'react-rating'
import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { useTheme } from '@mui/material';



const CourseMoreDetailsView = () => {

    const { id } = useParams()

    const navigate = useNavigate();
    const theme = useTheme()

    const { user } = useUserContext()
    const { courses } = useCourseContext();
    const [course, setCourse] = useState([]);

    useEffect(() => {
        if (courses) {
            setCourse(courses.filter(item => (item._id == id)))
        }
    }, [courses, id])

    return (
        <div className={`CourseMoreDetailsView ${ !user[1] ? 'CourseMoreDetailsViewSingle': ''}`}>
            { user[1] && (
                    <ProfileCard />
                // <div className="profileDetails" onClick={() => navigate('/profile')}>
                // </div>
            )}
            {/* { !user[1] && (
                    <div></div>
            )} */}
            <div className='course'>
                {course[0] && (
                    <>
                        {/* <img src={courseImage} alt="courseImage" /> */}
                        <div className="courseImage" style={{
                            backgroundImage: `url(${courseImage})`
                        }}></div>
                        <div className="bottomContainer">
                            <div className='titleContainer'>
                                <div className="courseTitle">{course[0].title}</div>
                                <div className="coursePrice">
                                    {course[0].discountedPrice ? (<><span>{"Rs. " + Intl.NumberFormat('en-US').format(course[0].price) || "Rs. 1,500"}</span>{"Rs. " + Intl.NumberFormat('en-US').format(course[0].discountedPrice) || "Rs. 1,500"}</>) : (<>{"Rs. " + Intl.NumberFormat('en-US').format(course[0].price) || "Rs. 1,500"}</>)}
                                </div>
                            </div>
                            <div className="ratingContainer">
                                <div className="courseRating">
                                <Rating initialRating={course.rating || 2} readonly emptySymbol={<TiStarOutline style={{ fontSize: "2rem", color: theme.palette.mode === 'dark' ? '#FFF' : '#000' }} />} fullSymbol={<TiStarFullOutline style={{ fontSize: "2rem", color: theme.palette.mode === 'dark' ? '#FFF' : '#000' }} />} />
                                </div>
                                <button className="enrollButton">Enroll to Course</button>
                            </div>
                            <div className="courseDescription">{course[0].longDescription}</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CourseMoreDetailsView;