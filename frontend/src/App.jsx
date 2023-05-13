import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header'
import SideBar from './components/SideBar'
import Dashboard from './pages/Dashboard'
import LinkManagement from './pages/LinkManagement'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <div className=' bg-gray-50 font-medium text-base text-gray-700'>
        <ToastContainer />
          <Header /> 
          <div className='mt-16 flex'>
            <SideBar />
            <div className=' md:ml-[270px] h-screen grow '>
            <Routes>
              <Route path='/' element={<Dashboard />}/>
              <Route path='/links' element={<LinkManagement />}/>
            </Routes>
            </div>
          </div>
        </div>
    </Router>
  )
}

export default App
