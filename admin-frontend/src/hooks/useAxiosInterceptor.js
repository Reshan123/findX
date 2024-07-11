import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance'; // Import the Axios instance

const useAxiosInterceptor = () => {
  const navigate = useNavigate();
  const [showReloginMessage, setShowReloginMessage] = useState(false);

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          // JWT expired, show re-login message
          setShowReloginMessage(true);
        }
        return Promise.reject(error);
      }
    );

    // Clean up interceptor on unmount or as needed
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, []);

  const handleRelogin = () => {
    navigate('/login');
    setShowReloginMessage(false);
  };

  return { showReloginMessage, handleRelogin };
};

export default useAxiosInterceptor;
