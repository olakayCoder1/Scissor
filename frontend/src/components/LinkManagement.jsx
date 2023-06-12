import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../contexts/ContextProvider'
import DashboardUrlCard from './DashboardUrlCard'



function LinkManagement() {

  const effectRan = useRef(false)
  const {BACKEND_DOMAIN,setLoading,authUser,logout} = useContext(AuthContext);
  const [latest , setLatest] = useState([])
  const [ inLoad , setInLoad ] = useState(false)
  const [ deleteUrl , setDeleteUrl ] = useState(false)

  useEffect(() => {
    async function handleLink(){
      setLoading(true)
      const url = `${BACKEND_DOMAIN}/urls` 
      const response = await fetch(url , {method : 'GET', headers : {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${authUser?.tokens?.access_token}`
      },
  },)

  if(response.status === 200){
      const data = await response.json()
      console.log(data)
  }else{
      const data = await response.json()
  }
  setLoading(false)
  }

  if(effectRan.current === false){
      effectRan.current = true
      handleLink()
  }


  return () => {
      effectRan.current = true
  }
  },[])

  console.log(latest.length)

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

  return (
    <div className=' m-4 pb-24'>
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

export default LinkManagement
