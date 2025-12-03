import create from 'zustand';
import axiosInstance from '../configs/axiosAdmin';
import { navigate } from '../configs/navigateConfig';


// สร้าง Store ชื่อ useAdminStore
export const useAdminStore = create((set) => ({
  admin: null, // เก็บข้อมูลผู้ดูแลระบบ
  role: null, // เก็บบทบาทผู้ดูแลระบบ
  token: null, // เก็บโทเค็นผู้ดูแลระบบ
  login: async (data) => {
    const response = await axiosInstance.post("/admin/login", data);
    set({role: response.data.role, admin: response.data.admin, token: response.data.token});
    navigate('/admin/dashboard');
  },
  register: async (data) => {
    const response = await axiosInstance.post("/admin/register", data);
    set({role: response.data.role, admin: response.data.admin, token: response.data.token});
    navigate('/admin/dashboard');
},
  LogOut: () => {
    set({ admin: null, role: null, token: null });
    navigate('/admin/login');
  }
}));
