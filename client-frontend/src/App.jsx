import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


import { Routes, Route, Navigate } from 'react-router-dom'

import HomeView from './views/HomeView/HomeView'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import CoursesView from './views/CoursesView/CoursesView'
import SignInView from './views/SignInView/SignInView'
import SignUpView from './views/SignUpView/SignUpView'

import { useCourseContext } from './context/CourseContext'
import { usePostContext } from './context/PostContext'
import { useEffect } from 'react'
import CourseMoreDetailsView from './views/CourseMoreDetailsView/CourseMoreDetailsView'
import ProfileView from './views/ProfleView/ProfileView'
import PostWallView from './views/PostWallView/PostWallView'
import SettingsView from './views/SettingsView/SettingsView'
import { useUserContext } from './context/UserContext'
import { useThemeContext } from './context/ThemeContext'
import axios from 'axios'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {

  const { addCourse } = useCourseContext();
  const { addPost } = usePostContext();
  const { appTheme } = useThemeContext()
  const { user } = useUserContext()

  useEffect(() => {
    const url = import.meta.env.VITE_SERVER_URL

    axios.get(`${url}/api/getAllCourses`)
      .then(res => addCourse(res.data))
      .catch(err => console.log(err))

    axios.get(`${url}/api/post/posts`)
      .then(res => addPost(res.data))
      .catch(err => console.log(err))
  }, [])

  const currentTheme = appTheme === 'darkTheme' ? darkTheme : lightTheme;

  return (
    <>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <NavBar />
        <Routes>
          <Route path='/' element={(!user || user.length == 0) ? <HomeView /> : <PostWallView />} />
          <Route path='/profile' element={<ProfileView />} />
          <Route path='/courses' element={<CoursesView />} />
          <Route path='/settings' element={<SettingsView />} />
          <Route path='/coursemoredetails/:id' element={<CourseMoreDetailsView />} />
          <Route path='/signin' element={<SignInView />} />
          <Route path='/signup' element={<SignUpView />} />
          <Route path='/logout' element={<Navigate to="/" />} />
          {/* <Route path='/posts' element={<PostWallView />} /> */}
        </Routes>
        <Footer />

      </ThemeProvider>
    </>
  )
}

export default App
