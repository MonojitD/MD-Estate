import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'

import logo from '../assets/logo.png'

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const data = useSelector((state)=>state.user);
  const navigate = useNavigate();
  // console.log(data)
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm); 
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search])
  // console.log(searchTerm)
  return (
    <>
    <header className='border-b-2 border-slate-100 px-1 py-2 flex flex-wrap justify-between items-center bg-white sm:px-10'>
      <Link to="/" className="border-0 border-green-700 w-[100%] sm:w-[15%] mb-3 sm:mb-0 flex justify-center sm:justify-start items-center">
          <img className='w-[25%] sm:w-[50%]' src={logo} alt="" />
      </Link>
      <form onSubmit={handleSubmit} className="border-0 border-b-[3px] bg-white focus-within:border-blue-400 px-2 w-[65%] sm:w-[25%] flex items-center">
          <input 
            className='w-[90%] bg-transparent px-1 py-2 border-0 flex focus-visible:outline-0' 
            type="text" 
            name="search" 
            id="search" 
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type='submit' className='w-[10%]'>
            <FaSearch className='w-[100%] text-blue-500 cursor-pointer hover:text-blue-800' />
          </button>
      </form>
      <ul className="border-0 border-green-700 w-[30%] pl-1 sm:w-[15%] flex justify-end items-center">
          {
            data?.currentUser != null ? 
            <li>
              <Link to="/profile" className='font-[600] mr-3 flex  hover:text-blue-500'>
                <img className='rounded-full h-7 w-7 object-cover' src={data?.currentUser?.avatar} alt="profile" referrerPolicy="no-referrer"/>
                <p className='hidden lg:flex ml-2'>{data?.currentUser?.username}</p>
              </Link>
            </li>
            :
            <li><Link to="/login" className='bg-blue-600 px-4 py-1 rounded-md text-white font-semibold flex items-center hover:shadow-md hover:shadow-blue-200'>Join us</Link></li>
          }
      </ul>
    </header>
    </>
  )
}

export default Header