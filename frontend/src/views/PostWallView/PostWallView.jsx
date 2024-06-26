import PostCard from '../../components/PostCard/PostCard';
import CourseCard from '../../components/CourseCard/CourseCard';

import { useCourseContext } from '../../context/CourseContext';
import { usePostContext } from '../../context/PostContext';

import { useRef, useState, useEffect } from 'react';

import courseImage from '../../assets/courseImage.jpg'
import './PostWallView.css'

import { GoDot, GoDotFill } from "react-icons/go";

const PostWallView = () => {

    const { courses } = useCourseContext();
    const { posts } = usePostContext();

    const postHeaderDescription = useRef(null);
    const postHeaderPostedOn = useRef(null);

    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const changeSlider = () => {
            setCurrentSlide((prevSlide) => (prevSlide < posts.length - 1 ? prevSlide + 1 : 0));
        };

        const intervalId = setInterval(changeSlider, 3000);

        return () => clearInterval(intervalId);
    }, [posts.length]);

    useEffect(() => {
        if (posts && posts.length > 0) {
            if (postHeaderDescription.current && postHeaderPostedOn.current) {
                postHeaderPostedOn.current.innerText = posts[currentSlide].postedOn;
                postHeaderDescription.current.innerText = posts[currentSlide].description;
            }
        }
    }, [currentSlide, posts]);


    return ( 
        <div className="postWallView">
            <div className="header">
                <img src={courseImage} alt="" />
                <div className="rightContainer">
                    <div className="description" ref={postHeaderDescription}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quo unde modi minus perspiciatis exercitationem doloremque suscipit et vel aliquam! Esse numquam possimus autem, quae molestiae harum mollitia omnis? Architecto. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste voluptates a praesentium ab tempore quia, ea unde corrupti atque incidunt quasi voluptatum voluptatem! Laudantium asperiores unde distinctio incidunt veniam velit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut ipsam reiciendis tempora, asperiores repellendus ab magnam. Vero repudiandae veniam earum. Eos sed tempora neque culpa voluptate alias accusamus, ut sapiente? Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo laudantium debitis molestiae in sequi! Aliquid eos amet aspernatur autem sint illo, mollitia nisi provident esse dolore sunt maxime unde iusto! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique veritatis nobis dolor corporis eaque dolores, cupiditate eveniet? Cum beatae amet dolor corporis voluptatum placeat maxime asperiores incidunt, vero ipsam exercitationem.</div>
                    <div className="postedOn" ref={postHeaderPostedOn}>2024 June 15</div>
                    <div className="dotContainer">
                        {posts && posts.map((i, index) => {
                            return (index == currentSlide ? <GoDotFill key={index}/> : <GoDot key={index} />)
                        })}
                    </div>
                </div>
                
            </div>
            <div className="gridContainer">
                <div className="postContainer">
                    {posts && posts.map( post => {
                        return <PostCard post={post} key={post.id} />
                    })}
                </div>
                <div className="courseContainer">
                    <div className="title">Top Courses</div>
                    {courses && courses
                        .filter(course => course.rating >= 1 && course.rating <= 5)
                        .sort((a, b) => b.rating - a.rating) 
                        .slice(0, 5) 
                        .map((course, index) => (
                            <CourseCard key={index} course={course} /> 
                        ))
                    }
                </div>
            </div>
        </div>
     );
}
 
export default PostWallView;