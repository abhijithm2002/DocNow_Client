import axios from 'axios';
import CONSTANTS_COMMON from '../constants/common';
import store from '../ReduxStore/store';
import { refreshAccessToken } from '../services/Admin/adminService';
import { adminLogout , setAdminCredentials} from '../ReduxStore/adminSlice';

const AdminApi = axios.create({
  baseURL: CONSTANTS_COMMON.API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});


AdminApi.interceptors.request.use(
    (config) => {
      const { accessToken } = store.getState().admin;
      console.log('access token ond', accessToken)
      if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`;
      }
      console.log('config',config);
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


  AdminApi.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        if (error.response.data.message === "Admin has been blocked") {
          store.dispatch(adminLogout());
          return Promise.reject(error);
        }
  
        try {
          const { admin } = store.getState().admin;
          const { accessToken } = await refreshAccessToken();
          store.dispatch(setAdminCredentials({ accessToken, admin }));
          originalRequest.headers.authorization = `Bearer ${accessToken}`;
          return AdminApi(originalRequest);
        } catch (refreshError) {
          store.dispatch(adminLogout());
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
  
  export default AdminApi;