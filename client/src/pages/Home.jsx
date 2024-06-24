import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import Loading from '../components/Loading';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState([]);
  SwiperCore.use([Navigation, Autoplay, EffectFade]);
  console.log(saleListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
        setLoading(false)
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);

  // useEffect(() => {
  //   setLoading(true)
  //   const fetchFiles = async () => {
  //     const storage = getStorage();
  //     const folderRef = ref(storage, 'home-banners/');

  //     try {
  //       const result = await listAll(folderRef);
  //       const urlPromises = result.items.map(itemRef => getDownloadURL(itemRef));

  //       const urls = await Promise.all(urlPromises);
  //       setFiles(urls);
  //       setLoading(false)
  //     } catch (error) {
  //       console.error("Error fetching files: ", error);
  //     }
  //   };

  //   fetchFiles();
  // }, []);

  const banners = [
    "https://firebasestorage.googleapis.com/v0/b/md-estate-88a66.appspot.com/o/home-banners%2Fhome-rev-img-1.jpg?alt=media&token=30be9f05-aeac-4b8f-a0b4-d4eeae50c3ef",
    "https://firebasestorage.googleapis.com/v0/b/md-estate-88a66.appspot.com/o/home-banners%2Fhome-rev-img-2.jpg?alt=media&token=30be9f05-aeac-4b8f-a0b4-d4eeae50c3ef",
    "https://firebasestorage.googleapis.com/v0/b/md-estate-88a66.appspot.com/o/home-banners%2Fhome-rev-img-3.jpg?alt=media&token=30be9f05-aeac-4b8f-a0b4-d4eeae50c3ef",
    "https://firebasestorage.googleapis.com/v0/b/md-estate-88a66.appspot.com/o/home-banners%2Fhome-rev-img-4.jpg?alt=media&token=30be9f05-aeac-4b8f-a0b4-d4eeae50c3ef",
    "https://firebasestorage.googleapis.com/v0/b/md-estate-88a66.appspot.com/o/home-banners%2Fhome-rev-img-5.jpg?alt=media&token=30be9f05-aeac-4b8f-a0b4-d4eeae50c3ef",
  ]

  return (
    <div>
      {loading && <Loading /> }

      {/* swiper */}
      <div className='relative'>
        <Swiper 
          // navigation 
          autoplay= {{ delay: 2000 }}
          loop={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={2000}
        >
          {banners.map((item, i) => (
              <SwiperSlide key={i}>
                <div
                  style={{
                    background: `url(${item}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                  className='h-[300px] sm:h-[600px]'
                  key={i}
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>
        <div className='bg-[#00000020] w-full h-full absolute top-0 left-0 z-10 flex flex-col items-center justify-center'>
          <h1 className='w-full flex text-2xl lg:text-7xl font-semibold lg:font-bold text-white text-center capitalize title drop-shadow-lg'>
            <div className='w-[40%] lg:w-[47%] text-right'>Find Your&nbsp;</div>
            <div className="words rotate w-[60%] text-left">
              <span>Perfect home.</span>
              <span>Dream house.</span>
              <span>Future Property.</span>
              <span>Prime Estate.</span>
            </div>
          </h1>
          <p className='w-full lg:w-[50%] lg:text-2xl p-2 text-center text-sm text-white/75'>We are a real estate platform that will help you find the best residence you dream of, let's discuss for your dream house.</p>
        </div>
      </div>

      {/* top */}
      <div className='flex flex-col gap-6 p-10 lg:p-20 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Buy or Sell Your Ideal
          <br />
          <span className='text-blue-500'>Real Estate </span>
          with Ease
        </h1>
        <div className='text-gray-600 text-xs sm:text-sm'>
          MD Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-600 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>

      

      {/* listing results for offer, sale and rent */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {saleListings && saleListings.length > 0 && (
          <div className='flex flex-col items-center mb-20'>
            <div className='my-3 flex flex-col items-center mb-4 lg:mb-10'>
              <p className='text-sm font-medium text-blue-500 uppercase'>Discover Your Dream Home Today</p>
              <h2 className='text-2xl lg:text-3xl lg:mt-2 font-semibold capitalize'>Recent places for sale</h2>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {saleListings.slice(0, 3).map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
            <Link className='bg-blue-600 text-white text-xs py-2 px-5 mt-10 rounded-md w-[max-content] font-semibold hover:opacity-95 text-center hover:shadow-lg hover:shadow-blue-200 disabled:opacity-80 capitalize' to={'/search?type=sale'}>View all places for sale</Link>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className='flex flex-col items-center mb-20'>
            <div className='my-3 flex flex-col items-center mb-4 lg:mb-10'>
              <p className='text-sm font-medium text-blue-500 uppercase'>Find Your Perfect Rental Retreat</p>
              <h2 className='text-2xl lg:text-3xl lg:mt-2 font-semibold capitalize'>Recent places for rent</h2>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {rentListings.slice(0, 3).map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
            <Link className='bg-blue-600 text-white text-xs py-2 px-5 mt-10 rounded-md w-[max-content] font-semibold hover:opacity-95 text-center hover:shadow-lg hover:shadow-blue-200 disabled:opacity-80 capitalize' to={'/search?type=rent'}>View all places for rent</Link>
          </div>
        )}

        {offerListings && offerListings.length > 0 && (
          <div className='flex flex-col items-center mb-20'>
            <div className='my-3 flex flex-col items-center mb-4 lg:mb-10'>
              <p className='text-sm font-medium text-blue-500 uppercase'>Grab These Limited-Time Deals</p>
              <h2 className='text-2xl lg:text-3xl lg:mt-2 font-semibold capitalize'>Recent places with offers</h2>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {offerListings.slice(0, 3).map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
            <Link className='bg-blue-600 text-white text-xs py-2 px-5 mt-10 rounded-md w-[max-content] font-semibold hover:opacity-95 text-center hover:shadow-lg hover:shadow-blue-200 disabled:opacity-80 capitalize' to={'/search?offer=true'}>View all places with offers</Link>
          </div>
        )}
      </div>
    </div>
  );
}
