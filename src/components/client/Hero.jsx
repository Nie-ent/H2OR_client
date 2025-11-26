import React from "react";
import StatCard from "./StatCard";
import Profile from "../../assets/imge/profile.png";

const Hero = () => (
  <section className="gradient-bg w-full py-20 relative">
    <div className="max-w-[1200px] mx-auto px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Hero Content */}
        <div>
          <div className="inline-block bg-[#f2b724]/20 border border-[#f2b724] text-[#f2b724] py-2 px-5 rounded-[30px] text-sm font-semibold mb-6">
            <span className="pulse-dot inline-block w-2 h-2 bg-[#f2b724] rounded-full mr-2"></span>
            เทคโนโลยีชั้นนำ
          </div>
          <h2 className="text-[#f1f3f4] text-[3.5rem] font-extrabold m-0 mb-6 leading-[1.2] drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            พัฒนาเทคโนโลยีเพื่ออนาคต
          </h2>
          <p className="text-[#f1f3f4]/90 text-xl m-0 mb-10 leading-[1.8]">
            เราเชี่ยวชาญในการพัฒนาระบบและโซลูชันเทคโนโลยีสารสนเทศที่ตอบโจทย์ทุกความต้องการของธุรกิจ
            พร้อมส่งมอบผลงานคุณภาพสูงและบริการที่เหนือความคาดหมาย
          </p>

          <div className="grid grid-cols-3 gap-4 mb-10">
            <StatCard number="100+" label="โปรเจ็กต์" />
            <StatCard number="50+" label="ลูกค้า" />
            <StatCard number="10+" label="ปีประสบการณ์" />
          </div>

          <div className="flex gap-4">
            <button className="btn-primary bg-[#f2b724] text-[#072c4d] py-[1.125rem] px-10 border-none rounded-xl text-lg font-bold cursor-pointer relative z-10">
              เริ่มต้นใช้งาน
            </button>
            <button className="transition-all duration-300 bg-transparent text-[#f1f3f4] py-[1.125rem] px-10 border-2 border-[#f2b724] rounded-xl text-lg font-bold cursor-pointer hover:bg-[#f2b724] hover:text-[#072c4d] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(242,183,36,0.3)]">
              ติดต่อเรา
            </button>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className=" floating w-full">
          <div className="relative group perspective-1000">
            <div className="absolute -inset-3 bg-gradient-to-r from-[#f2b724] to-[#f2b724]/20 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500"></div>

            {/* ตัวรูปภาพ */}
            <img
              src={Profile}
              alt="Profile"
              className="relative w-full h-auto rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-[1.02] hover:-translate-y-2 border border-white/10"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
