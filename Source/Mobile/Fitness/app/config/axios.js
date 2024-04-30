import axios from 'axios';
import {API_URL} from './env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(
  async function (config) {
    let localStorageData = await AsyncStorage.getItem('token');
    if (localStorageData && typeof localStorageData === 'string') {
      const accessToken = JSON.parse(localStorageData)?.token.replaceAll(
        '"',
        '',
      );
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  async function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    // const originalRequest = error.config;
    // if (error.response.status === 403 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   const localStorageData = await AsyncStorage.getItem('token');
    //   if (localStorageData && typeof localStorageData === 'string') {
    //     const refreshToken = JSON.parse(
    //       localStorageData,
    //     )?.refreshToken.replaceAll('"', '');
    //     if (refreshToken) {
    //       const response = await apiRefreshToken({
    //         refresh_token: refreshToken,
    //       });
    //       if (response.success) {
    //         axios.defaults.headers.Authorization = `Bearer ${response.token}`;
    //       } else {
    //         return error;
    //       }
    //       return instance(originalRequest);
    //     } else {
    //       return error.response.data;
    //     }
    //   }
    // }
    return error.response;
  },
);

export default instance;
