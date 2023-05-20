import { useContext } from 'react'
import { AuthContext } from '../contexts/ContextProvider'
import { AiFillSignal, AiOutlineDownload } from 'react-icons/ai'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { Link } from "react-router-dom"; 


function DashboardUrlCard({urlData,handleDeleteClick}) {
    const {displayNotification,BACKEND_DOMAIN, authUser, logout} = useContext(AuthContext)

    const downloadQrCode = () => {
        const ele = document.getElementById(urlData.url_code)
        ele.click()
        displayNotification('success','Link Qrcode downloaded')
    };

    const handleClick = () => {
        handleDeleteClick(urlData.uuid);
      };
  return (
    <div className=' w-full bg-white p-4 rounded-md shadow-lg my-4'>
        <div className=' flex justify-between items-center rounded-md text-xs'>
            <p></p>
            <time className='w-fit p-1 px-2 border border-gray-200'>{urlData?.created_at}</time>
        </div>
        <div className=' font-normal'>
            <h3 className=' text-gray-900 text-base'>{urlData?.title}</h3> 
            <Link to={urlData?.long_url} className=' text-gray-500' target="_blank" rel="noopener noreferrer">{urlData?.long_url}</Link>
            <hr className=' my-2'/>
            <Link to={urlData?.short_url} className=' text-green-500' target="_blank" rel="noopener noreferrer">{urlData?.short_url}</Link>
        </div>

        <div className=' flex justify-between items-center mt-2'>
            <div className=' flex items-center gap-4'>
                <p onClick={downloadQrCode} className=' p-2 rounded-full bg-blue-100 text-blue-600 w-fit cursor-pointer'>
                    <AiOutlineDownload className=' w-5 h-5'/>
                </p>
                <a id={urlData?.url_code} className=' hidden' href={`${BACKEND_DOMAIN}/urls/${urlData?.url_code}/qrcode`}>kkdkd</a>
                <p onClick={handleClick} className=' p-2 rounded-full bg-red-100 text-red-600 w-fit cursor-pointer'>
                    <RiDeleteBin6Line className=' w-5 h-5'/>
                </p>
            </div>
            <div className='w-fit p-1 flex gap-1 items-center text-sm font-medium text-blue-600 border-[1px] border-blue-600 rounded-lg'>
                <AiFillSignal className=' w-4 h-4'/>
                <span className='p-1 bg-blue-600 text-white rounded-md '>{urlData?.clicks}</span>
                <span>clicks</span>
            </div>
        </div>
    </div>
  )
}

export default DashboardUrlCard
