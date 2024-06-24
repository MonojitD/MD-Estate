import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { app } from '../firebase';

import { useDispatch } from 'react-redux';
import { signInSuccess } from '../store/user/userSlice';
import { useNavigate } from 'react-router-dom';

import googleIcon from '../assets/google-logo.png'

const OAuth = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            })
            const data = await res.json();
            dispatch(signInSuccess(data));
            toast.success("Logged in successfully 🎉",{autoClose: 2000});
            setTimeout(()=> {
                navigate('/');
            }, 3000)
        } catch (error) {
            toast.error("Could not sign up with Google ❌")
        }
    }
  return (
    <>
        <button type='button' onClick={handleGoogleClick} className='border bg-slate-50 flex justify-center items-center p-3 rounded-lg hover:opacity-95 hover:shadow-lg hover:shadow-slate-200 disabled:opacity-80'>
            <img className='w-5' src={googleIcon} alt="" />
            &ensp;{props.page} with Google
        </button>
        <ToastContainer/>
    </>
  )
}

export default OAuth
