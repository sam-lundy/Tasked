import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const Navbar = () => {
    const { isAuthenticated, setAuth } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        const updateAuthStatus = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
        };

        window.addEventListener('storage', updateAuthStatus);

        return () => {
            window.removeEventListener('storage', updateAuthStatus);
        };
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setAuth(false);
        navigate('/login');
    };

    return (
        <div className="bg-indigo-800 p-4 text-white">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">
                        <Link to="/home" className="text-white hover:text-indigo-200">
                            Tasked
                        </Link>
                    </h1>
                    <nav>
                        <ul className="flex space-x-4">
                            {isAuthenticated ? (
                                <>
                                    <li>
                                        <Link to="/mytasks" className="hover:text-indigo-200">My Tasks</Link>
                                    </li>
                                    <li>
                                        <button onClick={handleSignOut} className="hover:text-indigo-200">Sign Out</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/register" className="hover:text-blue-400">Register</Link>
                                    </li>
                                    <li>
                                        <Link to="/login" className="hover:text-blue-400">Login</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
    
};

export default Navbar;
