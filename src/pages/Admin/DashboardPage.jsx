// src/pages/Admin/DashboardPage.jsx

import { useEffect, useMemo, useState } from "react";
import { useCandidateStore } from "../../stores/useCandidateStore";
import { useAuthStore } from "../../stores/useAuthStore"; // ✅ 1. Import Auth Store - Show User Login
import { useNavigate } from "react-router-dom"; // ✅ 2. Import Navigate - Show User Login
import { toast } from "react-toastify";
import LogoutModal from "../../components/admin/LogoutModal"; // ✅ Import Component ใหม่

import { Users, Clock, CheckCircle, XCircle, LayoutDashboard, ChevronLeft, ChevronRight, User, LogOut as LogOutIcon } from "lucide-react"; // ✅ 3. เพิ่ม Icon Logout

// =============================================================================================
// II. HELPER FUNCTIONS (CALENDAR LOGIC)
// =============================================================================================
const getCalendarDays = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const numDays = lastDayOfMonth.getDate();

  const startDayOfWeek = firstDayOfMonth.getDay();
  const calendarDays = [];

  for (let i = 0; i < startDayOfWeek; i++) {
    calendarDays.push({ date: null, dateString: null, dayOfMonth: null });
  }

  for (let i = 1; i <= numDays; i++) {
    const currentDate = new Date(year, month, i);
    calendarDays.push({
      date: currentDate,
      dateString: currentDate.toISOString().split("T")[0],
      dayOfMonth: i,
    });
  }

  return calendarDays;
};

const countApplicantsByDate = (applicants) => {
  const counts = {};
  applicants.forEach((app) => {
    counts[app.appliedDate] = (counts[app.appliedDate] || 0) + 1;
  });
  return counts;
};

