import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRout = () => {
    const data = useSelector((state)=>state.user);
  return (
    <>
    { data.currentUser != null ? <Outlet /> : <Navigate to="/login"/> }
    </>
  )
}

export default ProtectedRout