import React from "react";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { SubjectData } from "../../types";

interface SubjectCardProps {
  subject: SubjectData;
  onSelect: (subject: SubjectData) => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  onSelect,
}) => {
  return (
    <div
      className="group cursor-pointer h-full relative"
      onClick={() => onSelect(subject)}
    >
      <div className="absolute inset-0 bg-indigo-500/20 rounded-3xl transform rotate-1 translate-y-2 group-hover:rotate-2 group-hover:translate-y-3 transition-transform duration-300 ease-out blur-sm"></div>
      <div
        className={`h-full bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden transition-all duration-300 transform group-hover:-translate-y-1 group-hover:border-indigo-500/30 group-hover:shadow-2xl group-hover:shadow-indigo-500/10`}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${subject.gradient} flex items-center justify-center text-3xl shadow-lg shadow-black/30 transform group-hover:scale-110 transition-transform duration-300`}
          >
            {subject.icon}
          </div>
          <div className="flex items-center gap-1 text-slate-500 group-hover:text-indigo-400 transition-colors bg-slate-800 border border-slate-700 px-3 py-1 rounded-full">
            <span className="text-xs font-bold uppercase tracking-wider">
              Start
            </span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>

        <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
          {subject.name}
        </h4>
        <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">
          Master {subject.topics.join(", ")} and more with our comprehensive
          question bank.
        </p>

        {/* Topics Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {subject.topics.slice(0, 3).map((topic, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-slate-800 text-slate-400 text-xs font-semibold rounded-lg border border-slate-700 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 group-hover:text-indigo-300 transition-colors"
            >
              {topic}
            </span>
          ))}
          {subject.topics.length > 3 && (
            <span className="px-3 py-1.5 bg-slate-800 text-slate-500 text-xs font-semibold rounded-lg border border-slate-700">
              +{subject.topics.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-auto">
          <span className="text-sm font-semibold text-slate-500">
            {subject.questions.length} Questions
          </span>
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white transition-all duration-300">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
