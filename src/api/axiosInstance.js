import axios from 'axios';
import CONSTANTS_COMMON from '../constants/common';
import store from '../ReduxStore/store';
import { refreshAccessToken } from '../services/User/userService';
import { logout, setCredentials } from '../ReduxStore/authSlice';

const DocNowApi = axios.create({
  baseURL: CONSTANTS_COMMON.API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authInstance = axios.create({
  baseURL: CONSTANTS_COMMON.API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

DocNowApi.interceptors.request.use(
  (config) => {
    const { accessToken } = store.getState().auth;
    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

DocNowApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (error.response.data.message === "User has been blocked") {
        store.dispatch(logout());
        return Promise.reject(error);
      }

      try {
        const { user } = store.getState().auth;
        const { accessToken } = await refreshAccessToken();
        store.dispatch(setCredentials({ accessToken, user }));
        originalRequest.headers.authorization = `Bearer ${accessToken}`;
        return DocNowApi(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default DocNowApi;

