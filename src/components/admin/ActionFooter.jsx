import React from "react";
import Button from "./Button";

const ActionFooter = ({ count, onSend, onCancel, isLoading }) => {
  if (count === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 md:left-[260px] right-0 bg-[#072c4d] text-white p-4 md:p-5 shadow-lg flex flex-col md:flex-row justify-between items-center z-50 animate-slide-up gap-3">
      <span className="text-base md:text-lg font-semibold">
        เลือกแล้ว {count} รายการ
      </span>
      <div className="flex gap-3 w-full md:w-auto">
        <Button 
          onClick={onSend} 
          disabled={isLoading} // ห้ามกดซ้ำขณะส่ง
          className={`flex-1 md:flex-none justify-center ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "⏳ กำลังส่ง..." : "✉️ ส่งผลพิจารณา"}
        </Button>
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 md:flex-none justify-center"
        >
          ✕ ยกเลิก
        </Button>
      </div>
    </div>
  );
};

export default ActionFooter;

