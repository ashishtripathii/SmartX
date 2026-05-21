import React, { useEffect, useState } from "react";
import SearchBox from "../Navbar/SearchBox";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import UserProfileDropdown from "../Navbar/UserProfileDropdown";
import { clearWishlist } from "../../redux/slices/wishlist";
import ProfileAvatar from "./ProfileAvatar";
import axios from "axios";
import { getSocketInstance } from "../../utils/socketClient";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const [showDropDown, setShowDropDown] = useState(false);
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const location = useLocation();
  const { allProducts } = useSelector((state) => state.wishlist);
  const [unreadCount, setUnreadCount] = useState(0);

  const loadUnreadCount = async () => {
    if (!token) {
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/chatUsers`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      const conversations = response?.data?.conversations || [];
      const totalUnread = conversations.reduce((sum, conversation) => {
        return sum + (conversation?.unreadCount || 0);
      }, 0);

      setUnreadCount(totalUnread);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token && allProducts.length > 0) {
      dispatch(clearWishlist());
    }
  }, [token, allProducts.length, dispatch]);

  useEffect(() => {
    loadUnreadCount();
  }, [token, userData?._id]);

  useEffect(() => {
    const socket = getSocketInstance();

    const handleNewMessage = () => {
      loadUnreadCount();
    };

    if (socket) {
      socket.on("new-message", handleNewMessage);
    }

    return () => {
      socket?.off("new-message", handleNewMessage);
    };
  }, [token, userData?._id]);

  return (
    <div className="relative">
      <header style={{ fontFamily: "'Outfit', monospace" }} className="animate-navbarEnter bg-gradient-to-r from-[#020817] via-[#05133a] to-[#041028] px-3 py-2 flex items-center gap-4 justify-center border-b border-[#123b76] shadow-[0_10px_40px_rgba(3,10,31,0.62)]">
        <Link to={"/"}>
          <h2 className="animated-lift flex items-center font-bold text-3xl tracking-wide text-white whitespace-nowrap">
                  <p className="text-4xl text-[#13b8ff] drop-shadow-[0_0_14px_rgba(19,184,255,0.55)]">S</p>
            <p> mart </p>
                   <p className="text-4xl text-[#13b8ff] drop-shadow-[0_0_14px_rgba(19,184,255,0.55)]">X</p>
     <p> change</p>
          </h2>
        </Link>

        <SearchBox />

        <nav className="flex items-center gap-4 font-semibold whitespace-nowrap">
          <Link
            to={"/about-us"}
            className={`${
              location.pathname === "/about-us"
                ? "nav-link-animated is-active text-[#36c2ff] text-[16px]"
                : "nav-link-animated"
            }`}
          >
            About Us
          </Link>

          <Link
            to={"/contact-us"}
            className={`${
              location.pathname === "/contact-us"
                ? "nav-link-animated is-active text-[#36c2ff] text-[16px]"
                : "nav-link-animated"
            }`}
          >
            Contact Us
          </Link>

          {token ? (
            <div className="relative animated-lift flex items-center gap-1 cursor-pointer">
              <div
                className="relative flex items-center gap-1"
                onClick={() => {
                  setShowDropDown((prev) => !prev);
                }}
              >
              <ProfileAvatar
                user={userData}
                sizeClass="h-9 w-9"
                imageClassName="object-cover ring-2 ring-[#39b9ff]/70 shadow-[0_0_18px_rgba(19,184,255,0.32)]"
                fallbackClassName="bg-gradient-to-br from-[#0f4da8] to-[#0f86d9] flex items-center justify-center font-bold font-mono text-white ring-2 ring-[#39b9ff]/60 shadow-[0_0_18px_rgba(19,184,255,0.32)]"
              />

                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-red-600 text-white text-[11px] font-bold flex items-center justify-center shadow-md">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}

              <IoIosArrowDown
                size={26}
                className={`transition-transform duration-300 ${
                  showDropDown ? "rotate-180" : ""
                }`}
              />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 whitespace-nowrap">
              <Link
                to={"/login"}
                className="animated-lift whitespace-nowrap bg-[#0a214f] text-[#e6f1ff] px-3 py-2 rounded-md border border-[#1f4f8f] transition-all duration-300 hover:bg-[#10306d] hover:border-[#2f6fb7] text-[14px]"
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                className="animated-lift whitespace-nowrap bg-[#1aa7f7] text-white px-3 py-2 rounded-md border border-[#57c9ff] transition-all duration-300 hover:bg-[#1197e4] hover:border-[#8fdcff] text-[14px]"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* ✅ Updated Wishlist */}
         <div
  className="relative cursor-pointer group animated-lift"
  onClick={() => {
    naviagte("/wishlist-products");
  }}
>
  {/* Red circle background */}
  <div className="bg-red-500 p-2 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 shadow-[0_0_18px_rgba(239,68,68,0.35)]">
    
    {/* White filled heart */}
    <FaHeart size={20} className="text-white" />
  </div>

  {/* Badge */}
  {allProducts?.length > 0 && (
    <span
      className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold 
      min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1 shadow-md"
    >
      {allProducts.length > 9 ? "9+" : allProducts.length}
    </span>
  )}
</div>

            <div
            className={`animated-lift flex items-center gap-1 bg-[#0a214f] text-[#e6f1ff] rounded-full px-3 py-2 cursor-pointer
                border border-[#1f4f8f] transition-all duration-300 hover:bg-[#10306d] hover:border-[#2f6fb7] ${
                  location.pathname === "/upload-product" ? "bg-[#10306d] border-[#2f6fb7]" : ""
                }`}
            onClick={() => {
              if (!token) {
                naviagte("/login");
              } else {
                naviagte("/upload-product");
              }
            }}
          >
            <FaPlus size={23} />
            <p className="font-semibold font text-[14px] whitespace-nowrap">Sell</p>
          </div>
        </nav>
      </header>

      {showDropDown && (
        <div className="absolute z-50 right-[260px] bg-[#061538] text-[#e8f4ff] w-[220px] flex flex-col rounded-xl border border-[#124784] shadow-[0_18px_55px_rgba(3,10,31,0.68)] animate-dropdownOpen origin-top-right">
          <div className="bg-[#061538] h-6 w-6 self-end rotate-45 -mt-3 mr-3 border-r border-t border-[#124784]"></div>
          <UserProfileDropdown setShowDropDown={setShowDropDown} unreadCount={unreadCount} />
        </div>
      )}
    </div>
  );
};

export default Navbar;