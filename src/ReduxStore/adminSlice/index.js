
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    admin: JSON.parse(localStorage.getItem('adminData')) || null,
    accessToken: localStorage.getItem('adminAccessToken') || null,
    isAdminAuthenticated: !!localStorage.getItem('adminAccessToken') && !!localStorage.getItem('adminData')
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
            state.isAdminAuthenticated = true
            if (accessToken) {
                localStorage.setItem('adminAccessToken', accessToken)
                localStorage.setItem('adminData', JSON.stringify(user));
            }
        },
        adminLogout: (state) => {
            state.isAdminAuthenticated = false;
            state.accessToken = null;
            state.admin = null
            localStorage.removeItem('adminAccessToken')
            localStorage.removeItem('adminData')
        },
    }
})

export const { setAdminCredentials, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;