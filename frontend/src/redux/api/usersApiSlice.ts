import { apiSlice } from './apiSlice.js';

const BASE_URL = import.meta.env.VITE_BASE_URL

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        logout: builder.mutation<any,void>({
            query: () => ({
                url: `${BASE_URL}/api/users/logout`,
                method: 'POST'
            })
        })
    })
})

export const {
    useLogoutMutation
} = userApiSlice