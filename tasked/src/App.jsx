import Home from "./components/home/Home"
import Navbar from "./components/navbar/Navbar"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import MyTasks from "./components/tasks/MyTasks"
import { useEffect } from "react"
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom"
import { AuthProvider } from "./AuthContext"

library.add(fas);

const RedirectToHome = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/home');
  }, [navigate]);

  return null; // renders nothing, its job is just to redirect
};


const App = () => {
  return (
    <>
    <AuthProvider>
        <Router>
          <Navbar />
          <div className="container mx-auto mt-4 min-h-screen">
            <Routes>
              <Route path="/" element={<RedirectToHome />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/mytasks" element={<MyTasks />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </>
  )
}
export default App