

const DashboardPage = () => {
  return (
    // ไม่ต้องมี container flex นอกสุดแล้ว เพราะ Layout จัดการให้
    // ใส่เนื้อหาได้เลย
    <div className="space-y-6">
        
        <header className="flex justify-between items-center mb-8">
           <h1 className="text-2xl font-bold text-gray-800">Dashboard ภาพรวม</h1>
           <div className="bg-white p-2 px-4 rounded-full shadow flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-[#0b2545] font-bold">A</div>
              <span className="text-sm font-bold text-[#0b2545]">HR Manager</span>
           </div>
        </header>


        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-500 text-sm">ใบสมัครทั้งหมด</p>
            <p className="text-3xl font-bold text-[#0b2545]">12</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-500 text-sm">รอการตรวจสอบ</p>
            <p className="text-3xl font-bold text-yellow-500">5</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-500 text-sm">สัมภาษณ์แล้ว</p>
            <p className="text-3xl font-bold text-green-500">7</p>
          </div>
        </div>
      {/* </main> */}
    </div>
  );
};

export default DashboardPage;
