import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AdminHome from './components/AdminHome';
import UserManagement from './components/UserManagement'; 
import { AuthProvider } from './context/AuthContext';
import SignInSide from './views/Login';
import CourseManagement from './components/CourseManagement';
import PostManagement from './components/PostManagement';
import AddContent from './components/AddCourseContent';
import CourseContent from './components/contentManagement';
import ManageCourseContent from './components/test';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<SignInSide/>} />
        <Route path="/" element={<Dashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="users" element={<UserManagement />} /> 
          <Route path="courses" element={<CourseManagement/> }/>
          <Route path="posts" element={<PostManagement/> } />
          <Route path="logout" element={<div>Logout</div>} />
          <Route path="/manage-content/:courseId" element={<ManageCourseContent />} />
          <Route path="courseContent" element={<CourseContent />} />
        </Route>
      </Routes>
    </Router>
  </AuthProvider>
  );
}

export default App;
