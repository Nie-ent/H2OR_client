import React from "react";
import Button from "./Button";
import { statusColors, statusLabels } from "../../data/candidate";
import { formatDate } from "../../utils/formatters";

const CandidateCard = ({
  candidate,
  isSelected,
  onToggle,
  onInterview,
  onEvaluate,
}) => {
  const isEvaluated =
    candidate.status === "passed" || candidate.status === "rejected";

  return (
    <div
      className={`bg-white p-4 md:p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-center items-start  transition-all ${isSelected ? "border-2 border-[#f2b724]" : ""
        }`}
    >
      {/* Checkbox */}
      <div className="flex w-full md:w-auto items-center mb-4 md:mb-0 md:mr-4 pt-1">
        {isEvaluated ? (
          <input
            type="checkbox"
            className="w-6 h-6 accent-[#f2b724] cursor-pointer"
            checked={!!isSelected}
            onChange={() => onToggle(candidate.id)}
          />
        ) : (
          <div className="w-6 h-6"></div>
        )}
      </div>

      {/* Info Content */}
      <div className="flex-1 w-full flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center sm:items-start">

          {/* --- [1] ส่วนแสดงรูปภาพ + ปุ่มดูข้อมูล (จัดกึ่งกลาง) --- */}
          <div className="shrink-0 flex flex-col items-center gap-2">

            {/* รูปภาพ */}
            {candidate.photoUrl ? (
              <img
                src={candidate.photoUrl}
                alt={`${candidate.firstName} ${candidate.lastName}`}
                className="w-20 h-20 rounded-lg object-cover border border-gray-200 shadow-sm"
              />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-[#f2b724] text-[#072c4d] flex items-center justify-center text-2xl font-bold">
                {candidate.firstName?.charAt(0) || "?"}
              </div>
            )}

            {/* ปุ่มดูข้อมูล */}
            {candidate.resumeUrl && (
              <a
                href={candidate.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-20"
              >
                <Button
                  variant="secondary"
                  className="w-full flex items-center justify-center text-[10px] sm:text-xs py-1 px-0 bg-blue-950 border border-gray-300 text-gray-600 hover:bg-blue-800 shadow-sm whitespace-nowrap overflow-hidden"
                >
                  📄 ดูข้อมูล
                </Button>
              </a>
            )}
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <h3 className="text-lg md:text-xl font-bold text-[#072c4d]">
                {candidate.firstName} {candidate.lastName}
              </h3>
              <span
                className={`px-3 py-0.5 rounded-lg text-white text-base font-medium ${statusColors[candidate.status] || "bg-gray-400"
                  }`}
              >
                {statusLabels[candidate.status] || candidate.status}
              </span>
            </div>

            <p className="text-[#637996] text-sm mt-1">
              {candidate.positionName || candidate.position}
            </p>

            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-[#637996]">
              <span className="truncate">📧 {candidate.email}</span>
              <span>📱 {candidate.phone}</span>
              <span>💼 Exp: - ปี</span>
            </div>

            {candidate.interviewDetails && (
              <div className="mt-3 bg-blue-50 p-2 rounded-lg border border-blue-100 text-sm inline-flex flex-wrap items-center gap-2">
                <span className="text-[#072c4d] font-semibold whitespace-nowrap">
                  📅 นัดหมาย:{" "}
                  {formatDate(candidate.interviewDetails.interviewDate)}
                </span>
                <span className="hidden sm:inline mx-2 text-gray-400">|</span>
                <span className="text-[#637996]">
                  {candidate.interviewDetails.interviewType === "online"
                    ? "💻 Online"
                    : "🏢 On-site"}
                </span>
              </div>
            )}

            <div className="mt-2 text-sm">
              <span className="text-[#637996]">💻 Skills: </span>
              <span className="text-[#072c4d] wrap-break-words">
                {candidate.stack}
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex flex-row md:flex-col w-full md:w-auto justify-between items-center md:items-end gap-2 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">

          {/* Score Display */}
          {candidate.score && (
            <div className="flex flex-col items-start md:items-end mb-0 md:mb-2">
              <span className="text-[10px] text-[#637996] font-medium mb-1 uppercase tracking-wide">
                Exam Score
              </span>
              <div className="flex items-baseline bg-[#f2b724] text-white px-3 py-2 rounded-lg shadow-md">
                <span className="text-2xl md:text-3xl font-bold leading-none">
                  {candidate.score}
                </span>
                <span className="text-xs ml-1 opacity-80 font-medium">
                  /100
                </span>
              </div>
            </div>
          )}

          {/* Button Group */}
          <div className="flex gap-2 justify-end">
            {candidate.candidate_statuses === "pending" && (
              <Button
                variant="secondary"
                className="text-sm py-2 bg-[#3b5474] hover:bg-[#2c3e56]"
                onClick={() => onInterview(candidate)}
              >
                📅 นัดสัมภาษณ์
              </Button>
            )}

            {candidate.status === "interview" && (
              <Button
                variant="secondary"
                className="text-sm py-2 bg-[#5d738a] hover:bg-[#4a5d70] text-white"
                onClick={() => onEvaluate(candidate)}
              >
                📝 ประเมินผล
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;