import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import {
  FaBath,
  FaBed,
} from 'react-icons/fa';
import { BiSolidArea } from "react-icons/bi";
import { useEffect, useState } from 'react';

export default function ListingItem({ listing }) {
  const [landlord, setLandlord] = useState(null)
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
          const res = await fetch(`/api/user/${listing.userRef}`);
          const data = await res.json();
          setLandlord(data)
      } catch (error) {
          next(error)
          console.log(error)
      }
    }
    fetchLandlord()
  }, [])

  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full list-box'>
      <Link to={`/listing/${listing._id}`}>
        <div className='h-[220px] sm:h-[220px] overflow-hidden'>
          <img
            src={
              listing.imageUrls[0] ||
              'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
            }
            alt='listing cover'
            className='w-full object-cover transition-scale duration-300'
          />
        </div>
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-2xl font-semibold list-name'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-5 w-5 text-gray-400' />
            <p className='text-md text-gray-900 truncate w-full'>
              {listing.address}
            </p>
          </div>
          
          <div className='text-slate-700 flex gap-4'>
            <div className='flex items-center font-medium'>
              <FaBed className='h-5 w-5 text-gray-400 mr-2' />
              <p className='text-md text-gray-900'>
                {listing.bedrooms}
              </p>
            </div>
            <div className='flex items-center font-medium'>
              <FaBath className='h-4 w-4 text-gray-400 mr-2' />
              <p className='text-md text-gray-900'>
                {listing.bathrooms}
              </p>
            </div>
            <div className='flex items-center font-medium'>
              <BiSolidArea className='h-5 w-5 text-gray-400 mr-2' />
              <p className='text-md text-gray-900'>
                {listing.area? `${listing.area} SqFT` : 'Unknown'}
              </p>
            </div>
          </div>
          <hr></hr>
          <div className='flex items-center py-2'>
            <p className='w-[40%] flex items-center'>
              <img className='w-5 h-5 lg:w-7 lg:h-7 rounded-full mr-2' src={landlord?.avatar} alt="" />
              <span>{landlord?.username}</span>
            </p>
            <p className='w-[60%] flex justify-end item-end font-semibold text-2xl text-right'>
              ₹
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              <span className='text-sm text-gray-500 flex items-center'>&nbsp;{listing.type === 'rent' && '/month'}</span>
            </p>          
          </div>
        </div>
      </Link>
    </div>
  );
}
