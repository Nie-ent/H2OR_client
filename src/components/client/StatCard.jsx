import React from 'react'

const StatCard = ({ number, label }) => (
  <div className="bg-white/5 backdrop-blur-md border border-[#f2b724]/30 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-[#f2b724]/10 hover:scale-105">
    <div className="text-[2rem] font-extrabold text-[#f2b724] mb-1">{number}</div>
    <div className="text-sm text-[#f1f3f4]/80">{label}</div>
  </div>
);

export default StatCard