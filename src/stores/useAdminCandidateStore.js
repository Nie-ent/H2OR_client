// src/stores/useAdminCandidateStore.js
import { create } from "zustand";
import api from "../configs/axiosCandidate"; 
// baseURL = "http://localhost:8000/api/candidates"

export const useAdminCandidateStore = create((set) => ({
  candidates: [],
  isLoading: false,
  error: null,

  // ดึงผู้สมัครทั้งหมดจาก backend
  fetchCandidates: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get("/"); // GET /api/candidates
      const candidates = res.data?.candidates || [];
      set({ candidates, isLoading: false });
    } catch (error) {
      console.error("fetchCandidates error:", error);
      const message =
        error?.response?.data?.message || "ไม่สามารถโหลดรายชื่อผู้สมัครได้";
      set({ isLoading: false, error: message });
    }
  },

  // ฟังก์ชันให้ Admin ใช้เพิ่มผู้สมัครใหม่
  createCandidate: async (formData) => {
    set({ isLoading: true, error: null });

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        stack: formData.position || "",
        expected_salary: null,
        gender: null,
        age: null,
      };

      const res = await api.post("/", payload); // POST /api/candidates

      set((state) => ({
        isLoading: false,
        // ถ้า backend ส่ง candidate กลับมา จะ append เข้า list เลย
        candidates: res.data?.candidate
          ? [res.data.candidate, ...state.candidates]
          : state.candidates,
      }));

      return res.data;
    } catch (error) {
      console.error("createCandidate error:", error);
      const message =
        error?.response?.data?.message || "ไม่สามารถเพิ่มผู้สมัครงานได้";
      set({ isLoading: false, error: message });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
