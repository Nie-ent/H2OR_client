import React from "react";
import ServiceCard from "./ServiceCard";


const Services = () => (
  // 1. ปรับ Padding แนวตั้ง: มือถือเหลือ py-12, จอใหญ่ใช้ py-20
  <section id="services" className="w-full bg-[#f1f3f4] py-12 md:py-20 relative">
    {/* 2. ปรับ Padding แนวนอน: มือถือ px-4 เพื่อให้มีเนื้อที่มากขึ้น */}
    <div className="max-w-[1200px] mx-auto px-4 md:px-8">

      {/* 3. ปรับ Margin ด้านล่าง: มือถือห่างน้อยลง (mb-10) */}
      <div className="text-center mb-10 md:mb-16">
        <div className="inline-block bg-linear-to-br from-[#f2b724] to-[#072c4d] py-2 px-6 rounded-[25px] text-sm font-bold mb-4 text-white shadow-[0_4px_15px_rgba(242,183,36,0.3)]">
          Services
        </div>

        {/* 4. Responsive Font Size: เริ่มที่ 3xl -> จอใหญ่ 5xl (หรือ 3rem ตามเดิม) */}
        <h3 className="text-[#072c4d] text-3xl md:text-4xl lg:text-[3rem] font-extrabold m-0 mb-4 tracking-tight leading-tight">
          บริการของเรา
        </h3>

        {/* 5. Responsive Paragraph: เริ่มที่ text-base -> จอใหญ่ text-xl */}
        <p className="text-[#3b5474] text-base md:text-xl m-0 max-w-[600px] mx-auto leading-relaxed">
          โซลูชันครบวงจรสำหรับทุกความต้องการด้านเทคโนโลยี
        </p>
      </div>

      {/* Grid Layout เดิมของคุณดีอยู่แล้ว (1 คอลัมน์บนมือถือ -> 3 คอลัมน์บนจอใหญ่) */}
      {/* เพิ่ม gap-6 สำหรับมือถือ และ gap-8 สำหรับจอใหญ่ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <ServiceCard
          title="พัฒนาระบบ"
          desc="พัฒนาระบบที่ตอบโจทย์ธุรกิจ ด้วยเทคโนโลยีที่ทันสมัยและปลอดภัย"
          icon={
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="7" y="7" width="21" height="21" rx="3" stroke="#f2b724" strokeWidth="2.5" />
              <path d="M12 17.5h11M17.5 12v11" stroke="#f2b724" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          }
        />
        <ServiceCard
          title="ให้คำปรึกษา"
          desc="ให้คำปรึกษาด้านเทคโนโลยี วางแผนและออกแบบโซลูชันที่เหมาะสม"
          icon={
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="17.5" cy="17.5" r="10" stroke="#f2b724" strokeWidth="2.5" />
              <path d="M17.5 12.5v5l3.5 3.5" stroke="#f2b724" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          }
        />
        <ServiceCard
          title="บำรุงรักษา"
          desc="ดูแลระบบอย่างต่อเนื่อง พร้อมอัพเดตและปรับปรุงประสิทธิภาพ"
          icon={
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.5l5 5 11-11" stroke="#f2b724" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="17.5" cy="17.5" r="10" stroke="#f2b724" strokeWidth="2.5" />
            </svg>
          }
        />
      </div>
    </div>
  </section>
);

export default Services;


















