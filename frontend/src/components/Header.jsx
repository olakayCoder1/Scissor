import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/ContextProvider'
import {RxHamburgerMenu} from 'react-icons/rx'
import { Link } from "react-router-dom";

function Header() {

  const {setShowNavigationBar,showNavigationBar} = useContext(AuthContext)

  return (
    
<nav className="bg-white fixed  h-16 w-full z-20 top-0 left-0 border-b border-gray-200 ">
  <div className=" flex flex-wrap items-center justify-between mx-auto p-4 ">
    <div className=" flex items-center gap-4">
      <p onClick={()=> setShowNavigationBar(!showNavigationBar)} className=' cursor-pointer'> 
        <RxHamburgerMenu className=' w-6 h-6 '/>
      </p>
      <Link to='/' class="flex items-center text-blue-600">          
          <span to='/' class="navbar-brand " >
              <svg class="w-5 h-5 ml-2 lg:ml-0 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path fill="currentColor" d="M485.5 0L576 160H474.9L405.7 0h79.8zm-128 0l69.2 160H149.3L218.5 0h139zm-267 0h79.8l-69.2 160H0L90.5 0zM0 192h100.7l123 251.7c1.5 3.1-2.7 5.9-5 3.3L0 192zm148.2 0h279.6l-137 318.2c-1 2.4-4.5 2.4-5.5 0L148.2 192zm204.1 251.7l123-251.7H576L357.3 446.9c-2.3 2.7-6.5-.1-5-3.2z"></path>
              </svg>
          </span>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UrlShorter</span>

      </Link>
    </div>
  
  <div className="flex md:order-2">
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 ">Your account</button>
  </div>
  </div>
</nav>

  )
}

export default Header
