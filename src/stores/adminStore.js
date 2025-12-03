// src/stores/adminStore.js

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// สร้าง Store ชื่อ useAdminStore
export const useAdminStore = create(
  persist(set)  ({
      admin: null,      // เก็บข้อมูล Admin (ชื่อ, role)
      token: null,     // เก็บ Token
      isAuthenticated: false,
        // ฟังก์ชัน Login: รับค่ามาแล้วบันทึกลง Store + LocalStorage (ทำให้อัตโนมัติโดย persist)
        login: (adminData, token) => { 
            set({
                admin: adminData,
                token: token,
                isAuthenticated: true
            });
            // หมายเหตุ: persist middleware จะจัดการ save ลง localStorage ให้เอง
            // แต่ถ้า axios คุณอ่านแบบ raw localStorage.getItem ก็ไม่มีปัญหาครับ ข้อมูลมันจะอยู่ที่เดียวกัน
            localStorage.setItem("SuperAdminToken", token); // บันทึก manual เผื่อไว้ให้ axios config อ่านง่ายๆ
        },
        // ฟังก์ชัน Logout: ล้างข้อมูลใน Store + LocalStorage
        logout: () => {
            set({
                admin: null,
                token: null,
                isAuthenticated: false
            });
            localStorage.removeItem("SuperAdminToken");
        },
    }),
  {
    name: "super-admin-store", // ชื่อ key ใน localStorage
    storage: createJSONStorage(() => localStorage), // ใช้ localStorage
  }
);

