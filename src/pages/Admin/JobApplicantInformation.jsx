import React, { useState, useEffect } from "react";
import Button from "../../components/admin/Button";
import {
  statusColors,
  statusLabels,
  initialCandidates,
} from "../../data/candidate";
import AddCandidateModal from "../../components/admin/AddCandidateModal";
import InterviewModal from "../../components/admin/InterviewModal";
import EvaluationModal from "../../components/admin/EvaluationModal";

const JobApplicantInformation = ({ candidates = initialCandidates }) => {
  const [allCandidates, setAllCandidates] = useState(candidates);
  const [selectedItems, setSelectedItems] = useState(new Set());

  useEffect(() => {
    setAllCandidates(candidates);
  }, [candidates]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [selectedCandidateForInterview, setSelectedCandidateForInterview] =
    useState(null);
  const [isEvalModalOpen, setIsEvalModalOpen] = useState(false);
  const [selectedCandidateForEval, setSelectedCandidateForEval] =
    useState(null);

  const toggleSelection = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const clearSelection = () => {
    setSelectedItems(new Set());
  };

  const filteredCandidates = allCandidates.filter((c) => {
    const matchesSearch =
      c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPos = !filterPosition || c.position === filterPosition;
    const matchesStatus = !filterStatus || c.status === filterStatus;
    return matchesSearch && matchesPos && matchesStatus;
  });

  // --- Functions จัดการ Modal ---
  const handleSaveCandidate = (newData) => {
    const newCandidate = {
      id: Date.now(),
      ...newData,
      positionName: getPositionName(newData.position),
    };
    setAllCandidates([newCandidate, ...allCandidates]);
    setIsAddModalOpen(false);
  };

  const openInterviewModal = (candidate) => {
    setSelectedCandidateForInterview(candidate);
    setIsInterviewModalOpen(true);
  };

  const handleSaveInterview = (interviewData) => {
    const updatedCandidates = allCandidates.map((c) => {
      if (c.id === selectedCandidateForInterview.id) {
        return { ...c, status: "interview", interviewDetails: interviewData };
      }
      return c;
    });
    setAllCandidates(updatedCandidates);
    setIsInterviewModalOpen(false);
    setSelectedCandidateForInterview(null);
  };

  const openEvaluationModal = (candidate) => {
    setSelectedCandidateForEval(candidate);
    setIsEvalModalOpen(true);
  };

  const handleSaveEvaluation = (evalData) => {
    const updatedCandidates = allCandidates.map((c) => {
      if (c.id === selectedCandidateForEval.id) {
        return {
          ...c,
          status: evalData.result,
          examScore: evalData.score,
          notes: evalData.notes
            ? `${c.notes || ""} [Feedback: ${evalData.notes}]`
            : c.notes,
        };
      }
      return c;
    });
    setAllCandidates(updatedCandidates);
    setIsEvalModalOpen(false);
    setSelectedCandidateForEval(null);
  };

  const handleSendResult = () => {
    const selectedList = allCandidates.filter((c) => selectedItems.has(c.id));

    // ตรวจสอบอีกครั้งเพื่อความปลอดภัย (แม้ checkbox จะกรองมาแล้ว)
    const readyToSend = selectedList.filter(
      (c) => c.status === "passed" || c.status === "rejected"
    );

    if (readyToSend.length === 0) {
      alert("⚠️ กรุณาเลือกรายการ");
      return;
    }

    const successNames = readyToSend
      .map((c) => `- ${c.firstName} (${statusLabels[c.status]})`)
      .join("\n");

    alert(
      `✉️ ระบบกำลังส่งอีเมลแจ้งผลการพิจารณา...\n\n` +
        `รายชื่อผู้รับ (${readyToSend.length} คน):\n${successNames}\n\n` +
        `สถานะ: ส่งเรียบร้อย ✅`
    );

    clearSelection();
  };

  const getPositionName = (value) => {
    const positions = {
      developer: "Senior Full Stack Developer",
      designer: "UX/UI Designer",
      marketing: "Digital Marketing Manager",
      backend: "Backend Developer (Node.js)",
      hr: "HR Specialist",
    };
    return positions[value] || value;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("th-TH", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[#072c4d] text-xl font-bold">
          ผู้สมัครงานทั้งหมด ({allCandidates.length})
        </h3>
        <Button onClick={() => setIsAddModalOpen(true)}>
          + เพิ่มผู้สมัครงาน
        </Button>
      </div>

      {/* Modals */}
      <AddCandidateModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveCandidate}
      />
      <InterviewModal
        isOpen={isInterviewModalOpen}
        onClose={() => setIsInterviewModalOpen(false)}
        onSave={handleSaveInterview}
        candidate={selectedCandidateForInterview}
      />
      <EvaluationModal
        isOpen={isEvalModalOpen}
        onClose={() => setIsEvalModalOpen(false)}
        onSave={handleSaveEvaluation}
        candidate={selectedCandidateForEval}
      />

      {/* Filters */}
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

      {/* Table / List */}
      <div className="space-y-4">
        {filteredCandidates.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-[#072c4d] font-bold">ไม่พบข้อมูล</h3>
          </div>
        ) : (
          filteredCandidates.map((candidate) => {
            const isSelected = selectedItems.has(candidate.id);

            // ตรวจสอบสถานะว่าจบกระบวนการหรือยัง (ผ่าน หรือ ไม่ผ่าน)
            const isEvaluated =
              candidate.status === "passed" || candidate.status === "rejected";

            return (
              <div
                key={candidate.id}
                className={`bg-white p-6 rounded-xl shadow-sm flex items-start transition-all ${
                  isSelected ? "border-2 border-[#f2b724]" : ""
                }`}
              >
                <div className="mr-4 pt-1">
                  {/* --- แก้ไข: แสดง Checkbox เฉพาะรายการที่ประเมินแล้ว --- */}
                  {isEvaluated ? (
                    <input
                      type="checkbox"
                      className="w-6 h-6 accent-[#f2b724] cursor-pointer"
                      checked={!!isSelected}
                      onChange={() => toggleSelection(candidate.id)}
                    />
                  ) : (
                    // แสดงพื้นที่ว่างขนาดเท่า Checkbox เพื่อให้ Alignment ไม่เสีย
                    <div className="w-6 h-6"></div>
                  )}
                  {/* ------------------------------------------------ */}
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
                        {candidate.positionName || candidate.position}
                      </p>

                      <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-xl">
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

                      {candidate.interviewDetails && (
                        <div className="mt-3 bg-blue-50 p-2 rounded-lg border border-blue-100 text-xl inline-block">
                          <span className="text-[#072c4d] font-semibold">
                            📅 นัดหมาย:{" "}
                            {formatDate(
                              candidate.interviewDetails.interviewDate
                            )}
                          </span>
                          <span className="mx-2 text-gray-400">|</span>
                          <span className="text-[#637996]">
                            {candidate.interviewDetails.interviewType ===
                            "online"
                              ? "💻 Online"
                              : "🏢 On-site"}
                          </span>
                        </div>
                      )}

                      <div className="mt-2 text-xl">
                        <span className="text-[#637996]">💻 Skills: </span>
                        <span className="text-[#072c4d]">
                          {candidate.skills}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {candidate.examScore && (
                      <div className="flex flex-col items-end mb-2">
                        <span className="text-[10px] text-[#072c4d] font-medium mb-1 uppercase tracking-wide">
                          Exam Score
                        </span>
                        <div className="flex items-baseline bg-[#f2b724] text-[#072c4d] px-3 py-2 rounded-lg shadow-md">
                          <span className="text-3xl font-bold leading-none">
                            {candidate.examScore}
                          </span>
                          <span className="text-xs ml-1 opacity-80 font-medium">
                            /100
                          </span>
                        </div>
                      </div>
                    )}

                    <span
                      className={`px-4 py-2 rounded-md text-white text-sm font-semibold ${
                        statusColors[candidate.status] || "bg-gray-400"
                      }`}
                    >
                      {statusLabels[candidate.status] || candidate.status}
                    </span>

                    {candidate.status === "pending" && (
                      <Button
                        variant="secondary"
                        className="text-sm py-2 bg-[#3b5474] hover:bg-[#2c3e56]"
                        onClick={() => openInterviewModal(candidate)}
                      >
                        📅 นัดสัมภาษณ์
                      </Button>
                    )}
                    {candidate.status === "interview" && (
                      <Button
                        variant="secondary"
                        className="text-sm py-2 bg-[#28a745] hover:bg-[#218838] text-white"
                        onClick={() => openEvaluationModal(candidate)}
                      >
                        📝 ประเมินผล
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {selectedItems.size > 0 && (
        <div className="fixed bottom-0 left-[260px] right-0 bg-[#072c4d] text-white p-5 shadow-lg flex justify-between items-center z-50 animate-slide-up">
          <span className="text-lg font-semibold">
            เลือกแล้ว {selectedItems.size} รายการ
          </span>
          <div className="flex gap-3">
            <Button onClick={handleSendResult}>✉️ ส่งผลพิจารณา</Button>

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
