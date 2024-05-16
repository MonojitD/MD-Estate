import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { app } from '../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

const Profile = () => {
    const {currentUser} = useSelector((state) => state.user)
    const fileRef = useRef(null)
    const [file, setFile] = useState(undefined)
    const [filePerc, setFilePerc] = useState(0)
    const [fileUploadError, setFileUploadError] = useState(false)
    const [formData, setFormData] = useState({})

    console.log(formData)

    useEffect(() => {
        if(file) {
            handleFileUpload(file)
        }
    },[file]);

    const handleFileUpload = (file) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress))
            },
            (error) => {
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadUrl) => {
                    setFormData({...formData, avatar: downloadUrl})
                })  
            }
        );
    }


  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} ref={fileRef} id="" hidden accept='image/*' />
            <img className='w-24 h-24 rounded-full object-cover cursor-pointer self-center mt-2' onClick={() => fileRef.current.click()} src={formData?.avatar || currentUser?.avatar} alt="profile" referrerPolicy='no-referrer' />
            <p className='text-sm self-center text-center'>
                {fileUploadError ? (
                    <span className='text-red-700'>Error in image upload. Max size 2MB</span>
                ) : filePerc > 0 && filePerc <100 ? (
                    <span className='text-blue-700'>{`Image uploading ${filePerc}%`}</span>
                ) : filePerc === 100 ? (
                    <span className='text-green-700'>Image uploaded successfully</span>
                ) : ("")
                }
            </p>
            <input className='p-3 rounded-lg' type="text" id='username' placeholder='Username' />
            <input className='p-3 rounded-lg' type="email" id='email' placeholder='Email' />
            <input className='p-3 rounded-lg' type="password" id='password' placeholder='Password' />
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
        </form>
        <div  className='flex justify-between mt-5'>
            <span className='text-red-700 cursor-pointer hover:opacity-60'>Delete account</span>
            <span className='text-red-700 cursor-pointer hover:opacity-60'>Sign out</span>
        </div>
    </div>
  )
}

export default Profile