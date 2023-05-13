import Dashboard from "../components/Dashboard"
import Header from "../components/Header"
import SideBar from "../components/SideBar"

function DashboardWrap() {
  return (
    <>
      <Header /> 
        <div className='mt-16 flex'>
            <SideBar />
            <div className=' md:ml-[270px] h-screen grow '>
                <Dashboard />
            </div>
        </div>
    </>
  )
}

export default DashboardWrap
