import React, { useState } from "react";
import {
  X,
  Search,
  Clock,
  Zap,
  Target,
  Flame,
  AlertCircle,
} from "lucide-react";

interface QuizFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DIFFICULTIES = [
  { id: "easy", label: "Easy", color: "text-green-400", bg: "bg-green-400/10" },
  {
    id: "medium",
    label: "Medium",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    id: "hard",
    label: "Hard",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
  {
    id: "god",
    label: "God Level",
    color: "text-purple-400",
    bg: "bg-purple-400/20",
    special: true,
  },
];

const SUGGESTED_TOPICS = [
  "Vector Algebra",
  "Statistics and Probability",
  "Trigonometry",
  "Thermodynamics",
  "Kinetic Theory of Gases",
  "Oscillations and Waves",
];

const QuizFormModal: React.FC<QuizFormModalProps> = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState("medium");
  const [timerEnabled, setTimerEnabled] = useState(true);

  // Error handling states
  const [topicError, setTopicError] = useState("");
  const [numError, setNumError] = useState("");

  if (!isOpen) return null;

  // Individual Validation functions
  const validateTopic = (val: string) => {
    if (!val.trim()) setTopicError("Please select or enter a topic");
    else setTopicError("");
  };

  const validateNum = (val: number) => {
    if (isNaN(val) || val < 5) setNumError("Minimum 5 questions required");
    else if (val > 50) setNumError("Maximum 50 questions allowed");
    else setNumError("");
  };

  const handleStart = () => {
    // Final check before submission
    const isTopicValid = topic.trim().length > 0;
    const isNumValid = numQuestions >= 5 && numQuestions <= 50;

    if (!isTopicValid) setTopicError("Topic is required to start");
    if (!isNumValid) setNumError("Check question count (5-50)");

    if (isTopicValid && isNumValid) {
      console.log({ topic, numQuestions, difficulty, timerEnabled });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[#121212] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-amber-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
              <Target size={24} />
            </div>
            <h2 className="text-xl font-bold text-white">
              Configure Your Quiz
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full text-gray-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Topic Selection */}
          <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <label className="text-sm font-semibold text-gray-400">
                Target Topic
              </label>
              <span className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
                Required
              </span>
            </div>
            <div className="relative group">
              <Search
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  topicError
                    ? "text-red-500"
                    : "text-gray-500 group-focus-within:text-amber-500"
                }`}
                size={19}
              />
              <input
                list="topics"
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  if (topicError) validateTopic(e.target.value);
                }}
                onBlur={(e) => validateTopic(e.target.value)}
                placeholder="What do you want to master today?"
                className={`w-full bg-white/[0.03] border rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none transition-all text-base ${
                  topicError
                    ? "border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                    : "border-white/10 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50"
                }`}
              />
              <datalist id="topics">
                {SUGGESTED_TOPICS.map((t) => (
                  <option key={t} value={t} />
                ))}
              </datalist>
            </div>
            {topicError && (
              <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1 ml-1 animate-in slide-in-from-top-1">
                <AlertCircle size={14} /> {topicError}
              </p>
            )}

            {/* Quick Select Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {SUGGESTED_TOPICS.slice(0, 5).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTopic(t);
                    setTopicError("");
                  }}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all ${
                    topic === t
                      ? "bg-amber-500/20 border-amber-500/50 text-amber-500"
                      : "bg-white/5 border-white/5 text-gray-500 hover:border-white/20 hover:text-gray-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Number of Questions */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">
                Questions
              </label>
              <input
                type="number"
                // Displays empty string when 0 to avoid "05" issues
                value={numQuestions === 0 ? "" : numQuestions}
                onChange={(e) => {
                  const val = e.target.value;

                  if (val === "") {
                    setNumQuestions(0);
                    setNumError(""); // Clear error while field is empty
                    return;
                  }

                  let numVal = parseInt(val, 10);

                  // ENFORCE MAX: If user types 60, it snaps to 50
                  if (numVal > 15) numVal = 15;

                  setNumQuestions(numVal);

                  // Real-time error clearing if they reach valid range
                  if (numVal >= 5 && numVal <= 50) setNumError("");
                }}
                onBlur={() => {
                  // ENFORCE MIN: When they click away, if it's < 5, snap to 5
                  if (numQuestions !== 0 && numQuestions < 5) {
                    setNumQuestions(5);
                    setNumError(""); // Clear error since we fixed it
                  } else if (numQuestions === 0) {
                    // If they left it totally empty, default to 10
                    setNumQuestions(10);
                    setNumError("");
                  }
                }}
                className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-white focus:outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                  numError
                    ? "border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                    : "border-white/10 focus:ring-2 focus:ring-amber-500/40"
                }`}
              />
              {numError && (
                <p className="flex items-center gap-1.5 text-red-400 text-[11px] mt-1">
                  <AlertCircle size={13} /> {numError}
                </p>
              )}
            </div>

            {/* Timer Toggle */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Timer</label>
              <button
                onClick={() => setTimerEnabled(!timerEnabled)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                  timerEnabled
                    ? "bg-amber-500/10 border-amber-500 text-amber-500"
                    : "bg-white/5 border-white/10 text-gray-500"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span className="font-semibold text-sm">
                    {timerEnabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    timerEnabled
                      ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                      : "bg-gray-600"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Difficulty Selector */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-400">
              Difficulty Level
            </label>
            <div className="grid grid-cols-2 gap-3">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDifficulty(d.id)}
                  className={`relative flex items-center gap-3 p-3 rounded-xl border transition-all overflow-hidden ${
                    difficulty === d.id
                      ? `${d.bg} border-white/20 ring-2 ring-amber-500/20`
                      : "bg-white/5 border-white/5 opacity-60 hover:opacity-100"
                  }`}
                >
                  {d.special && difficulty === d.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-amber-500/10 to-purple-500/10 animate-pulse" />
                  )}
                  <span className={`${d.color}`}>
                    {d.special ? <Flame size={18} /> : <Zap size={18} />}
                  </span>
                  <span
                    className={`font-bold text-sm ${
                      difficulty === d.id ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {d.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStart}
            className="w-full group relative py-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl text-white font-bold text-lg shadow-xl shadow-amber-600/20 hover:shadow-amber-600/40 active:scale-[0.98] transition-all"
          >
            <div className="flex items-center justify-center gap-2">
              <span>Start Quiz</span>
              <Zap size={20} className="group-hover:animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizFormModal;
