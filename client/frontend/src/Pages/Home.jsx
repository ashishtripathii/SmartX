import React, { useEffect, useRef, useState } from 'react'
import Categories from '../components/Home/Categories'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import { Navigation ,Pagination,Autoplay} from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';
import toast from 'react-hot-toast';
import ProductCard from '../components/Home/Product/ProductCard';
import SkelatonLoading from '../components/Common/SkelatonLoading';
const Home = () => {

  const [loading,setLoading] =  useState(false);
  const [allProducts,setAllProducts] =  useState([]);
  const [allCategories,setAllCategories] = useState([]);
  const [categoriesLoading,setCategoriesLoading] = useState(false);
  const [page,setPage] = useState(1);
  const [lastcall,setLastcall]  = useState(false);
  const [selectedLocation,setSelectedLocation] = useState("");


  const scrollRef = useRef(null);

  const slides = [
    { imageUrl:"https://images.unsplash.com/photo-1558981403-c5f9899a28bc" },
    { imageUrl:"/home-3.webp" },
    { imageUrl:"/home-2.webp" },
    { imageUrl:"/home-1.avif" },
    { imageUrl:"/home-4.jpg" },
    { imageUrl:"/home-5.jpg" },
   
  ]



  const getAllCategories = async () => {
    try {
      setCategoriesLoading(true);

      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getAllCategories`);

      if(!response?.data?.success){
        throw new Error("Error occur during fetching all categories");
      }

      setAllCategories(response?.data?.allCategories || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setCategoriesLoading(false);
    }
  };


  const getAllProducts = async () => {

    if(lastcall || loading) return;

    try {

      setLoading(true);

      const queryParams = new URLSearchParams({
        page: String(page),
      });

      if (selectedLocation.trim()) {
        queryParams.set("location", selectedLocation.trim());
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/get-products?${queryParams.toString()}`
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
  },[page, selectedLocation]);


  useEffect(()=>{
    getAllCategories();
  },[]);


  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    setAllProducts([]);
    setLastcall(false);
    setPage(1);
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };


  const clearFilters = () => {
    setSelectedLocation("");
    setAllProducts([]);
    setLastcall(false);
    setPage(1);
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };


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
      <Categories categories={allCategories} loading={categoriesLoading} />
      

      {/* Filters */}
      <div className='px-4 pt-4'>
        <div className='rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-3 shadow-lg'>
          <div className='mb-2 flex flex-wrap items-center justify-between gap-2'>
            <div>
              <h2 className='text-base font-semibold'>Filter products</h2>
              <p className='text-xs text-slate-400'>Browse by location</p>
            </div>
            <button
              type='button'
              onClick={clearFilters}
              className='rounded-full border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-800'
            >
              Clear filters
            </button>
          </div>

          <div className='grid gap-2 md:grid-cols-1'>
            <label className='flex flex-col gap-1 text-xs font-medium text-slate-300'>
              Location
              <input
                type='text'
                value={selectedLocation}
                onChange={handleLocationChange}
                placeholder='Enter city or area'
                className='rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none transition focus:border-blue-500 w-full'
              />
            </label>
          </div>

          {
            categoriesLoading && (
              <div className='mt-2 text-xs text-slate-400'>Loading categories...</div>
            )
          }
        </div>
      </div>

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
