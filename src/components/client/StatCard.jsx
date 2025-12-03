
import React from "react";

const StatCard = ({ number, label }) => (
  <div className="bg-white/5 backdrop-blur-md border border-[#f2b724]/30 text-center transition-all duration-300 hover:bg-[#f2b724]/10 hover:scale-105
    /* Responsive Styles เริ่มตรงนี้ */
    rounded-xl md:rounded-2xl       /* มุมโค้ง: มือถือโค้งน้อยหน่อย Desktop โค้งเยอะ */
    p-4 md:p-6                      /* Padding: มือถือ 1rem (16px), Desktop 1.5rem (24px) */
  ">
    <div className="font-extrabold text-[#f2b724] mb-1
      /* Responsive Font Size */
      text-3xl md:text-[2rem]       /* ขนาดตัวเลข: มือถือเล็กลงนิดนึง Desktop เท่าเดิม */
    ">
      {number}
    </div>
    <div className="text-[#f1f3f4]/80
      /* Responsive Label Size */
      text-xs md:text-sm            /* ขนาดคำบรรยาย: มือถือเล็กหน่อย Desktop ปกติ */
    ">
      {label}
    </div>
  </div>
);

export default StatCard;




