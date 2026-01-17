import React, { useState } from "react";
import { ArrowRight, PlayCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import QuizFormModal from "./QuizFormModal";

export const Hero: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-200 text-sm font-medium mb-8 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400"></span>
        </span>
        Updated for JEE Advanced 2026
      </div>

      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 max-w-5xl mx-auto leading-tight">
        Master Your <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
          Engineering Dreams
        </span>
      </h1>

      <p className="text-xl md:text-2xl text-indigo-100/70 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
        The most advanced adaptive testing platform. Analyze your performance,
        identify weak spots, and improve your rank with AI-driven insights.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 px-4">
        <button
          className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-900 rounded-full font-bold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 text-lg"
          onClick={() => setOpen(true)}
        >
          Generate Quiz Now <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto border-t border-white/5 pt-12 px-4">
        {[
          { label: "Topic Wise Quizes", value: "50+" },
          { label: "Practice Questions", value: "1000+" },
          { label: "Subject Wise Quizes", value: "30+" },
          { label: "Avg. Improvement", value: "35%" },
        ].map((stat, i) => (
          <div key={i} className="text-center group cursor-default">
            <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
              {stat.value}
            </div>
            <div className="text-sm md:text-base text-indigo-200/50 font-medium group-hover:text-indigo-200/80 transition-colors">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      {open && <QuizFormModal
       isOpen={open}
       onClose={() => setOpen(false)} />}
    </div>
  );
};
