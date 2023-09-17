import Register from "./components/register/Register"
import Login from "./components/login/Login"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<div>App Home</div>} />
          </Routes>
        </div>
      </Router>
    </>
  )
}
export default App