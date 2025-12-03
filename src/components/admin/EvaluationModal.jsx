import React, { useState, useEffect } from "react";
import Button from "../../components/admin/Button";

const EvaluationModal = ({ isOpen, onClose, onSave, candidate }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    score: "",
    result: "passed", // passed, rejected
    notes: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        score: "",
        result: "passed",
        notes: "",
      });
    }
  }, [isOpen]);

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-[#072c4d] p-5 border-b border-gray-200">
          <h3 className="text-white text-xl font-bold">
            📝 ประเมินผลการสัมภาษณ์
          </h3>
          <p className="text-white text-sm mt-1 opacity-90">
            ผู้สมัคร: {candidate?.firstName} {candidate?.lastName}
          </p>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="form-group">
            <label className="block text-[#072c4d] font-semibold mb-2">
              คะแนนรวม (เต็ม 100) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="score"
              min="0"
              max="100"
              required
              placeholder="เช่น 85"
              className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#28a745]"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="block text-[#072c4d] font-semibold mb-2">
              ผลการพิจารณา
            </label>
            <select
              name="result"
              className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#28a745] bg-white"
              onChange={handleChange}
              value={formData.result}
            >
              <option value="passed">✅ ผ่านการคัดเลือก</option>
              <option value="rejected">❌ ไม่ผ่านการคัดเลือก</option>
            </select>
          </div>

          <div className="form-group">
            <label className="block text-[#072c4d] font-semibold mb-2">
              ความคิดเห็นเพิ่มเติม
            </label>
            <textarea
              name="notes"
              rows="3"
              placeholder="จุดเด่น, จุดด้อย, หรือเหตุผลประกอบ..."
              className="w-full p-3 border border-[#637996] rounded-lg focus:outline-none focus:border-[#28a745]"
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              ยกเลิก
            </Button>
            <Button type="submit" className="bg-[#28a745] hover:bg-[#218838]">
              บันทึกผลการประเมิน
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EvaluationModal;
