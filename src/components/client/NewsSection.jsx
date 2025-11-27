//src/components/client/NewsSection.jsx

import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Notictwo from "../../assets/imge/notic1.png";


const NewsSection = () => {
  const navigate = useNavigate();

  const handleClickCandidade = () => {
    navigate("/apply");
  };
  const handleClickAdmin = () => {
    navigate("/admin/login");
  };
  return (
    <section className="w-full bg-gradient-to-br from-[#131e2d] to-[#3b5474] py-20 relative overflow-hidden">
      {/* Background Shape */}
      <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(242,183,36,0.15)_0%,transparent_70%)] rounded-full"></div>

      <div className="max-w-[1200px] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-16 items-center">
          <div className="relative group perspective-1000">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#f2b724] to-[#f2b724]/20 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500"></div>

            {/* ตัวรูปภาพ */}
            <img
              src={Notictwo}
              alt="News and Activities"
              className="relative w-full h-auto rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-[1.02] hover:-translate-y-2 border border-white/10"
            />
          </div>

          <div>
            <div className="m-5 inline-block bg-[#f2b724] text-[#072c4d] py-4 px-8 border-none rounded-xl text-base font-bold cursor-pointer relative z-10">
              ข่าวสารและกิจกรรม
            </div>
            <h3 className="text-[#f1f3f4] text-[3rem] font-extrabold m-0 mb-6 leading-[1.2] drop-shadow-[0_2px_15px_rgba(0,0,0,0.2)]">
              ประกาศรับสมัครบุคคลากร
            </h3>
            <p className="text-[#f1f3f4]/95 text-lg m-0 mb-8 leading-[1.8]">
              ถ้าคุณกำลังมองหาความท้าทายใหม่ๆ ในบรรยากาศที่สบายๆ
              <br></br>ไม่ต้องเครียดมาก ลองแวะเข้ามาคุยกับเรา H2OR
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleClickCandidade}
                className="btn-primary bg-[#f2b724] text-[#072c4d] py-4 px-8 border-none rounded-xl text-base font-bold cursor-pointer relative z-10"
              >
                สมัครงาน
              </button>
              
              {/* ปุมสำหรับ Admin ไว้ลบออกายหลัง*/}
              <button
                onClick={handleClickAdmin}
                className="btn-primary bg-[#f2b724] text-[#072c4d] py-4 px-8 border-none rounded-xl text-base font-bold cursor-pointer relative z-10"
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
