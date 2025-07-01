
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * A higher-order component that protects routes based on user authentication and role
 * @param {Object} props
 * @param {React.ComponentType} props.component - The component to render if authorized
 * @param {Array<string>} [props.allowedRoles] - Optional array of roles allowed to access this route
 * @param {boolean} [props.requireAuth=true] - Whether authentication is required (defaults to true)
 */
const ProtectedRoute = ({ component: Component, allowedRoles = [], requireAuth = true }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Still loading authentication state
  if (loading) {
    return <div className="loading">Loading authentication...</div>;
  }

  // Not authenticated but authentication required
  if (requireAuth && !user) {
    // Redirect to login page, but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated but role check fails
  if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect based on role
    if (user.role === 'admin') {
      return <Navigate to="/dashboard/admin" replace />;
    } else {
      return <Navigate to="/dashboard/attendance" replace />;
    }
  }

  // All checks passed, render the component
  return <Component />;
};

export default ProtectedRoute;