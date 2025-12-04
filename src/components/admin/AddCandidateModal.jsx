import React, { useState } from "react";
import { toast } from "react-toastify"

const AddCandidateModal = ({ isOpen, onClose, onSave }) => {
  // ถ้า isOpen เป็น false ให้ไม่แสดงอะไรเลย
  if (!isOpen) return null;

  // State สำหรับเก็บข้อมูลในฟอร์ม
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    education: "",
    status: "",
    skills: "",
    examScore: "",
    notes: "",
  });

  // Local submitting state to disable inputs/buttons while saving
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ใช้ prev state เพื่อความปลอดภัยในการอัปเดตข้อมูล
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Utility: small delay helper
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    // Prevent double submit
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // 1. แจ้งผู้ใช้ว่ากำลังบันทึก (Optional)
      // toast.info("กำลังบันทึกข้อมูล...", { autoClose: 800 });

      // 2. หน่วงเวลาเพื่อความสวยงาม (Artificial Delay)
      await delay(800);

      // 3. เรียก onSave และรอผลลัพธ์ (รองรับทั้ง Sync และ Async)
      await onSave(formData);

      // 4. หากสำเร็จ
      toast.dismiss(); // ล้าง toast เก่าออก (ถ้ามี)
      toast.success("บันทึกข้อมูลผู้สมัครเรียบร้อยแล้ว");

      // 5. ปิด modal
      onClose();
    } catch (err) {
      console.error("Save candidate error:", err);

      // ดึงข้อความ Error มาแสดง
      const message =
        err?.message ||
        err?.response?.data?.message ||
        "เกิดข้อผิดพลาดขณะบันทึกข้อมูล";

      toast.error(message);
    } finally {
      // รีเซ็ตสถานะการส่งเสมอ ไม่ว่าจะสำเร็จหรือล้มเหลว
      setIsSubmitting(false);
    }
  };

  return (
    // 1. ส่วน Overlay: พื้นหลังสีดำจางๆ เต็มหน้าจอ
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
      {/* 2. ส่วน Modal Content: กล่องสีขาวกลางหน้าจอ */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up">
        {/* Header: หัวข้อและปุ่มปิด */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-gray-50">
          <h3 className="text-[#072c4d] text-xl font-bold">
            เพิ่มข้อมูลผู้สมัครงาน
          </h3>
          <button
            onClick={onClose}
            disabled={isSubmitting} // ป้องกันการปิดขณะบันทึก
            className="text-gray-400 hover:text-gray-600 text-3xl font-light leading-none focus:outline-none disabled:opacity-50"
          >
            ×
          </button>
        </div>

        {/* Body: ฟอร์มกรอกข้อมูล (มี Scrollbar ถ้าเนื้อหายาว) */}
        <div className="p-6 overflow-y-auto">
          <form
            id="candidateForm"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Grid 2 คอลัมน์สำหรับ ชื่อ-นามสกุล */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="block text-[#072c4d] font-semibold mb-2">
                  ชื่อ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  disabled={isSubmitting}
                  placeholder="เช่น สมชาย"
                  className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d] focus:ring-1 focus:ring-[#072c4d] disabled:bg-gray-100"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="block text-[#072c4d] font-semibold mb-2">
                  นามสกุล <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  disabled={isSubmitting}
                  placeholder="เช่น ใจดี"
                  className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d] focus:ring-1 focus:ring-[#072c4d] disabled:bg-gray-100"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-[#072c4d] font-semibold mb-2">
                อีเมล <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                disabled={isSubmitting}
                placeholder="example@email.com"
                className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d] disabled:bg-gray-100"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="block text-[#072c4d] font-semibold mb-2">
                เบอร์โทรศัพท์ <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                disabled={isSubmitting}
                placeholder="081-234-5678"
                className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d] disabled:bg-gray-100"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="block text-[#072c4d] font-semibold mb-2">
                สมัครตำแหน่ง <span className="text-red-500">*</span>
              </label>
              <select
                name="position"
                required
                disabled={isSubmitting}
                className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d] bg-white disabled:bg-gray-100"
                onChange={handleChange}
              >
                <option value="">เลือกตำแหน่ง</option>
                <option value="developer">Senior Full Stack Developer</option>
                <option value="designer">UX/UI Designer</option>
                <option value="marketing">Digital Marketing Manager</option>
                <option value="backend">Backend Developer (Node.js)</option>
                <option value="hr">HR Specialist</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="block text-[#072c4d] font-semibold mb-2">
                  ประสบการณ์ (ปี) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="experience"
                  min="0"
                  required
                  disabled={isSubmitting}
                  placeholder="เช่น 5"
                  className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d] disabled:bg-gray-100"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="block text-[#072c4d] font-semibold mb-2">
                  ระดับการศึกษา <span className="text-red-500">*</span>
                </label>
                <select
                  name="education"
                  required
                  disabled={isSubmitting}
                  className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d] bg-white disabled:bg-gray-100"
                  onChange={handleChange}
                >
                  <option value="">เลือกระดับการศึกษา</option>
                  <option value="bachelor">ปริญญาตรี</option>
                  <option value="master">ปริญญาโท</option>
                  <option value="doctorate">ปริญญาเอก</option>
                  <option value="diploma">ประกาศนียบัตร</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="block text-[#072c4d] font-semibold mb-2">
                สถานะ <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                required
                disabled={isSubmitting}
                className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d] bg-white disabled:bg-gray-100"
                onChange={handleChange}
              >
                <option value="">เลือกสถานะ</option>
                <option value="pending">รอตรวจสอบ</option>
                <option value="interview">กำลังสัมภาษณ์</option>
                <option value="passed">ผ่านการคัดเลือก</option>
                <option value="rejected">ไม่ผ่าน</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block text-[#072c4d] font-semibold mb-2">
                ทักษะ (คั่นด้วยเครื่องหมาย ,){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="skills"
                required
                disabled={isSubmitting}
                placeholder="เช่น JavaScript, React, Node.js"
                className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d] disabled:bg-gray-100"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="block text-[#072c4d] font-semibold mb-2">
                คะแนนสอบ (0-100) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="examScore"
                min="0"
                max="100"
                required
                disabled={isSubmitting}
                placeholder="เช่น 85"
                className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d] disabled:bg-gray-100"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="block text-[#072c4d] font-semibold mb-2">
                อัปโหลดเรซูเม่ (PDF)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  disabled={isSubmitting}
                  className="w-full p-3 border border-[#637996] rounded-lg bg-white text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#072c4d] file:text-white hover:file:bg-[#06233d] disabled:opacity-50"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-[#072c4d] font-semibold mb-2">
                อัปโหลดผลงาน (PDF)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  disabled={isSubmitting}
                  className="w-full p-3 border border-[#637996] rounded-lg bg-white text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#072c4d] file:text-white hover:file:bg-[#06233d] disabled:opacity-50"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-[#072c4d] font-semibold mb-2">
                หมายเหตุ
              </label>
              <textarea
                name="notes"
                placeholder="บันทึกข้อมูลเพิ่มเติม"
                rows="3"
                disabled={isSubmitting}
                className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d] disabled:bg-gray-100"
                onChange={handleChange}
              ></textarea>
            </div>
          </form>
        </div>

        {/* Footer: ปุ่ม Action */}
        <div className="p-5 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          {/* ปุ่มยกเลิก (Custom Style) */}
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ยกเลิก
          </button>

          {/* ปุ่มบันทึก (Custom Style - Primary Color) */}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-lg bg-[#072c4d] text-white font-bold hover:bg-[#051b30] transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                กำลังบันทึก...
              </>
            ) : (
              "บันทึกข้อมูลผู้สมัคร"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCandidateModal;
