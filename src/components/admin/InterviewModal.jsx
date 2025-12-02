import React, { useState, useEffect } from "react";
import Button from "../../components/admin/Button";

const InterviewModal = ({ isOpen, onClose, onSave, candidate }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    interviewDate: "",
    interviewType: "online", // online, onsite
    location: "",
    interviewer: "",
    notes: "",
    sendEmail: true, // เพิ่มตัวเลือกส่งอีเมล (Default เป็น true)
  });

  // Reset form เมื่อเปิด Modal ใหม่
  useEffect(() => {
    if (isOpen) {
      setFormData({
        interviewDate: "",
        interviewType: "online",
        location: "",
        interviewer: "",
        notes: "",
        sendEmail: true, // Reset checkbox ให้ติ๊กถูกเสมอเมื่อเปิดใหม่
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // --- ส่วนจำลองการส่งอีเมล (Mock Email Sending) ---
    if (formData.sendEmail && candidate?.email) {
      // ดึงวันที่มาจัดรูปแบบให้สวยงาม
      const dateObj = new Date(formData.interviewDate);
      const dateStr = dateObj.toLocaleString("th-TH");

      // แสดง Alert จำลองว่าส่งเมลแล้ว
      alert(
        `📧 ระบบได้ส่งอีเมลแจ้งเตือนเรียบร้อยแล้ว!\n\n` +
          `ถึง: ${candidate.email} (${candidate.firstName})\n` +
          `เรื่อง: นัดสัมภาษณ์งานตำแหน่ง ${
            candidate.positionName || candidate.position
          }\n` +
          `เวลา: ${dateStr}\n` +
          `รูปแบบ: ${
            formData.interviewType === "online" ? "ออนไลน์" : "ที่บริษัท"
          }`
      );

      // TODO: ในอนาคตสามารถแทนที่ alert ด้วย API จริง เช่น EmailJS หรือ Backend API
      console.log("Email sent payload:", {
        to: candidate.email,
        subject: `Interview Appointment: ${candidate.position}`,
        body: `Date: ${dateStr}, Type: ${formData.interviewType}, Location: ${formData.location}`,
      });
    }
    // ---------------------------------------------

    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-[#072c4d] p-5 border-b border-gray-200">
          <h3 className="text-white text-xl font-bold">📅 นัดสัมภาษณ์งาน</h3>
          <p className="text-gray-300 text-sm mt-1">
            ผู้สมัคร: {candidate?.firstName} {candidate?.lastName}
          </p>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="form-group">
            <label className="block text-[#072c4d] font-semibold mb-2">
              วัน-เวลา สัมภาษณ์ <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="interviewDate"
              required
              className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d]"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="block text-[#072c4d] font-semibold mb-2">
              รูปแบบการสัมภาษณ์
            </label>
            <select
              name="interviewType"
              className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d] bg-white"
              onChange={handleChange}
              value={formData.interviewType}
            >
              <option value="online">💻 สัมภาษณ์ออนไลน์ (Online)</option>
              <option value="onsite">🏢 สัมภาษณ์ที่บริษัท (On-site)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="block text-[#072c4d] font-semibold mb-2">
              {formData.interviewType === "online"
                ? "ลิ้งค์การประชุม (Google Meet/Zoom)"
                : "สถานที่/ห้องประชุม"}
            </label>
            <input
              type="text"
              name="location"
              placeholder={
                formData.interviewType === "online"
                  ? "วางลิ้งค์ที่นี่..."
                  : "เช่น ห้องประชุมชั้น 4"
              }
              className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d]"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="block text-[#072c4d] font-semibold mb-2">
              ผู้สัมภาษณ์
            </label>
            <input
              type="text"
              name="interviewer"
              placeholder="เช่น คุณวิชัย (CTO)"
              className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d]"
              onChange={handleChange}
            />
          </div>

          {/* Checkbox เลือกส่งเมล */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="sendEmail"
              name="sendEmail"
              checked={formData.sendEmail}
              onChange={handleChange}
              className="w-5 h-5 accent-[#072c4d] cursor-pointer"
            />
            <label
              htmlFor="sendEmail"
              className="text-[#072c4d] text-sm cursor-pointer select-none"
            >
              ส่งอีเมลแจ้งเตือนไปยัง{" "}
              <span className="font-semibold underline">
                {candidate?.email}
              </span>
            </label>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              ยกเลิก
            </Button>
            <Button type="submit">ยืนยันนัดหมาย</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewModal;
