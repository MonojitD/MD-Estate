import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logo from '../assets/logo.png'
import bgImg from '../assets/auth-bg.jpg'


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        toast.error("Username/Email already exist ❌", {autoClose: 2000});
        return;
      }
      setLoading(false);
      setError(null);
      toast.success("User created successfully 🎉", {autoClose: 3000});
      setTimeout(()=> {
        navigate('/login');
      }, 4000)
      
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className='border-0 border-red-500 fixed top-0 flex flex-col justify-center items-center w-[100%] overflow-hidden h-[100vh] bg-center bg-cover' style={{backgroundImage: `url(${bgImg})`}}>
      <div className='border-0 border-green-700 flex justify-center w-full absolute top-10 sm:top-5 lg:top-10 xl:top-15'>
      <Link to="/" className='w-[30%] sm:w-[10%] xl:w-[7%]'><img className='w-full' src={logo} alt="md-estate-logo" /></Link>
      </div>
      <div className='border-0 border-blue-500 w-[90%] sm:w-[50%] xl:w-[30%] 2xl:w-[25%] rounded-lg bg-slate-50/90 p-5  mx-auto shadow-lg'>
        <h1 className='text-3xl text-center font-semibold'>Sign Up</h1>
        <p className='text-lg text-center font-medium text-slate-600 mb-7 sm:mb-5'>Hi, Welcome 👋</p>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 sm:gap-3' autoComplete='off'>
          <input
            type='text'
            placeholder='Username'
            className='border p-3 rounded-lg'
            id='username'
            onChange={handleChange}
          />
          <input
            type='email'
            placeholder='Email'
            className='border p-3 rounded-lg'
            id='email'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            className='border p-3 rounded-lg'
            id='password'
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className='bg-blue-600 text-white p-3 rounded-lg font-semibold hover:opacity-95 hover:shadow-lg hover:shadow-blue-200 disabled:opacity-80'
          >
            {loading ? 'Loading...' : 'Sign up'}
          </button>
          <div className='relative my-3'>
            <hr></hr>
            <p className='border-0 border-red-500  text-slate-400 absolute top-[50%] left-[50%] translate-y-[-60%] translate-x-[-50%] px-2'>or</p>
          </div>
          <OAuth page="Sign up"/>
        </form>
        <div className='flex justify-center gap-2 mt-5 sm:mt-2'>
          <p className='text-sm'>Already have an account?</p>
          <Link to={'/login'}>
            <span className='text-blue-700'>Log in</span>
          </Link>
        </div>
        {/* {error && <p className='text-red-500 mt-5'>{error}</p>} */}
        {/* {error && <p className='text-red-500 font-semibold mt-5'>Duplicate username or email</p>} */}
        <ToastContainer />
      </div>
    </div>
  );
}
