import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Creating a context to store course details
const UserContext = createContext();

// Custom hook to use the CourseContext
export const useUserContext = () => useContext(UserContext);

// Course provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Function to add a new course
  const addUser = (newCourse) => {
    setUser(newCourse);
  };

  useEffect(() => {
    const url = import.meta.env.VITE_SERVER_URL ;
    const LSUser = JSON.parse(localStorage.getItem('user'));
    addUser([])
    if(LSUser){
      if(LSUser.length != 0){
        if (url){
          axios.get(`${url}/api/auth/user/validateUser`, {
            headers: {
              Authorization : `Bearer ${LSUser[0]}` 
            }
          })
          .then(res => {
            addUser(LSUser)
            console.log("VALID USER TOKEN")
          })
          .catch(err => {
            addUser([])
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify([]))
            navigate('/signin')
          })
        }
      }
    }
    // addUser(JSON.parse(localStorage.getItem('user')))
  }, [])

  // Log the courses whenever they change
  useEffect(() => {
    console.log("User Context", user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, addUser }}>
      {children}
    </UserContext.Provider>
  );
};