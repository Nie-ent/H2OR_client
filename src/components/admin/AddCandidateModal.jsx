import React, { useState } from "react";
import Button from "../../components/admin/Button";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
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
            className="text-gray-400 hover:text-gray-600 text-3xl font-light leading-none focus:outline-none"
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
                  placeholder="เช่น สมชาย"
                  className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d] focus:ring-1 focus:ring-[#072c4d]"
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
                  placeholder="เช่น ใจดี"
                  className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d] focus:ring-1 focus:ring-[#072c4d]"
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
                placeholder="example@email.com"
                className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d]"
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
                placeholder="081-234-5678"
                className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d]"
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
                className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d] bg-white"
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
                  placeholder="เช่น 5"
                  className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d]"
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
                  className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d] bg-white"
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
                className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d] bg-white"
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
                placeholder="เช่น JavaScript, React, Node.js"
                className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d]"
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
                placeholder="เช่น 85"
                className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d]"
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
                  className="w-full p-3 border border-[#637996] rounded-lg bg-white text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#072c4d] file:text-white hover:file:bg-[#06233d]"
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
                  className="w-full p-3 border border-[#637996] rounded-lg bg-white text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#072c4d] file:text-white hover:file:bg-[#06233d]"
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
                className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#072c4d]"
                onChange={handleChange}
              ></textarea>
            </div>
          </form>
        </div>

        {/* Footer: ปุ่ม Action */}
        <div className="p-5 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            ยกเลิก
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            บันทึกข้อมูลผู้สมัคร
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCandidateModal;
