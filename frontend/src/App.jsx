import { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from './contexts/ContextProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register';
import Login from './pages/Login';
import DashboardWrap from './pages/DashboardWrap';
import LoadingSpinner from './components/LoadingSpinner';
import Welcome from './pages/Welcome';
import LinkClick from './pages/LinkClick';
import NonFound from './pages/NonFound';

function App() {
  const {  loading   }= useContext(AuthContext)
  

  return (
    <Router>
        <div className=' h-screen bg-gray-50 font-medium text-sm text-gray-700'>
          {loading  &&  <LoadingSpinner /> }    
          <ToastContainer />
            <Routes>
              <Route path='/' element={<Welcome />}/>
              <Route path='/dashboard' element={<DashboardWrap />}/>
              <Route path='/c/:id' element={<LinkClick />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
              <Route path="*" element={<NonFound />} />
            </Routes>
        </div>
    </Router>
  )
}

export default App
