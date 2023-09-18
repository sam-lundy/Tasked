import axios from 'axios';
import { useState, setMessage } from 'react';
import { useNavigate } from 'react-router-dom';
axios.defaults.baseURL = 'http://localhost:5000';



const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            console.error("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                username: username,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            
            if (response.data.success) {
                setMessage(`Welcome ${username}! Registration successful.`);
                setTimeout(() => {
                  navigate('/login');
                }, 3000);
              } else {
                setMessage(response.data.error);
              }

        } catch (error) {
            console.error("Error registering user:", error);
        }
    };


  return (
    <>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-16 px-8 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-10">
                <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                </div>
                <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm space-y-4">
                    <div>
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input id="username" name="username" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                        <input id="confirmPassword" name="confirmPassword" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Register
                    </button>
                </div>
                </form>
            </div>
        </div>
    </>
  )
}
export default Register