import { Button, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogoAnimation from '../../components/Auth/LogoAnimation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/slices/auth';
import { setUserData } from '../../redux/slices/userData';

const Login = () => {

  const navigate = useNavigate();
  const [showPassword,setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);
  const [formData,setFormData] = useState({
    email:"",
    password:"",
  });
  const dispatch = useDispatch();

  useGSAP(()=>{

    const t1 = gsap.timeline();
    t1.from(".loginAnimation",{
    x:-100,
    opacity:0,
    delay:0.3,
    duration:0.6,
    });

    t1.from(".inputAnimation",{
    y:100,
    opacity:0,
    duration:0.3,
    stagger:0.2,
    },"-=0.9")
  });

  const onChangeHandler = (event)=>{
    const {name,value} = event.target;

    setFormData(prev =>{
     return {
      ...prev,
      [name]:value
     }
    })
  }


  const submitHandler =async(e)=>{
    e.preventDefault();

    const tostId = toast.loading("login...");
    try {
      setLoading(true);

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`,formData);

      if(!response?.data?.success){
        throw new Error("Error occur during login");
      }

      

      toast.dismiss(tostId);
      dispatch(setToken(response?.data?.token));
      dispatch(setUserData(response?.data?.userDeatails));
      navigate("/");
      toast.success(response?.data?.message);
      setLoading(false);
      
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.dismiss(tostId);
      toast.error(error.response?.data?.message || "Something went wrong");
      
    }
  }
  return (
    <div className='flex min-h-screen px-24 overflow-x-hidden overflow-y-auto'>

      <div className='w-[50%] flex flex-col justify-center'>
           <Typography variant="h3" sx={{fontWeight:600}} >
                 Welcome!
               </Typography>
                <p className='text-[14px] mt-2 text-slate-300'>Login to Trade<span className='text-yellow-400 font-semibold text-[16px]'>X</span> to continue to Trade<span className='text-yellow-400 font-semibold text-[16px]'>X</span></p>



                {/* login form  */}
                <div className='w-[80%] bg-slate-900 border border-slate-700 rounded-md mt-2 p-6 loginAnimation overflow-y-hidden' >
                  <form className='flex flex-col gap-6' onSubmit={submitHandler}>
                    <TextField 
                    type="email"
                    variant="filled"
                   placeholder='Your email address'
                    label="Email" 
                   fullWidth
                    required
                    className='inputAnimation'
                    name="email"
                    onChange={onChangeHandler}
                    />

                 <div className='flex flex-col'>
                     <TextField 
                     type={
                      showPassword ? "text" : "password"
                     }
                     name="password"
                     variant="filled"
                    placeholder='Your password'
                    label="Password"
                    required
                    fullWidth
                    onChange={onChangeHandler}
                    className='inputAnimation'
                    InputProps={{
                      endAdornment:(
                        <InputAdornment position="end">
                          {
                            showPassword ? <IoEyeSharp size={25} className='cursor-pointer'
                            onClick={()=>{setShowPassword(false)}}/> :
                             <BsFillEyeSlashFill size={25} className='cursor-pointer' 
                             onClick={()=>{setShowPassword(true)}}/>
                          }
                        </InputAdornment>
                      )
                    }}
                    />
                    <Link to={"/forgot-password"} className=' inputAnimation text-[14px] text-blue-600 self-end'>
                    Forgot password?
                    </Link>
                 </div>

         <div>
                  <Button
                  variant="contained"
                     size="large"
                     fullWidth
                     type="submit"
                     className='inputAnimation'
                     sx={{textTransform:"none"}}
                     disabled={loading}
                  >
                  Log In
                 </Button>
                   {
            loading &&  <i className="fa-solid  fa-spinner animate-spin -ml-8"></i>
           }
         </div>
                  
                  </form>

              <p className='text-slate-300 mt-6 flex justify-center gap-2 text-[16px] inputAnimation'>
            Don't have an account?
             <span className='text-blue-600 cursor-pointer' 
             onClick={()=>{navigate("/signup")}}>Sign Up</span>
              </p>
                </div>
      </div>


        {/* logo animation  */}
      <div className='w-[50%] flex items-center justify-center'>
        <div className='relative w-[86%] h-[520px] rounded-3xl overflow-hidden border border-[#123b76] shadow-[0_18px_55px_rgba(3,10,31,0.55)]'>
          <img
            src="/auth_pg.png"
            alt="TradeX login visual"
            className='absolute inset-0 h-full w-full object-cover'
          />
         
          <div className='relative z-10 flex h-full items-center justify-center'>
            
          </div>
        </div>
      </div>

   

    </div>
  )
}

export default Login