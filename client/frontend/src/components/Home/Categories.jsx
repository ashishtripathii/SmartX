import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { SwiperSlide ,Swiper} from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';

const Categories = () => {

    const [loading,setLoading] = useState(false);
    const [allCategories,setAllCategories] = useState([]);
    const [failedImages, setFailedImages] = useState({});
    const navigate = useNavigate();

    const resolveCategoryImage = (imagePath) => {
        if (!imagePath) return "";

        if (/^(https?:)?\/\//i.test(imagePath) || imagePath.startsWith("data:")) {
            return imagePath;
        }

        return `${import.meta.env.VITE_BACKEND_URL}/${imagePath.replace(/^\/+/, "")}`;
    };

    const getAllCategories = async()=>{
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getAllCategories`);

            if(!response?.data?.success){
                throw new Error("Error occur during fetching all categories");
            }
            setAllCategories(response?.data?.allCategories);            
            setLoading(false);
            
        } catch (error) {
            setLoading(false);
          console.log(error);
          toast.error(error.response?.data?.message || "Something went wrong");
            
        }
    }

    useEffect(()=>{
        getAllCategories();
    },[]);


 
    
    

  return (
    <div className='mt-2 bg-slate-900 py-2'>
        {
            loading ? (<div className='text-center animate-bounce'>Loading...</div>) :
            (<div className='px-20'> 
                {
                    allCategories.length < 1 ? (<div className='text-center'>Categories not found</div>) :
                    (<Swiper className='flex items-center justify-between '
                    slidesPerView={10}>{
                        allCategories.map((category,index)=>{
                            const imageSrc = resolveCategoryImage(category?.categoryImage);
                            const hasImageError = failedImages[category?._id];
                            return <SwiperSlide 
                            key={category?._id || index}
                            onClick={()=>{
                                navigate("/category/"+category?._id)
                            }}>
                                 <div className='flex w-32 h-28  flex-col  gap-1 items-center justify-center px-4 
                            py-2 bg-slate-800 rounded-md transition-all duration-300 hover:bg-slate-700 cursor-pointer'>
                                {
                                    hasImageError ? (
                                        <div className='h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold'>
                                            {(category?.categoryName || "C").charAt(0).toUpperCase()}
                                        </div>
                                    ) : (
                                        <img
                                            src={imageSrc}
                                            alt={`${category?.categoryName} Image`}
                                            className='h-12 w-12 object-cover rounded-md'
                                            onError={() => {
                                                setFailedImages((prev) => ({
                                                    ...prev,
                                                    [category?._id]: true,
                                                }));
                                            }}
                                        />
                                    )
                                }
                                      <p className='w-24 text-center'>
                                        {
                                            category?.categoryName
                                        }
                                        </p> 
                            </div>
                            </SwiperSlide>
                        })
                        }</Swiper>)
                }
            </div>)
        }
    </div>
  )
}

export default Categories