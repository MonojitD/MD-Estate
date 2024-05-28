import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'

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
  console.log(searchTerm)
  return (
    <>
    <header className='border-0 border-red-700 px-1 py-2 flex flex-wrap justify-between bg-purple-100 sm:px-10'>
        <Link to="/" className="border-0 border-green-700 w-[100%] sm:w-[15%] flex justify-center sm:justify-start items-center">
            <span className='text-[7vw] sm:text-[2vw] font-[700] text-purple-800'>MD</span>&nbsp;
            <span className='text-[7vw] sm:text-[2vw] font-[700] text-purple-500'>Estate</span>
        </Link>
        <form onSubmit={handleSubmit} className="border-[0px] bg-white px-2 border-purple-400 rounded-md w-[50%] sm:w-[25%] flex items-center">
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
              <FaSearch className='w-[100%] text-purple-500 cursor-pointer hover:text-purple-800' />
            </button>
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