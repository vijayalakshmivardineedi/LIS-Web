
import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const superAdmin = localStorage.getItem('superAdmin');

  if (!superAdmin || !token) {
    return <Navigate to="/Login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token');
      localStorage.removeItem('superAdmin');
      return <Navigate to="/Login" />;
    }
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('superAdmin');
    return <Navigate to="/Login" />;
  }

  return children;
};

export default ProtectedRoute;
