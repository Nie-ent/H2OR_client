//src/pages/client/LandingPage.jsx

import React from "react";
import Navbar from "../../components/client/Navbar";
import Hero from "../../components/client/Hero";
import NewsSection from "../../components/client/NewsSection";
import Services from "../../components/client/Services";
import Footer from "../../components/client/Footer";


// --- Main App Component ---
function LandingPage() {
  return (

    <div className="min-h-screen bg-white flex flex-col justify-center items-center text-center ">
      
      <div className="max-w-2xl space-y-6"></div>

    <div className="w-full min-h-screen font-['Kanit']">
      <Navbar />
      <Hero />
      <NewsSection />
      <Services />
      <Footer />

    </div>
    </div>
  );
}

export default LandingPage;
