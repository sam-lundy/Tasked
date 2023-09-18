import Home from "./components/home/Home"
import Navbar from "./components/navbar/Navbar"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import MyTasks from "./components/tasks/MyTasks"
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

library.add(fas);

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container mx-auto mt-4 bg-[#f7f7f8] min-h-screen">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mytasks" element={<MyTasks />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}
export default App