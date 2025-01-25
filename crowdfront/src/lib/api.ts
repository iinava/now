import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import API_ENDPOINTS from "@/api/endpoints";

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const apiUrl: string = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;
    
    // If error is 401 and we haven't tried to refresh token yet
    // Also check if the failed request is not the refresh token endpoint itself
    if (
      error.response?.status === 401 && 
      originalRequest && 
      !originalRequest._retry &&
      originalRequest.url !== API_ENDPOINTS.auth.refresh
    ) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        
        if (!refreshToken) {
          // No refresh token available, redirect to login
          localStorage.clear();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Call refresh token endpoint
        const response = await api.post(API_ENDPOINTS.auth.refresh, {
          refresh: refreshToken
        });

        if (response.data.access) {
          // Store new tokens
          localStorage.setItem(ACCESS_TOKEN, response.data.access);
          
          // Update Authorization header
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          }
          
          // Retry original request
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token fails, clear storage and redirect to login
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
