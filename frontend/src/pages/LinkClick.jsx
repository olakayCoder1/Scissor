import { useContext, useEffect, useRef } from 'react'
import { useParams  , useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/ContextProvider'

function LinkClick() {

    const effectRan = useRef(false)
    const navigate = useNavigate(null)
    const { id } = useParams();
    const {BACKEND_DOMAIN,setLoading} = useContext(AuthContext)


    useEffect(() => {

        async function handleLink(){
            setLoading(true)
            const url2 = `${BACKEND_DOMAIN}/urls/${id}/click` 
            const response = await fetch(url2 , {method : 'GET', headers : {
                'Content-Type': 'application/json',
            },
        },)

        if(response.status === 200){
            const data = await response.json()

            window.location.href = data.long_url;
        }else{
            const data = await response.json()
            console.log(data.long_url)
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
        },[]);

  return (
    <div>
      
    </div>
  )
}

export default LinkClick
