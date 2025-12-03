import React, { useState, useEffect, useMemo } from "react";
import Button from "../../components/admin/Button";
import { initialCandidates, statusLabels } from "../../data/candidate";
import CandidateCard from "../../components/admin/CandidateCard";
import AddCandidateModal from "../../components/admin/AddCandidateModal";
import InterviewModal from "../../components/admin/InterviewModal";
import EvaluationModal from "../../components/admin/EvaluationModal";
import ActionFooter from "../../components/admin/ActionFooter";
import { getPositionName } from "../../utils/formatters";
import FilterBar from "../../components/admin/FilterBar";


const JobApplicantInformation = ({ candidates = initialCandidates }) => {
  // --- 1. State Management ---
  const [allCandidates, setAllCandidates] = useState(candidates);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [filters, setFilters] = useState({ term: "", position: "", status: "" });
  
  const [modals, setModals] = useState({ add: false, interview: false, eval: false });
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => setAllCandidates(candidates), [candidates]);

  // --- 2. Filter Logic ---
  const filteredCandidates = useMemo(() => {
    return allCandidates.filter((c) => {
      const matchesSearch = c.firstName.toLowerCase().includes(filters.term.toLowerCase()) || c.email.toLowerCase().includes(filters.term.toLowerCase());
      const matchesPos = !filters.position || c.position === filters.position;
      const matchesStatus = !filters.status || c.status === filters.status;
      return matchesSearch && matchesPos && matchesStatus;
    });
  }, [allCandidates, filters]);

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

  const handleSaveCandidate = (newData) => {
    const newCandidate = { id: Date.now(), ...newData, positionName: getPositionName(newData.position) };
    handleUpdateCandidate([newCandidate, ...allCandidates]);
  };

  const handleSaveInterview = (data) => {
    const updated = allCandidates.map(c => c.id === selectedCandidate.id ? { ...c, status: 'interview', interviewDetails: data } : c);
    handleUpdateCandidate(updated);
  };

  const handleSaveEvaluation = (data) => {
    const updated = allCandidates.map(c => c.id === selectedCandidate.id ? { 
        ...c, status: data.result, examScore: data.score, 
        notes: data.notes ? `${c.notes || ''} [Feedback: ${data.notes}]` : c.notes 
    } : c);
    handleUpdateCandidate(updated);
  };

  const handleSendResult = () => {
    const selectedList = allCandidates.filter(c => selectedItems.has(c.id));
    const readyToSend = selectedList.filter(c => c.status === 'passed' || c.status === 'rejected');
    
    if (readyToSend.length === 0) return alert("⚠️ กรุณาเลือกรายการ");
    
    const names = readyToSend.map(c => `- ${c.firstName} (${statusLabels[c.status]})`).join('\n');
    alert(`✉️ ระบบกำลังส่งอีเมลแจ้งผลการพิจารณา...\n\nรายชื่อผู้รับ (${readyToSend.length} คน):\n${names}\n\nสถานะ: ส่งเรียบร้อย ✅`);
    setSelectedItems(new Set());
  };

  // --- 4. Render ---
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h3 className="text-[#072c4d] text-xl font-bold">ผู้สมัครงานทั้งหมด ({allCandidates.length})</h3>
        <Button onClick={() => setModals({ ...modals, add: true })} className="w-full md:w-auto">+ เพิ่มผู้สมัครงาน</Button>
      </div>

      {/* Filter Component */}
      <FilterBar 
        searchTerm={filters.term} setSearchTerm={(v) => setFilters({ ...filters, term: v })}
        filterPosition={filters.position} setFilterPosition={(v) => setFilters({ ...filters, position: v })}
        filterStatus={filters.status} setFilterStatus={(v) => setFilters({ ...filters, status: v })}
        onClear={() => setFilters({ term: "", position: "", status: "" })}
      />

      {/* List Component */}
      <div className="space-y-4">
        {filteredCandidates.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm"><div className="text-5xl mb-4">🔍</div><h3 className="text-[#072c4d] font-bold">ไม่พบข้อมูล</h3></div>
        ) : (
          filteredCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              isSelected={selectedItems.has(candidate.id)}
              onToggle={toggleSelection}
              onInterview={(c) => { setSelectedCandidate(c); setModals({ ...modals, interview: true }); }}
              onEvaluate={(c) => { setSelectedCandidate(c); setModals({ ...modals, eval: true }); }}
            />
          ))
        )}
      </div>

      {/* Modals */}
      <AddCandidateModal isOpen={modals.add} onClose={() => setModals({ ...modals, add: false })} onSave={handleSaveCandidate} />
      <InterviewModal isOpen={modals.interview} onClose={() => setModals({ ...modals, interview: false })} onSave={handleSaveInterview} candidate={selectedCandidate} />
      <EvaluationModal isOpen={modals.eval} onClose={() => setModals({ ...modals, eval: false })} onSave={handleSaveEvaluation} candidate={selectedCandidate} />

      {/* Footer Component */}
      <ActionFooter count={selectedItems.size} onSend={handleSendResult} onCancel={() => setSelectedItems(new Set())} />
    </div>
  );
};

export default JobApplicantInformation;


