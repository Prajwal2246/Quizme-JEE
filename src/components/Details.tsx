import React from "react";
import {
  RotateCcw,
  Eye,
  TrendingUp,
  Code,
  Target,
  Lightbulb,
} from "lucide-react";

export const Details = () => {
  const features = [
    {
      title: "Return Anytime",
      description:
        "Revisit past quizzes to see your previous answers and review feedback.",
      icon: RotateCcw,
    },
    {
      title: "Review Your Choices",
      description:
        "Understand the logic behind both your correct and incorrect answers.",
      icon: Eye,
    },
    {
      title: "Track Your Growth",
      description:
        "Watch how your thinking evolves over time and across different topics.",
      icon: TrendingUp,
    },
  ];

  const insights = [
    {
      title: "Real Feedback",
      description:
        "Not generic tips. Real insights generated from your specific quiz responses.",
      icon: Code,
    },
    {
      title: "Thoughtful Guidance",
      description:
        "Our AI coach helps you understand concepts, not just memorize answers.",
      icon: Target,
    },
    {
      title: "Curious Moments",
      description:
        "Small, fun facts tied to concepts keep curiosity alive, not pressure.",
      icon: Lightbulb,
    },
  ];

  return (
    <section className="mt-12 max-w-7xl mx-auto px-6 py-20">
      {/* Hero */}
      <div className="text-center mb-20">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase mb-6">
          Learn Better
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
          Your Learning Trail
        </h2>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Your results are not a scorecard. They are a gentle record of your
          journey.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-28">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-slate-900/40 backdrop-blur border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600 hover:shadow-xl hover:shadow-indigo-900/20 transition-all group"
            >
              <Icon className="w-8 h-8 text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />

              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Insights */}
      <div>
        <h3 className="text-3xl font-bold text-white text-center mb-16">
          Personalised Insights
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-slate-900/60 backdrop-blur border border-slate-700/50 rounded-full flex items-center justify-center hover:border-indigo-400 transition-all">
                    <Icon className="w-10 h-10 text-indigo-300" />
                  </div>
                </div>

                <h4 className="text-xl font-bold text-white mb-3">
                  {insight.title}
                </h4>

                <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
                  {insight.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
