import React from 'react';

const Footer = () => (
  <footer className="w-full bg-gradient-to-br from-[#072c4d] to-[#3b5474] py-8 md:py-12 relative">
    {/* Decorative Line */}
    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#f2b724] to-transparent"></div>
    
    <div className="max-w-[1200px] mx-auto px-4 md:px-8">
      <div className="flex flex-col items-center">
        
        {/* Logo Section */}
        <div className="mb-6 md:mb-8">
          <div className="inline-flex items-center gap-3 md:gap-4">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#f2b724] rounded-xl flex items-center justify-center shadow-lg">
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 7h4v10h-4V7zm6 0h4v10h-4V7z" fill="#072c4d" />
              </svg>
            </div>
            <span className="text-[#f2b724] text-xl md:text-2xl font-extrabold tracking-wide">
              H2OR
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 md:gap-8 mb-6 md:mb-8">
          {["บริการ", "เกี่ยวกับเรา", "ติดต่อ"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[#f1f3f4] no-underline text-sm md:text-base font-medium transition-colors duration-300 hover:text-[#f2b724] hover:bg-white/5 px-3 py-1 rounded-md"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-[#f1f3f4]/70 text-xs md:text-sm m-0 text-center">
          © {new Date().getFullYear()} H2OR. สงวนลิขสิทธิ์
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;



















