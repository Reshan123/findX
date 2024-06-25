import './CourseMoreDetailsView.css'
import { useParams } from 'react-router-dom';

import { useCourseContext } from '../../context/CourseContext';
import { useEffect, useState } from 'react';

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
            {course[0] && course[0].title}
        </div>
     );
}
 
export default CourseMoreDetailsView;