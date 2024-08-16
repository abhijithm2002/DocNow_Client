import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctor: JSON.parse(localStorage.getItem('doctorData')) || null,
  accessToken: localStorage.getItem('accessToken') || null,
  isDoctorAuthenticated: !!localStorage.getItem('accessToken') && !!localStorage.getItem('doctorData'),
};

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { doctor, accessToken } = action.payload;
      console.log('Access token in redux: ', doctor, accessToken);
      
      state.doctor = doctor;
      state.accessToken = accessToken;
      state.isDoctorAuthenticated = true;
      
      if (doctor && accessToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('doctorData', JSON.stringify(doctor));
      }
    },
    logout: (state) => {
      state.isDoctorAuthenticated = false;
      state.doctor = null;
      state.accessToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('doctorData');
    },
  },
});

export const { setCredentials, logout } = doctorSlice.actions;
export default doctorSlice.reducer;
