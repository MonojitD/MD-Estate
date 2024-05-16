import React from 'react'
import { useSelector } from 'react-redux';

import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom'

const Header = () => {
  const data = useSelector((state)=>state.user);
  // console.log(data)
  return (
    <>
    <header className='border-0 border-red-700 px-1 py-1 flex flex-wrap justify-between bg-purple-100 sm:px-10'>
        <div className="border-0 border-green-700 w-[100%] sm:w-[15%] flex justify-center sm:justify-start items-center">
            <span className='text-[7vw] sm:text-[2vw] font-[700] text-purple-800'>MD</span>&nbsp;
            <span className='text-[7vw] sm:text-[2vw] font-[700] text-purple-500'>Estate</span>
        </div>
        <form className="border-[3px] bg-white border-purple-400 rounded-md w-[50%] sm:w-[25%] flex items-center">
            <input className='w-[90%] bg-transparent px-2 py-1 border-0 flex focus-visible:outline-0' type="text" name="search" id="search" placeholder='Search...'/>
            <FaSearch className='w-[10%] h-5 text-purple-500 cursor-pointer hover:text-purple-800' />
        </form>
        <ul className="border-0 border-green-700 w-[50%] pl-1 sm:w-[auto] flex justify-between items-center">
            <li><Link to="/" className='text-purple-500 font-[600] mr-3  hover:text-purple-800'>Home</Link></li>
            <li><Link to="/about" className='text-purple-500 font-[600] mr-3  hover:text-purple-800'>About</Link></li>
            {
              data?.currentUser != null ? 
              <li>
                <Link to="/profile" className='text-purple-500 font-[600] mr-3 flex  hover:text-purple-800'>
                  <img className='rounded-full h-7 w-7 object-cover' src={data?.currentUser?.avatar} alt="profile" referrerPolicy="no-referrer"/>
                </Link>
              </li>
              :
              <li><Link to="/login" className='bg-purple-600 px-4 py-1 rounded-md text-white flex items-center hover:bg-purple-800'>Login</Link></li>
            }
        </ul>
    </header>
    </>
  )
}

export default Header