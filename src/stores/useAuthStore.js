import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// export const useAuthStore = create(
//   persist(
//     (set, get) => ({
//       user: null,
//       role: null,
//       token: null,
//       isAuthenticated: false,

//       // ฟังก์ชัน Login: ตั้งค่าข้อมูล user ลง store
//       login: (userProfile, token) => {
//         set({
//           user: userProfile,
//           role: userProfile?.role,
//           token: token,
//           isAuthenticated: true,
//         });

        // หมายเหตุ: persist middleware จะจัดการ save ลง localStorage ให้เอง
        // แต่ถ้า axios คุณอ่านแบบ raw localStorage.getItem ก็ไม่มีปัญหาครับ ข้อมูลมันจะอยู่ที่เดียวกัน
      //   localStorage.setItem("token", token); // บันทึก manual เผื่อไว้ให้ axios config อ่านง่ายๆ
      //   localStorage.setItem("role", userProfile.role); // บันทึก manual เผื่อไว้ให้ axios config อ่านง่ายๆ
      // },
      // ฟังก์ชัน Logout: ล้างค่าทิ้ง
      // logout: () => {
      //   set({ user: null, token: null, role: null, isAuthenticated: false });
      //   localStorage.removeItem("token"); // ลบออกจาก localStorage เพื่อให้ Axios interceptor หยุดส่ง
      //   localStorage.removeItem("role");

        // ลบค่า persist ของ zustand (ชื่อ key = 'auth-storage' ตามที่ตั้งไว้)
    //     try {
    //       localStorage.removeItem("auth-storage");
    //     } catch (err) {
    //       console.warn("clear auth-storage failed", err);
    //     }
    //   },

    //   // ฟังก์ชันตัวอย่าง: fetch user profile จาก backend (เป็น property ของ store)
    //   fetchUserData: async (token) => {
    //     // ถ้าใช้ axios instance (แนะนำ) ส่ง token ใน header หรือ query ตาม backend
    //     try {
    //       const res = await api.get("/me", {
    //         headers: { Authorization: `Bearer ${token}` },
    //       });
    //       return res.data;
    //     } catch (err) {
    //       console.error("fetchUserData error:", err);
    //       throw err;
    //     }
    //   },
    // }),
    // // <-- persist options (ต้องเป็น argument ตัวที่สองของ persist)
//     {
//       name: "auth-storage",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      role: null,
      token: null,
      isAuthenticated: false,

      // ✅ ฟังก์ชัน Login: รับค่าจาก Backend แล้ว "แกะ" เฉพาะข้อมูล User มาเก็บ
      login: (response, token) => {
        console.log("🚀 Login Action Triggered");
        console.log("📥 Raw Response:", response);

        // 1. Logic การหา User Object (รองรับหลายรูปแบบ response structure)
        let userProfile = null;

        // เช็คไล่ระดับความลึกของข้อมูล (ตามที่คุณเคยแจ้งไว้คือ response.data.data.user)
        if (response?.data?.data?.user) {
          userProfile = response.data.data.user; 
        } else if (response?.data?.user) {
          userProfile = response.data.user;
        } else if (response?.user) {
          userProfile = response.user;
        } else {
          userProfile = response; // กรณีส่ง object user มาตรงๆ
        }

        // 2. Clone Object เพื่อแก้ปัญหา Reference (สำคัญมากสำหรับการบันทึกลง Storage)
        const cleanUser = userProfile ? { ...userProfile } : null;
        const userRole = cleanUser?.role || "user";

        console.log("✅ Found User:", cleanUser);

        // 3. บันทึกลง Store
        set({
          user: cleanUser,
          role: userRole,
          token: token,
          isAuthenticated: true,
        });

        // 4. บันทึกสำรองลง LocalStorage (เผื่อระบบอื่นใช้)
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
      },

      logout: () => {
        console.log("👋 LOGOUT");
        set({ user: null, role: null, token: null, isAuthenticated: false });
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("auth-storage"); // ล้างเกลี้ยง
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);