// =============================================================================================
// III. SUB-COMPONENTS (UI ELEMENTS)
// =============================================================================================
const StatCard = ({ title, value, icon: Icon, colorClass, bgColorClass }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border-t-4" style={{ borderColor: colorClass.split("-")[1] }}>
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
      </div>
      <div className={`p-3 rounded-full ${bgColorClass} ${colorClass}`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

const calculateChartData = (applicants) => {
  const passed = applicants.filter((a) => a.status === "pass").length;
  const failed = applicants.filter((a) => a.status === "fail").length;
  const pending = applicants.filter((a) => a.status === "pending").length;
  return { passed, failed, pending };
};

const ApplicantDonutChart = ({ applicants }) => {
  const { passed, failed, pending } = calculateChartData(applicants);
  const total = passed + failed + pending;

  const passedPct = Math.round((passed / total) * 100) || 0;
  const failedPct = Math.round((failed / total) * 100) || 0;
  const pendingPct = Math.round((pending / total) * 100) || 0;

  const donutStyle = {
    background: `conic-gradient(
      #34D399 0% ${passedPct}%,
      #EF4444 ${passedPct}% ${passedPct + failedPct}%,
      #FBBF24 ${passedPct + failedPct}% 100%
    )`,
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-6">สรุปสถานะผู้สมัครทั้งหมด ({total} คน)</h2>
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-500" style={donutStyle}>
          <div className="w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
            <span className="text-3xl font-bold text-indigo-700">{total}</span>
            <span className="text-xs text-gray-500">Total</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full pt-4">
          <div className="text-center">
            <CheckCircle size={18} className="inline text-green-500 mr-1" />
            <p className="text-sm font-medium text-gray-600">ผ่าน</p>
            <p className="text-lg font-bold text-green-600">
              {passed} ({passedPct}%)
            </p>
          </div>
          <div className="text-center">
            <XCircle size={18} className="inline text-red-500 mr-1" />
            <p className="text-sm font-medium text-gray-600">ไม่ผ่าน</p>
            <p className="text-lg font-bold text-red-600">
              {failed} ({failedPct}%)
            </p>
          </div>
          <div className="text-center">
            <Clock size={18} className="inline text-yellow-500 mr-1" />
            <p className="text-sm font-medium text-gray-600">รอตัดสิน</p>
            <p className="text-lg font-bold text-yellow-600">
              {pending} ({pendingPct}%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  let text = "";
  let className = "";

  if (status === "pending") {
    text = "PENDING";
    className = "bg-yellow-100 text-yellow-700";
  } else if (status === "pass") {
    text = "PASS";
    className = "bg-green-100 text-green-700";
  } else if (status === "fail") {
    text = "FAIL";
    className = "bg-red-100 text-red-700";
  }

  return (
    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {text}
    </span>
  );
};

const ApplicantModal = ({ date, applicants, onClose }) => {
  if (!date || applicants.length === 0) return null;

  const displayDate = date.toLocaleDateString("th-TH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative transform transition-all duration-300 scale-100">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">รายชื่อผู้สมัคร: {displayDate}</h3>

        <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
          {applicants.map((app) => {
            const cleanedName = (app.name || app.fullName || "").replace(/ แคนดิเดต.*/, "").trim();
            return (
              <div
                key={app.id}
                className="flex justify-between items-center p-3 border border-gray-100 rounded-lg bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0 pr-4">
                  <p className="font-semibold text-gray-900 truncate flex items-center">
                    <User size={16} className="text-indigo-500 mr-2 flex-shrink-0" />
                    {cleanedName}
                    <span className="ml-4 px-2 py-0.5 text-sm font-semibold text-indigo-700 bg-indigo-50 rounded-md">({app.applicationTime} น.)</span>
                  </p>
                  <p className="text-sm text-gray-500 ml-6">{app.position}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={app.status} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-4 border-t mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Applicant Calendar Component (uses currentDate from parent) ---
const ApplicantCalendar = ({ applicants, currentDate, setCurrentDate }) => {
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const [showApplicantModal, setShowApplicantModal] = useState(false);
  const [selectedDayDate, setSelectedDayDate] = useState(null);
  const [selectedDayApplicants, setSelectedDayApplicants] = useState([]);

  const dailyCounts = useMemo(() => countApplicantsByDate(applicants), [applicants]);
  const calendarDays = useMemo(() => getCalendarDays(currentDate), [currentDate]);
  const todayString = new Date().toISOString().split("T")[0];

  const currentYear = currentDate.getFullYear();
  const currentBuddhistYear = currentYear + 543;
  const displayMonth = currentDate.toLocaleString("th-TH", { month: "long", year: "numeric" });
  const monthNames = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setShowMonthPicker(false);
  };
  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setShowMonthPicker(false);
  };

  const handleMonthSelect = (monthIndex) => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), monthIndex, 1));
    setShowMonthPicker(false);
  };

  const handleYearChange = (delta) => {
    setCurrentDate((prev) => new Date(prev.getFullYear() + delta, prev.getMonth(), 1));
  };

  const handleDayClick = (dateString, dayDate) => {
    if (!dateString) return;

    const applicantsForDay = applicants.filter((app) => app.appliedDate === dateString);

    if (applicantsForDay.length > 0) {
      setSelectedDayApplicants(applicantsForDay);
      setSelectedDayDate(dayDate);
      setShowApplicantModal(true);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 relative">
      <h2 className="text-xl font-bold text-gray-800 mb-4">สถิติผู้สมัครรายเดือน</h2>

      <div className="flex justify-between items-center mb-4 relative z-10">
        <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
          <ChevronLeft size={20} />
        </button>

        <h3 onClick={() => setShowMonthPicker((prev) => !prev)} className="text-lg font-semibold text-indigo-700 cursor-pointer hover:underline">
          {displayMonth}
        </h3>

        <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
          <ChevronRight size={20} />
        </button>

        {showMonthPicker && (
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-xl p-4 w-64 z-20">
            <div className="flex justify-between items-center mb-3">
              <button onClick={() => handleYearChange(-1)} className="p-1 rounded-full hover:bg-gray-100 text-gray-600">
                <ChevronLeft size={16} />
              </button>
              <span className="font-bold text-gray-800">{currentBuddhistYear}</span>
              <button onClick={() => handleYearChange(1)} className="p-1 rounded-full hover:bg-gray-100 text-gray-600">
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {monthNames.map((monthName, index) => (
                <button
                  key={index}
                  onClick={() => handleMonthSelect(index)}
                  className={`py-2 text-sm rounded-lg transition-colors ${
                    index === currentDate.getMonth() && currentYear === new Date().getFullYear() ? "bg-indigo-600 text-white font-bold" : "text-gray-700 hover:bg-indigo-50"
                  }`}
                >
                  {monthName}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"].map((day) => (
          <div key={day} className="text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          if (!day.date) {
            return <div key={`pad-${index}`} className="p-1 h-16"></div>;
          }

          const count = dailyCounts[day.dateString] || 0;
          const isToday = day.dateString === todayString && currentDate.getMonth() === new Date().getMonth();

          return (
            <div
              key={index}
              title={count > 0 ? `${count} ผู้สมัคร (คลิกเพื่อดูรายละเอียด)` : "ไม่มีผู้สมัคร"}
              onClick={() => handleDayClick(day.dateString, day.date)}
              className={`p-1 h-16 rounded-lg transition-all border text-center
                                ${isToday ? "border-2 border-indigo-700 bg-indigo-50" : "border-gray-100 hover:bg-gray-50"}
                                ${count > 0 ? "cursor-pointer hover:shadow-md" : "cursor-default"}`}
            >
              <div className={`text-xs font-semibold ${isToday ? "text-indigo-700" : "text-gray-900"}`}>{day.dayOfMonth}</div>
              {count > 0 ? (
                <div className="mt-1 flex items-center justify-center">
                  <span className="text-xs font-bold text-white bg-red-500 rounded-full px-2 py-0.5 shadow-sm">{count}</span>
                </div>
              ) : (
                <div className="mt-1 text-xs text-gray-400"></div>
              )}
            </div>
          );
        })}
      </div>

      {showApplicantModal && <ApplicantModal date={selectedDayDate} applicants={selectedDayApplicants} onClose={() => setShowApplicantModal(false)} />}
    </div>
  );
};

// =============================================================================================
// IV. MAIN COMPONENT (DASHBOARDPAGE)
// =============================================================================================
const DashboardPage = () => {
  // ใช้ store ที่คุณสร้าง: ชื่อ useCandidateStore
  const { candidates, isLoading, fetchCandidates } = useCandidateStore();

    // ✅ 4. ดึงข้อมูล User จาก Auth Store - Show user login
  const {user, logout } = useAuthStore();
  const navigate = useNavigate();

  // currentDate ย้ายขึ้นมาจาก ApplicantCalendar เพื่อให้การเปลี่ยนเดือน trigger fetchCandidates
  const [currentDate, setCurrentDate] = useState(new Date());

  // ✅ เพิ่ม state สำหรับเช็คสถานะการ logout
  const [isLogOut, setIsLogOut] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // ✅ เพิ่ม State สำหรับ Modal

  
  // ✅ 5. ฟังก์ชันเรียกเมื่อกดปุ่ม Logout (เปิด Modal)
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  // ✅ 6. ฟังก์ชันยืนยันการออกจากระบบ (ทำงานจริง)
  const confirmLogout = () => {
    setShowLogoutModal(false); // ปิด Modal ก่อน
    if (isLogOut) return;

    setIsLogOut(true)

     // แสดง Toast แจ้งเตือน
    toast.info("กำลังออกจากระบบ...", {
      autoClose: 2000, // 
      closeButton: false, // ซ่อนปุ่มปิดเพื่อให้ดูเหมือน loading
    });

   // หน่วงเวลา 8 วินาที (8000 ms) ก่อนเปลี่ยนหน้า
    setTimeout(() => {
      logout(); // เรียกฟังก์ชัน logout จาก Store (ล้างค่า user)
      navigate("/admin/login"); // เปลี่ยนไปหน้า Login
    }, 2000);
  };

  // เมื่อ component mount หรือ currentDate เปลี่ยน -> fetch candidates ของเดือนนั้น
  useEffect(() => {
    // กำหนดช่วงวันแรก-วันสุดท้ายของเดือนปัจจุบันที่กำลังดู
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const from = startOfMonth.toISOString().split("T")[0];
    const to = endOfMonth.toISOString().split("T")[0];

    // เรียก fetchCandidates พร้อม params (backend ควรรองรับ query params from/to)
    fetchCandidates({ from, to, perPage: 500 }).catch((err) => {
      console.error("fetchCandidates failed:", err);
      toast.error("ไม่สามารถโหลดข้อมูลผู้สมัครได้");
    });
  }, [fetchCandidates, currentDate]);

  // rename local variable to match previous UI names
  const applicants = candidates || [];
  const loading = isLoading;

  const total = useMemo(() => applicants.length, [applicants]);
  const pendingCount = useMemo(() => applicants.filter((a) => a.status === "pending").length, [applicants]);
  const passedCount = useMemo(() => applicants.filter((a) => a.status === "pass").length, [applicants]);
  const failedCount = useMemo(() => applicants.filter((a) => a.status === "fail").length, [applicants]);

  return (
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen">
      
      {/* ================= HEADER SECTION (UPDATED) ================= */}
      <header className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-extrabold text-[#0b2545] flex items-center gap-2">
          <LayoutDashboard size={28} /> Dashboard ภาพรวมการรับสมัคร
        </h1>
        
        {/* ✅ 6. ส่วนแสดงผล User Profile แบบ Dynamic - Show user login*/}
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 pr-4 rounded-full shadow-sm flex items-center gap-3 border border-gray-200">
            {/* Avatar: ตัวอักษรแรกของชื่อ */}
            <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
              {user?.firstName ? user.firstName.charAt(0).toUpperCase() : "U"}
            </div>
            {/* Info: ชื่อและตำแหน่ง */}
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-700 hidden sm:inline">
                {user?.firstName || "Admin"} {user?.lastName || ""}
              </span>
              <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider hidden sm:block">
                {user?.role || "Recruiter"}
              </span>
            </div>
          </div>
          
          {/* ปุ่ม Logout */}
          <button 
            onClick={handleLogoutClick}
            disabled={isLogOut}
            className={`p-2 rounded-full transition-colors ${
              isLogOut 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed animate-pulse" 
                : "text-gray-400 hover:text-red-500 hover:bg-red-50"
            }`}
            title="ออกจากระบบ"
          >
            <LogOutIcon size={20} /> 
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="ใบสมัครทั้งหมด" value={loading ? "..." : total} icon={Users} colorClass="text-indigo-600" bgColorClass="bg-indigo-100" />
        <StatCard title="รอการตรวจสอบ" value={loading ? "..." : pendingCount} icon={Clock} colorClass="text-yellow-600" bgColorClass="bg-yellow-100" />
        <StatCard title="ผ่านการคัดเลือก" value={loading ? "..." : passedCount} icon={CheckCircle} colorClass="text-green-600" bgColorClass="bg-green-100" />
        <StatCard title="ไม่ผ่านการคัดเลือก" value={loading ? "..." : failedCount} icon={XCircle} colorClass="text-red-600" bgColorClass="bg-red-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">{loading ? <p className="p-8 text-center bg-white rounded-xl shadow-md">กำลังโหลดข้อมูลปฏิทิน...</p> : <ApplicantCalendar applicants={applicants} currentDate={currentDate} setCurrentDate={setCurrentDate} />}</div>

        <div className="lg:col-span-1">{loading ? <p className="p-8 text-center bg-white rounded-xl shadow-md">กำลังโหลดข้อมูลกราฟ...</p> : <ApplicantDonutChart applicants={applicants} />}</div>
      </div>

      {/* ✅ เรียกใช้ LogoutModal Component แทนโค้ดเดิม */}
      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </div>
  );
};

export default DashboardPage;
