import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    // Check the authentication status when the component mounts
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <div className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                <Link to="/home" className="text-white hover:text-blue-400">
                    Tasked
                </Link>
                </h1>
                    <nav>
                        <ul className="flex space-x-4">
                            {isAuthenticated ? (
                                <>
                                    <li>
                                        <Link to="/mytasks" className="hover:text-blue-400">My Tasks</Link>
                                    </li>
                                    <li>
                                        <button onClick={handleSignOut} className="hover:text-blue-400">Sign Out</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/home" className="hover:text-blue-400">Home</Link>
                                    </li>
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
