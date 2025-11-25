//src/pages/client/LandingPage.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // พระเอกของเรา ใช้เปลี่ยนหน้าโดยไม่ต้องโหลดใหม่
import { Briefcase, ShieldCheck } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center text-center p-4">
      
      <div className="max-w-2xl space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-[#0b2545]">
          ยินดีต้อนรับสู่ <span className="text-yellow-500">H2OR</span>
        </h1>
        <p className="text-gray-600 text-lg">
          ระบบรับสมัครงานออนไลน์ที่ง่ายและรวดเร็วที่สุด เชื่อมต่อผู้สมัครกับโอกาสใหม่ๆ ได้ทันที
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          {/* ปุ่มไปหน้า User (สมัครงาน) */}
          <Link 
            to="/apply" 
            className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition transform hover:-translate-y-1"
          >
            <Briefcase size={20} />
            สมัครงานทันที
          </Link>

          {/* ปุ่มไปหน้า Admin (ผู้ดูแลระบบ) */}
          <Link 
            to="/admin/login"  // <--- แก้ไขตรงนี้จาก /admin เป็น /admin/login
            className="flex items-center justify-center gap-2 bg-[#0b2545] hover:bg-[#1a3b61] text-white font-bold py-3 px-8 rounded-lg shadow-lg transition transform hover:-translate-y-1"
          >
            <ShieldCheck size={20} />
            สำหรับ HR / Admin
          </Link>
        </div>
      </div>

    </div>
  );
};

export default LandingPage;