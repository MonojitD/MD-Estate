import React, { useContext } from 'react'
import { ModalContext } from '../ModalContext'

const AlertBox = () => {
    const {openModal, setOpenModal, modalData, setModalData} = useContext(ModalContext)
  return (
    <div className='border-0 border-red-600 bg-[#00000050] backdrop-blur-[2px] fixed top-0 left-0 w-full h-full flex justify-center items-center'>
        <div className='w-[65%] max-w-md bg-white rounded-md p-3 flex flex-col items-center'>
            <div className='w-full text-center'>
                <h3 className='text-xl font-semibold text-blue-500' style={{color: modalData.color}}>{modalData.title}</h3>
                <p className='text-sm text-slate-500'>{modalData.message}</p>
            </div>
            <div className='w-full flex justify-center gap-2 mt-4'>
                <button className='w-[40%] py-2 rounded-md text-sm font-medium text-slate-600 bg-slate-200  hover:-translate-y-0.5' onClick={() => setOpenModal(false)}>Cancel</button>
                <button className='w-[40%] py-2 rounded-md text-sm font-medium text-slate-100 hover:-translate-y-0.5 bg-blue-500' style={{backgroundColor: modalData.color}} onClick={modalData.action}>{modalData.type}</button>
            </div>
        </div>
    </div>
  )
}

export default AlertBox