import './CourseCard.css'
import courseImage from '../../assets/courseImage.jpg'
import Rating from 'react-rating'

import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
import { NavLink } from 'react-router-dom';

const CourseCard = ({ course }) => {
    
    return ( 
        <NavLink className="courseCard" to={"/coursemoredetails/" + course.id} onClick={() => window.scroll(0,0)}>
            <div className="courseImage">
                <img src={courseImage} alt="courseImage" />
            </div>
            <div className="courseTitle">{course.title || "Course Title"}</div>
            <div className="courseDescription">
                {course.shortDescription || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel blanditiis est, sequi eveniet ratione excepturi nobis numquam magni. Tempora velit voluptatum qui, ab magni minima temporibus placeat eos aut error?"}
            </div>
            <div className="courseBottomContainer">
                <div className="courseRating">
                    <Rating initialRating={course.rating || 2} readonly emptySymbol={<TiStarOutline style={{fontSize: "1.5rem", color: "#72c3cc"}} />} fullSymbol={<TiStarFullOutline style={{fontSize: "1.5rem", color: "#72c3cc"}} />} />
                </div>
                <div className="coursePrice">
                    {course.discountedPrice ? (<><span>{"LKR " + Intl.NumberFormat('en-US').format(course.actualPrice) || "LKR 1,500"}</span>{"LKR " + Intl.NumberFormat('en-US').format(course.discountedPrice) || "LKR 1,500"}</>) : (<>{"LKR " + Intl.NumberFormat('en-US').format(course.actualPrice) || "LKR 1,500"}</>)}
                </div>
            </div>
            
        </NavLink>
     );
}
 
export default CourseCard;

// <TiStarFullOutline />