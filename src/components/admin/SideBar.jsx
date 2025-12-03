// src/components/admin/SideBar.jsx

import { useMemo } from "react";
import { NavLink, Link } from "react-router-dom";
// เพิ่มไอคอนใหม่: Briefcase(งาน), FileQuestion(แบบทดสอบ), Banknote(สินเชื่อ)
import { 
  Users, 
  Home, 
  LayoutDashboard, 
  UserPlus, 
  X, 
  Briefcase, 
  FileQuestion, 
  Banknote 
} from "lucide-react";
import { useAuthStore } from "../../stores/useAuthStore";

const Sidebar = ({ isMobileMenuOpen, closeMenu }) => {
  const user = useAuthStore((state) => state.user);
  const currentRole = user?.role || "";

  const adminMenus = useMemo(() => [
      {
        label: "หน้าหลัก (Dashboard)",
        path: "/admin",
        icon: LayoutDashboard,
        end: true, 
        allowedRoles: ["super_admin", "admin"],
      },
      {
        label: "ผู้สมัครงาน", // หน้ารวม Candidate
        path: "/admin/users",
        icon: Users,
        allowedRoles: ["super_admin", "admin"],
      },
      // {
      //   label: "แบบทดสอบ (Quiz)", // เคยทำส่วน Screening Quiz
      //   path: "/admin/quizzes",
      //   icon: FileQuestion,
      //   allowedRoles: ["super_admin", "admin"],
      // },
      {
        label: "สร้างผู้ดูแลระบบ",
        path: "/admin/create-admin",
        icon: UserPlus,
        allowedRoles: ["super_admin"], // ✅ เฉพาะ Super Admin
      },
    ],
    []
  );

  // Logic กรองเมนูตาม Role
  const filteredMenus = adminMenus.filter(item =>
    item.allowedRoles?.includes(currentRole)
  );

  const baseLinkClass = "flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer duration-200";
  const activeClass = "bg-blue-700 text-white shadow-md";
  const inactiveClass = "text-gray-400 hover:text-white hover:bg-white/5";

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu} 
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          bg-[#072c4d] text-white w-64 h-screen font-sans flex flex-col
          fixed top-0 left-0 z-50 border-r border-gray-700
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:sticky 
        `}
      >
        {/* Header */}
        <div className="p-6 font-bold text-xl border-b border-gray-700 flex items-center justify-between tracking-wide h-[72px]">
          <div className="flex flex-col">
            <span className="flex items-center gap-2">H2OR Admin</span>
            <span className="text-[10px] text-gray-400 font-normal uppercase mt-1">
              {currentRole.replace('_', ' ')}
            </span>
          </div>
          <button onClick={closeMenu} className="md:hidden text-gray-400 hover:text-white p-1">
            <X size={24} />
          </button>
        </div>

        {/* Menu List */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          {adminMenus.map((item) => (
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

          <div className="border-t border-gray-700 my-2 pt-2"></div>

          {/* ปุ่มกลับหน้าหลัก */}
          <Link
            to="/"
            onClick={closeMenu}
            className={`${baseLinkClass} text-gray-400 hover:text-red-400 hover:bg-red-500/10`}
          >
            <Home size={20} />
            <span className="font-medium">กลับหน้าหลัก</span>
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;