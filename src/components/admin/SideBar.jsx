// src/components/admin/SideBar.jsx

import { NavLink, Link } from "react-router-dom";
import { Users, Home, LayoutDashboard, UserPlus } from "lucide-react";

const Sidebar = () => {
  // 1. Config: แยก Data ออกจาก UI เพื่อให้ดูแลง่าย
  const adminMenus = [
    { 
      label: "หน้าหลัก", 
      path: "/admin", 
      icon: LayoutDashboard,
      end: true // ใช้ prop นี้เพื่อให้ Active เฉพาะ path นี้เป๊ะๆ ไม่รวม sub-path
    },
    { 
      label: "สร้างผู้ดูแลระบบ", 
      path: "/admin/create-admin", 
      icon: UserPlus 
    },
    { 
      label: "ผู้สมัครงาน", 
      path: "/admin/users", 
      icon: Users 
    },
  ];

  // 2. Base Style: แยก Class พื้นฐานออกมาเพื่อให้แก้ที่เดียวจบ
  const baseLinkClass = "flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer duration-200";
  
  // Class สำหรับตอน Active และ Inactive
  const activeClass = "bg-blue-700 text-white shadow-md";
  const inactiveClass = "text-gray-400 hover:text-white hover:bg-white/5";

  return (
    <aside className="w-64 bg-[#0b2545] text-white hidden md:flex flex-col h-screen sticky top-0 font-sans">
      {/* Header */}
      <div className="p-6 font-bold text-xl border-b border-gray-700 flex items-center gap-2 tracking-wide">
        H2OR Admin
      </div>

      {/* Menu List */}
      <nav className="flex-1 p-4 space-y-2">
        {/* 3. Mapping: วนลูปสร้างเมนู ลดโค้ดซ้ำซ้อน */}
        {adminMenus.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end} // สำคัญ: เพื่อไม่ให้หน้า Dashboard Active ค้างเมื่อเข้าหน้าย่อย
            className={({ isActive }) =>
              `${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer / Back to Home */}
      <div className="p-4 border-t border-gray-700">
        <Link
          to="/"
          className={`${baseLinkClass} text-gray-400 hover:text-red-400 hover:bg-red-500/10`}
        >
          <Home size={20} />
          <span className="font-medium">กลับหน้าหลัก</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;