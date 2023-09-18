import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const Login = () => {
    const { setAuth } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                username: username,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const token = response.data.access_token;
            localStorage.setItem('token', token);
    
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
            if (response.data.success) {
                setMessage(`${username} logged in.`);
    
                setAuth(true);
    
                setTimeout(() => {
                    navigate('/mytasks');
                }, 2000);
            } else {
                setMessage(response.data.error);
            }
    
        } catch (error) {
            console.error("Error logging in:", error);
            setErrorMsg('Invalid username or password');
        }
    };
    
  return (
    <>
        <div className="min-h-screen flex items-start justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Please Sign In
                </h2>
                {error && <div className="text-red-500">{error}</div>}
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm space-y-8">
                    <div className='flex justify-center'>
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input id="username" name="username" type="text" required className="appearance-none rounded-none relative block w-3/4 px-3 py-2 border border-indigo-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-800 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='flex justify-center'>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-3/4 px-3 py-2 border border-indigo-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-800 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>

                <div>
                <div className="flex justify-center">
                    <button type="submit" className="group relative w-1/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign In
                    </button>
                </div>
                </div>
            </form>
        </div>
    </div>
        
    </>
  )
}
export default Login