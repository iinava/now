import axios, { InternalAxiosRequestConfig } from "axios";
import { ACCESS_TOKEN } from "./constants.ts";

const apiUrl: string = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error:Error) => {
    return Promise.reject(error);
  }
);

export default api;
