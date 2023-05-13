import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register';
import Login from './pages/Login';
import DashboardWrap from './pages/DashboardWrap';
import LinkManagementWrap from './pages/LinkManagementWrap';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <div className=' bg-gray-50 font-medium text-base text-gray-700'>
        <ToastContainer />
          <Routes>
            <Route path='/' element={<DashboardWrap />}/>
            <Route path='/links' element={<LinkManagementWrap />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
          </Routes>
        </div>
    </Router>
  )
}

export default App
