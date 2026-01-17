import React from "react";
import { Target, TrendingUp, Zap } from "lucide-react";

export const Features: React.FC = () => {
  return (
    <section className="py-24 bg-[#0B0B0F] relative overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-bold text-amber-400 tracking-widest uppercase mb-3">
            Why Choose Us
          </h2>

          <p className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Everything you need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-purple-400">
              crack JEE
            </span>
          </p>

          <p className="text-lg text-gray-400 leading-relaxed">
            A focused, distraction-free platform built for serious aspirants —
            precision practice, deep insights, real results.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Target className="w-6 h-6" />,
              title: "Targeted Practice",
              desc: "Smart question selection adapts to your performance and attacks weak areas first.",
              color: "text-amber-400",
              bg: "bg-amber-500/10",
              border: "hover:border-amber-500/30",
              glow: "hover:shadow-amber-500/10",
            },
            {
              icon: <TrendingUp className="w-6 h-6" />,
              title: "Deep Analytics",
              desc: "Track accuracy, speed, strengths, and growth with clean, meaningful insights.",
              color: "text-purple-400",
              bg: "bg-purple-500/10",
              border: "hover:border-purple-500/30",
              glow: "hover:shadow-purple-500/10",
            },
            {
              icon: <Zap className="w-6 h-6" />,
              title: "Instant Solutions",
              desc: "Clear step-by-step solutions so you understand concepts, not just answers.",
              color: "text-orange-400",
              bg: "bg-orange-500/10",
              border: "hover:border-orange-500/30",
              glow: "hover:shadow-orange-500/10",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className={`group bg-[#121212] rounded-2xl p-8 border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${feature.border} ${feature.glow}`}
            >
              <div
                className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 ${feature.color} transition-transform group-hover:scale-110`}
              >
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
