import React, { useState } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';

const Categories = ({ categories = [], loading = false }) => {

    const [failedImages, setFailedImages] = useState({});
    const navigate = useNavigate();

    const resolveCategoryImage = (imagePath) => {
        if (!imagePath) return "";

        if (/^(https?:)?\/\//i.test(imagePath) || imagePath.startsWith("data:")) {
            return imagePath;
        }

        return `${import.meta.env.VITE_BACKEND_URL}/${imagePath.replace(/^\/+/, "")}`;
    };

    const visibleCategories = categories || [];
    

    return (
        <div className='mt-2 bg-slate-900 py-2'>
            {loading ? (
                <div className='text-center animate-bounce'>Loading...</div>
            ) : (
                <div className='px-4 sm:px-8 lg:px-20'>
                    {categories.length < 1 ? (
                        <div className='text-center'>Categories not found</div>
                    ) : (
                        <Swiper
                            className='flex items-center justify-start'
                            slidesPerView={Math.min((categories?.length) || 1, 12)}
                            spaceBetween={14}
                        >
                            {visibleCategories.map((category, index) => {
                                const imageSrc = resolveCategoryImage(category?.categoryImage);
                                const hasImageError = failedImages[category?._id];

                                return (
                                    <SwiperSlide
                                        key={category?._id || index}
                                        onClick={() => {
                                            navigate('/category/' + category?._id);
                                        }}
                                    >
                                                                                <div className='flex w-40 h-32 flex-col justify-center gap-1 items-center  px-2 py-2 bg-slate-800 rounded-md transition-all duration-300 hover:bg-slate-700 cursor-pointer'>
                                            {hasImageError ? (
                                                                                    <div className='h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold'>
                                                    {(category?.categoryName || 'C').charAt(0).toUpperCase()}
                                                </div>
                                            ) : (
                                                <img
                                                    src={imageSrc}
                                                    alt={`${category?.categoryName} Image`}
                                                                                                                className='h-30 w-30 object-cover rounded-md'
                                                    onError={() => {
                                                        setFailedImages((prev) => ({
                                                            ...prev,
                                                            [category?._id]: true,
                                                        }));
                                                    }}
                                                />
                                            )}
                                                                                  <p className='w-32 text-center text-sm leading-tight'>{category?.categoryName}</p>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}

                            {/* no More tile - show all categories on home */}
                        </Swiper>
                    )}
                </div>
            )}
        </div>
    )
}

export default Categories