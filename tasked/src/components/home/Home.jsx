import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faMobile, faShieldAlt } from '@fortawesome/free-solid-svg-icons';


const Home = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = () => {
            const token = localStorage.getItem('token');
            setIsAuthenticated(!!token);
        };

        checkAuthentication();
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen">

            <section className="bg-gray-500 text-white text-center py-32">
                <h1 className="text-4xl mb-4">Welcome to Tasked</h1>
                <p className="text-lg mb-8">Your ultimate task management tool.</p>

                {!isAuthenticated && (
                    <>
                        <Link to="/register" className="bg-white text-indigo-900 px-4 py-2 rounded mr-2 hover:bg-indigo-200">Register</Link>
                        <Link to="/login" className="bg-white text-indigo-900 px-4 py-2 rounded ml-2 hover:bg-indigo-200">Login</Link>
                    </>
                )}
            </section>


            <section className="container mx-auto py-16 px-4">
                <h2 className="text-2xl mb-8 text-center">Why Choose Tasked?</h2>
                <div className="grid md:grid-cols-3 gap-12">
                <div className="text-center">
            <div className="mb-4 text-blue-500 w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faTasks} size="2x" />
            </div>
                <h3 className="mb-4 text-xl">Organize Tasks</h3>
                <p>Streamline your tasks and boost your productivity.</p>
            </div>
            <div className="text-center">
                <div className="mb-4 text-blue-500 w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faMobile} size="2x" />
                </div>
                <h3 className="mb-4 text-xl">Mobile Friendly</h3>
                <p>Access your tasks anytime, anywhere, on any device.</p>
            </div>
            <div className="text-center">
                <div className="mb-4 text-blue-500 w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faShieldAlt} size="2x" />
                </div>
                <h3 className="mb-4 text-xl">Secure</h3>
                <p>Your data is safe and secure with us. We prioritize your privacy.</p>
            </div>

                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-indigo-800 text-white text-center py-20">
                <h2 className="text-2xl mb-4">Ready to get shit done?</h2>
                <Link to="/register" className="bg-white text-indigo-900 px-6 py-3 rounded hover:bg-indigo-200">Get Started for Free</Link>
            </section>
        </div>
    );
}

export default Home;
