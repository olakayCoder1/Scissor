import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/ContextProvider'
import { Link } from "react-router-dom";

function Register() {

    const {displayNotification,BACKEND_DOMAIN,setLoading, setAuthUser} = useContext(AuthContext)

    const [onboardingData , setOnboardingData] = useState({
        'password1':'',
        'password2':'',
        'email':'',
    })

    function handleValueChange( key , val ){
        setOnboardingData( prev => {
          return { ...prev , [key]: val }
        })
      }


    async function handleSubmit(e){
        e.preventDefault()
        if(onboardingData.password1 && onboardingData.email && onboardingData.password2 ){
            setLoading(true)
            const url2 = `${BACKEND_DOMAIN}/auth/signup`  
            const response = await fetch(url2 , {method : 'POST', headers : {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(onboardingData)
        },)
        if(response.status === 201){
            const data = await response.json()
            setAuthUser(data)
            localStorage.setItem('authUser', JSON.stringify(data))
            displayNotification('success', 'Account created successfully')
            navigate('/dashboard')
        }else{
            const data = await response.json()
            console.log(data)
            displayNotification('error', data['message']) 
        }
        }else{
            displayNotification('error', 'All field are required')
        }
        setLoading(false)
    }

  return (
    <div className='flex items-center justify-center h-screen mb-12 bg-blue-700'>
      {/* Overlay */}
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]' />
      <div className='z-[2] w-full max-w-sm'>
        <div className=' w-full  mx-auto py-6 p-4 border bg-white rounded shadow-md'>
            <div className=' w-full flex items-center place-content-center gap-4  py-4 pb-12 r  '>
            <Link to='/' className="flex items-center text-blue-600">          
                <span to='/' className="navbar-brand " >
                    <svg className="w-5 h-5 ml-2 lg:ml-0 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path fill="currentColor" d="M485.5 0L576 160H474.9L405.7 0h79.8zm-128 0l69.2 160H149.3L218.5 0h139zm-267 0h79.8l-69.2 160H0L90.5 0zM0 192h100.7l123 251.7c1.5 3.1-2.7 5.9-5 3.3L0 192zm148.2 0h279.6l-137 318.2c-1 2.4-4.5 2.4-5.5 0L148.2 192zm204.1 251.7l123-251.7H576L357.3 446.9c-2.3 2.7-6.5-.1-5-3.2z"></path>
                    </svg>
                </span>
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UrlShorter</span>

            </Link>
            </div>
            <form className='w-full flex flex-col gap-3 px-4' onSubmit={handleSubmit}  method='post'>            
                <div>
                    <label htmlFor="helper-text" className="text-input-label">Email</label>
                    <input type="email" autoComplete='off' value={onboardingData.email} onChange={(e) => handleValueChange('email', e.target.value)}  
                        className='w-full py-2.5 px-4 border-[1px] border-gray-300 hover:border-[#aeb0b1] font-normal  focus:outline-none rounded  bg-gray-50 focus:bg-white placeholder:text-xs placeholder:font-normal' name='email' placeholder=""/>
                </div>
                <div>
                    <label htmlFor="helper-text" className="text-input-label">Password</label>
                    <input type="password" autoComplete='off' value={onboardingData.password1} onChange={(e) => handleValueChange('password1', e.target.value)}   
                        className='w-full py-2.5 px-4 border-[1px] border-gray-300 hover:border-[#aeb0b1]  font-normal focus:outline-none rounded  bg-gray-50 focus:bg-white placeholder:text-xs placeholder:font-normal' name='password1' placeholder=""/>
                </div>
                <div>
                    <label htmlFor="helper-text" className="text-input-label">Confirm Password</label>
                    <input type="password" autoComplete='off' value={onboardingData.password2} onChange={(e) => handleValueChange('password2', e.target.value)}   
                        className='w-full py-2.5 px-4 border-[1px] border-gray-300 hover:border-[#aeb0b1] font-normal focus:outline-none rounded  bg-gray-50 focus:bg-white placeholder:text-xs placeholder:font-normal' name='password2' placeholder=""/>
                </div>
                {/* <a href="#" className=' text-blue-500 hover:underline hover:underline-offset-1'>Forget password?</a> */}
                <div className=' w-full my-4 mt-8 flex gap-2'>
                    <button type="submit"  className="w-full py-3 px-4 bg-blue-700 text-white text-sm font-medium rounded  border-[1px] border-gray-200  focus:outline-none focus:ring-0 uppercase">REGISTER</button>
                </div>  

                <p>Already have an account? <Link to="/login"className=' text-blue-700 hover:underline hover:underline-offset-1'>Sign In</Link></p>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Register
