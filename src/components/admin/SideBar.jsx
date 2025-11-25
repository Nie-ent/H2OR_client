import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, Home, LayoutDashboard, UserPlus } from "lucide-react";

const Sidebar = () => {
  const location = useLocation(); // เอาไว้เช็คว่าอยู่หน้าไหน จะได้ทำ Highlight

  // ฟังก์ชันช่วยเช็คว่าเมนูไหน Active อยู่
  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-700 text-white"
      : "text-gray-400 hover:text-white hover:bg-white/5";

  return (
    <aside className="w-64 bg-[#0b2545] text-white hidden md:flex flex-col h-screen sticky top-0">
      {/* Header */}
      <div className="p-6 font-bold text-xl border-b border-gray-700 flex items-center gap-2">
        H2OR Admin
      </div>

      {/* Menu List */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/admin/create-admin"
          className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${isActive(
            "/admin/create-admin"
          )}`}
        >
          <UserPlus size={20} />
          <span>สร้างผู้ดูแลระบบ</span>
        </Link>

        {/* เมนู Dashboard */}
        <Link
          to="/admin"
          className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${isActive(
            "/admin"
          )}`}
        >
          <LayoutDashboard size={20} />
          <span>หน้าหลัก</span>
        </Link>

        {/* เมนู ผู้สมัครงาน */}
        <Link
          to="/admin/users"
          className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${isActive(
            "/admin/users"
          )}`}
        >
          <Users size={20} />
          <span>ผู้สมัครงาน</span>
        </Link>
      </nav>

      {/* Footer / Back to Home */}
      <div className="p-4 border-t border-gray-700">
        <Link
          to="/"
          className="flex items-center gap-3 p-3 text-gray-400 hover:text-white hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"
        >
          <Home size={20} />
          <span>กลับหน้าหลัก</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
