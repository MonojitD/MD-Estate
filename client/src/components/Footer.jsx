import React from 'react'

import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

import { PiGithubLogoFill } from "react-icons/pi";
import { BiLogoLinkedin } from "react-icons/bi";
import { RiTwitterXFill } from "react-icons/ri";

export default function Footer() {
  return (
    <div className=' bg-white w-full py-5 mx-auto pt-10 flex flex-col items-center'>
        <div className='w-[100px]'>
            <img src={logo} alt="logo" />
        </div>
        <ul className='w-[80%] lg:w-[15%] flex justify-evenly my-4'>
            <li>
                <Link className='hover:text-blue-500' to="/">Home</Link>
            </li>
            <li>
                <Link className='hover:text-blue-500' to="/about">About</Link>
            </li>
            <li>
                <Link className='hover:text-blue-500' to="/search">Listings</Link>
            </li>
        </ul>
        <ul className='w-[80%] lg:w-[8%] flex justify-evenly'>
            <li>
                <Link to="https://github.com/MonojitD" className='hover:text-blue-500'><PiGithubLogoFill /></Link>
            </li>
            <li>
                <Link to="https://twitter.com/monojitdeb1" className='hover:text-blue-500'><RiTwitterXFill /></Link>
            </li>
            <li>
                <Link to="https://www.linkedin.com/in/monojitdeb" className='hover:text-blue-500'><BiLogoLinkedin /></Link>
            </li>
        </ul>

    </div>
  )
}
