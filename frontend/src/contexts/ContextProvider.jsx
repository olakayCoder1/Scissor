import React, {  useEffect, useState } from "react";
import { createContext  } from "react";
import { ToastContainer, toast } from 'react-toastify';
// import jwt_decode from "jwt-decode";

export const AuthContext = createContext()




export default function AuthContextProvider({children}){
    
    
    // const BACKEND_DOMAIN = 'http://127.0.0.1:8000'
    const BACKEND_DOMAIN = 'https://web-production-fd13.up.railway.app'

    // const FRONTEND_DOMAIN = 'http://127.0.0.1:3000'                   
    const FRONTEND_DOMAIN = 'https://loanit.vercel.app'                   
    // TOKEN STATE 
    // USER DETAIL STATE 
    const [ authUser , setAuthUser ] = React.useState(()=> JSON.parse(localStorage.getItem('authUser'))|| null);
    // LOADING STATE TO DETERMINE WHEN TO UPDATE TOKEN 
    // const [ loginError, setLoginError] = useState(false)

    const [ Loading , setLoading ] = useState(null)
     // REFRESH TOKEN WHILE USER STILL ONLINE 
 
    

    const [ authToken , setAuthToken  ] = React.useState(()=> JSON.parse(localStorage.getItem('authToken'))|| null);
    const [ showNavigationBar , setShowNavigationBar] = useState(false)
    // const [ showNavigationBar , setShowNavigationBar] = useState(()=> JSON.parse(localStorage.getItem('showNavigationBar')) || false )
    const [ isAuthenticated, setIsAuthenticated  ]  = useState(()=> JSON.parse(localStorage.getItem('isAuthenticated'))|| false )
 

   


    function logout(){
        displayNotification('info','You are logged out')
        localStorage.clear()
        window.location.pathname = '/'
    }

    function login(){
        setIsAuthenticated(true)
        localStorage.setItem('isAuthenticated', JSON.stringify(true))
    }


    async  function fetchUser(){
        if(authUser === null || authUser === 'undefined' ){
            window.location.pathname = '/signin'
        }
        const url2 = `${BACKEND_DOMAIN}/api/v1/account` 
        const response = await fetch(url2 , {method : 'GET', headers : {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${authToken?.access}`
        }})

        if(response.status === 200){
            const data = await response.json()
            setAuthUser(data)
            localStorage.setItem('authUser', JSON.stringify(data))
        }
        if(response.status === 400){
            const data = await response.json()
            displayNotification('error', data['detail'])
        }
        if(response.status === 404){
            const data = await response.json()
            displayNotification('error', data['detail'])
        }
        if(response.status == 401){
            localStorage.clear()
            window.location.pathname = '/signin'
        }
    }


    const [ currentPath, setCurrentPath] = useState(null) 

   useEffect(() => {
      setCurrentPath(window.location.pathname)
  
    }, [currentPath]);

    function displayNotification(type, text ){
        console.log('Notification')
        if(type==='info'){
            toast.info(`${text}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
        else if(type==='success'){
            toast.success(`${text}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
        else if(type==='error'){
            toast.error(`${text}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }else{
            toast(`${text}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
    }


 const value = { 
    showNavigationBar , setShowNavigationBar, displayNotification,currentPath, setCurrentPath
 }
     



    
    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}