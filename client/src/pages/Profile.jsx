import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { app } from '../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutStart, signOutFailure, signOutSuccess } from '../store/user/userSlice'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AlertBox from '../components/AlertBox'
import { ModalContext } from '../ModalContext'


const Profile = () => {
    const {currentUser, loading, error} = useSelector((state) => state.user)
    const fileRef = useRef(null)
    const [file, setFile] = useState(undefined)
    const [filePerc, setFilePerc] = useState(0)
    const [fileUploadError, setFileUploadError] = useState(false)
    const [formData, setFormData] = useState({})
    const { openModal, setOpenModal, modalData, setModalData } = useContext(ModalContext)

    const dispatch = useDispatch();
    console.log(formData)

    useEffect(() => {
        if(file) {
            handleFileUpload(file)
        }
    },[file]);

    useEffect(() => {
        setOpenModal(false)
    }, [])

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

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res  = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                toast.error(`${data.message} ❌`);
                return;
            }
            dispatch(updateUserSuccess(data));
            toast.success("Profile updated successfully 🎉");

        } catch (error) {
            dispatch(updateUserFailure(error.message))
        }
        if(error) {
            toast.error(`${error} ❌`);
        }
    }

    const handleLogout = async () => {
        try {
            dispatch(signOutStart());
            const res  = await fetch(`/api/auth/signout`);
            const data = await res.json();
            if(data.success === false) {
                dispatch(signOutFailure(data.message))
                return;
            }

            dispatch(signOutSuccess(data));
        } catch (error) {
            dispatch(signOutFailure(error.message))
        }
        setOpenModal(false)
    }

    const handleDelete = async () => {
        try {
            dispatch(deleteUserStart());
            const res  = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            })
            const data = await res.json()

            if(data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
            
        } catch (error) {
            dispatch(deleteUserFailure(error.message))
        }
        setOpenModal(false)
    }

    const openLogoutModal = () => {
        setOpenModal(true); 
        setModalData({
            title: "Log out",
            message: "Are you sure you want log out from this account?" ,
            type: "Log out",
            action: handleLogout,
        });
    }

    const openDeleteModal = () => {
        setOpenModal(true); 
        setModalData({
            title: "Delete account",
            message: "Are you sure you want to delete this account? This action cannot be undone." ,
            type: "Delete",
            color: "#ff4444",
            action: handleDelete,
        });
    }



  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
            <input className='p-3 rounded-lg' type="text" id='username' placeholder='Username' defaultValue={currentUser?.username} onChange={handleChange}/>
            <input className='p-3 rounded-lg' type="email" id='email' placeholder='Email' defaultValue={currentUser?.email} onChange={handleChange}/>
            <input className='p-3 rounded-lg' type="password" id='password' placeholder='Password' />
            <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                {loading ? "Loading..." : "Update"}
            </button>
        </form>
        <div  className='flex justify-between mt-5'>
            <span onClick={openDeleteModal} className='text-red-700 cursor-pointer hover:opacity-60'>Delete account</span>
            <span onClick={openLogoutModal} className='text-red-700 cursor-pointer hover:opacity-60'>Log out</span>
        </div>
        <ToastContainer/>
        {openModal && <AlertBox />}
    </div>
  )
}

export default Profile