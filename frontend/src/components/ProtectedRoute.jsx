import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    let userRole = localStorage.getItem('userRole');
    console.log('ProtectedRoute userRole:', userRole, 'requiredRole:', requiredRole);

    if (!userRole) {
        return <Navigate to="/login" replace />;
    }

    userRole = userRole.toLowerCase().trim();
    const required = requiredRole.toLowerCase().trim();

    if (userRole !== required) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
