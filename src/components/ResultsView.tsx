import React, { useState } from "react";
import { 
  Home, 
  Trophy, 
  ChevronDown, 
  CircleX, 
  CircleCheck, 
  Repeat, 
  Lightbulb,
  MessageCircle
} from "lucide-react";
import { QuizResult, SubjectData } from "../../types";

interface ResultsViewProps {
  result: QuizResult;
  subject: SubjectData;
  onRetry: () => void;
  onHome: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  subject,
  onRetry,
  onHome,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const percentage = Math.round((result.score / result.totalQuestions) * 100);

  const getMotivation = () => {
    if (percentage === 100) return "Perfect score! You've mastered these concepts. Keep up this incredible momentum!";
    if (percentage >= 70) return "Great job! You have a solid grasp of the material, just a few small gaps to plug.";
    return "Don't worry, everyone starts somewhere. Understanding these fundamental blocks is the first step toward mastery.";
  };

  return (
    <main className="min-h-screen mt-12 bg-[#0B0F19] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="container mx-auto max-w-3xl py-12 px-4">
        <div className="space-y-8">
          
          {/* Hero Score Card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 text-center shadow-2xl backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex justify-center items-center gap-6">
                <div className="p-4 bg-yellow-500/10 rounded-2xl">
                  <Trophy className="h-12 w-12 text-yellow-400" />
                </div>
                <div className="text-left">
                  <div className="text-5xl font-black text-white tracking-tight">
                    {percentage}%
                  </div>
                  <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
                    Score: {result.score} / {result.totalQuestions}
                  </div>
                </div>
              </div>
              <p className="text-lg italic text-slate-400 max-w-xl mx-auto leading-relaxed border-t border-slate-800 pt-6 mt-4">
                "{getMotivation()}"
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white text-center">Detailed Analysis</h2>

          {/* Detailed Analysis Accordion */}
          <div className="w-full space-y-4">
            {subject.questions.map((q, idx) => {
              const userAnswerIndex = result.userAnswers ? result.userAnswers[idx] : null;
              const isCorrect = userAnswerIndex === q.correct;

              return (
                <div key={idx} className={`rounded-2xl border transition-all ${isCorrect ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'} overflow-hidden`}>
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="flex w-full items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {isCorrect ? (
                        <CircleCheck className="h-6 w-6 text-green-500 flex-shrink-0" />
                      ) : (
                        <CircleX className="h-6 w-6 text-red-500 flex-shrink-0" />
                      )}
                      <span className="font-medium text-slate-200 leading-snug">{q.q}</span>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
                  </button>

                  {openIndex === idx && (
                    <div className="px-6 pb-6 space-y-6 animate-in slide-in-from-top-2 duration-300">
                      
                      {/* Answers Comparison */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Your Answer</p>
                          <div className={`p-3 rounded-xl border ${isCorrect ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                            {userAnswerIndex !== null ? q.options[userAnswerIndex] : "Skipped"}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Correct Answer</p>
                          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            {q.options[q.correct]}
                          </div>
                        </div>
                      </div>

                      {/* Feedback Section */}
                      <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-700/50">
                        <div className="flex gap-3">
                          <MessageCircle className={`w-5 h-5 shrink-0 ${isCorrect ? 'text-green-400' : 'text-amber-400'}`} />
                          <div>
                            <p className="text-xs font-bold text-slate-300 uppercase mb-1">Feedback</p>
                            <p className="text-sm text-slate-400 leading-relaxed">
                              {isCorrect 
                                ? "Excellent! You understood the logic here perfectly. This concept is vital for advanced problem-solving." 
                                : `Not quite. You selected ${userAnswerIndex !== null ? q.options[userAnswerIndex] : "nothing"}, but the correct logic leads to ${q.options[q.correct]}. Reviewing this specific topic will help you avoid similar traps.`}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Interesting Fact Section */}
                      <div className="bg-indigo-500/10 rounded-2xl p-4 border border-indigo-500/20">
                        <div className="flex gap-3">
                          <Lightbulb className="w-5 h-5 text-indigo-400 shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-indigo-300 uppercase mb-1">Did you know?</p>
                            <p className="text-sm text-indigo-200/80 leading-relaxed italic">
                              {/* If you add 'fact' to your question object in SUBJECTS, use q.fact here */}
                              This concept was first popularized to optimize real-world systems like logistics and electronic circuits before becoming a staple in competitive exams!
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onRetry}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white hover:bg-indigo-500 transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
            >
              <Repeat className="w-5 h-5" />
              Take Another Quiz
            </button>
            <button
              onClick={onHome}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-8 py-4 text-sm font-bold text-white hover:bg-slate-700 transition-all active:scale-95"
            >
              <Home className="w-5 h-5" />
              Return Home
            </button>
          </div>
          
        </div>
      </div>
    </main>
  );
};