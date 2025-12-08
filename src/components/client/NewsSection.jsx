import { useNavigate } from "react-router";
import Notictwo from "../../assets/imge/notic1.png";

const NewsSection = () => {
  const navigate = useNavigate();

  const handleClickCandidade = () => {
    navigate("/applicant");
  };
  const handleClickAdmin = () => {
    navigate("/admin/login");
  };

  return (
    <section className="w-full bg-linear-to-br from-[#131e2d] to-[#3b5474] py-12 md:py-20 relative overflow-hidden">
      {/* Background Shape - ปรับขนาดและตำแหน่งให้ไม่บังเนื้อหาในมือถือ */}
      <div className="absolute top-[-20%] right-[-20%] md:top-[-50%] md:right-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[radial-gradient(circle,rgba(242,183,36,0.15)_0%,transparent_70%)] rounded-full pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        {/* Grid: มือถือ 1 คอลัมน์, แท็บเล็ตขึ้นไป 2 คอลัมน์ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* ส่วนรูปภาพ */}
          <div className="relative group perspective-1000 order-1 md:order-1">
            <div className="absolute -inset-2 bg-linear-to-r from-[#f2b724] to-[#f2b724]/20 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <img
              src={Notictwo}
              alt="News and Activities"
              className="relative w-full h-auto rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-[1.02] hover:-translate-y-2 border border-white/10"
            />
          </div>

          {/* ส่วนเนื้อหา */}
          <div className="order-2 md:order-2 text-center md:text-left">
            {/* Badge: ปรับ Margin ให้พอดี */}
            <div className="inline-block bg-[#f2b724] text-[#072c4d] py-2 px-6 md:py-4 md:px-8 border-none rounded-xl text-sm md:text-base font-bold cursor-pointer relative z-10 mb-4 md:mb-6">
              ข่าวสารและกิจกรรม
            </div>

            {/* Heading: ลดขนาด Font ในมือถือ */}
            <h3 className="text-[#f1f3f4] text-3xl md:text-[3rem] font-extrabold m-0 mb-4 md:mb-6 leading-tight md:leading-[1.2] drop-shadow-[0_2px_15px_rgba(0,0,0,0.2)]">
              ประกาศรับสมัครบุคลากร
            </h3>

            {/* Paragraph */}
            <p className="text-[#f1f3f4]/95 text-base md:text-lg m-0 mb-6 md:mb-8 leading-relaxed md:leading-[1.8]">
              ถ้าคุณกำลังมองหาความท้าทายใหม่ๆ ในบรรยากาศที่สบายๆ
              <br className="hidden md:block" />{" "}
              {/* ซ่อน <br> ในมือถือเพื่อให้ text flow ธรรมชาติ */}
              ไม่ต้องเครียดมาก ลองแวะเข้ามาคุยกับเรา H2OR
            </p>

            {/* Buttons Container: ปรับ flex direction */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={handleClickCandidade}
                className="btn-primary bg-[#f2b724] text-[#072c4d] py-3 px-6 md:py-4 md:px-8 border-none rounded-xl text-base font-bold cursor-pointer relative z-10 w-full sm:w-auto hover:bg-[#d9a420] transition-colors"
              >
                สมัครงาน
              </button>

              {/* ปุ่ม Admin */}
              <button
                onClick={handleClickAdmin}
                className="btn-primary bg-[#f2b724] text-[#072c4d] py-3 px-6 md:py-4 md:px-8 border-none rounded-xl text-base font-bold cursor-pointer relative z-10 w-full sm:w-auto hover:bg-[#d9a420] transition-colors"
              >
                Admin Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;

