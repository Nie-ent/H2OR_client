<<<<<<< HEAD
// src/pages/Admin/DashboardPage.jsx

import  { useEffect, useMemo, useState } from "react";
import { create } from 'zustand';
import { Users, Clock, CheckCircle, XCircle, LayoutDashboard, ChevronLeft, ChevronRight, User } from "lucide-react"; 


// =============================================================================================
// I. MOCK DATA AND ZUSTAND STORE LOGIC (STATE MANAGEMENT)
// =============================================================================================

// --- 1. Mock Data Generator ---
const generateMockApplicants = (count) => {
    const applicants = [];
    const positions = ["Software Engineer", "UX/UI Designer", "Data Analyst", "Product Manager", "Marketing Specialist", "HR Officer"];
    const names = ["สมชาย ใจดี", "สมหญิง รุ่งเรือง", "มานะ เข้มแข็ง", "ดวงพร สุขสันต์", "ชลิตา วงศ์สว่าง", "ภูมิภัทร เจริญ", "อารยา แก้วตา", "ประเสริฐ ยิ้มแย้ม"];

    // ฟังก์ชันสุ่มเวลา (08:00 - 17:00)
    const getRandomTime = () => {
        const startHour = 8;
        const endHour = 17;
        const hour = Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;
        const minute = Math.floor(Math.random() * 60);
        return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    };

    for (let i = 1; i <= count; i++) {
        const dateOffset = Math.floor(Math.random() * 60); 
        const appliedDate = new Date();
        appliedDate.setDate(appliedDate.getDate() - dateOffset);
        
        let status;
        const rand = Math.random();
        if (rand < 0.5) status = 'pending';
        else if (rand < 0.8) status = 'pass';
        else status = 'fail';

        applicants.push({
            id: i,
            name: names[i % names.length], 
            position: positions[i % positions.length],
            status: status,
            appliedDate: appliedDate.toISOString().split('T')[0], // YYYY-MM-DD
            applicationTime: getRandomTime(), 
        });
    }
    applicants.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
    return applicants;
};

const MOCK_APPLICANTS_100 = generateMockApplicants(100);

// --- 2. Zustand Store ---
export const useApplicantStore = create((set, get) => ({
    applicants: [],
    loading: false,

    fetchApplicants: async () => {
        set({ loading: true });
        await new Promise(resolve => setTimeout(resolve, 800)); 
        set({ applicants: MOCK_APPLICANTS_100, loading: false });
    },
    
    updateApplicantStatus: (id, newStatus) => {
        set(state => ({
            applicants: state.applicants.map(app => 
                app.id === id ? { ...app, status: newStatus } : app
            ),
        }));
    },
}));


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
            dateString: currentDate.toISOString().split('T')[0],
            dayOfMonth: i,
        });
    }

    return calendarDays;
};

const countApplicantsByDate = (applicants) => {
    const counts = {};
    applicants.forEach(app => {
        counts[app.appliedDate] = (counts[app.appliedDate] || 0) + 1;
    });
    return counts;
};


// =============================================================================================
// III. SUB-COMPONENTS (UI ELEMENTS)
// =============================================================================================

