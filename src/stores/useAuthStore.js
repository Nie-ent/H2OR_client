import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// สร้าง Store ชื่อ useAuthStore
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null, // เก็บข้อมูล User (ชื่อ, role)
      role: null,
      token: null, // เก็บ Token
      isAuthenticated: false,

      // ฟังก์ชัน Login: รับค่ามาแล้วบันทึกลง Store + LocalStorage (ทำให้อัตโนมัติโดย persist)
      login: (userData, token) => {
        console.log("Login Payload", userData);

       // 🛠️ ปรับ Logic การดึงข้อมูลให้ครอบคลุมทุกความเป็นไปได้
        let userProfile = null;

        if (response?.data?.data?.user) {
          // Case 1: ซ้อนลึก 3 ชั้น (Standard API response format)
          userProfile = response.data.data.user;
        } else if (response?.data?.user) {
          // Case 2: ซ้อน 2 ชั้น
          userProfile = response.data.user;
        } else if (response?.user) {
          // Case 3: ชั้นเดียว
          userProfile = response.user;
        } else {
          // Case 4: ตัว response เองคือ user object
          userProfile = response;
        } 

        console.log("Extracted user Profile:", userProfile)
        
        // ตรวจสอบว่า userProfile มีค่า firstName หรือไม่
        if (!userProfile?.firstName) {
            console.warn("⚠️ Warning: userProfile does not have 'firstName'. Check API response.");
        }

        set({
          user: userProfile,
          role: userProfile?.role,
          token: token,
          isAuthenticated: true,
        });
        // หมายเหตุ: persist middleware จะจัดการ save ลง localStorage ให้เอง
        // แต่ถ้า axios คุณอ่านแบบ raw localStorage.getItem ก็ไม่มีปัญหาครับ ข้อมูลมันจะอยู่ที่เดียวกัน
        localStorage.setItem("token", token); // บันทึก manual เผื่อไว้ให้ axios config อ่านง่ายๆ
        localStorage.setItem("role", userProfile.role); // บันทึก manual เผื่อไว้ให้ axios config อ่านง่ายๆ
      },

      // ฟังก์ชัน Logout: ล้างค่าทิ้ง
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem("token"); // ลบออกจาก localStorage เพื่อให้ Axios interceptor หยุดส่ง
        
      },
    }),
    {
      name: "auth-storage", // ชื่อ Key ใน LocalStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
