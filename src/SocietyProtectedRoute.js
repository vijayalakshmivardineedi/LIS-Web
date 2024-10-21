
import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const SocietyProtectedRoute = ({ children }) => {
  const societytoken = localStorage.getItem('societytoken');
  const societyAdmin = localStorage.getItem('societyAdmin');

  if (!societyAdmin || !societytoken) {
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwtDecode(societytoken);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('societytoken');
      localStorage.removeItem('societyAdmin');
      return <Navigate to="/" />;



      
    }
  } catch (error) {
    localStorage.removeItem('societytoken');
    localStorage.removeItem('societyAdmin');
    return <Navigate to="/" />;
  }

  return children;
};

export default SocietyProtectedRoute;
