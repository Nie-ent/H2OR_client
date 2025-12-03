// src/components/admin/SideBar.jsx

import { useMemo } from "react";
import { NavLink, Link } from "react-router-dom";
import { Users, Home, LayoutDashboard, UserPlus } from "lucide-react";
import { useAuthStore } from "../../stores/useAuthStore";

const Sidebar = () => {
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
    <aside className="w-64 bg-navy text-white hidden md:flex flex-col h-screen sticky top-0 font-sans">
      {/* Header */}
      <div className="p-6 font-bold text-xl border-b border-gray-700 flex items-center gap-2 tracking-wide">
        <span>H2OR Admin</span>

           {/* แสดง Role ให้เห็นชัดๆ (Optional) */}
        <span className="text-xs text-gray-400 font-normal uppercase px-2 py-0.5 bg-gray-800 rounded w-fit">
          {currentRole.replace('_', ' ')}
        </span> 
      </div>

      {/* Menu List */}
      <nav className="flex-1 p-4 space-y-2">
        {/* 3. Mapping: วนลูปสร้างเมนู ลดโค้ดซ้ำซ้อน */}
        {filteredMenus.map((item) => (
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
