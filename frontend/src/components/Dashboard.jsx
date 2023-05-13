import { useContext, useEffect, useState } from 'react'
import DashboardBreakDownCard from './DashboardBreakDownCard'
import DashboardUrlCard from './DashboardUrlCard'
import { AiOutlineLink, AiFillSignal, AiOutlineDownload } from 'react-icons/ai'
import {TbHandClick} from 'react-icons/tb'
import {MdAdd} from 'react-icons/md'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { AuthContext } from '../contexts/ContextProvider'



function Dashboard() {
    const {displayNotification} = useContext(AuthContext)
    const [longUrl , setLongUrl] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(longUrl){
            displayNotification('success','Shorten url created')
            setLongUrl('')
        }else{
            displayNotification('error','Kindly input a url')
        }
        
    }
  return (
    <div className=' m-4 pb-24'>
      <div className='w-full bg-white h-36 rounded-md grid grid-cols-1 md:grid-cols-3 gap-4 p-4'>
        <DashboardBreakDownCard Icon={AiOutlineLink} cardName="ALL URLS" total={3}/>
        <DashboardBreakDownCard Icon={TbHandClick} cardName="TOTAL CLICKS" total={3}/>
        <DashboardBreakDownCard Icon={MdAdd} cardName="URLS ADDED THIS MONTH" total={3}/>
      </div>

        {/* <div className=' fixed top-0 left-0 right-0 bottom-0 bg-gray-50 z-50 '>
            <div className='mx-auto max-w-2xl h-screen flex justify-center items-center'>
                <DashboardUrlCard />
            </div>
        </div> */}

      
        <form className=' my-6  max-w-xl' onSubmit={handleSubmit}>   
            <label htmlFor="shorten" className="mb-2 text-sm font-medium sr-only ">Paste long url and shorten it</label>
            <div className="relative">
                <input type="text"  value={longUrl} onChange={(e)=>setLongUrl(e.target.value)} 
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

        <div>
            
            <DashboardUrlCard />
            <DashboardUrlCard />
            <DashboardUrlCard />
        </div>
       
    </div>
  )
}

export default Dashboard
