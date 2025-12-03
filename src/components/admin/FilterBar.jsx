import React from "react";
import Button from "./Button";

const FilterBar = ({
  searchTerm,
  setSearchTerm,
  filterPosition,
  setFilterPosition,
  filterStatus,
  setFilterStatus,
  onClear,
}) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
      <Button variant="secondary" onClick={onClear} className="w-full">
        ล้างตัวกรอง
      </Button>
    </div>
  );
};

export default FilterBar;
