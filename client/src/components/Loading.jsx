import React from 'react'

const Loading = () => {
  return (
    <div className='bg-white fixed top-0 w-full h-[100%] flex z-50 justify-center items-center'>
        <svg width="38px" height="44.7px" viewBox="0 0 38 44.7">
            <path 
                d="M12,35.3v8.4H1V28.5l13.7-9.8l13.7,9.8v15.2h-8.2V13.3L37,1.9v42.8"
                fill="none"
                stroke="#000"
                strokeWidth="2px"
                strokeDasharray="188"
                strokeDashoffset="188"
                className="animate-logo"
            >
            </path>
        </svg>
    </div>
  )
}

export default Loading