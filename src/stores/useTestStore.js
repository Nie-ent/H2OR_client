// src/stores/useTestStore.js

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; // ใช้ persist เผื่อกด Refresh แล้วข้อสอบไม่หาย
import axios from "axios"; // หรือ axiosCandidate ถ้า base url ตรงกัน

// สร้าง Axios Instance แยกเฉพาะ Test ก็ได้ หรือใช้ตัวเดิม
const api = axios.create({
  baseURL: "http://localhost:8000/api/tests",
});

export const useTestStore = create(
  persist(
    (set, get) => ({
      testId: null,
      questions: [], // เก็บโจทย์ทั้งหมด
      currentQuestionIndex: 0,
      answers: {}, // เก็บคำตอบที่เลือก { questionIndex: optionId }
      isLoading: false,
      error: null,

      // ฟังก์ชันดึงข้อสอบจาก backend
      // Action 1: เริ่มทำข้อสอบ
      startTest: async (candidateId) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post(`/start/${candidateId}`);
          const testData = response.data.data;

          // จัดรูปแบบข้อมูลให้ใช้ง่ายขึ้น (Extract questions from relation)
          const formattedQuestions = testData.questions || []; // กัน null

           set({ 
            testId: testData.test_id,
            questions: formattedQuestions,
            currentQuestionIndex: 0,
            answers: {}, // เคลียร์คำตอบเก่า
            isLoading: false 
          });

          return true; // แจ้งว่าทำสำเร็จ
        } catch (error) {
          console.error("Start Test Error:", error);
          set({ isLoading: false, error: "ไม่สามารถเริ่มทำแบบทดสอบได้" });
          throw error;
        }
      },

       // Action 2: เลือกคำตอบ
      selectAnswer: (questionId, choiceId) => {
        const { answers } = get();
        set({ answers: { ...answers, [questionId]: choiceId } 
        });
      },

      // Action 3: เปลี่ยนข้อ
      nextQuestion: () => {
        const { currentQuestionIndex, questions } = get();
        if (currentQuestionIndex < questions.length - 1) {
          set({ currentQuestionIndex: currentQuestionIndex + 1 });
        }
      },

      prevQuestion: () => {
        const { currentQuestionIndex } = get();
        if (currentQuestionIndex > 0) {
          set({ currentQuestionIndex: currentQuestionIndex - 1 });
        }
      },

      // Action 4: เคลียร์ข้อมูลเมื่อสอบเสร็จ
      resetTest: () =>
        set({ testId: null, questions: [], currentQuestionIndex: 0, answers: {} }),
    }),
    {
      name: "test-storage", // เก็บใน LocalStorage กัน Refresh
      storage: createJSONStorage(() => localStorage),
    }
  )
);
