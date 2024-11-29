import axios from 'axios';
import CONSTANTS_COMMON from '../constants/common';
import store from '../ReduxStore/store';
import { refreshAccessToken } from '../services/Doctor/doctorService';
import { logout, setCredentials } from '../ReduxStore/doctorSlice';

const DoctorApi = axios.create({
  baseURL: CONSTANTS_COMMON.API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});


DoctorApi.interceptors.request.use(
    (config) => {
      const { accessToken } = store.getState().doctor;
      
      if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`;
      }
      
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


  DoctorApi.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
      
        // Handle blocked users explicitly
        if (error.response.data.message === "User has been blocked") {
          store.dispatch(logout());
          return Promise.reject(error);
        }
      
        try {
          const { doctor } = store.getState().doctor;
          const { accessToken } = await refreshAccessToken();
      
          if (accessToken) {
            store.dispatch(setCredentials({ accessToken, doctor }));
            originalRequest.headers.authorization = `Bearer ${accessToken}`;
            return DoctorApi(originalRequest);
          } else {
            throw new Error("Token refresh failed");
          }
        } catch (refreshError) {
          store.dispatch(logout());
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );
  
  export default DoctorApi;