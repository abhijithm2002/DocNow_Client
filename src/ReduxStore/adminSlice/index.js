
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    admin: JSON.parse(localStorage.getItem('adminData')) || null,
    accessToken: localStorage.getItem('adminAccessToken') || null,
    isAuthenticated: !!localStorage.getItem('adminAccessToken')
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminCredentials: (state, action) => {
            console.log('payloaddata', action.payload)
            const { accessToken, user } = action.payload
            state.accessToken = accessToken
            state.admin = user
            state.isAuthenticated = true
            if (accessToken) {
                localStorage.setItem('adminAccessToken', accessToken)
            }
        },
        adminLogout: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.admin = null
            localStorage.removeItem('adminAccessToken')
        },
    }
})

export const { setAdminCredentials, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;