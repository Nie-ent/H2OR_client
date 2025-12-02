import React from "react";
import QuizOption from "./Questions";

const QuizContent = ({
  currentQ,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  isSubmitting,
  onOptionSelect,
  onNextOrSubmit,
  onPrev,
}) => {
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  console.log("currentQ", currentQ);

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-2xl p-6 md:p-10 text-[#0f2342] order-1 md:order-2">
      {/* Header */}
      <div className="flex justify-between items-end mb-6 border-b border-gray-700 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold">คำถามของคุณ</h1>
        <span className="text-[#85794F] font-semibold text-lg">
          ข้อที่{" "}
          <span className="text-2xl text-[#0f2342]">
            {currentQuestionIndex + 1}
          </span>{" "}
          / {totalQuestions}
        </span>
      </div>

      {/* Question */}
      <div className="mb-8 min-h-[80px]">
        <h2 className="text-xl md:text-2xl font-semibold leading-relaxed">
          {currentQ.question}
        </h2>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {currentQ.options.map((option) => (
          <QuizOption
            key={option.id}
            option={option}
            isSelected={selectedAnswer === option.id}
            onSelect={onOptionSelect}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4 pt-4 border-t border-gray-700">
        {/* ปุ่มย้อนกลับ */}
        <button
          onClick={onPrev}
          disabled={currentQuestionIndex === 0 || isSubmitting}
          className={`
            flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all
            ${
              currentQuestionIndex === 0
                ? "bg-gray-700 text-white opacity-50 cursor-not-allowed" // กดไม่ได้
                : "bg-[#354665] hover:bg-[#405275] text-white cursor-pointer hover:shadow-lg" // กดได้
            }`}
        >
          <span>←</span> ย้อนกลับ
        </button>

        {/* ปุ่มถัดไป / ส่งคำตอบ */}
        <button
          onClick={onNextOrSubmit}
          disabled={!selectedAnswer || isSubmitting}
          className={`
            flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all relative
            ${
              !selectedAnswer || isSubmitting
                ? "bg-gray-700 text-white opacity-50 cursor-not-allowed" // กดไม่ได้
                : "bg-[#F2C94C] hover:border-[#F2C94C] text-[#354665] cursor-pointer hover:shadow-lg" // กดได้
            }`}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
              กำลังส่ง...
            </>
          ) : (
            <>
              {isLastQuestion ? "ส่งคำตอบ" : "ข้อถัดไป"}
              <span>{isLastQuestion ? "✓" : "→"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default QuizContent;
