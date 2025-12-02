import { create } from "zustand";
import api from "../configs/axiosCandidate";

// สร้าง Store ชื่อ useCandidateStore
export const useCandidateStore = create((set, get) => ({
  candidates: [], // เก็บรายการผู้สมัครงาน
  isLoading: false, // สถานะโหลดข้อมูล
  error: null, // เก็บข้อผิดพลาดถ้ามี

  // ฟังก์ชันดึงข้อมูลผู้สมัครงานจาก API

  // 1. ฟังก์ชันสมัครงาน (POST)
  registerCandidate: async (candidateData) => {
    set({ isLoading: true, error: null }); // เริ่มโหลด Clear Error เดิม

    try {
      // ⚡ ยิง Axios ตรงนี้เลย (ไม่ต้องเรียก Service)
      // url คือ "/" เพราะ baseURL ใน axiosCandidate เป็น .../api/candidates แล้ว
      const response = await api.post("/", candidateData);
      console.log("response", response);

      set({ isLoading: false });
      return response.data; // ส่ง data กลับไปให้ UI (เผื่อเอาไปทำอะไรต่อ)
    } catch (error) {
      // ดึงข้อความ Error จาก Backend
      const errorMessage = error.response?.data?.message || "การสมัครล้มเหลว";

      set({
        isLoading: false,
        error: errorMessage,
      });

      throw error; // โยน error ออกไปเพื่อให้ UI (RegisterForm) รู้และ Toast แจ้งเตือนได้
    }
  },

  // 2. ฟังก์ชันดึงข้อมูลทั้งหมด (GET) - สำหรับ Dashboard
  fetchCandidates: async () => {
    set({ isLoading: true, error: null });

    try {
      // ⚡ ยิง Axios ตรงนี้เลย
      const response = await api.get("/");

      // อัปเดต list ลงใน State
      // (เช็คโครงสร้าง backend ด้วยว่าส่งกลับมาเป็น array เลย หรือมี object หุ้ม เช่น response.data.data)
      const list = response.data.data || response.data;

      set({
        candidates: list,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "ไม่สามารถดึงข้อมูลได้";
      set({
        isLoading: false,
        error: errorMessage,
      });
    }
  },

  // 3. (Optional) ฟังก์ชันเคลียร์ Error
  clearError: () => set({ error: null }),
}));
