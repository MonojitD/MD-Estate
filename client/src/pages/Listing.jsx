import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import { BiSolidArea } from "react-icons/bi";
import Contact from '../components/Contact';


export default function Listing() {
  SwiperCore.use([Navigation, Autoplay]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div className='bg-white'>
          <Swiper navigation autoplay loop={true}>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[200px] sm:h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='fixed top-[15%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-white cursor-pointer'>
            <FaShare
              className='text-blue-600 hover:text-blue-300'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-white p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-6xl mx-auto p-3'>
            <div className='border-0 border-red-500 mt-[-2rem] lg:mt-[-3rem] flex flex-col z-10 bg-white p-2 lg:p-3 rounded-lg'>
              <p className='bg-blue-500 w-[max-content] uppercase text-white text-xs font-semibold text-center py-1 px-3 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              <div className='flex flex-col sm:flex-row justify-between items-start'>
                <p className='text-3xl text-black font-semibold my-2 sm:pr-10'>{listing.name}</p>
                <p className='text-3xl text-black font-semibold'>₹
                  {listing.offer
                    ? listing.discountPrice.toLocaleString('en-US')
                    : listing.regularPrice.toLocaleString('en-US')}
                  <span className='text-lg font-normal text-slate-500'>&nbsp;{listing.type === 'rent' && '/month'}</span>
                </p>
              </div>
            </div>
            <hr></hr>
            <p className='uppercase text-gray-400 font-semibold px-2 my-1 lg:px-3'>Features :</p>
            <ul className='font-semibold text-sm flex flex-wrap items-center gap-4 px-2 lg:px-3 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg text-blue-600' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg text-blue-600' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <BiSolidArea className='text-lg text-blue-600' /> 
                {listing.area? `${listing.area} SqFT` : 'Not available'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg text-blue-600' />
                {listing.parking ? 'Parking Available' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg text-blue-600' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>

            <br></br>

            <p className='uppercase text-gray-400 font-semibold px-2 mb-1 lg:px-3'>Location :</p>
            <p className='flex items-center gap-2 text-slate-600 px-2 lg:px-3 text-sm'>
              <FaMapMarkerAlt className='text-blue-600' />
              <span className='font-medium text-black'>{listing.address}</span>
            </p>
            
            
            <div className='flex flex-col px-2 lg:px-3 my-4'>
              {listing.offer && (
                <>
                <p className='uppercase text-gray-400 font-semibold mb-1'>Offer :</p>
                <p className='bg-green-500 w-full max-w-[max-content] text-white text-center py-1 px-3 rounded-md'>
                  <span className='text-xl'>₹{(+listing.regularPrice - +listing.discountPrice).toLocaleString('en-US')} OFF</span>
                </p>
                </>
              )}
            </div>


            <p className='text-slate-800 px-2 lg:px-3'>
              <span className='font-semibold text-lg text-black'>Description - </span>
              {listing.description}
            </p>
            
            {currentUser === null && (
              <button
                onClick={() => navigate('/login')}
                className='bg-blue-600 hover:shadow-lg hover:shadow-blue-200 text-white font-semibold rounded-lg hover:opacity-95 p-3 mx-1 mt-4'
              >
                Login to Contact Owner
              </button>
            )}


            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-blue-600 hover:shadow-lg hover:shadow-blue-200 text-white font-semibold rounded-lg hover:opacity-95 p-3 mx-1 mt-4'
              >
                Contact Owner
              </button>
            )}

            <div className='px-2 mt-4'>{contact && <Contact listing={listing} />}</div>
          </div>
        </div>
      )}
    </main>
  );
}
