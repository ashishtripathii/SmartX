import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allOnlineUsers:[],
}

export const socketSlice = createSlice({
    name:"socketIo",
    initialState,
    reducers:{
        setAllOnlineUsers:(state,value)=>{
            state.allOnlineUsers = value.payload;
        }
    }

});

export const {setAllOnlineUsers} = socketSlice.actions;
export default socketSlice.reducer;