// --- 3. Stat Card Component ---
const StatCard = ({ title, value, icon: Icon, colorClass, bgColorClass }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border-t-4" style={{ borderColor: colorClass.split('-')[1] }}>
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

// --- 4. Applicant Donut Chart Component ---
const calculateChartData = (applicants) => {
    const passed = applicants.filter(a => a.status === 'pass').length;
    const failed = applicants.filter(a => a.status === 'fail').length;
    const pending = applicants.filter(a => a.status === 'pending').length; 
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
                
                <div 
                    className="relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-500"
                    style={donutStyle}
                >
                    <div className="w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                        <span className="text-3xl font-bold text-indigo-700">{total}</span>
                        <span className="text-xs text-gray-500">Total</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 w-full pt-4"> 
                    <div className="text-center">
                        <CheckCircle size={18} className="inline text-green-500 mr-1" />
                        <p className="text-sm font-medium text-gray-600">ผ่าน</p>
                        <p className="text-lg font-bold text-green-600">{passed} ({passedPct}%)</p>
                    </div>
                    <div className="text-center">
                        <XCircle size={18} className="inline text-red-500 mr-1" />
                        <p className="text-sm font-medium text-gray-600">ไม่ผ่าน</p>
                        <p className="text-lg font-bold text-red-600">{failed} ({failedPct}%)</p>
                    </div>
                    <div className="text-center">
                        <Clock size={18} className="inline text-yellow-500 mr-1" />
                        <p className="text-sm font-medium text-gray-600">รอตัดสิน</p>
                        <p className="text-lg font-bold text-yellow-600">{pending} ({pendingPct}%)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 6. Status Badge Component (ไม่ถูกใช้ใน Modal) ---
const StatusBadge = ({ status }) => {
    let text = '';
    let className = '';
    
    if (status === 'pending') {
        text = 'PENDING';
        className = 'bg-yellow-100 text-yellow-700';
    } else if (status === 'pass') {
        text = 'PASS';
        className = 'bg-green-100 text-green-700';
    } else if (status === 'fail') {
        text = 'FAIL';
        className = 'bg-red-100 text-red-700';
    } 

    return (
        <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${className}`}>
            {text}
        </span>
    );
};

// --- 7. Applicant Modal Component ---
const ApplicantModal = ({ date, applicants, onClose }) => {
    if (!date || applicants.length === 0) return null;

    const displayDate = date.toLocaleDateString('th-TH', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative transform transition-all duration-300 scale-100">
                
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
                    รายชื่อผู้สมัคร: {displayDate}
                </h3>
                
                <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
                    {applicants.map((app) => {
                        const cleanedName = app.name.replace(/ แคนดิเดต.*/, '').trim(); 
                        return (
                            <div key={app.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg bg-white hover:bg-gray-50 transition-colors">
                                <div className="flex-1 min-w-0 pr-4">
                                    <p className="font-semibold text-gray-900 truncate flex items-center">
                                        <User size={16} className="text-indigo-500 mr-2 flex-shrink-0" />
                                        {cleanedName} 
                                        {/* เวลาการสมัคร */}
                                        <span className="ml-4 px-2 py-0.5 text-sm font-semibold text-indigo-700 bg-indigo-50 rounded-md"> 
                                            ({app.applicationTime} น.)
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-500 ml-6">{app.position}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-end pt-4 border-t mt-4">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        ปิด
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- 5. Applicant Calendar Component (UPDATED) ---
const ApplicantCalendar = ({ applicants }) => {
    const [currentDate, setCurrentDate] = useState(new Date()); 
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    
    const [showApplicantModal, setShowApplicantModal] = useState(false);
    const [selectedDayDate, setSelectedDayDate] = useState(null); 
    const [selectedDayApplicants, setSelectedDayApplicants] = useState([]); 

    const dailyCounts = useMemo(() => countApplicantsByDate(applicants), [applicants]);
    const calendarDays = useMemo(() => getCalendarDays(currentDate), [currentDate]);
    const todayString = new Date().toISOString().split('T')[0];

    const currentYear = currentDate.getFullYear();
    const currentBuddhistYear = currentYear + 543;
    const displayMonth = currentDate.toLocaleString('th-TH', { month: 'long', year: 'numeric' });
    const monthNames = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];


    const handlePrevMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
        setShowMonthPicker(false);
    };
    const handleNextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
        setShowMonthPicker(false);
    };

    const handleMonthSelect = (monthIndex) => {
        setCurrentDate(prev => new Date(prev.getFullYear(), monthIndex, 1));
        setShowMonthPicker(false);
    };

    const handleYearChange = (delta) => {
        setCurrentDate(prev => new Date(prev.getFullYear() + delta, prev.getMonth(), 1));
    }
    
    const handleDayClick = (dateString, dayDate) => {
        if (!dateString) return;

        const applicantsForDay = applicants.filter(app => app.appliedDate === dateString);
        
        if (applicantsForDay.length > 0) {
            setSelectedDayApplicants(applicantsForDay);
            setSelectedDayDate(dayDate);
            setShowApplicantModal(true);
        }
    };


    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 relative">
            <h2 className="text-xl font-bold text-gray-800 mb-4">สถิติผู้สมัครรายเดือน</h2>
            
            {/* Calendar Header (Navigation) */}
            <div className="flex justify-between items-center mb-4 relative z-10">
                <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100 text-gray-600"><ChevronLeft size={20} /></button>
                
                <h3 
                    onClick={() => setShowMonthPicker(prev => !prev)} 
                    className="text-lg font-semibold text-indigo-700 cursor-pointer hover:underline"
                >
                    {displayMonth}
                </h3>
                
                <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100 text-gray-600"><ChevronRight size={20} /></button>

                {/* Month Picker Modal/Dropdown */}
                {showMonthPicker && (
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-xl p-4 w-64 z-20">
                        <div className="flex justify-between items-center mb-3">
                            <button onClick={() => handleYearChange(-1)} className="p-1 rounded-full hover:bg-gray-100 text-gray-600"><ChevronLeft size={16} /></button>
                            <span className="font-bold text-gray-800">{currentBuddhistYear}</span>
                            <button onClick={() => handleYearChange(1)} className="p-1 rounded-full hover:bg-gray-100 text-gray-600"><ChevronRight size={16} /></button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {monthNames.map((monthName, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleMonthSelect(index)}
                                    className={`py-2 text-sm rounded-lg transition-colors ${
                                        index === currentDate.getMonth() && currentYear === new Date().getFullYear() 
                                            ? 'bg-indigo-600 text-white font-bold'
                                            : 'text-gray-700 hover:bg-indigo-50'
                                    }`}
                                >
                                    {monthName}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Calendar Grid Header (วันในสัปดาห์) - UPDATED: แสดงชื่อเต็ม */}
            <div className="grid grid-cols-7 gap-1 text-center">
                {['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'].map(day => (
                    <div key={day} className="text-xs font-medium text-gray-500 py-2">{day}</div>
                ))}
            </div>

            {/* Calendar Grid Body (วันที่) */}
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
                            title={count > 0 ? `${count} ผู้สมัคร (คลิกเพื่อดูรายละเอียด)` : 'ไม่มีผู้สมัคร'}
                            onClick={() => handleDayClick(day.dateString, day.date)} 
                            className={`p-1 h-16 rounded-lg transition-all border text-center 
                                ${isToday ? 'border-2 border-indigo-700 bg-indigo-50' : 'border-gray-100 hover:bg-gray-50'}
                                ${count > 0 ? 'cursor-pointer hover:shadow-md' : 'cursor-default'}
                            `}
                        >
                            <div className={`text-xs font-semibold ${isToday ? 'text-indigo-700' : 'text-gray-900'}`}>
                                {day.dayOfMonth}
                            </div>
                            {count > 0 ? (
                                <div className="mt-1 flex items-center justify-center">
                                    <span className="text-xs font-bold text-white bg-red-500 rounded-full px-2 py-0.5 shadow-sm">
                                        {count}
                                    </span>
                                </div>
                            ) : (
                                <div className="mt-1 text-xs text-gray-400"></div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* RENDER MODAL */}
            {showApplicantModal && (
                <ApplicantModal
                    date={selectedDayDate}
                    applicants={selectedDayApplicants}
                    onClose={() => setShowApplicantModal(false)}
                />
            )}
        </div>
    );
};


// =============================================================================================
// IV. MAIN COMPONENT (DASHBOARDPAGE)
// =============================================================================================
=======
import React from "react";

>>>>>>> parent of d56145e (dashboard)

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


<<<<<<< HEAD
    return (
        <div className="space-y-8 p-8 bg-gray-50 min-h-screen"> 
            
            {/* Header / Title */}
            <header className="flex justify-between items-center pb-4 border-b border-gray-200">
               <h1 className="text-3xl font-extrabold text-[#0b2545] flex items-center gap-2">
                    <LayoutDashboard size={28} /> Dashboard ภาพรวมการรับสมัคร
               </h1>
               <div className="bg-white p-2 px-4 rounded-full shadow-sm flex items-center gap-2 border border-gray-200">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">HR</div>
                    <span className="text-sm font-bold text-gray-700 hidden sm:inline">HR Manager</span>
               </div>
            </header>

            {/* 📈 Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> 
                <StatCard title="ใบสมัครทั้งหมด" value={loading ? '...' : total} icon={Users} colorClass="text-indigo-600" bgColorClass="bg-indigo-100" />
                <StatCard title="รอการตรวจสอบ" value={loading ? '...' : pendingCount} icon={Clock} colorClass="text-yellow-600" bgColorClass="bg-yellow-100" />
                <StatCard title="ผ่านการคัดเลือก" value={loading ? '...' : passedCount} icon={CheckCircle} colorClass="text-green-600" bgColorClass="bg-green-100" />
                <StatCard title="ไม่ผ่านการคัดเลือก" value={loading ? '...' : failedCount} icon={XCircle} colorClass="text-red-600" bgColorClass="bg-red-100" />
            </div>

            {/* 📅 Calendar & 🍩 Donut Chart Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Calendar View (2/3 Width on large screens) */}
                <div className="lg:col-span-2">
                    {loading ? (
                        <p className="p-8 text-center bg-white rounded-xl shadow-md">กำลังโหลดข้อมูลปฏิทิน...</p>
                    ) : (
                        <ApplicantCalendar applicants={applicants} />
                    )}
                </div>

                {/* Donut Chart (1/3 Width on large screens) */}
                <div className="lg:col-span-1">
                    {loading ? (
                         <p className="p-8 text-center bg-white rounded-xl shadow-md">กำลังโหลดข้อมูลกราฟ...</p>
                    ) : (
                        <ApplicantDonutChart applicants={applicants} />
                    )}
                </div>
            </div>
=======
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
>>>>>>> parent of d56145e (dashboard)
        </div>
      {/* </main> */}
    </div>
  );
};

export default DashboardPage;
