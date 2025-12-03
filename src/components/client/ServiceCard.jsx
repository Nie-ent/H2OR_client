
import React from "react";

const ServiceCard = ({ icon, title, desc }) => (
  <div className="card-hover glass-effect rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] 
    p-6 md:p-10 
    h-full flex flex-col" // เพิ่ม h-full และ flex เพื่อให้การ์ดสูงเท่ากันถ้าอยู่ใน Grid
  >
    {/* Icon Container */}
    <div className="bg-gradient-to-br from-[#072c4d] to-[#3b5474] rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgba(7,44,77,0.3)]
      w-[60px] h-[60px] mb-6 
      md:w-[70px] md:h-[70px] md:mb-8"
    >
      {/* ถ้า icon เป็น SVG ให้แน่ใจว่ามันย่อขยายตาม parent หรือกำหนด size ในนี้เพิ่มได้ครับ */}
      {icon}
    </div>

    {/* Title */}
    <h4 className="text-[#072c4d] font-bold m-0 
      text-2xl mb-3 
      md:text-[1.75rem] md:mb-4"
    >
      {title}
    </h4>

    {/* Description */}
    <p className="text-[#3b5474] leading-[1.7] m-0 flex-grow
      text-sm md:text-base" // ลดขนาดตัวหนังสือเล็กน้อยในมือถือ
    >
      {desc}
    </p>

    {/* Footer Link */}
    <div className="pt-6 border-t-2 border-[#f2b724]/20 
      mt-4 md:mt-6"
    >
      <span className="text-[#f2b724] font-semibold text-sm cursor-pointer hover:underline transition-all">
        เรียนรู้เพิ่มเติม →
      </span>
    </div>
  </div>
);

export default ServiceCard;









