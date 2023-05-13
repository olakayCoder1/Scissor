import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/ContextProvider'
import {
   AiOutlineDashboard , 
   AiOutlineLink , 
   AiOutlineSetting,
   AiOutlineLogout,
   AiOutlineLogin
} from 'react-icons/ai'
import { Link } from "react-router-dom";


function SideBarLink({Icon, linkName , linkLocation }){

   const {currentPath, setCurrentPath} = useContext(AuthContext)

   return (
      <li  onClick={()=> setCurrentPath(linkLocation) }className={`${currentPath === linkLocation ? 'border-l-4 border-going-primary bg-blue-50' : ""}`}>
         <Link to={linkLocation} className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 ">
            <p className=' text-gray-500'>
               <Icon className=' w-6 h-6'/>
            </p>
            <span className="ml-3">{linkName}</span>
         </Link>
      </li>
   )
}




function SideBar() {
   
   const [ currentPath, setCurrentPath] = useState(null) 

   useEffect(() => {
      setCurrentPath(window.location.pathname)
  
    }, [currentPath]);
  return (
    <div className="w-[270px] overflow-y-auto fixed left-0 bottom-0 top-16">
      <aside  className="w-full left-0  h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
         <div className="h-full px-3 py-4 overflow-y-auto  border-r-2 border-gray-200 bg-white">
            <div  className="p-4  rounded-lg bg-blue-50 ">
               <div className="flex items-center mb-3">
                  <span className="bg-orange-100 text-orange-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ">programmerolakay@gmail.com</span>
               </div>
               <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
                  Buy a subscription to use more professional features without displaying ads
               </p>
               <a className="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" href="#">Buy subscription</a>
            </div>
            <h2 className=' p-2 text-gray-900'>General</h2>
            <ul className="space-y-2 font-medium">
               <SideBarLink Icon={AiOutlineDashboard} linkName="Dashboard" linkLocation='/' />
               <SideBarLink Icon={AiOutlineLink} linkName="Link Management" linkLocation='/links' />
               <SideBarLink Icon={AiOutlineSetting} linkName="Settings" linkLocation='#' />
               <SideBarLink Icon={AiOutlineLogout} linkName="Log Out" linkLocation='#' />
               <SideBarLink Icon={AiOutlineLogin} linkName="Log In" linkLocation='#' />
               <Link to="/" className="flex items-center p-2 px-4 hover:bg-going-secondary">
                  <AiOutlineSetting className="w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 " />
                  <span className="ml-3">portable</span>
               </Link>
            </ul>
            
            
         </div>
      </aside>



    </div>
  )
}

export default SideBar
