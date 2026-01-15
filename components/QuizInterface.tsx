import React, { useState, useEffect, useCallback } from 'react';
import { Clock, X, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SubjectData, QuizResult } from '../types';

interface QuizInterfaceProps {
  subject: SubjectData;
  onComplete: (result: QuizResult) => void;
  onExit: () => void;
}

export const QuizInterface: React.FC<QuizInterfaceProps> = ({ subject, onComplete, onExit }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const currentQuestion = subject.questions[currentQuestionIdx];
  const progress = ((currentQuestionIdx + 1) / subject.questions.length) * 100;

  const handleFinish = useCallback(() => {
    let finalScore = score;
    if (selectedAnswer === currentQuestion.correct) {
      finalScore += 1;
    }
    
    onComplete({
      score: finalScore,
      totalQuestions: subject.questions.length,
      subjectId: subject.id,
    });
  }, [score, selectedAnswer, currentQuestion.correct, subject.questions.length, subject.id, onComplete]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, handleFinish]);

  const handleNext = () => {
    if (selectedAnswer === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIdx < subject.questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      // Logic handled in button
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] pb-12">
      {/* Header */}
      <div className="bg-[#0B0F19]/90 backdrop-blur shadow-sm border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl" role="img" aria-label={subject.name}>{subject.icon}</span>
              <div>
                <h2 className="font-bold text-white leading-tight">{subject.name}</h2>
                <p className="text-xs text-slate-400 font-medium hidden sm:block">JEE Advanced Practice Set</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono font-bold transition-colors ${
                timeLeft < 30 ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
              }`}>
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
              <button 
                onClick={() => setShowExitConfirm(true)} 
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                aria-label="Exit Quiz"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r ${subject.gradient}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs font-semibold text-slate-500">
            <span>Question {currentQuestionIdx + 1}</span>
            <span>{subject.questions.length} Total</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 mt-8">
        <div className="bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden">
          <div className="p-8 md:p-10">
            <span className="inline-block px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold tracking-wider mb-6 border border-slate-700">
              QUESTION {currentQuestionIdx + 1}
            </span>
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
                    className={`w-full group relative p-5 rounded-2xl text-left border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/10 shadow-md'
                        : 'border-slate-800 bg-slate-900 hover:border-indigo-500/50 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-600 text-white'
                          : 'border-slate-600 text-slate-500 group-hover:border-indigo-400 group-hover:text-indigo-400'
                      }`}>
                        {isSelected ? <CheckCircle2 className="w-5 h-5" /> : <span className="font-bold text-sm">{String.fromCharCode(65 + index)}</span>}
                      </div>
                      <span className={`text-lg ${isSelected ? 'font-semibold text-indigo-300' : 'text-slate-300'}`}>
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-[#0B0F19] p-6 md:p-8 border-t border-slate-800 flex justify-end">
             {currentQuestionIdx < subject.questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                    selectedAnswer !== null
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Next Question <ArrowRight className="w-5 h-5" />
                </button>
             ) : (
               <button
                  onClick={handleFinish}
                  disabled={selectedAnswer === null}
                  className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                    selectedAnswer !== null
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Finish Quiz <CheckCircle2 className="w-5 h-5" />
                </button>
             )}
          </div>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2 text-white">Quit Quiz?</h3>
            <p className="text-slate-400 text-center mb-6">Your progress will be lost and this session won't be saved.</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={onExit}
                className="px-4 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
              >
                Quit Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};