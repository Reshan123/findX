import './App.css'
import { Routes, Route } from 'react-router-dom'

import HomeView from './views/HomeView/HomeView'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import CoursesView from './views/CoursesView/CoursesView'
import SignInView from './views/SignInView/SignInView'
import SignUpView from './views/SignUpView/SignUpView'

import { useCourseContext } from './context/CourseContext'
import { useEffect } from 'react'
import CourseMoreDetailsView from './views/CourseMoreDetailsView/CourseMoreDetailsView'
import ProfileView from './views/ProfleView/ProfileView'

function App() {

  const { addCourse } = useCourseContext();

  useEffect(() => {
    addCourse([
      {
        id: 1,
        title: "Course 1",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel blanditiis est, sequi eveniet ratione excepturi nobis numquam magni. Tempora velit voluptatum qui, ab magni minima temporibus placeat eos aut error?",
        actualPrice: 1500,
        discountedPrice: 1200,
        rating: 5
      },
      {
        id: 2,
        title: "Course 2",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel blanditiis est, sequi eveniet ratione excepturi nobis numquam magni. Tempora velit voluptatum qui, ab magni minima temporibus placeat eos aut error?",
        actualPrice: 3000,
        discountedPrice: 0,
        rating: 4
      },
      {
        id: 3,
        title: "Course 3",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel blanditiis est, sequi eveniet ratione excepturi nobis numquam magni. Tempora velit voluptatum qui, ab magni minima temporibus placeat eos aut error?",
        actualPrice: 1500,
        // discountedPrice: 1500,
        rating: 3
      },
      {
        id: 4,
        title: "Course 4",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel blanditiis est, sequi eveniet ratione excepturi nobis numquam magni. Tempora velit voluptatum qui, ab magni minima temporibus placeat eos aut error?",
        actualPrice: 4500,
        discountedPrice: 2500,
        rating: 3
      },
      {
        id: 5,
        title: "Course 5",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel blanditiis est, sequi eveniet ratione excepturi nobis numquam magni. Tempora velit voluptatum qui, ab magni minima temporibus placeat eos aut error?",
        actualPrice: 5000,
        discountedPrice: 4000,
        rating: 2
      },
      {
        id: 6,
        title: "Course 6",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel blanditiis est, sequi eveniet ratione excepturi nobis numquam magni. Tempora velit voluptatum qui, ab magni minima temporibus placeat eos aut error?",
        actualPrice: 6500,
        discountedPrice: 4500,
        rating: 2
      },
      {
        id: 7,
        title: "Course 7",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel blanditiis est, sequi eveniet ratione excepturi nobis numquam magni. Tempora velit voluptatum qui, ab magni minima temporibus placeat eos aut error?",
        actualPrice: 10500,
        discountedPrice: 10000,
        rating: 4
      },
      {
        id: 8,
        title: "Course 8",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel blanditiis est, sequi eveniet ratione excepturi nobis numquam magni. Tempora velit voluptatum qui, ab magni minima temporibus placeat eos aut error?",
        actualPrice: 15000,
        discountedPrice: 12000,
        rating: 3
      },
      {
        id: 9,
        title: "Course 9",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel blanditiis est, sequi eveniet ratione excepturi nobis numquam magni. Tempora velit voluptatum qui, ab magni minima temporibus placeat eos aut error?",
        actualPrice: 2000,
        discountedPrice: 1500,
        rating: 1
      }
    ])
  } , [])

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/profile' element={<ProfileView />} />
        <Route path='/courses' element={<CoursesView />} />
        <Route path='/coursemoredetails/:id' element={<CourseMoreDetailsView />} />
        <Route path='/signin' element={<SignInView />} />
        <Route path='/signup' element={<SignUpView />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
