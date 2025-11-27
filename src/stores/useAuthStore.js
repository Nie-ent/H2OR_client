import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,      // เก็บข้อมูล User (ชื่อ, role)
      token: null,     // เก็บ Token
      isAuthenticated: false,

      // ฟังก์ชัน Login: รับค่ามาแล้วบันทึกลง Store + LocalStorage (ทำให้อัตโนมัติโดย persist)
      login: (userData, token) => {
        set({ 
          user: userData, 
          token: token, 
          isAuthenticated: true 
        });
        // หมายเหตุ: persist middleware จะจัดการ save ลง localStorage ให้เอง
        // แต่ถ้า axios คุณอ่านแบบ raw localStorage.getItem ก็ไม่มีปัญหาครับ ข้อมูลมันจะอยู่ที่เดียวกัน
        localStorage.setItem("token", token); // บันทึก manual เผื่อไว้ให้ axios config อ่านง่ายๆ
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
