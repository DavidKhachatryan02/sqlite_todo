import axios from 'axios';
import localStorageService from '../../services/localStorage';
import { API_URL, DEFAULT_HEADERS, KEYS } from '../../utils/constants';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: DEFAULT_HEADERS,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorageService.getItem(KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorageService.removeItem(KEYS.AUTH_TOKEN);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
