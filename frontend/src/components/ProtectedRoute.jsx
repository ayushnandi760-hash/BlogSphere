import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated guests to login route
    return <Navigate to="/login" replace />;
  }

  // Render child views or nested router routes
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
