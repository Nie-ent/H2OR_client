import { create } from "zustand";
import api from "../configs/axiosCandidate"; // your axios instance

export const useCandidateStore = create((set, get) => ({
  candidates: [],
  isLoading: false,
  error: null,
  meta: { total: 0, page: 1, perPage: 50 },

  // REGISTER - create candidate (รองรับไฟล์ถ้าจะส่ง FormData ใน onSave)
  registerCandidate: async (candidateData) => {
    set({ isLoading: true, error: null });
    try {
      // candidateData อาจเป็น plain object หรือ FormData (ถ้าส่งไฟล์)
      const headers = candidateData instanceof FormData ? { "Content-Type": "multipart/form-data" } : {};
      const response = await api.post("/", candidateData, { headers });

      // ปรับให้ return data ที่ backend ส่ง (map ถ้าจำเป็น)
      const payload = response.data?.data ?? response.data;
      set({ isLoading: false });

      return payload;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "การสมัครล้มเหลว";
      set({ isLoading: false, error: errorMessage });
      throw error;
    }
  },

  // FETCH - รับ params เพื่อกรอง/ระบุช่วงเวลา/pagination
  // params: { from, to, page, perPage, status, q }
  fetchCandidates: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      console.log('[fetchCandidates] params:', params);
      const response = await api.get("/candidates", {params});

      // backend อาจคืน [..] หรือ { data: [...], meta: {...} }
      const rawList = response.data?.data ?? response.data ?? [];
      const meta = response.data?.meta ?? { total: rawList.length, page: params.page ?? 1, perPage: params.perPage ?? rawList.length };

      // mapping ให้เป็นโครงที่ UI คาดหวัง
      const mapped = rawList.map((r) => {
        // adaptable mapping: ตรวจชื่อฟิลด์ที่ backend คืนมา
        const id = r.candidate_id ?? r.id ?? r.uuid;
        const firstName = r.firstName ?? r.first_name ?? r.first;
        const lastName = r.lastName ?? r.last_name ?? r.last;
        const fullName = r.fullName ?? `${firstName ?? ""} ${lastName ?? ""}`.trim();
        const position = r.position ?? r.stack ?? r.jobTitle ?? r.job_title ?? "";
        // pick status from candidateStatus latest if backend gives nested, else direct
        const status = r.status ?? r.candidate_status ?? (r.candidate_statuses?.[0]?.status) ?? "pending";

        // applied date/time: try multiple fields
        const appliedAt = r.appliedAt ?? r.applied_at ?? r.createdAt ?? r.created_at ?? r.appliedDate ?? null;
        let appliedDate = "";
        let applicationTime = "";
        if (appliedAt) {
          const d = new Date(appliedAt);
          if (!Number.isNaN(d.getTime())) {
            appliedDate = d.toISOString().split("T")[0];
            applicationTime = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          }
        }

        return {
          id,
          firstName,
          lastName,
          name: fullName,
          fullName,
          position,
          status,
          appliedDate,
          applicationTime,
          raw: r,
        };
      });

      set({
        candidates: mapped,
        isLoading: false,
        error: null,
        meta,
      });

      return { data: mapped, meta };
    } catch (error) {
      console.error("fetchCandidates error:", error);
      const errorMessage = error.response?.data?.message || "ไม่สามารถดึงข้อมูลได้";
      set({ isLoading: false, error: errorMessage });
      throw error;
    }
  },

  // UPDATE STATUS - optimistic update + persist
  updateCandidateStatus: async (id, newStatus) => {
    // optimistic update
    const prev = get().candidates;
    set({
      candidates: prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)),
    });

    try {
      await api.patch(`/${id}/status`, { status: newStatus });
      return true;
    } catch (error) {
      console.error("updateCandidateStatus failed:", error);
      // rollback: refetch หรือ revert state
      set({ candidates: prev });
      const errorMessage = error.response?.data?.message || "ไม่สามารถเปลี่ยนสถานะได้";
      set({ error: errorMessage });
      throw error;
    }
  },

  // get single candidate (local cache first, else fetch)
  getCandidateById: async (id) => {
    const cached = get().candidates.find((c) => c.id === id);
    if (cached) return cached;
    try {
      const res = await api.get(`/${id}`);
      const r = res.data?.data ?? res.data;
      // map to same shape (reuse mapping logic or extract util)
      return {
        id: r.candidate_id ?? r.id,
        name: r.fullName ?? `${r.firstName} ${r.lastName}`.trim(),
        raw: r,
      };
    } catch (error) {
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
