import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
    return (
        <div className="bg-gray-100 min-h-screen">

            <section className="bg-blue-600 text-white text-center py-32">
                <h1 className="text-4xl mb-4">Welcome to Tasked</h1>
                <p className="text-lg mb-8">Your ultimate task management tool.</p>
                <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded mr-2 hover:bg-blue-200">Register</Link>
                <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded ml-2 hover:bg-blue-200">Login</Link>
            </section>


            <section className="container mx-auto py-16 px-4">
                <h2 className="text-2xl mb-8 text-center">Why Choose Tasked?</h2>
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="text-center">
                        <div className="mb-4 text-blue-500 w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-tasks text-2xl"></i>
                        </div>
                        <h3 className="mb-4 text-xl">Organize Tasks</h3>
                        <p>Streamline your tasks and boost your productivity.</p>
                    </div>
                    <div className="text-center">
                        <div className="mb-4 text-blue-500 w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-mobile text-2xl"></i>
                        </div>
                        <h3 className="mb-4 text-xl">Mobile Friendly</h3>
                        <p>Access your tasks anytime, anywhere, on any device.</p>
                    </div>
                    <div className="text-center">
                        <div className="mb-4 text-blue-500 w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-shield-alt text-2xl"></i>
                        </div>
                        <h3 className="mb-4 text-xl">Secure</h3>
                        <p>Your data is safe and secure with us. We prioritize your privacy.</p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-blue-600 text-white text-center py-16">
                <h2 className="text-2xl mb-4">Ready to manage your tasks efficiently?</h2>
                <Link to="/register" className="bg-white text-blue-600 px-6 py-3 rounded hover:bg-blue-200">Get Started for Free</Link>
            </section>
        </div>
    );
}

export default Home;
