import { createSlice } from "@reduxjs/toolkit";

const getStoredToken = () => {
    const rawToken = localStorage.getItem("token");

    if (!rawToken) return null;

    try {
        return JSON.parse(rawToken);
    } catch {
        // Backward compatibility for previously saved plain JWT strings.
        return rawToken;
    }
};

const initialState = {
    token: getStoredToken(),
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken:(state,value)=>{
            state.token = value.payload;
            if (typeof state.token === "string") {
                localStorage.setItem("token", state.token);
                return;
            }

            localStorage.setItem("token", JSON.stringify(state.token));
        },
        removeToken:(state)=>{
            state.token = null;
            localStorage.removeItem("token");
        }
    }
});


export const {setToken,removeToken} = authSlice.actions;
export default authSlice.reducer;

