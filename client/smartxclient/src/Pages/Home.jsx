import React, { useEffect, useRef, useState } from 'react'
import Categories from '../components/Home/Categories'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import { Navigation ,Pagination,Autoplay} from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import image1 from "../assets/Investor-banner.webp"
import image2 from "../assets/68328523628574.webp"
import image3 from "../assets/1338bd4fc60390d8.webp"
import image4 from "../assets/uber_new_high._CB537689643_.jpg"
import image5 from "../assets/D323819370_DesktopHero_3000x1200._CB778388200_.jpg"
import image6 from "../assets/1600w-kU1ebZpbiSQ.webp"
import axios from 'axios';
import toast from 'react-hot-toast';
import ProductCard from '../components/Home/Product/ProductCard';
import SkelatonLoading from '../components/Common/SkelatonLoading';

const Home = () => {

  const [loading,setLoading] =  useState(false);
  const [allProducts,setAllProducts] =  useState([]);
  const [page,setPage] = useState(1);
  const [lastcall,setLastcall]  = useState(false);


  const scrollRef = useRef(null);

  const slides = [
    { imageUrl:image2 },
    { imageUrl:image3 },
    { imageUrl:image4 },
    { imageUrl:image5 },
    { imageUrl:image1 },
    { imageUrl:image6 },
  ]



  const getAllProducts = async () => {

    if(lastcall || loading) return;

    try {

      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/get-products?page=${page}`
      );

      const newProducts = response?.data?.allProducts || [];


      if(newProducts.length < 12){
        setLastcall(true);
      }

     
      setAllProducts(prev => [...prev, ...newProducts]);

    } catch (error) {

      toast.error(error.response?.data?.message || "Something went wrong");

    } finally {

      setLoading(false);
    }
  };


  useEffect(()=>{
    getAllProducts();
  },[page]);


  useEffect(() => {

    const container = scrollRef.current;

    const handleScroll = () => {

      if (!container || loading || lastcall) return;

      const { scrollTop, scrollHeight, clientHeight } = container;

  
      if (scrollTop + clientHeight >= scrollHeight - 150) {
        setPage(prev => prev + 1);
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);

  }, [loading, lastcall]);


  return (

    <div 
      ref={scrollRef}
      className='h-screen overflow-y-auto hide-scrollbar '
    >

      {/* Categories */}
      <Categories/>

      {/* Swiper Banner */}
      <div className='mt-4 px-4'>
        <Swiper 
          navigation 
          pagination={{ clickable:true }}  
          autoplay={{ delay:2500 }}
          modules={[Navigation,Pagination,Autoplay]}
        >
          {
            slides.map((slide,index)=>(
              <SwiperSlide key={index}>
                <img 
                  src={slide?.imageUrl} 
                  alt="banner"
                  className='h-[320px] w-full object-cover rounded-xl'
                />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>


      {/* Products */}
      <div className=' mx-auto px-4 py-10'>

        {
          loading && page === 1 ? (

            <div className='flex flex-wrap gap-6 justify-center'>
              {
                Array.from({length:8}).map((_,i)=>(
                  <SkelatonLoading key={i}/>
                ))
              }
            </div>

          ) : allProducts.length < 1 ? (

            <div className='text-center text-2xl font-semibold'>
              Products not found
            </div>

          ) : (

            <>
              <div className='flex flex-wrap gap-6 justify-center'>
                {
                  allProducts.map((product)=>(
                    <ProductCard key={product._id} product={product}/>
                  ))
                }
              </div>

              {/* Loader */}
              {
                loading && (
                  <div className='flex justify-center py-10'>
                    <i className="fa-solid fa-spinner text-4xl animate-spin"></i>
                  </div>
                )
              }

              {/* No More Products */}
              {
                lastcall && (
                  <div className='text-center text-2xl py-10 font-semibold'>
                    No more products 😔
                  </div>
                )
              }

            </>
          )
        }

      </div>

    </div>
  )
}

export default Home;
