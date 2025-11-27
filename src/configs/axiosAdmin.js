import axios from "axios";
import dotenv from "dotenv";


dotenv.config();


const axiosInstance = axios.create({
  baseURL: process.env.API_LOGIN || '/api/login',  
  timeout: 10_000, // 10 seconds timeout
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Token expired or unauthorized access");
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;



