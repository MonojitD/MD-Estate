import React, { useContext } from 'react'
import { ModalContext } from '../ModalContext'

const AlertBox = (props) => {
    const {openModal, setOpenModal} = useContext(ModalContext)
  return (
    <div className='border-2 border-red-600 bg-[#00000020] fixed top-0 left-0 w-full h-full flex justify-center items-center'>
        <div className='w-[65%] max-w-md bg-white rounded-md p-3 flex flex-col items-center'>
            <div className='w-full text-center'>
                <h3 className='text-lg font-semibold' style={{color: props.color}}>{props.title}</h3>
                <p className='text-sm text-slate-500'>{props.message}</p>
            </div>
            <div className='w-full flex justify-center gap-2 mt-4'>
                <button className='w-[40%] py-2 rounded-md text-sm font-medium text-slate-600 bg-slate-200  hover:-translate-y-0.5' onClick={() => setOpenModal(false)}>Cancel</button>
                <button className='w-[40%] py-2 rounded-md text-sm font-medium text-slate-100 hover:-translate-y-0.5 bg-purple-500' style={{backgroundColor: props.color}} onClick={props.action}>{props.type}</button>
            </div>
        </div>
    </div>
  )
}

export default AlertBox