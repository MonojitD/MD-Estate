import React from 'react'
import { useSelector } from 'react-redux';

const Home = () => {
  const data = useSelector((state)=>state.user);
  console.log(data)
  return (
    <>
    <h1 className='text-purple-700 text-[15vw]'>Home</h1>
    </>
  )
}

export default Home