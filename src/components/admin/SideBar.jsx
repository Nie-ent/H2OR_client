// src/components/admin/SideBar.jsx
import { useState, useMemo } from "react";
import { NavLink, Link } from "react-router-dom";
import { Users, Home, LayoutDashboard, UserPlus, Menu, X } from "lucide-react";


const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);
  // 2. Config: แยก Data ออกจาก UI เพื่อให้ดูแลง่าย
const role = localStorage.getItem("role")
  // กันโค้ด error : ถ้าไม่มี user ให้เป็น string ว่าง หรือ guest
  const currentRole = role || "";

  const adminMenus = useMemo(() => [
      {
        label: "หน้าหลัก",
        path: "/admin",
        icon: LayoutDashboard,
        end: true, // ใช้ prop นี้เพื่อให้ Active เฉพาะ path นี้เป๊ะๆ ไม่รวม sub-path
        allowedRoles: ["super_admin", "admin"], //  เห็นได้ทั้งคู่
      },
      {
        label: "สร้างผู้ดูแลระบบ",
        path: "/admin/create-admin",
        icon: UserPlus,
        allowedRoles: ["super_admin"], // ✅ เฉพาะ Super Admin เท่านั้น
      },
      {
        label: "ผู้สมัครงาน",
        path: "/admin/users",
        icon: Users,
        allowedRoles: ["super_admin", "admin"], // เห็นได้ทั้งคู่
      },
    ],
    []
  );

  // 4. Logic Filter: กรองเมนูตาม Role
  const filteredMenus = adminMenus.filter(item =>
    item.allowedRoles?.includes(currentRole)
  );

  // Base Style: แยก Class พื้นฐานออกมาเพื่อให้แก้ที่เดียวจบ
  const baseLinkClass =
    "flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer duration-200";
  // Class สำหรับตอน Active และ Inactive
  const activeClass = "bg-blue-700 text-white shadow-md";
  const inactiveClass = "text-gray-400 hover:text-white hover:bg-white/5";

  return (
    <>
      {/* --- Mobile Trigger Button (ขวาบน & สีจาง) --- */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={toggleMenu}
          className="p-2 bg-white/60 backdrop-blur-sm border border-gray-200 text-gray-500 rounded-md shadow-sm hover:bg-white hover:text-blue-900 transition-all"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- Mobile Overlay --- */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu} 
        />
      )}

      {/* --- Sidebar Container --- */}
      <aside 
        className={`
          bg-navy text-white w-64 h-screen font-sans flex flex-col
          fixed top-0 left-0 z-50 
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:sticky 
        `}
      >
        {/* Header */}
        <div className="p-6 font-bold text-xl border-b border-gray-700 flex items-center justify-between tracking-wide">
          <span className="flex items-center gap-2">H2OR Admin</span>
          <button onClick={closeMenu} className="md:hidden text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Menu List */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {/* 1. วนลูปเมนู Admin */}
          {filteredMenus.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={closeMenu}
              className={({ isActive }) =>
                `${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}

          {/* เส้นคั่นบางๆ เพื่อแยกส่วน */}
          <div className="border-t border-gray-700 my-2 pt-2"></div>

          {/* 2. เมนู "กลับหน้าหลัก" (นำมารวมใน Nav เลย) */}
          <Link
            to="/"
            onClick={closeMenu}
            className={`${baseLinkClass} text-gray-400 hover:text-red-400 hover:bg-red-500/10`}
          >
            <Home size={20} />
            <span className="font-medium">กลับหน้าหลัก</span>
          </Link>
        </nav>

        {/* ตัดส่วน Footer ด้านล่างทิ้ง หรือเก็บไว้ใส่ Version App แทนได้ */}
        {/* <div className="p-4 border-t border-gray-700 mt-auto"> ... </div> */}
      </aside>
    </>
  );
};

export default Sidebar;