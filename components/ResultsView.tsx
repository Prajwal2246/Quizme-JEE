import React from 'react';
import { RefreshCw, Home, Share2, Award } from 'lucide-react';
import { QuizResult, SubjectData } from '../types';

interface ResultsViewProps {
  result: QuizResult;
  subject: SubjectData;
  onRetry: () => void;
  onHome: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ result, subject, onRetry, onHome }) => {
  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  
  let gradeColor = 'text-red-400';
  let gradeText = 'Needs Improvement';
  let gradeBg = 'bg-red-500/10';
  
  if (percentage >= 90) {
    gradeColor = 'text-green-400';
    gradeText = 'Outstanding!';
    gradeBg = 'bg-green-500/10';
  } else if (percentage >= 75) {
    gradeColor = 'text-indigo-400';
    gradeText = 'Great Job!';
    gradeBg = 'bg-indigo-500/10';
  } else if (percentage >= 50) {
    gradeColor = 'text-yellow-400';
    gradeText = 'Good Effort';
    gradeBg = 'bg-yellow-500/10';
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl max-w-lg w-full overflow-hidden">
        <div className={`p-8 text-center ${gradeBg} border-b border-slate-800`}>
          <div className="w-20 h-20 bg-slate-800 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg border border-slate-700 text-4xl">
            {percentage >= 75 ? '🏆' : percentage >= 50 ? '🌟' : '📚'}
          </div>
          <h2 className={`text-3xl font-bold mb-2 ${gradeColor}`}>{gradeText}</h2>
          <p className="text-slate-400 font-medium">You completed the {subject.name} quiz</p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-800 rounded-2xl p-4 text-center border border-slate-700">
              <div className="text-sm text-slate-400 font-medium uppercase tracking-wide mb-1">Score</div>
              <div className="text-3xl font-bold text-white">{result.score}/{result.totalQuestions}</div>
            </div>
            <div className="bg-slate-800 rounded-2xl p-4 text-center border border-slate-700">
              <div className="text-sm text-slate-400 font-medium uppercase tracking-wide mb-1">Accuracy</div>
              <div className="text-3xl font-bold text-white">{percentage}%</div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <span className="flex items-center gap-2 text-green-400 font-medium">
                <div className="w-2 h-2 rounded-full bg-green-400" /> Correct
              </span>
              <span className="font-bold text-green-400">{result.score}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <span className="flex items-center gap-2 text-red-400 font-medium">
                <div className="w-2 h-2 rounded-full bg-red-400" /> Incorrect
              </span>
              <span className="font-bold text-red-400">{result.totalQuestions - result.score}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onHome}
              className="flex items-center justify-center gap-1 px-4 py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition"
            >
              <Home className="w-full inline" />
            </button>
            <button
              // onClick={onHome}
              className="flex items-center justify-center px-2 rounded-xl bg-slate-800 text-white text-sm hover:bg-slate-700 transition"
            >
              Login for more questions
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};