import './CourseMoreDetailsView.css'
import courseImage from '../../assets/courseImage.jpg'

import { useParams } from 'react-router-dom';
import { useCourseContext } from '../../context/CourseContext';
import { useEffect, useState } from 'react';

import Rating from 'react-rating'
import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";


const CourseMoreDetailsView = () => {
    
    const { id } = useParams()

    const { courses } = useCourseContext();
    const [course, setCourse] = useState([]);

    useEffect(() => {
        if(courses){
            setCourse(courses.filter( item => (item.id == id)))
        }
    }, [courses])

    return ( 
        <div className="CourseMoreDetailsView">
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
                                {course[0].discountedPrice ? (<><span>{"Rs. " + Intl.NumberFormat('en-US').format(course[0].actualPrice) || "Rs. 1,500"}</span>{"Rs. " + Intl.NumberFormat('en-US').format(course[0].discountedPrice) || "Rs. 1,500"}</>) : (<>{"Rs. " + Intl.NumberFormat('en-US').format(course[0].actualPrice) || "Rs. 1,500"}</>)}
                            </div>
                        </div>
                        <div className="ratingContainer">
                            <div className="courseRating">
                                <Rating initialRating={course[0].rating || 2} readonly emptySymbol={<TiStarOutline style={{fontSize: "1.5rem", color: "#fbb331"}} />} fullSymbol={<TiStarFullOutline style={{fontSize: "1.5rem", color: "#fbb331"}} />} />
                            </div>
                            <button className="enrollButton">Enroll to Course</button>
                        </div>
                        <div className="courseDescription">{course[0].longDescription}</div>
                    </div>
                </>
            )}
        </div>
     );
}
 
export default CourseMoreDetailsView;