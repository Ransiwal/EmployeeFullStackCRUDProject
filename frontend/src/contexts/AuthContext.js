import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ isLoggedIn: false, user: null, token: null });

    
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            setAuth({ isLoggedIn: true, user: storedUser, token: storedToken });
        }
    }, []);

    
    const login = (user, token) => {
        console.log("Login function triggered");
    
        
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token); 
    
        console.log("User and token stored in localStorage", user, token);
        console.log("localStorage contents: ", localStorage);
    
        
        setAuth({ isLoggedIn: true, user });
    };
    


    const logout = () => {
        setAuth({ isLoggedIn: false, user: null, token: null });
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
