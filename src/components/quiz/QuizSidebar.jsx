import React from "react";

const QuizSidebar = ({
  questions,
  currentQuestionIndex,
  answers,
  onJumpToQuestion,
}) => {
  return (
    <div className="w-full md:w-64 bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-fit border border-white/10 order-2 md:order-1">
      <h3 className="text-white text-lg font-bold mb-4 border-b border-white/20 pb-2">
        ภาพรวมข้อสอบ
      </h3>
      <div className="grid grid-cols-5 md:grid-cols-4 gap-2">
        {questions.map((q, index) => {
          const isAnswered = answers[index] !== undefined;
          const isActive = currentQuestionIndex === index;

          // เพิ่ม cursor-pointer ตรงนี้
          let btnClass =
            "cursor-pointer w-8 h-8 md:w-10 md:h-10 rounded-lg text-sm font-bold transition-all flex items-center justify-center shadow-sm ";

          if (isActive) {
            // ข้อปัจจุบัน
            btnClass +=
              "bg-[#F2C94C] text-[#0f2342] ring-2 ring-white scale-110 shadow-md";
          } else if (isAnswered) {
            // ตอบแล้ว
            btnClass +=
              "bg-[#4ade80] text-[#064e3b] hover:bg-[#22c55e] hover:scale-105";
          } else {
            // ยังไม่ตอบ
            btnClass +=
              "bg-white/20 text-white hover:bg-white/30 hover:scale-105";
          }

          return (
            <button
              key={index}
              onClick={() => onJumpToQuestion(index)}
              className={btnClass}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-6 text-xs text-gray-300 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#F2C94C]"></div> กำลังทำ
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#4ade80]"></div> ตอบแล้ว
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white/20"></div> ยังไม่ตอบ
        </div>
      </div>
    </div>
  );
};

export default QuizSidebar;
