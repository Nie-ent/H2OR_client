import React from "react";

const ServiceCard = ({ icon, title, desc }) => (
  <div className="card-hover glass-effect rounded-[20px] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
    <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#072c4d] to-[#3b5474] rounded-2xl flex items-center justify-center mb-8 shadow-[0_8px_20px_rgba(7,44,77,0.3)]">
      {icon}
    </div>
    <h4 className="text-[#072c4d] text-[1.75rem] font-bold m-0 mb-4">
      {title}
    </h4>
    <p className="text-[#3b5474] text-base m-0 leading-[1.7]">{desc}</p>
    <div className="mt-6 pt-6 border-t-2 border-[#f2b724]/20">
      <span className="text-[#f2b724] font-semibold text-sm cursor-pointer">
        เรียนรู้เพิ่มเติม →
      </span>
    </div>
  </div>
);

export default ServiceCard;
