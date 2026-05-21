import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const getInitialWishlist = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    localStorage.removeItem("wishlistProducts");
    return [];
  }

  const storedProducts = localStorage.getItem("wishlistProducts");
  return storedProducts ? JSON.parse(storedProducts) : [];
};

const initialState = {
  allProducts: getInitialWishlist(),
}

export const wishListSlice = createSlice({
    name:"wishlist",
    initialState,
    reducers:{
        addProductToWishlist:(state,value)=>{
          const isAdded =  state.allProducts.some((product)=> product?._id === value.payload?._id);
          if(isAdded){
            toast.error("Product allready added");
            return ;
          }
        state.allProducts.push(value.payload);
        localStorage.setItem("wishlistProducts",JSON.stringify(state.allProducts));
           toast.success("Product successfully added to wishlist");
        },
        removeProductFromWislist:(state,value)=>{

      const isAdded =  state.allProducts.some((product)=> product?._id === value.payload?._id);

      if(!isAdded){
        return ;
      }
       const filteredProducts =  state.allProducts.filter((product)=> product?._id !== value.payload?._id);
       state.allProducts = filteredProducts;
       localStorage.setItem("wishlistProducts",JSON.stringify(state.allProducts));
       toast.error("Product removed successfully");
        },
        clearWishlist:(state)=>{
          state.allProducts = [];
          localStorage.removeItem("wishlistProducts");
        }
    }
})

export const {addProductToWishlist,removeProductFromWislist,clearWishlist} = wishListSlice.actions;
export default wishListSlice.reducer;