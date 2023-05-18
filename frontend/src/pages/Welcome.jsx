import React from 'react'
import { Link } from "react-router-dom";

function Welcome() {
  return (
<div>

  <section class="mb-40">
    <nav class="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
      <div class="px-6 w-full flex flex-wrap items-center justify-between">
        <Link to='/' class="flex items-center text-blue-600">          
            <span to='/' class="navbar-brand " >
                <svg class="w-5 h-5 ml-2 lg:ml-0 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path fill="currentColor" d="M485.5 0L576 160H474.9L405.7 0h79.8zm-128 0l69.2 160H149.3L218.5 0h139zm-267 0h79.8l-69.2 160H0L90.5 0zM0 192h100.7l123 251.7c1.5 3.1-2.7 5.9-5 3.3L0 192zm148.2 0h279.6l-137 318.2c-1 2.4-4.5 2.4-5.5 0L148.2 192zm204.1 251.7l123-251.7H576L357.3 446.9c-2.3 2.7-6.5-.1-5-3.2z"></path>
                </svg>
            </span>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UrlShorter</span>

        </Link>
        <div class="flex items-center lg:ml-auto">
          <Link to='/login'  type="button" class="inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light">Login</Link>
          <Link to="/register" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light">Sign up for free</Link>
        </div>
      </div>
    </nav>
 

    <div class="text-center bg-gray-50 text-gray-800 py-24 px-6">
      <h1 class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">Experience full control<br /><span class="text-blue-600">over your short links</span></h1>
      <Link to="/register" class="inline-block px-7 py-3 mr-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light" href="#!" role="button">Get started</Link>
      <a  class="inline-block px-7 py-3 bg-transparent text-blue-600 font-medium text-sm leading-snug uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light" href="https://www.linkedin.com/in/olanrewaju-abdulkabeer/" target="_blank" rel="noopener noreferrer" role="button">Learn more</a>
    </div>
    
    

  <form className=' my-6 max-w-xl mx-auto p-4' >   
      <label htmlFor="shorten" className="mb-2 text-sm font-medium sr-only ">Paste long url and shorten it</label>
      <div className="relative">
          <input type="text"  
              className="block w-full p-4 py-5 pl-10  font-normal border
                  border-gray-300 rounded-xl bg-white focus:ring-0 
                  focus:outline-none focus:border-blue-500" placeholder="Paste long url and shorten it"  />
          <button type="submit" 
              className="text-white absolute right-2.5 bottom-2 bg-blue-700 
                  hover:bg-blue-800 focus:ring-0 focus:outline-none
                  0 font-medium rounded-lg text-sm px-4 py-4 "
          >SHORTEN</button>
      </div>   
  </form>
  </section>

  


</div>
 )
}

export default Welcome
