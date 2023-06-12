import React, {  useEffect, useState } from "react";
import { createContext  } from "react";
import useAuth from "../hooks/useAuth";



export const UrlContext = createContext();




export default function UrlContextProvider({children}){
    

    const {authUser, logout} = useAuth();
    
    // const BACKEND_DOMAIN = 'http://127.0.0.1:8000'
    const BACKEND_DOMAIN = 'http://127.0.0.1:5000/api/v1'
    // const FRONTEND_DOMAIN = 'http://127.0.0.1:3000'                   
    const FRONTEND_DOMAIN = 'https://loanit.vercel.app'       


    const [urlBreakDown, setUrlBreakDown] = useState([])
    const [latest, setLatest] = useState([])
    const [inLoad, setInLoad] = useState(false)


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
    

    value = {
        fetchBreakDown, urlBreakDown , latest , inLoad
    }
    return (
        <UrlContext.Provider value={value} >
            {children}
        </UrlContext.Provider>
    )
}