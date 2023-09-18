import React, { createContext, useState, useContext, useCallback } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const setAuth = useCallback((auth) => {
        setIsAuthenticated(auth);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
