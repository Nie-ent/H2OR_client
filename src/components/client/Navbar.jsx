import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="gradient-bg w-full py-4 md:py-6 sticky top-0 z-50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex justify-between items-center relative z-10">
        {/* --- Logo Section --- */}
        <div className="flex items-center gap-3 md:gap-4 z-50">
          <div className="floating w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-gradient-to-br from-[#f2b724] to-[#f2b724] rounded-xl flex items-center justify-center shadow-[0_8px_20px_rgba(242,183,36,0.4)] shrink-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="md:w-[30px] md:h-[30px]"
            >
              <path d="M8 8h6v14h-6V8zm8 0h6v14h-6V8z" fill="#072c4d" />
              <circle cx="11" cy="15" r="1.5" fill="#072c4d" />
              <circle cx="19" cy="15" r="1.5" fill="#072c4d" />
            </svg>
          </div>
          <div>
            <h1 className="text-[#f2b724] text-xl md:text-[2rem] font-extrabold m-0 leading-[1.2] drop-shadow-[0_2px_10px_rgba(242,183,36,0.3)]">
              H2OR
            </h1>
            <p className="text-[#f1f3f4] text-opacity-90 text-[10px] md:text-sm m-0 leading-[1.2]">
              รับพัฒนาระบบและเทคโนโลยีสารสนเทศ
            </p>
          </div>
        </div>

        {/* --- Desktop Menu (Hidden on Mobile) --- */}
        <div className="hidden md:flex gap-10">
          {["บริการ", "เกี่ยวกับเรา", "ติดต่อ"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-[#f1f3f4] no-underline font-medium transition-all duration-300 hover:text-[#f2b724] hover:-translate-y-0.5"
            >
              {item}
            </a>
          ))}
        </div>

        {/* --- Mobile Hamburger Button --- */}
        <button
          className="md:hidden text-[#f2b724] z-50 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>

        {/* --- Mobile Menu Overlay --- */}
        <div
          className={`fixed inset-0 bg-[#072c4d]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ top: "0", left: "0", height: "100vh", zIndex: 40 }}
        >
          {/* Mobile Menu Links */}
          {["บริการ", "เกี่ยวกับเรา", "ติดต่อ"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setIsOpen(false)} // Close menu on click
              className="text-[#f1f3f4] text-2xl font-bold no-underline transition-all duration-300 hover:text-[#f2b724]"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

