import { useContext, useEffect, useState } from 'react'
import DashboardBreakDownCard from './DashboardBreakDownCard'
import DashboardUrlCard from './DashboardUrlCard'
import { AiOutlineLink  } from 'react-icons/ai'
import {TbHandClick} from 'react-icons/tb'
import {MdAdd} from 'react-icons/md'
import { AuthContext } from '../contexts/ContextProvider'
import InAppLoading from './InAppLoading'


function Dashboard() {
    const {displayNotification,BACKEND_DOMAIN, authUser, logout} = useContext(AuthContext)
    const [longUrl , setLongUrl] = useState('')
    const [urlBreakDown , setUrlBreakDown] = useState({
        'totalUrls': 0,
        'totalClicks': 0, 
    })
    const [latest , setLatest] = useState([])
    const [ inLoad , setInLoad ] = useState(false)
    const [ deleteUrl , setDeleteUrl ] = useState(false)


    async function handleDeleteClick(id){
        console.log('Button clicked in parent component', id );
        const url = `${BACKEND_DOMAIN}/urls/${id}`
        const response = await fetch(url , {method : 'DELETE', headers : {
            'Content-Type': 'application/json',   
            'Authorization' : `Bearer ${authUser?.tokens?.access_token}`
        }},)
        if(response.status === 204){
            setDeleteUrl(true)  
        }
        if(response.status === 401){
            logout()
        }
        if(response.status === 500){
            displayNotification('error', 'Internal server error occurred')
        }
      };

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
            console.log(response.status)
            if(response.status === 200){
                const data = await response.json()
                const val = latest
                val.unshift(data)
                setLatest(val) 
                displayNotification('success','Shorten url created')
                setUrlBreakDown(( prev => {
                    return { ...prev , 'totalUrls': urlBreakDown.totalUrls + 1 }
                  }))
                setLongUrl('')
            }else if(response.status === 400){
                const data = await response.json()
                displayNotification('error','The url is not invalid') 
            }else if(response.status === 401){
                // const data = await response.json()
                logout()
            }else{
                // 
            }  
            setInLoad(false)
        }else{
            displayNotification('error','Kindly input a url')
        }
        
    }


    useEffect(()=> {

        async function fetchBreakDown(){
            const url = `${BACKEND_DOMAIN}/urls/breakdown` 
            const response = await fetch(url , {method : 'GET', headers : {
                'Content-Type': 'application/json',   
                'Authorization' : `Bearer ${authUser?.tokens?.access_token}`
            }},)
            if(response.status === 200){
                const data = await response.json()
                setUrlBreakDown(data)   
            }
            if(response.status === 401){
                logout()
            }
        }

        async function fetchLatest(){
            setInLoad(true)
            const url = `${BACKEND_DOMAIN}/urls/latest` 
            if(authUser){
                const response = await fetch(url , {method : 'GET', headers : {
                    'Content-Type': 'application/json',   
                    'Authorization' : `Bearer ${authUser?.tokens?.access_token}`
                }},)
                if(response.status === 200){
                    const data = await response.json()
                    setLatest(data)   
                }
                if(response.status === 401){
                    logout()
                }
            }
            setInLoad(false)  
        }
       
        fetchLatest()
        fetchBreakDown()

        
      },[deleteUrl]) 


  return (
    <div className=' m-4 pb-24'>
      <div className='w-full bg-white md:h-36 rounded-md flex flex-col  md:grid grid-cols-1 md:grid-cols-3 gap-4 p-4'>
        <DashboardBreakDownCard Icon={AiOutlineLink} cardName="ALL URLS" total={urlBreakDown && urlBreakDown?.totalUrls}/>
        <DashboardBreakDownCard Icon={TbHandClick} cardName="TOTAL CLICKS" total={urlBreakDown && urlBreakDown?.totalClicks}/>
        <DashboardBreakDownCard Icon={MdAdd} cardName="URLS ADDED THIS MONTH" total={urlBreakDown && urlBreakDown?.totalUrls}/>
      </div>
        
        <form className=' my-6  max-w-xl' onSubmit={handleSubmit}>   
            <label htmlFor="shorten" className="mb-2 text-sm font-medium sr-only ">Paste long url and shorten it</label>
            <div className="relative z-10 ">
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
            {latest.length > 0 && latest?.map((val)=> {
                return (<DashboardUrlCard key={val.uuid} urlData={val} handleDeleteClick={(id) => handleDeleteClick(id)}/>)
            })}
            </>
        )}
            
        </div>
       
    </div>
  )
}

export default Dashboard
