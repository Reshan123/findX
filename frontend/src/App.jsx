import './App.css'
import { Routes, Route } from 'react-router-dom'

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

function App() {

  const { addCourse } = useCourseContext();
  const { addPost } = usePostContext();

  useEffect(() => {

    addPost([
      {
        id: 1,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quo unde modi minus perspiciatis exercitationem dolorem tempore quia, ea unde corrupti atque incidunt quasi voluptatum voluptatem! Laudantium asperiores unde distinctio incidunt veniam velit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut ipsam reiciendis tempora, asperiores repellendus ab magnam. Vero repudiandae veniam earum. Eos sed tempora neque culpa voluptate alias accusamus, ut sapiente? Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo laudantium debitis molestiae in sequi! Aliquid eos amet aspernatur autem sint illo, mollitia nisi provident esse dolore sunt maxime unde iusto! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique veritatis nobis dolor corporis eaque dolores, cupiditate eveniet? Cum beatae amet dolor corporis voluptatum placeat maxime asperiores incidunt, vero ipsam exercitationem.",
        topStory: true,
        postedOn: "2024 June 15"
      },
      {
        id: 2,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quo unde modi minus perspiciatis exercitationem doloremque suscipit et vel aliquam! Esse numquam possimus autem, quae molestiae harum mollitia omnis? Architecto. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste voluptates a praesentium ab esse dolore sunt maxime unde iusto! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique veritatis nobis dolor corporis eaque dolores, cupiditate eveniet? Cum beatae amet dolor corporis voluptatum placeat maxime asperiores incidunt, vero ipsam exercitationem.",
        topStory: true,
        postedOn: "2024 June 12"
      },
      {
        id: 3,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quo unde modi minus perspiciatis exercitationem doloremque suscipit et vel aliquam! Esse numquam possimus autem, quae molestiae harum mollitia omnis? Architecto. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste voluptates a praesentium ab tempore quia, ea unde corrupti atque incidunt quasi voluptatum voluptatem! Laudantium asperiores unde distinctio incidunt veniam velit. Lorem ipsum dolor sit amet consectetur, adipisiing elit. Explicabo laudantium debitis molestiae in sequi! Aliquid eos t maxime unde iusto! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique veritatis nobis dolor corporis eaque dolores, cupiditate eveniet? Cum beatae amet dolor corporis voluptatum placeat maxime asperiores incidunt, vero ipsam exercitationem.",
        topStory: false,
        postedOn: "2024 June 14"
      },
    ])

    addCourse([
      {
        id: 1,
        title: "Course 1",
        shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel blanditiis est, sequi eveniet ratione excepturi nobis numquam magni. Tempora velit voluptatum qui, ab magni minima temporibus placeat eos aut error?",
        longDescription: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of",
        actualPrice: 1500,
        discountedPrice: 1200,
        rating: 5
      },
      {
        id: 2,
        title: "Course 2",
        shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel blanditiis est, sequi eveniet ratione excepturi nobis numquam magni. Tempora velit voluptatum qui, ab magni minima temporibus placeat eos aut error?",
        longDescription: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of",
        actualPrice: 3000,
        discountedPrice: 0,
        rating: 4
      },
      {
        id: 3,
        title: "Course 3",
        shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel blanditiis est, sequi eveniet ratione excepturi nobis numquam magni. Tempora velit voluptatum qui, ab magni minima temporibus placeat eos aut error?",
        longDescription: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of",
        actualPrice: 1500,
        // discountedPrice: 1500,
        rating: 3
      },
      {
        id: 4,
        title: "Course 4",
        shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel blanditiis est, sequi eveniet ratione excepturi nobis numquam magni. Tempora velit voluptatum qui, ab magni minima temporibus placeat eos aut error?",
        longDescription: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of",
        actualPrice: 4500,
        discountedPrice: 2500,
        rating: 3
      },
      {
        id: 5,
        title: "Course 5",
        shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel blanditiis est, sequi eveniet ratione excepturi nobis numquam magni. Tempora velit voluptatum qui, ab magni minima temporibus placeat eos aut error?",
        longDescription: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of",
        actualPrice: 5000,
        discountedPrice: 4000,
        rating: 2
      },
      {
        id: 6,
        title: "Course 6",
        shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel blanditiis est, sequi eveniet ratione excepturi nobis numquam magni. Tempora velit voluptatum qui, ab magni minima temporibus placeat eos aut error?",
        longDescription: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of",
        actualPrice: 6500,
        discountedPrice: 4500,
        rating: 2
      },
      {
        id: 7,
        title: "Course 7",
        shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel blanditiis est, sequi eveniet ratione excepturi nobis numquam magni. Tempora velit voluptatum qui, ab magni minima temporibus placeat eos aut error?",
        longDescription: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of",
        actualPrice: 10500,
        discountedPrice: 10000,
        rating: 4
      },
      {
        id: 8,
        title: "Course 8",
        shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel blanditiis est, sequi eveniet ratione excepturi nobis numquam magni. Tempora velit voluptatum qui, ab magni minima temporibus placeat eos aut error?",
        longDescription: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of",
        actualPrice: 15000,
        discountedPrice: 12000,
        rating: 3
      },
      {
        id: 9,
        title: "Course 9",
        shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel blanditiis est, sequi eveniet ratione excepturi nobis numquam magni. Tempora velit voluptatum qui, ab magni minima temporibus placeat eos aut error?",
        longDescription: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of",
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
        <Route path='/posts' element={<PostWallView />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
