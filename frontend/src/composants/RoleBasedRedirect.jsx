import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requiredRole }) => {
    const auth = useSelector(state => state.auth);

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const userRole = auth.user?.role?.toLowerCase().trim();
    const required = requiredRole.toLowerCase().trim();

    if (userRole !== required) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
