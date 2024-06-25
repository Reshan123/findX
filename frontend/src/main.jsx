import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { CourseProvider } from './context/CourseContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <CourseProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CourseProvider>,
  // </React.StrictMode>
)
