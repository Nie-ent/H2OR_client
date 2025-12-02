import React from "react";

const ScoreScreen = ({ score, total }) => {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-[#0f2342] text-center">
      <h2 className="text-3xl font-bold mb-4">สรุปผลการสอบ</h2>

      {/* ส่วนแสดงคะแนน */}
      <div className="py-8">
        <div className="text-8xl font-bold text-[#F2C94C] mb-2">{score}</div>
        <div className="text-[#0f2342] text-xl">จากทั้งหมด {total} คะแนน</div>
      </div>

      <div className="space-y-4 text-[#0f2342] text-xl">
        <p>
          {" "}
          ทางเรากำลังพิจารณา หากผ่านเกณฑ์เบื้องต้น
          จะติดต่อกลับเพื่อนัดสัมภาษณ์ภายใน 3-5 วัน
        </p>
      </div>
    </div>
  );
};

export default ScoreScreen;
