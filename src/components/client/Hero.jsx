import React from "react";
import Profile from "../../assets/imge/profile.png";
import StatCard from "./StatCard";

const Hero = () => (
  // ปรับ py-12 สำหรับมือถือ และ py-20 สำหรับจอใหญ่ (md)
  <section className="gradient-bg w-full py-12 md:py-20 relative overflow-hidden">
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Hero Content */}
        <div className="text-center md:text-left">
          {/* Badge: ปรับให้ center ในมือถือด้วย text-center ของ parent หรือจะใช้ flex justify-center ก็ได้ */}
          <div className="inline-flex items-center bg-[#f2b724]/20 border border-[#f2b724] text-[#f2b724] py-2 px-4 md:px-5 rounded-[30px] text-xs md:text-sm font-semibold mb-6">
            <span className="pulse-dot inline-block w-2 h-2 bg-[#f2b724] rounded-full mr-2"></span>
            เทคโนโลยีชั้นนำ
          </div>

          {/* Heading: Responsive sizing (text-3xl -> 4xl -> 5.6rem) */}
          <h2 className="text-[#f1f3f4] text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold m-0 mb-4 md:mb-6 leading-[1.3] md:leading-[1.2] drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            พัฒนาเทคโนโลยี
            <br className="hidden md:block" />
            เพื่ออนาคต
          </h2>

          {/* Paragraph: ปรับขนาดและลด margin ในมือถือ */}
          <p className="text-[#f1f3f4]/90 text-base sm:text-lg md:text-xl m-0 mb-8 md:mb-10 leading-[1.6] md:leading-[1.8] max-w-2xl mx-auto md:mx-0">
            เราเชี่ยวชาญในการพัฒนาระบบและโซลูชันเทคโนโลยีสารสนเทศที่ตอบโจทย์ทุกความต้องการของธุรกิจ
            พร้อมส่งมอบผลงานคุณภาพสูงและบริการที่เหนือความคาดหมาย
          </p>

          {/* Stat Cards: ปรับ gap ให้เหมาะสมกับจอมือถือ */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 md:mb-10">
            <StatCard number="100+" label="โปรเจ็กต์" />
            <StatCard number="50+" label="ลูกค้า" />
            <StatCard number="10+" label="ปีประสบการณ์" />
          </div>

          {/* Buttons: เรียงแนวตั้งบนมือถือ (flex-col) แนวนอนบนจอใหญ่ (sm:flex-row) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="btn-primary w-full sm:w-auto bg-[#f2b724] text-[#072c4d] py-3 md:py-[1.125rem] px-8 md:px-10 border-none rounded-xl text-base md:text-lg font-bold cursor-pointer relative z-10 active:scale-95 transition-transform">
              เริ่มต้นใช้งาน
            </button>
            <button className="w-full sm:w-auto transition-all duration-300 bg-transparent text-[#f1f3f4] py-3 md:py-[1.125rem] px-8 md:px-10 border-2 border-[#f2b724] rounded-xl text-base md:text-lg font-bold cursor-pointer hover:bg-[#f2b724] hover:text-[#072c4d] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(242,183,36,0.3)] active:scale-95">
              ติดต่อเรา
            </button>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        {/* เพิ่ม order-first ใน mobile ถ้าอยากให้รูปอยู่บนสุด หรือปล่อยไว้แบบนี้รูปจะอยู่ล่างข้อความ */}
        <div className="floating w-full mt-8 md:mt-0 px-4 md:px-0">
          <div className="relative group perspective-1000">
            <div className="absolute -inset-3 bg-gradient-to-r from-[#f2b724] to-[#f2b724]/20 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500"></div>

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

