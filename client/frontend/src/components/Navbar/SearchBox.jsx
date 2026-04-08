import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import Loader from "../Common/Loader";
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {

  const [userInput,setUserInput] = useState("");
  const [loading,setLoading] = useState(false);
  const [allProducts,setAllProducts] = useState([]);
  const navigate = useNavigate();

  
  const onchangeHandler = async(e)=>{
     setUserInput(e.target.value);
     const inputValue = e.target.value;

     if(!inputValue){
       return ;
     }

     if(inputValue.length < 2){
      return;
     }

     try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/searchProduct?textSearch=${inputValue}`);
      if(!response?.data?.success){
        throw new Error("error occur during searching product");
      }
      setAllProducts(response?.data?.allProducts);
      setLoading(false); 
     } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
      
     }
     

  }
 
  const submitHandler = (e)=>{
    e.preventDefault();
    if(allProducts.length < 1){
     return ;
    }
    setUserInput("");
    navigate("/searchProducts",{state:{ allProducts:allProducts}});
  }
  


  
 
  return (
<div className='relative animate-navbarEnter'>
      <form className='flex items-center'
      onSubmit={submitHandler}>
       <input type="text" 
  className='bg-[#0a214f] text-[#e8f4ff] placeholder:text-[#9fb7d6] outline-none w-[750px] px-3 py-2 rounded-l-lg border border-[#1c4d8f] focus:border-[#40c4ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] text-[16px] transition-all duration-300'
       placeholder='Search for Products, Brands and More'
       onChange={onchangeHandler} />
  <button type="submit" className='animated-lift bg-[#1aa7f7] text-white -ml-1 p-2 rounded-r-lg border border-[#57c9ff] transition-all duration-300 hover:bg-[#1197e4]'>
         <FaMagnifyingGlass size={22} className='cursor-pointer'/>
      </button>
    </form>

      {
      userInput.length > 1 && <div className="absolute animate-dropdownOpen bg-[#061538]/95 border border-[#124784] shadow-[0_20px_45px_rgba(3,10,31,0.6)] w-[761px] min-h-[50px] z-50 rounded-b-xl overflow-hidden">
             
             {
                loading ? (<div className='h-full flex items-center justify-center p-2'><Loader/></div>) 
                : 
                (<div className='h-full'>
                  {
                    allProducts.length < 1 ? (<div className='h-full flex items-center justify-center
                      font-semibold pt-3 text-[#b7cff0]'>Products not found</div>)
                    :
                    (<div className='flex flex-col gap-2'>
                      {
                        allProducts.slice(0,6).map((product,index)=> {
                          return <div key={index} className='menu-item-animated px-3 py-3 border-b border-[#0b2455] cursor-pointer text-[#e8f4ff] hover:bg-[#0d2b63] transition-colors duration-200'
                          onClick={()=>{
                            setUserInput("");
                            navigate("/searchProducts",{state:{
                              allProducts:allProducts
                            }});
                          }}>
                            {
                              product?.productName
                            }
                          </div>
                        })
                      }
                    </div>)
                  }
                </div>)
             }

    </div>
      }


</div>
  )
}

export default SearchBox