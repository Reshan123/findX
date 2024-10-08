import { useEffect, useMemo, useRef, useState } from 'react'
import { useCourseContext } from '../../context/CourseContext';

import './HomeView.css'

import CourseCard from '../../components/CourseCard/CourseCard';

import { ImQuotesLeft } from "react-icons/im";
import { GoDot, GoDotFill } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const HomeView = () => {

    const navigate = useNavigate()
    
    const { courses } = useCourseContext();


    const testimonials = useMemo(() =>
        {return ([
            {createdBy: "John Doe", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quas nihil incidunt consequuntur, sapiente possimus officia perferendis modi quaerat eos provident mollitia recusandae? Tempora provident et rem?"}, 
            {createdBy: "James Perera", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quas nihil incidunt consequuntur, sapiente possimus officia perferendis modi quaerat eos provident "},
            {createdBy: "Bargus Gune", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quas nihil incidunt consequuntur, cumque cupiditate mollitia recusandae? Tempora provident et rem?"},
            {createdBy: "Helen Peris", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quas nihil incidunt consequuntur, sapiente possimus offic recusandae? Tempora provident et rem?"}
        ])}, []
    )

    const testimonialCreatedBy = useRef(null);
    const testimonialDescription = useRef(null);

    const [currentSlide, setCurrentSlide] = useState(0)


    useEffect(() => {
        const changeSlider = () => {
            setCurrentSlide((prevSlide) => (prevSlide < testimonials.length - 1 ? prevSlide + 1 : 0));
        };

        const intervalId = setInterval(changeSlider, 3000);

        return () => clearInterval(intervalId);
    }, [testimonials.length]);

    useEffect(() => {
        if (testimonialCreatedBy.current && testimonialDescription.current) {
            testimonialCreatedBy.current.innerText = testimonials[currentSlide].createdBy;
            testimonialDescription.current.innerText = testimonials[currentSlide].description;
        }
    }, [currentSlide, testimonials]);

    return ( 
        <div className="homeView">
            <div className="headerBox">
                <div className='mainText'>Unlock Your Potential with Expert Led Online Courses</div>
                <div className="subText">Welcome to our e-learning platform, offering expert-led courses across various fields. Enhance your skills, advance your career, and achieve your goals with our flexible and interactive learning experiences. Join us today and start your journey towards success!</div>
                <div className="buttonContainer">
                    <button onClick={() => navigate('/signin')}>Sign In</button>
                    <button onClick={() => navigate('/signup')}>Sign Up</button>
                </div>
            </div>
            <div className="topCourses">
                    <div className="title">Top Courses</div>
                    <div className="courseContainer">
                    {courses && courses
                        .map((course, index) => {
                            if(course.pinnedCourse){
                                return <CourseCard key={index} course={course} />
                            }
                        })
                    }
                    </div>
            </div>
            <div className="testimonials">
                <div className="title">Testimonials</div>
                <div className="testimonialSlider">
                    <div className="testimonialCard">
                        <div className="testimonialCardDescription" ref={testimonialDescription}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quas nihil incidunt consequuntur, sapiente possimus officia perferendis modi quaerat eos provident error cumque cupiditate mollitia recusandae? Tempora provident et rem?</div>
                        <ImQuotesLeft />
                        <div className="testimonialCreatedBy" ref={testimonialCreatedBy}>Card Title</div>
                    </div>
                    <div className="dotContainer">
                        {testimonials && testimonials.map((i, index) => {
                            return (index == currentSlide ? <GoDotFill key={index}/> : <GoDot key={index} />)
                        })}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default HomeView;