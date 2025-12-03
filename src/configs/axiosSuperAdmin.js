import axios from "axios";

// สร้าง instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/admin/users", // เปลี่ยนเป็น URL ของ backend จริง
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor → แนบ Token อัตโนมัติ
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("superAdminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor → จัดการ error กลาง
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // ถ้า token หมดอายุ → logout หรือ redirect
    if (error.response?.status === 401) {
      localStorage.removeItem("superAdminToken");
      // เช็ค path เพื่อป้องกัน loop
      if (!window.location.pathname.includes("/super-admin/login")) {
        window.location.href = "/super-admin/login";
      }
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
