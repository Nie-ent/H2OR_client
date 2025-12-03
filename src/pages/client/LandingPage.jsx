// src/pages/client/LandingPage.jsx

import Footer from "../../components/client/Footer";
import Hero from "../../components/client/Hero";
import Navbar from "../../components/client/Navbar";
import NewsSection from "../../components/client/NewsSection";
import Services from "../../components/client/Services";

// --- Main App Component ---
function LandingPage() {
  return (
    // 1. Wrapper หลัก: กำหนด font, สีพื้นหลัง และใช้ flex-col เพื่อจัดการ Footer
    <div className="min-h-screen bg-white font-['Kanit'] flex flex-col overflow-x-hidden">
      {/* Navbar อยู่ด้านบนสุด */}
      <Navbar />

      {/* 2. Main Content: ใช้ flex-grow เพื่อดัน Footer ลงล่างสุดถ้าเนื้อหาน้อย */}
      <main className="flex-grow w-full">
        <Hero />
        <NewsSection />
        <Services />
      </main>

      {/* Footer อยู่ด้านล่างสุด */}
      <Footer />
    </div>
  );
}

export default LandingPage;
