import React, { useState } from "react";
import Button from "../../components/admin/Button";
import { statusColors, statusLabels } from "../../data/candidate";

const JobApplicantInformation = ({
  candidates = [], // <--- แก้จุดที่ 1: ใส่ค่าเริ่มต้นเป็น Array ว่าง
  onAddCandidate,
  selectedItems = new Set(), // <--- แก้จุดที่ 2: กันไว้เผื่อ selectedItems ยังไม่มา
  toggleSelection,
  clearSelection,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // ตอนนี้ candidates จะไม่เป็น undefined แล้ว .filter จึงทำงานได้ไม่ Error
  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPos = !filterPosition || c.position === filterPosition;
    const matchesStatus = !filterStatus || c.status === filterStatus;
    return matchesSearch && matchesPos && matchesStatus;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[#072c4d] text-xl font-bold">ผู้สมัครงานทั้งหมด</h3>
        <Button onClick={onAddCandidate}>+ เพิ่มผู้สมัครงาน</Button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="ค้นหาชื่อ หรืออีเมล"
          className="w-full p-3 border border-[#637996] rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full p-3 border border-[#637996] rounded-lg"
          value={filterPosition}
          onChange={(e) => setFilterPosition(e.target.value)}
        >
          <option value="">ทุกตำแหน่ง</option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="marketing">Marketing</option>
        </select>
        <select
          className="w-full p-3 border border-[#637996] rounded-lg"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">ทุกสถานะ</option>
          <option value="pending">รอตรวจสอบ</option>
          <option value="interview">กำลังสัมภาษณ์</option>
          <option value="passed">ผ่านการคัดเลือก</option>
        </select>
        <Button
          variant="secondary"
          onClick={() => {
            setSearchTerm("");
            setFilterPosition("");
            setFilterStatus("");
          }}
        >
          ล้างตัวกรอง
        </Button>
      </div>

      <div className="space-y-4">
        {filteredCandidates.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-[#072c4d] font-bold">ไม่พบข้อมูล</h3>
          </div>
        ) : (
          filteredCandidates.map((candidate) => {
            // ใช้ Optional Chaining (?.) ตรงนี้เพิ่มความปลอดภัย
            const isSelected = selectedItems?.has(candidate.id);
            return (
              <div
                key={candidate.id}
                className={`bg-white p-6 rounded-xl shadow-sm flex items-start transition-all ${
                  isSelected ? "border-2 border-[#f2b724]" : ""
                }`}
              >
                <div className="mr-4 pt-1">
                  <input
                    type="checkbox"
                    className="w-6 h-6 accent-[#f2b724] cursor-pointer"
                    checked={!!isSelected}
                    onChange={() => toggleSelection(candidate.id)}
                  />
                </div>
                <div className="flex-1 flex justify-between items-start flex-wrap gap-4">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#f2b724] text-[#072c4d] flex items-center justify-center text-2xl font-bold">
                      {candidate.firstName?.charAt(0) || "?"} 
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#072c4d]">
                        {candidate.firstName} {candidate.lastName}
                      </h3>
                      <p className="text-[#637996] text-sm">
                        {candidate.positionName}
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                        <span className="text-[#637996]">
                          📧 {candidate.email}
                        </span>
                        <span className="text-[#637996]">
                          📱 {candidate.phone}
                        </span>
                        <span className="text-[#637996]">
                          💼 Exp: {candidate.experience} ปี
                        </span>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="text-[#637996]">💻 Skills: </span>
                        <span className="text-[#072c4d]">
                          {candidate.skills}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-4 py-2 rounded-md text-white text-sm font-semibold ${
                        statusColors[candidate.status] || "bg-gray-400"
                      }`}
                    >
                      {statusLabels[candidate.status] || candidate.status}
                    </span>
                    <Button
                      variant="secondary"
                      className="text-sm py-2 bg-[#3b5474]"
                    >
                      📅 นัดสัมภาษณ์
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {selectedItems?.size > 0 && (
        <div className="fixed bottom-0 left-[260px] right-0 bg-[#072c4d] text-white p-5 shadow-lg flex justify-between items-center z-50">
          <span className="text-lg font-semibold">
            เลือกแล้ว {selectedItems.size} รายการ
          </span>
          <div className="flex gap-3">
            <Button>✉️ ส่งผลพิจารณา</Button>
            <Button variant="secondary" onClick={clearSelection}>
              ✕ ยกเลิก
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplicantInformation;