import React, { createContext, useState, useContext, useEffect } from 'react';

// Creating a context to store course details
const PostContext = createContext();

// Custom hook to use the PostContext
export const usePostContext = () => useContext(PostContext);

// Course provider component
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  // Function to add a new course
  const addPost = (newPost) => {
    setPosts(newPost);
  };

  // Log the courses whenever they change
  useEffect(() => {
    console.log("Post Context", posts);
  }, [posts]);

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};