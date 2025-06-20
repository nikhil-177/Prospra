import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const apiInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

apiInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // get new token
        const res = await apiInstance.get('/auth/refresh-token', {
          withCredentials: true,
        });
        const newAccessToken = res.data.accessToken;

        // set new token in store or memory
        useAuthStore.getState().setToken(newAccessToken);

        // retry original request
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiInstance(error.config);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default apiInstance