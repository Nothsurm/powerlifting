import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: 
        localStorage.getItem(import.meta.env.VITE_STORAGE_KEY as string) 
        ? JSON.parse(localStorage.getItem(import.meta.env.VITE_STORAGE_KEY) as string) 
        : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem(import.meta.env.VITE_STORAGE_KEY, JSON.stringify(action.payload))
        },

        logout: (state) => {
            state.userInfo = null;
            localStorage.clear();
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;