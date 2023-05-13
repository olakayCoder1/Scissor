import React from 'react'


function DashboardBreakDownCard({Icon, cardName , total}) {
  return (
    <div className=' bg-gray-100 p-4 px-8 w-full h-full rounded-md flex justify-between'>
        <div className=' font-semibold text-lg '>
            <h2 className=''>{cardName}</h2>
            <span className=''>{total}</span>
        </div>

        <div className='flex flex-col justify-between'>
            <div></div>
            <p className=' p-2 bg-white w-fit rounded-full'>
                <Icon className=' w-6 h-6 text-red-400'/>
            </p>
        </div>
    </div>
  )
}

export default DashboardBreakDownCard
