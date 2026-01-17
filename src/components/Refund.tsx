import React from 'react';
import { Brain, Shield, FileText, Scale } from 'lucide-react';

export const Refund = () => {
  const policies = [
    {
      title: 'Refund Policy',
      icon: Scale,
      sections: [
        {
          content: "Thank you for choosing to learn with QuizMeBro. We appreciate your business and are committed to providing a high-quality service."
        },
        {
          content: "Due to the nature of our digital services and the immediate access provided upon purchase, all sales are final. Refunds will not be provided except as required by applicable law or as specified in these policies. If a service is defective or not as described, we will work with you to resolve the issue."
        },
        {
          content: "You can cancel your subscription at any time from your account settings. Your cancellation will take effect at the end of your current billing cycle, and you will have access to your subscription benefits until that time. No refunds will be provided for partial billing periods or unused subscription time."
        },
        {
          content: "If you have any questions or concerns about your subscription, please contact our support team."
        }
      ]
    }
  ];

  return (
    <div className="pt-12 min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
     

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">Refund Policy</h2>
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
                      <p className="text-slate-400">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <div className="bg-slate-900/60 backdrop-blur border border-slate-700/50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-3">Questions?</h3>
            <p className="text-slate-400 mb-6">
              If you have any questions about our policies, please don't hesitate to contact us.
            </p>
            <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-500 text-sm">
            ©️ 2026 UPSC Conqueuror. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};