import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { app } from '../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutStart, signOutFailure, signOutSuccess } from '../store/user/userSlice'
import { Link } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AlertBox from '../components/AlertBox'
import { ModalContext } from '../ModalContext'
import { RiImageEditFill } from "react-icons/ri";
import { TbMoodEmpty } from "react-icons/tb";


const Profile = () => {
    const {currentUser, loading, error} = useSelector((state) => state.user)
    const fileRef = useRef(null)
    const [file, setFile] = useState(undefined)
    const [filePerc, setFilePerc] = useState(0)
    const [fileUploadError, setFileUploadError] = useState(false)
    const [formData, setFormData] = useState({})
    const [showListingsError, setShowListingsError] = useState(false);
    const [showList, setShowList] = useState(false)
    const [activeButton, setActiveButton] = useState(true)
    const [userListings, setUserListings] = useState([]);
    const { openModal, setOpenModal, modalData, setModalData } = useContext(ModalContext)

    const dispatch = useDispatch();
    // console.log(formData)

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

        uploadTask.on(
            'state_changed', 
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
        setActiveButton(false)
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
                toast.error(`${data.message} ❌`, {autoClose: 2000});
                return;
            }
            dispatch(updateUserSuccess(data));
            toast.success("Profile updated successfully 🎉", {autoClose: 2000});

        } catch (error) {
            dispatch(updateUserFailure(error.message))
        }
        if(error) {
            toast.error(`${error} ❌`, {autoClose: 2000});
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

    const handleShowListings = async () => {
        setShowList(true)
        try {
            setShowListingsError(false);
            const res = await fetch(`/api/user/listings/${currentUser._id}`);
            const data = await res.json();
            if (data.success === false) {
                setShowListingsError(true);
                return;
            }

            setUserListings(data);
        } catch (error) {
            setShowListingsError(true);
        }
    };

    const openListingDeleteModal = (listingId) => {
        setOpenModal(true); 
        setModalData({
            title: "Delete listing",
            message: "Are you sure you want to delete this listing? This action cannot be undone." ,
            type: "Delete",
            color: "#ff4444",
            action: () => handleListingDelete(listingId),
        });
    }

    const handleListingDelete = async (listingId) => {
        try {
            const res = await fetch(`/api/listing/delete/${listingId}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if(data.success === false) {
                console.log(data.message);
                return
            }
            setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
            toast.success("Listing deleted successfully 🗑️", {autoClose: 3000})
            setOpenModal(false)
        } catch (error) {
            console.log(error.message)
        }
    }




  return (
    <>
    <div className='p-4 max-w-lg mx-auto flex flex-col lg:flex-row lg:justify-center lg:max-w-6xl'>
        <div className='lg:w-[45%] p-3 px-5 rounded-lg shadow-lg bg-slate-100'>
            <h1 className='text-2xl font-semibold text-center my-7'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type="file" onChange={(e) => {setFile(e.target.files[0]); setActiveButton(false)}} ref={fileRef} id="" hidden accept='image/*' />
                <div className='w-28 h-24 flex justify-center relative mx-auto' onClick={() => fileRef.current.click()}>
                    <RiImageEditFill className='bg-white p-1 w-7 h-7 rounded-full shadow-sm absolute bottom-0 right-0 cursor-pointer hover:text-blue-500'/>
                    <img className='w-24 h-24 rounded-full object-cover cursor-pointer self-center' src={formData?.avatar || currentUser?.avatar} alt="profile" referrerPolicy='no-referrer' />
                </div>
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
                <input className='p-3 rounded-lg' type="password" id='password' placeholder='New password' />
                <button disabled={loading || activeButton} className='bg-blue-600 hover:shadow-lg hover:shadow-blue-200 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed'>
                    {loading ? "Loading..." : "Update Profile"}
                </button>
            </form>
            <div  className='flex justify-between mt-3'>
                <span onClick={openDeleteModal} className='text-red-700 cursor-pointer hover:opacity-60'>Delete account</span>
                <span onClick={openLogoutModal} className='text-red-700 cursor-pointer hover:opacity-60'>Log out</span>
            </div>

            {showList ? 
                <></>
            : 
                <button onClick={handleShowListings} className='text-green-700 w-full'>
                    Show Listings
                </button>
            }
            <p className='text-red-700 mt-5'>
                {showListingsError ? 'Error showing listings' : ''}
            </p>
        </div>

        {userListings && showList && (
            <div className='flex flex-col gap-4 lg:w-[50%] h-[80vh] p-3 px-5 lg:ml-10 rounded-lg shadow-lg bg-slate-100'>
                <h1 className='text-center mt-5 text-2xl font-semibold'>
                    Listings
                </h1>
                <div className='h-[73%] overflow-y-auto'>
                {userListings.map((listing) => (
                    <div
                    key={listing._id}
                    className='border rounded-lg p-3 flex justify-between items-center gap-4 hover:bg-white mb-2'
                    >
                        <Link to={`/listing/${listing._id}`}>
                            <img
                            src={listing.imageUrls[0]}
                            alt='listing cover'
                            className='h-16 w-16 object-cover rounded-md'
                            />
                        </Link>
                        <Link
                            className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                            to={`/listing/${listing._id}`}
                        >
                            <p>{listing.name}</p>
                        </Link>

                        <div className='flex flex-col item-center'>
                            <button
                            onClick={() => openListingDeleteModal(listing._id)}
                            className='text-red-700 hover:opacity-60'
                            >
                            Delete
                            </button>
                            <Link to={`/update-listing/${listing._id}`}>
                            <button className='text-green-700 hover:opacity-60'>Edit</button>
                            </Link>
                        </div>
                    </div>
                ))}
                {userListings.length === 0 && (
                    <div className='flex flex-col items-center justify-center w-full h-full'>
                        <TbMoodEmpty className='text-blue-400 w-20 h-20'/>
                        <h3 className='mt-2 w-[60%] text-center text-blue-500'>Sorry !! You do not have any listing to show. Please create listings.</h3>
                    </div>
                )}
                </div>
                <Link to="/create-listing" className='bg-green-600 hover:shadow-lg hover:shadow-green-200 text-white p-3 rounded-lg text-center hover:opacity-95'>
                    Create New Listing
                </Link>
            </div>
        )}
        

    </div>
    <ToastContainer/>
    {openModal && <AlertBox />}
    </>
  )
}

export default Profile