import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/ContextProvider'
import Dashboard from "../components/Dashboard"
import Header from "../components/Header"
import SideBar from "../components/SideBar"

function DashboardWrap() {

  const {showNavigationBar} = useContext(AuthContext)
  return (
    <>
      <Header /> 
        <div className='mt-16 flex'>
            <SideBar />
            <div className={`${showNavigationBar ? "md:ml-[270px]   h-screen" : ""} '  grow '`}>
                <Dashboard />
            </div>
        </div>
    </>
  )
}

export default DashboardWrap
