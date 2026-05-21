import React, { useState } from 'react'
import { Button, InputAdornment, TextField, Typography } from '@mui/material'
import { CgMail } from "react-icons/cg";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const [email,setEmail] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    useGSAP(()=>{
        const t1 = gsap.timeline();
        t1.from(".formAnimation",{
            x:-900,
            opacity:0,
         delay:0.3,
         duration:0.6,
        })

        t1.from(".formItem",{
            y:100,
            opacity:0,
              duration:0.3,
               stagger:0.2
        },"-=0.3")
    })

    const submitHandler = async(e)=>{
        e.preventDefault();
   
       const tostId = toast.loading("checking and processing...");
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/sendOtpforgotPassword`,{email});

            if(!response?.data?.success){
                throw new Error("Error occur during sending otp for reset password");
            }

            toast.dismiss(tostId);
            navigate("/resetPassOtpVerify",{state:email});
            toast.success(response?.data?.message);
            setLoading(false);
                     
        } catch (error) {
            toast.dismiss(tostId);
            setLoading(false);
            toast.error(error.response?.data?.message || "Something went wrong");
        }

    }
  return (
    <div className='flex min-h-screen px-24 overflow-x-hidden overflow-y-auto'>

        {/* forgot password form */}
        <div className='w-[50%] flex flex-col justify-center'>
          <Typography variant="h3" sx={{fontWeight:600}} >
            Forgot Password
          </Typography>
          <p className='text-[14px] mt-2 text-slate-300'>Enter your email and we'll send you a otp to reset your password</p>

          {/* form  */}
          <div className='bg-slate-900 border border-slate-700 rounded-md w-[80%] p-6 formAnimation'>
                  <form className='flex flex-col gap-6 overflow-y-hidden'
                  onSubmit={submitHandler}>
            <TextField type="email" variant="filled"
            className='formItem'
            label="Email"
            placeholder='Enter your email'
            required
            onChange={(e)=>{
              setEmail(e.target.value);
            }}
            InputProps={{
            startAdornment:(
                <InputAdornment position="start">
                   <CgMail size={25}/>
                </InputAdornment>
            )
            }}

            />

          <div className='flex items-center'>
            
            <Button
             variant="contained" 
             size="large" 
             className='formItem' 
             type="submit"
             disabled={loading}
             fullWidth
             sx={{textTransform:"none"}}
             >
                Submit
            </Button>

              {
            loading &&  <i className="fa-solid fa-spinner animate-spin -ml-8"></i>
           }
          </div>
          </form>
          </div>
        
        </div>

        {/* forgot password image */}
        <div className='w-[50%] flex justify-center items-center'>
            <div className='relative w-[86%] h-[520px] rounded-3xl overflow-hidden border border-[#123b76] shadow-[0_18px_55px_rgba(3,10,31,0.55)]'>
              <img
                src="/auth_pg.png"
                alt="SmartXchange forgot password visual"
                className='absolute inset-0 h-full w-full object-cover'
              />
              <div className='relative z-10 flex h-full items-center justify-center'>
              </div>
            </div>
        </div>

    </div>
  )
}

export default ForgotPassword