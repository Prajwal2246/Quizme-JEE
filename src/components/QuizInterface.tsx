import React, { useState, useEffect, useCallback } from "react";
import { Clock, X, AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { SubjectData, QuizResult } from "../../types";

interface QuizInterfaceProps {
  subject: SubjectData;
  onComplete: (result: QuizResult) => void;
  onExit: () => void;
}

export const QuizInterface: React.FC<QuizInterfaceProps> = ({
  subject,
  onComplete,
  onExit,
}) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30); 
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = subject.questions[currentQuestionIdx];
  const progress = ((currentQuestionIdx + 1) / subject.questions.length) * 100;

  /* -------------------- HANDLERS -------------------- */

  const handleFinish = useCallback((finalSelected: number | null) => {
    // 1. Enter submitting state to clear the question UI immediately
    setIsSubmitting(true);

    // 2. Calculate using local variables to avoid waiting for state updates
    const finalAnswers = [...userAnswers, finalSelected];
    
    const finalScore = finalAnswers.reduce((total, ans, idx) => {
      const correctIdx = subject.questions[idx]?.correct;
      return ans === correctIdx ? total + 1 : total;
    }, 0);

    // 3. Send data to parent
    onComplete({
      score: finalScore,
      totalQuestions: subject.questions.length,
      subjectId: subject.id,
      userAnswers: finalAnswers,
      timeSpent: 180 - timeLeft, 
    });
  }, [userAnswers, subject, timeLeft, onComplete]);

  const handleNext = useCallback(() => {
    // If we are at the last question, we finish instead of going "next"
    if (currentQuestionIdx >= subject.questions.length - 1) {
      handleFinish(selectedAnswer);
      return;
    }

    // Save current answer and move to next
    setUserAnswers((prev) => [...prev, selectedAnswer]);
    setCurrentQuestionIdx((prev) => prev + 1);
    setSelectedAnswer(null);
    setTimeLeft(30); // Reset timer for the next question
  }, [currentQuestionIdx, selectedAnswer, subject.questions.length, handleFinish]);

  /* -------------------- TIMER LOGIC -------------------- */
  
  useEffect(() => {
    if (isSubmitting) return;

    if (timeLeft <= 0) {
      handleNext();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleNext, isSubmitting]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  /* -------------------- RENDER LOGIC -------------------- */

  // If submitting, show a clean transition screen instead of the question
  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
        <h2 className="text-2xl font-bold animate-pulse">Analyzing Results...</h2>
        <p className="text-slate-400 mt-2 text-sm">Great job completing the quiz!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-14 bg-[#0B0F19] pb-12">
      {/* Header */}
      <div className="bg-[#0B0F19]/90 backdrop-blur shadow-sm border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl" role="img" aria-label={subject.name}>{subject.icon}</span>
              <div>
                <h2 className="font-bold text-white leading-tight">{subject.name}</h2>
                <p className="text-xs text-slate-400 font-medium">JEE Advanced Practice</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono font-bold border transition-colors ${
                timeLeft < 10 ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
              }`}>
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
              <button onClick={() => setShowExitConfirm(true)} className="p-2 text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r ${subject.gradient}`} 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <div className="flex justify-between mt-2 text-xs font-semibold text-slate-500">
            <span>Question {currentQuestionIdx + 1} of {subject.questions.length}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 mt-8">
        <div className="bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden">
          <div className="p-8 md:p-10">
            <h3 className="text-xl md:text-2xl font-bold text-white leading-relaxed mb-8">
              {currentQuestion.q}
            </h3>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(index)}
                    className={`w-full group p-5 rounded-2xl text-left border-2 transition-all duration-200 ${
                      isSelected ? "border-indigo-500 bg-indigo-500/10" : "border-slate-800 bg-slate-900 hover:border-indigo-500/50 hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected ? "border-indigo-500 bg-indigo-600 text-white" : "border-slate-600 text-slate-500"
                      }`}>
                        {isSelected ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-sm font-bold">{String.fromCharCode(65 + index)}</span>}
                      </div>
                      <span className={`text-lg ${isSelected ? "font-semibold text-indigo-300" : "text-slate-300"}`}>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-[#0B0F19] p-6 md:p-8 border-t border-slate-800 flex justify-end">
            <button
              onClick={handleNext}
              className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                currentQuestionIdx === subject.questions.length - 1 
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white" 
                : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              }`}
            >
              {currentQuestionIdx === subject.questions.length - 1 ? "Finish Quiz" : "Next Question"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Exit Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-white mb-2">Quit Quiz?</h3>
            <p className="text-slate-400 mb-6">Progress will not be saved.</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setShowExitConfirm(false)} className="px-4 py-3 rounded-xl bg-slate-800 text-white font-semibold">Cancel</button>
              <button onClick={onExit} className="px-4 py-3 rounded-xl bg-red-600 text-white font-semibold">Quit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};