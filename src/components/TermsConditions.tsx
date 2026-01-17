import React from 'react';
import { Brain, Shield, FileText, Scale } from 'lucide-react';

export const TermsConditions = () => {
  const policies = [
    {
      title: 'Terms and Conditions',
      icon: FileText,
      sections: [
        {
          subtitle: '1. Terms',
          content: "By accessing the website of QuizMeBro, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws."
        },
        {
          subtitle: '2. Use License',
          content: "Permission is granted to temporarily download one copy of the materials (information or software) on QuizMeBro's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title."
        },
        {
          subtitle: '3. Limitations',
          content: "In no event shall QuizMeBro or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on QuizMeBro's website."
        },
        {
          subtitle: '4. Revisions',
          content: "These terms and conditions are governed by and shall construed in accordance with the laws of the jurisdiction of the online service and you irrevocably submit to the exclusive jurisdiction of the courts in that location."
        }
      ]
    },
  ];

  return (
    <div className="pt-12 min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
      

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">Terms and Conditions</h2>
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
                  <h3 className="text-2xl font-bold text-white">{policy.title}</h3>
                </div>

                <div className="space-y-4">
                  {policy.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="text-slate-300 text-sm leading-relaxed">
                      {section.subtitle && (
                        <h4 className="font-semibold text-white mb-2">{section.subtitle}</h4>
                      )}
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
            ©️ 2026 UPSC Conqueror. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};