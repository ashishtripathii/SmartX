import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoSettingsOutline } from "react-icons/io5";
import { LuBadgeHelp } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeToken } from '../../redux/slices/auth';
import { setUserData } from '../../redux/slices/userData';
import { clearWishlist } from '../../redux/slices/wishlist';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoChatboxOutline } from "react-icons/io5";
import toast from 'react-hot-toast';
import aiLogo from "../../assets/gemini-color.png";
import ChatboatModal from '../ChatboatModal';

const UserProfileDropdown = ({setShowDropDown}) => {

    const [open,setOpen] = useState(false);
    const [chatboat,setChatboat] = useState(false);
    const dispatch = useDispatch();

    const showDialog = ()=>{
        setOpen(true);
    }
    const cancelHandler = ()=>{
        setOpen(false);
        setShowDropDown(false);
    }
    const logoutHandler = ()=>{
        dispatch(removeToken());
        dispatch(setUserData(null));
      dispatch(clearWishlist());
        setOpen(false);
        setShowDropDown(false);
        toast.success("Logout Successfully");
    }

  return (
    <div className='px-4 py-3 pb-4 flex flex-col gap-4 animate-dropdownOpen origin-top text-[#e8f4ff]'>

      <Link to="/chat-users" className='menu-item-animated animated-lift flex items-center gap-4 text-[#c9dcf5] hover:text-white transition-colors'
        onClick={()=>{setShowDropDown(false)}}>
       <IoChatboxOutline size={25} className='text-[#36c2ff]'/>
         <p className='font-semibold text-[18px]'>Chat</p>
        </Link>

        <Link to="/settings" className='menu-item-animated animated-lift flex items-center gap-4 text-[#c9dcf5] hover:text-white transition-colors'
        onClick={()=>{setShowDropDown(false)}}>
        <IoSettingsOutline size={25} className='text-[#36c2ff]'/>
         <p className='font-semibold text-[18px]'>Settings</p>
        </Link>

         <Link to="/myproducts" className='menu-item-animated animated-lift flex items-center gap-4 text-[#c9dcf5] hover:text-white transition-colors'
        onClick={()=>{setShowDropDown(false)}}>
        <MdOutlineProductionQuantityLimits size={25} className='text-[#36c2ff]'/>
         <p className='font-semibold text-[18px]'>My Products</p>
        </Link>

          <Link to="/help" className='menu-item-animated animated-lift flex items-center gap-4 text-[#c9dcf5] hover:text-white transition-colors'
          onClick={()=>{setShowDropDown(false)}}>
        <LuBadgeHelp size={25} className='text-[#36c2ff]'/>
         <p className='font-semibold text-[18px]'>Help</p>
        </Link>

         <div className='menu-item-animated animated-lift flex gap-2 items-center cursor-pointer text-[#c9dcf5] hover:text-white transition-colors'
         onClick={()=>{ setChatboat(true); }}>
            <img src={aiLogo} alt="ai" className='h-6' />
            <p className='font-semibold text-[18px]'>TradeX Bot</p>
        </div>

        <div className='menu-item-animated animated-lift flex items-center gap-4 cursor-pointer text-[#c9dcf5] hover:text-white transition-colors'
        onClick={showDialog}>
            <MdLogout size={25} className='text-[#36c2ff]'/>
            <p className='font-semibold text-[18px]'>Logout</p>
        </div>

        <Dialog open={open} onClose={()=>{ setOpen(false) }} PaperProps={{ sx: { bgcolor: '#061538', color: '#e8f4ff', border: '1px solid rgba(18,71,132,0.85)' } }}>
          <DialogTitle sx={{fontWeight:700, color: '#e8f4ff'}}>Logout Confirmation</DialogTitle>

          <DialogContent sx={{ color: '#c9dcf5' }}>
            Are you sure you want to logout?
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" sx={{textTransform:"none", borderColor: '#2f6fb7', color: '#c9dcf5'}}
            onClick={cancelHandler}>Cancel</Button>
            <Button variant="contained" sx={{textTransform:"none", bgcolor: '#1aa7f7', '&:hover': { bgcolor: '#1197e4' } }}
            onClick={logoutHandler}>Yes</Button>
          </DialogActions>
        </Dialog>

         {
            chatboat && <ChatboatModal setChatboat={setChatboat}/>
         }

    </div>
  )
}

export default UserProfileDropdown