import React from 'react'
import {RxHamburgerMenu} from 'react-icons/rx'


function Header() {
  return (
    
<nav className="bg-white fixed  h-16 w-full z-20 top-0 left-0 border-b border-gray-200 ">
  <div className=" flex flex-wrap items-center justify-between mx-auto p-4 ">
    <div className=" flex items-center gap-4">
      <p className=' cursor-pointer'>
        <RxHamburgerMenu className=' w-6 h-6 '/>
      </p>
      <a href="#" className="flex items-center">
          <img src="https://avatars.githubusercontent.com/u/95700260?v=4" className="h-8 mr-3" alt="UrlShorter Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UrlShoter</span>
      </a>
    </div>
  
  <div className="flex md:order-2">
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 ">Your account</button>
  </div>
  </div>
</nav>

  )
}

export default Header
