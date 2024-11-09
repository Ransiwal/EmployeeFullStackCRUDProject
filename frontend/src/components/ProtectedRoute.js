import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { auth } = useAuth();

    console.log(auth.isLoggedIn)

    if (!auth.isLoggedIn && localStorage.getItem('user') == null) {
        
        return <Navigate to="/login" />;
    }

    
    return children;
};

export default ProtectedRoute;
