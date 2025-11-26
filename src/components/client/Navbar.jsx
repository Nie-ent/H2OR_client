import React from 'react'

const Navbar = () => (
  <nav className="gradient-bg w-full py-6 sticky top-0 z-50 backdrop-blur-md">
    <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center relative z-10">
      <div className="flex items-center gap-4">
        <div className="floating w-[50px] h-[50px] bg-gradient-to-br from-[#f2b724] to-[#f2b724] rounded-xl flex items-center justify-center shadow-[0_8px_20px_rgba(242,183,36,0.4)]">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8h6v14h-6V8zm8 0h6v14h-6V8z" fill="#072c4d" />
            <circle cx="11" cy="15" r="1.5" fill="#072c4d" />
            <circle cx="19" cy="15" r="1.5" fill="#072c4d" />
          </svg>
        </div>
        <div>
          <h1 className="text-[#f2b724] text-[2rem] font-extrabold m-0 leading-[1.2] drop-shadow-[0_2px_10px_rgba(242,183,36,0.3)]">
            H2OR
          </h1>
          <p className="text-[#f1f3f4] text-opacity-90 text-sm m-0 leading-[1.2]">
            รับพัฒนาระบบและเทคโนโลยีสารสนเทศ
          </p>
        </div>
      </div>
      <div className="flex gap-10">
        {['บริการ', 'เกี่ยวกับเรา', 'ติดต่อ'].map((item) => (
          <a
            key={item}
            href={`#${item}`}
            className="text-[#f1f3f4] no-underline font-medium transition-all duration-300 hover:text-[#f2b724] hover:-translate-y-0.5"
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  </nav>
);

export default Navbar