import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('authtoken');
  if (!token) {
    return <Navigate to="/login" />;
  }

  const user = JSON.parse(atob(token.split('.')[1]));
  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
