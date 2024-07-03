import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AdminHome from './components/AdminHome';
import UserManagement from './components/UserManagement'; 
import { AuthProvider } from './context/AuthContext';
import SignInSide from './views/Login';
import CourseManagement from './components/CourseManagement';
import PostManagement from './components/PostManagement';

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
        </Route>
      </Routes>
    </Router>
  </AuthProvider>
  );
}

export default App;
