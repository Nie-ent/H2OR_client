import React, { useState } from "react";

// Import Components ที่เราแยกออกมา
import { questions } from "../../data/questions.js";
import ScoreScreen from "../../components/quiz/ScoreScreen";
import QuizSidebar from "../../components/quiz/QuizSidebar";
import QuizContent from "../../components/quiz/QuizContent";

const QuizPage = () => {
  // --- STATE ---
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQ = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // --- LOGIC ---

  const handleOptionSelect = (optionId) => {
    setAnswers({ ...answers, [currentQuestionIndex]: optionId });
  };

  const calculateScore = () => {
    return questions.reduce((acc, q, index) => {
      return q.correctAnswer === answers[index] ? acc + 1 : acc;
    }, 0);
  };

  const submitToBackend = async () => {
    setIsSubmitting(true);
    const score = calculateScore();
    const payload = {
      score,
      total: questions.length,
      answers,
      submittedAt: new Date().toISOString(),
    };

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Sent to Backend:", payload);
      setIsFinished(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Error submitting data");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextOrSubmit = () => {
    if (isLastQuestion) {
      submitToBackend();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsFinished(false);
  };

  // --- RENDER ---

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#0f2342] flex items-center justify-center p-4 font-sans">
        <ScoreScreen
          score={calculateScore()}
          total={questions.length}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f2342] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        {/* 1. Sidebar Navigation Component */}
        <QuizSidebar
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          onJumpToQuestion={setCurrentQuestionIndex}
        />

        {/* 2. Main Content Component */}
        <QuizContent
          currentQ={currentQ}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          selectedAnswer={answers[currentQuestionIndex]}
          isSubmitting={isSubmitting}
          onOptionSelect={handleOptionSelect}
          onNextOrSubmit={handleNextOrSubmit}
          onPrev={handlePrev}
        />
      </div>
    </div>
  );
};

export default QuizPage;
