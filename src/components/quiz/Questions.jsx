// import React from "react";

const QuizOption = ({ option, isSelected, onSelect }) => {
  console.log(option, "-----------");
  return (
    <div
      onClick={() => onSelect(option.id)}
      className={`
        cursor-pointer 
        relative p-4 rounded-xl border-2 transition-all duration-200 
        flex items-center gap-3 group
        ${
          isSelected
            ? "border-[#F2C94C] bg-[#F2C94C]/10 shadow-md scale-[1.02]" // เลือกแล้ว
            : "border-gray-200 hover:border-[#F2C94C] hover:bg-gray-50 hover:shadow-sm" // ยังไม่เลือก
        }
      `}
    >
      {/* วงกลม Checkbox */}
      <div
        className={`
          w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
          ${
            isSelected
              ? "border-[#F2C94C] bg-[#F2C94C]"
              : "border-gray-300 group-hover:border-[#F2C94C]"
          }
        `}
      >
        {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
      </div>

      <span
        className={`font-medium ${
          isSelected
            ? "text-[#0f2342]"
            : "text-gray-600 group-hover:text-[#0f2342]"
        }`}
      >
        {option.label}
      </span>
    </div>
  );
};

export default QuizOption;
