//src/configs/axiosCandidate.js

import axios from "axios";

// สร้าง instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/", // เปลี่ยนเป็น URL ของ backend จริง
  headers: {
    "Content-Type": "application/json",
  },
});

    // Request Interceptor → แนบ Token อัตโนมัติ
    axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
    );  

    // Response Interceptors
    axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // เปลี่ยนเป็นหน้า login ของระบบ admin (ถ้ามี)
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;