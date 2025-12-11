import React, { useState, useEffect, useMemo } from "react";
import Button from "../../components/admin/Button";
import { statusLabels } from "../../data/candidate";
import CandidateCard from "../../components/admin/CandidateCard";
import AddCandidateModal from "../../components/admin/AddCandidateModal";
import InterviewModal from "../../components/admin/InterviewModal";
import EvaluationModal from "../../components/admin/EvaluationModal";
import ActionFooter from "../../components/admin/ActionFooter";
import FilterBar from "../../components/admin/FilterBar";
import { useCandidateStore } from "../../stores/useCandidateStore";

const JobApplicantInformation = () => {
  // ใช้ store เดียวสำหรับทั้ง admin + public
const {
  candidates: storeCandidates,
  fetchCandidates,
  registerCandidate,
} = useCandidateStore();

  // --- 1. State Management ---
  const [allCandidates, setAllCandidates] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [filters, setFilters] = useState({
    term: "",
    position: "",
    status: "",
  });

  const [modals, setModals] = useState({
    add: false,
    interview: false,
    eval: false,
  });
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const fetchCandidate = useCandidateStore((s) => s.fetchCandidates);
  //โหลดข้อมูลจาก backend เมื่อเข้าเพจ
  useEffect(() => {
  try {
    if (typeof fetchCandidates === "function") {
      fetchCandidates();
      console.log("Called fetchCandidates() from useCandidateStore");
    } else {
      console.warn("fetchCandidates is not a function in useCandidateStore");
    }
  } catch (err) {
    console.error("fetch trigger error:", err);
  }
}, []);

  // 2.Sync whichever store has data (prefer admin store)
  useEffect(() => {
  if (Array.isArray(storeCandidates) && storeCandidates.length > 0) {
    setAllCandidates(storeCandidates);
    return;
  }
  setAllCandidates([]);
}, [storeCandidates]);

  // --- 2. Filter Logic ---
  const filteredCandidates = useMemo(() => {
    return allCandidates.filter((c) => {
      const matchesSearch =
        (c.firstName?.toLowerCase() ?? "").includes(filters.term.toLowerCase()) ||
        (c.email?.toLowerCase() ?? "").includes(filters.term.toLowerCase());
      const matchesPos = !filters.position || c.position === filters.position;
      const matchesStatus = !filters.status || filters.status === "all" || c.status === filters.status;
      return matchesSearch && matchesPos && matchesStatus;
    });
  }, [allCandidates, filters]);

  // console.log('filteredCandidates: ', filteredCandidates[0].email)

  // --- 3. Handlers ---
  const toggleSelection = (id) => {
    const newSelected = new Set(selectedItems);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelectedItems(newSelected);
  };

  const handleUpdateCandidate = (updatedList) => {
    setAllCandidates(updatedList);
    setModals({ ...modals, add: false, interview: false, eval: false });
    setSelectedCandidate(null);
  };

  const fetchCandidates = useAdminCandidateStore(state => state.fetchCandidates)

  // แก้ตรงนี้ให้ยิง API แทน fake เพิ่มใน state อย่างเดียว
  const handleSaveCandidate = async (formData) => {
  try {
    // 1) แปลงข้อมูลจากฟอร์มให้ตรงกับที่ backend/DB ใช้
    const payload = {
  firstName: formData.firstName,
  lastName: formData.lastName,
  email: formData.email,
  phone: formData.phone,
  gender: formData.gender || null,
  age: formData.age ? Number(formData.age) : null,
  expectedSalary: formData.expectedSalary ? Number(formData.expectedSalary) : null,
  idCard: formData.idCard || null,
  experience_salary: formData.experienceSalary ? Number(formData.experienceSalary) : null,
  experience: formData.experience ? Number(formData.experience) : null,
  stack: formData.skills,
  status: formData.status || "pending",
  notes: formData.notes,
  score: formData.examScore ? Number(formData.examScore) : null,
};

    // 2) ส่ง payload ที่เราจัดแล้วเข้า registerCandidate
    await registerCandidate(payload);

    // 3) ดึงข้อมูลล่าสุดมาแสดง
    await fetchCandidates();

    // 4) ปิด modal
    setModals({ ...modals, add: false });
  } catch (err) {
    console.error(err);
    alert("เพิ่มผู้สมัครงานไม่สำเร็จ");
  }
};

  const handleSaveInterview = (data) => {
    const updated = allCandidates.map((c) =>
      c.id === selectedCandidate.id
        ? { ...c, status: "interview", interviewDetails: data }
        : c
    );
    handleUpdateCandidate(updated);
  };

  const handleSaveEvaluation = (data) => {
    const updated = allCandidates.map((c) =>
      c.id === selectedCandidate.id
        ? {
          ...c,
          status: data.result,
          examScore: data.score,
          notes: data.notes
            ? `${c.notes || ""} [Feedback: ${data.notes}]`
            : c.notes,
        }
        : c
    );
    handleUpdateCandidate(updated);
  };

  const handleSendResult = () => {
    const selectedList = allCandidates.filter((c) => selectedItems.has(c.id));
    const readyToSend = selectedList.filter(
      (c) => c.status === "passed" || c.status === "rejected"
    );

    if (readyToSend.length === 0) return alert("⚠️ กรุณาเลือกรายการ");

    const names = readyToSend
      .map((c) => `- ${c.firstName} (${statusLabels[c.status]})`)
      .join("\n");
    alert(
      `✉️ ระบบกำลังส่งอีเมลแจ้งผลการพิจารณา...\n\nรายชื่อผู้รับ (${readyToSend.length} คน):\n${names}\n\nสถานะ: ส่งเรียบร้อย ✅`
    );
    setSelectedItems(new Set());
  };

  // --- 4. Render ---
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h3 className="text-[#072c4d] text-xl font-bold">
          ผู้สมัครงานทั้งหมด ({allCandidates.length})
        </h3>
        <Button
          onClick={() => setModals({ ...modals, add: true })}
          className="w-full md:w-auto"
        >
          + เพิ่มผู้สมัครงาน
        </Button>
      </div>

      {/* Filter Component */}
      <FilterBar
        searchTerm={filters.term}
        setSearchTerm={(v) => setFilters({ ...filters, term: v })}
        filterPosition={filters.position}
        setFilterPosition={(v) => setFilters({ ...filters, position: v })}
        filterStatus={filters.status}
        setFilterStatus={(v) => setFilters({ ...filters, status: v })}
        onClear={() => setFilters({ term: "", position: "", status: "" })}
      />

      {/* List Component */}
      <div className="space-y-4">
        {filteredCandidates.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-[#072c4d] font-bold">ไม่พบข้อมูล</h3>
          </div>
        ) : (
          filteredCandidates.map((candidate) => (
            < CandidateCard
              // key={candidate.candidate_id}
              key={candidate.id}
              candidate={candidate}
              isSelected={selectedItems.has(candidate.id)}
              onToggle={toggleSelection}
              onInterview={(c) => {
                setSelectedCandidate(c);
                setModals({ ...modals, interview: true });
              }}
              onEvaluate={(c) => {
                setSelectedCandidate(c);
                setModals({ ...modals, eval: true });
              }}
            />
          ))
        )}
      </div>

      {/* Modals */}
      <AddCandidateModal
        isOpen={modals.add}
        onClose={() => setModals({ ...modals, add: false })}
        onSave={handleSaveCandidate}
      />
      <InterviewModal
        isOpen={modals.interview}
        onClose={() => setModals({ ...modals, interview: false })}
        onSave={handleSaveInterview}
        candidate={selectedCandidate}
      />
      <EvaluationModal
        isOpen={modals.eval}
        onClose={() => setModals({ ...modals, eval: false })}
        onSave={handleSaveEvaluation}
        candidate={selectedCandidate}
      />

      {/* Footer Component */}
      <ActionFooter
        count={selectedItems.size}
        onSend={handleSendResult}
        onCancel={() => setSelectedItems(new Set())}
      />
    </div>
  );
};

export default JobApplicantInformation;
