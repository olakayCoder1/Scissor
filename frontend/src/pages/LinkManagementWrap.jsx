import LinkManagement from "../components/LinkManagement"
import Header from "../components/Header"
import SideBar from "../components/SideBar"

function LinkManagementWrap() {
  return (
    <>
      <Header /> 
        <div className='mt-16 flex'>
            <SideBar />
            <div className=' md:ml-[270px] h-screen grow '>
                <LinkManagement />
            </div>
        </div>
    </>
  )
}

export default LinkManagementWrap
