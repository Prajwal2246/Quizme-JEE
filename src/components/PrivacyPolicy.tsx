import React from "react";
import { Brain, Shield, FileText, Scale } from "lucide-react";

export const PrivacyPolicy = () => {
  const policies = [
    {
      title: "Privacy Policy",
      icon: Shield,
      sections: [
        {
          content:
            "Your privacy is important to us. It is QuizMeBro's policy to respect your privacy regarding any information we may collect from you across our website.",
        },
        {
          content:
            "We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used.",
        },
        {
          content:
            "We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.",
        },
        {
          content:
            "We don't share any personally identifying information publicly or with third-parties, except when required to by law.",
        },
        {
          content:
            "Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.",
        },
        {
          content:
            "You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.",
        },
        {
          content:
            "Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
      <header className="bg-slate-950/80 backdrop-blur border-b border-slate-800 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Brain className="w-7 h-7 text-orange-500" />
            <h1 className="text-xl font-bold text-white">UPSC Conqueror</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm font-semibold">
              Back to Home
            </button>
            <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              T
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">Our Policies</h2>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {policies.map((policy, index) => {
            const IconComponent = policy.icon;
            return (
              <div
                key={index}
                className="bg-slate-900/60 backdrop-blur border border-slate-700/50 rounded-xl p-8 hover:border-slate-600 transition-all"
              >
                <div className="flex items-center gap-3 mb-6">
                  <IconComponent className="w-6 h-6 text-orange-500" />
                  <h3 className="text-2xl font-bold text-white">
                    {policy.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {policy.sections.map((section, sectionIndex) => (
                    <div
                      key={sectionIndex}
                      className="text-slate-300 text-sm leading-relaxed"
                    >
                      <p className="text-slate-400">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-500 text-sm">
            ©️ 2026 . All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
