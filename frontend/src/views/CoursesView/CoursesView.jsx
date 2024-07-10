import CourseCard from '../../components/CourseCard/CourseCard';
import './CoursesView.css'

import { useCourseContext } from '../../context/CourseContext';
import { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';

const CoursesView = () => {

    const { courses } = useCourseContext();
    const [currentlyDisplayedItems, setCurrentlyDisplayedItems] = useState();
    const [courseTitleSearch, setCourseTitleSearch] = useState();
    const [minPriceSearch, setMinPriceSearch] = useState();
    const [maxPriceSearch, setMaxPriceSearch] = useState();

    useEffect(() => {
        if (courses) {
            setCurrentlyDisplayedItems(courses)
        }
    }, [courses])

    useEffect(() => {

        //search function logic
        if (courses) {

            let filteredList = []

            if (courseTitleSearch) {
                filteredList = courses.filter(course => {
                    return (course.title.toLowerCase().includes(courseTitleSearch.toLowerCase()))
                })
            } else {
                filteredList = courses
            }

            setCurrentlyDisplayedItems(filteredList)

        }

    }, [courseTitleSearch, minPriceSearch, maxPriceSearch, courses])

    return (
        <div className="coursesView">
            <div className="headerBox">
                <div className='mainText'>Empower Your Future with Knowledge!</div>
                <div className="subText">Explore a wide range of courses tailored to your interests and goals. Learn from expert instructors and enjoy flexible learning options. Start your journey today and unlock your potential!</div>
            </div>
            <div className="coursesContainer">
                <div className="courseSearch">
                    {/* <input type="text" placeholder='Course Title' onChange={e => setCourseTitleSearch(e.target.value)} /> */}
                    <TextField id="outlined-basic" label="Course Title" variant="outlined" onChange={e => setCourseTitleSearch(e.target.value)} />
                    
                        <TextField id="outlined-basic" label="Min Price" variant="outlined" onChange={e => setMinPriceSearch(e.target.value)} />
                        <TextField id="outlined-basic" label="Max Price" variant="outlined" onChange={e => setMaxPriceSearch(e.target.value)} />
                        {/* <input type="number" placeholder='Min Price' onChange={e => setMinPriceSearch(e.target.value)} />  <input type="number" placeholder='Max Price' onChange={e => setMaxPriceSearch(e.target.value)} /> */}
                    
                    {/* <select name="" id="">
                        <option value="">Select A Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select> */}
                </div>
                <div className="mainContainer">
                    {currentlyDisplayedItems && currentlyDisplayedItems.map((course, index) => (
                        <CourseCard key={index} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CoursesView;