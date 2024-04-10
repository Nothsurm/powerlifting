import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice.ts'

const store = configureStore({
    reducer: {
        auth: authReducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
});

export default store;