import React, { useEffect, useState } from 'react'
import "./App.css"
import SignUp from './Pages/Auth/SignUp'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Otp from './Pages/Auth/Otp'
import Login from './Pages/Auth/Login'
import ForgotPassword from './Pages/Auth/ForgotPassword'
import ResetPassOtpVerify from './Pages/Auth/ResetPassOtpVerify'
import ResetPassword from './Pages/Auth/ResetPassword'
import Home from './Pages/Home'
import Navbar from './components/Common/Navbar'
import { Toaster } from 'react-hot-toast'
import ProductUpload from './Pages/ProductUpload'
import SplashScreen from './components/Common/SplashScreen'
import AboutUs from './Pages/AboutUs'
import ContactUs from './Pages/ContactUs'
import WishListProducts from './Pages/WishListProducts'
import ProductDetails from './Pages/Product/ProductDetails'
import Footer from './components/Common/Footer'
import Setting from './Pages/Setting'
import Help from './Pages/Help'
import CategoryDetails from './Pages/CategoryDetails'
import SearchProducts from './Pages/Product/SearchProducts'
import MyProducts from './Pages/Product/MyProducts'
import ChatUsers from './Pages/Chat/ChatUsers'
import UserConversation from './Pages/Chat/UserConversation'
import {io} from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import { setAllOnlineUsers, setSocket } from './redux/slices/socket'
import checkUserAuth from './checkAuth'
import Error from './components/Common/Error'


const App = () => {
 
  const {token} = useSelector((state)=> state.auth);
  const {userData} = useSelector((state)=> state.user);
  const [showSplash,setShowSplash] = useState(true);
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path:"/",element:<><Navbar/><Home/><Footer/></>
    },
    {
      path:"/signup",element:<><Navbar/><SignUp/><Footer/></>
    },
    {
      path:"/otp",element:<><Navbar/><Otp/><Footer/></>
    },
    {
      path:"/login",element:<><Navbar/><Login/><Footer/></>
    },
    {
      path:"/forgot-password",element:<><Navbar/><ForgotPassword/><Footer/></>
    },
    {
      path:"/resetPassOtpVerify",element:<><Navbar/><ResetPassOtpVerify/><Footer/></>
    },
    {
      path:"/reset-password",element:<><Navbar/><ResetPassword/><Footer/></>
    },
    {
      path:"/upload-product",element:<><Navbar/><ProductUpload/><Footer/></>
    },
    {
      path:"/about-us",element:<><Navbar/><AboutUs/><Footer/></>
    },
    {
      path:"/contact-us",element:<><Navbar/><ContactUs/><Footer/></>
    },
    {
      path:"/wishlist-products",loader:checkUserAuth,element:<><Navbar/><WishListProducts/><Footer/></>
    },
    {
      path:"/product-details/:productId",element:<><Navbar/><ProductDetails/><Footer/></>
    },
    {
      path:"/settings",loader:checkUserAuth,element:<><Navbar/><Setting/><Footer/></>
    },
    {
      path:"/help",element:<><Navbar/><Help/><Footer/></>
    },
    {
      path:"/category/:categoryId",element:<><Navbar/><CategoryDetails/><Footer/></>
    },
    {
      path:"/searchProducts",element:<><Navbar/><SearchProducts/><Footer/></>
    },
    {
      path:"/MyProducts",loader:checkUserAuth,element:<><Navbar/><MyProducts/><Footer/></>
    },
    {
      path:"/chat-users",loader:checkUserAuth,element:<><Navbar/><ChatUsers/><Footer/></>
    },
    {
      path:"/user-conversation",loader:checkUserAuth,element:<><Navbar/><UserConversation/><Footer/></>
    },
    {
      path:"*",element:<><Error/></>
    }

  ])


  
  useEffect(()=>{
    if(token){
       const socket = io(`${import.meta.env.VITE_SOCKET_BACKEND_URL}`,{
        query:{
          userId:userData?._id,
        }
       });
       
      dispatch(setSocket(socket));

       socket.on("all-online-users",(data)=>{
        dispatch(setAllOnlineUsers(data));
        
       })
    
       return ()=>{
        socket.disconnect();
        socket.off("all-online-users");
       }
    }
    else{
      return ;
    }
  },[token])

  useEffect(()=>{
   const timer =  setTimeout(()=>{   
      setShowSplash(false)
    },2000);

    return ()=>{
      clearTimeout(timer);
    }

  },[])


  if(showSplash){
    return (
      <SplashScreen/>
    )
  }


  return (
    <div className='bg-slate-950 text-white h-screen w-screen
    overflow-x-hidden overflow-y-auto'>
      <RouterProvider router={router}>
      </RouterProvider>
      <Toaster/>

    </div>

 
  )
}

export default App