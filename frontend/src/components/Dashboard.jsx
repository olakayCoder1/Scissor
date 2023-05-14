import { useContext, useEffect, useState } from 'react'
import DashboardBreakDownCard from './DashboardBreakDownCard'
import DashboardUrlCard from './DashboardUrlCard'
import { AiOutlineLink, AiFillSignal, AiOutlineDownload } from 'react-icons/ai'
import {TbHandClick} from 'react-icons/tb'
import {MdAdd} from 'react-icons/md'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { AuthContext } from '../contexts/ContextProvider'
import InAppLoading from './InAppLoading'


function Dashboard() {
    const {displayNotification,BACKEND_DOMAIN, authUser, logout} = useContext(AuthContext)
    const [longUrl , setLongUrl] = useState('')
    const [urlBreakDown , setUrlBreakDown] = useState(null)
    const [latest , setLatest] = useState(null)
    const [ inLoad , setInLoad ] = useState(false)



    async function handleSubmit(e){
        e.preventDefault()
        setInLoad(true)
        if(longUrl){
            const url2 = `${BACKEND_DOMAIN}/urls/create` 
            const response = await fetch(url2 , {method : 'POST', headers : {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${authUser?.tokens?.access_token}`    
            },
            body: JSON.stringify({'long_url': longUrl}) 
            },)
            if(response.status === 200){
                const data = await response.json()
                const val = latest
                val.unshift(data)
                setLatest(val) 
                displayNotification('success','Shorten url created')
                setLongUrl('')
            }else if(response.status === 400){
                    const data = await response.json()
                    displayNotification('error','The url is not invalid') 
            }else{
                // 
            } 
            setInLoad(false)
        }else{
            displayNotification('error','Kindly input a url')
        }
        
}


    useEffect(()=> {
        if(authUser){
          setInLoad(true)
          const url = `${BACKEND_DOMAIN}/urls/breakdown`   
          const url1 = `${BACKEND_DOMAIN}/urls/latest`  
          Promise.all([
          fetch(url , {method : 'GET', headers : {
              'Content-Type': 'application/json',
              'Authorization' : `Bearer ${authUser?.tokens?.access_token}`
          }}),
          fetch(url1,{method : 'GET', headers : {  
                'Content-Type': 'application/json',   
                'Authorization' : `Bearer ${authUser?.tokens?.access_token}`
            }},)
            ]).then(function (responses) {
              // Get a JSON object from each of the responses
              return Promise.all(responses.map(function (response) {
                return response.json();
              }));
            }).then(function (data) { 
                setUrlBreakDown(data[0])
                setLatest(data[1])
            }).catch(function (error) {
              // if there's an error, log it   
              console.log(error)
            });  
            setInLoad(false)
        }

        
      },[])


  return (
    <div className=' m-4 pb-24'>
      <div className='w-full bg-white h-36 rounded-md grid grid-cols-1 md:grid-cols-3 gap-4 p-4'>
        <DashboardBreakDownCard Icon={AiOutlineLink} cardName="ALL URLS" total={urlBreakDown?.totalUrls}/>
        <DashboardBreakDownCard Icon={TbHandClick} cardName="TOTAL CLICKS" total={urlBreakDown?.totalClicks}/>
        <DashboardBreakDownCard Icon={MdAdd} cardName="URLS ADDED THIS MONTH" total={urlBreakDown?.totalUrls}/>
      </div>

 

      
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
        {inLoad ? (
            <InAppLoading />
            ): (
            <> 
            {latest && latest?.map((val)=> {
                return (<DashboardUrlCard key={val.uuid} urlData={val}/>)
            })}
            </>
        )}
            
        </div>
       
    </div>
  )
}

export default Dashboard
