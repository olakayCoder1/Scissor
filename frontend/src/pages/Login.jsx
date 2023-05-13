import {useState }from 'react'

function Login() {


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
      
  return (
    <div className='flex items-center justify-center h-screen mb-12 bg-gray-700'>
      {/* Overlay */}
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]' />
      <div className='z-[2] w-full max-w-sm md:max-w-md '>
        <div className=' w-full  mx-auto py-6 p-4 border bg-white rounded shadow-md'>
            <div className=' w-full flex items-center place-content-center gap-4  py-4 pb-12 r  '>
                <div className=' flex items-center gap-2'>
                    {/* <img src={logo2} alt='logo'  className=' w-10 h-10' /> */}
                    <h2 className=' logo-primary font-bold text-xl'>UrlShorter</h2>
                </div>
            </div>
            <form className='w-full flex flex-col gap-4 px-4'>            
                <div>
                    <label htmlFor="helper-text" className="text-input-label">Email</label>
                    <input type="email" value={onboardingData.email} onChange={(e) => handleValueChange('email', e.target.value)}  
                        className='w-full py-3 px-4 border-[1px] border-gray-300 hover:border-[#aeb0b1]  focus:outline-none focus:border-loanBlue-primary rounded text-sm font-normal bg-gray-50 focus:bg-white placeholder:text-xs' name='email' placeholder=""/>
                </div>
                <div>
                    <label htmlFor="helper-text" className="text-input-label">Password</label>
                    <input type="password" value={onboardingData.password1} onChange={(e) => handleValueChange('password1', e.target.value)}   
                        className='w-full py-3 px-4 border-[1px] border-gray-300 hover:border-[#aeb0b1]  focus:outline-none focus:border-loanBlue-primary rounded text-sm font-normal bg-gray-50 focus:bg-white placeholder:text-xs' name='email' placeholder=""/>
                </div>
                <div>
                    <label htmlFor="helper-text" className="text-input-label">Confirm Password</label>
                    <input type="password" value={onboardingData.password2} onChange={(e) => handleValueChange('password2', e.target.value)}   
                        className='w-full py-3 px-4 border-[1px] border-gray-300 hover:border-[#aeb0b1]  focus:outline-none focus:border-loanBlue-primary rounded text-sm font-normal bg-gray-50 focus:bg-white placeholder:text-xs' name='email' placeholder=""/>
                </div>
                <div className=' w-full my-4 mt-8 flex gap-2'>
                    <button type="button" onClick='' className="w-full py-3 px-4 bg-blue-600 text-white text-sm font-medium rounded  border-[1px] border-gray-200  focus:outline-none focus:ring-0 uppercase">REGISTER</button>
                </div>  
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
