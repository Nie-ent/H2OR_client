import { create } from 'zustand';

// สร้าง Store สำหรับเก็บสถานะ User
const useAuthStore = create((set) => ({
  // ค่าเริ่มต้นเป็น 'guest' (คนทั่วไปที่ยังไม่ล็อกอิน)
  // ค่าที่เป็นไปได้: 'guest', 'user', 'admin'
  role: 'guest', 
  
  // ฟังก์ชันสำหรับจำลองการ Login (ใช้ทดสอบ)
  setRole: (newRole) => set({ role: newRole }),
  
  // ฟังก์ชัน Logout
  logout: () => set({ role: 'guest' })
}));

export default useAuthStore;