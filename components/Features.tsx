import React from "react";
import { Target, TrendingUp, Zap, BookOpen, Users, Award } from "lucide-react";

export const Features: React.FC = () => {
  return (
    <section className="py-24 bg-[#0B0F19] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold text-indigo-400 tracking-widest uppercase mb-3">
            Why Choose Us
          </h2>
          <p className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Everything you need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              crack JEE
            </span>
          </p>
          <p className="text-lg text-slate-400 leading-relaxed">
            Our platform combines advanced analytics with high-quality content
            to deliver the best learning experience for serious aspirants.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Target className="w-6 h-6" />,
              title: "Targeted Practice",
              desc: "AI-driven question selection based on your previous performance to strengthen weak areas.",
              color: "text-indigo-400",
              bg: "bg-indigo-500/10",
              border: "group-hover:border-indigo-500/30",
            },
            {
              icon: <TrendingUp className="w-6 h-6" />,
              title: "Deep Analytics",
              desc: "Visualize your progress with detailed charts, speed analysis, and accuracy reports.",
              color: "text-purple-400",
              bg: "bg-purple-500/10",
              border: "group-hover:border-purple-500/30",
            },
            {
              icon: <Zap className="w-6 h-6" />,
              title: "Instant Solutions",
              desc: "Get step-by-step detailed solutions and concept explanations immediately after attempting questions.",
              color: "text-pink-400",
              bg: "bg-pink-500/10",
              border: "group-hover:border-pink-500/30",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className={`group bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 ${feature.border}`}
            >
              <div
                className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 ${feature.color} transition-transform group-hover:scale-110`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
