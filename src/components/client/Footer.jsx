const Footer = () => (
  <footer className="w-full bg-gradient-to-br from-[#072c4d] to-[#3b5474] py-12 relative">
    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#f2b724] to-transparent"></div>
    <div className="max-w-[1200px] mx-auto px-8">
      <div className="text-center">
        <div className="mb-6">
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-[#f2b724] rounded-xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 7h4v10h-4V7zm6 0h4v10h-4V7z" fill="#072c4d" />
              </svg>
            </div>
            <span className="text-[#f2b724] text-2xl font-extrabold">H2OR</span>
          </div>
        </div>
        <div className="flex justify-center gap-8 mb-6">
          {['บริการ', 'เกี่ยวกับเรา', 'ติดต่อ'].map((item) => (
            <a key={item} href="#" className="text-[#f1f3f4] no-underline text-sm transition-colors duration-300 hover:text-[#f2b724]">
              {item}
            </a>
          ))}
        </div>
        <p className="text-[#f1f3f4]/70 text-sm m-0">© 2024 H2OR. สงวนลิขสิทธิ์</p>
      </div>
    </div>
  </footer>
);

export default Footer