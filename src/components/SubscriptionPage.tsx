import React, { useState } from "react";
import { Brain, Sparkles, Check } from "lucide-react";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  description: string;
  price: string;
  period: string;
  features: PlanFeature[];
  badge?: string;
}

const SubscriptionPage = () => {
  const [dailyCoupon, setDailyCoupon] = useState("");
  const [monthlyCoupon, setMonthlyCoupon] = useState("");
  const [yearlyCoupon, setYearlyCoupon] = useState("");

  const plans: Plan[] = [
    {
      name: "Daily Pro",
      description:
        "You've got an exam tomorrow. You just want to revise, test yourself, and calm the nerves.",
      price: "₹19",
      period: "/day",
      features: [
        { text: "Up to 3 quizzes for the day", included: true },
        { text: "AI-powered quiz generation", included: true },
        { text: "Detailed feedback on every answer", included: true },
        { text: "Instant results and explanations", included: true },
        { text: "Adaptive quizzes tailored to your level", included: true },
      ],
    },
    {
      name: "Monthly Pro",
      description:
        "You've started learning a new subject this month and want to stay consistent without overwhelming.",
      price: "₹99",
      period: "/month",
      features: [
        { text: "Up to 5 quizzes per day", included: true },
        { text: "+5 bonus quiz generations per month", included: true },
        { text: "AI-powered quiz generation", included: true },
        { text: "Detailed feedback on every answer", included: true },
        { text: "Full quiz history & past results", included: true },
      ],
    },
    {
      name: "Yearly Pro",
      description:
        "You're serious about self-study and want to assess yourself regularly, without limits or gaps.",
      price: "₹499",
      period: "/year",
      badge: "Best Value",
      features: [
        { text: "Up to 7 quizzes per day", included: true },
        { text: "+7 bonus quiz generations every month", included: true },
        { text: "AI-powered quiz generation", included: true },
        { text: "Detailed feedback on every answer", included: true },
        { text: "Full quiz history & past results", included: true },
      ],
    },
  ];

  const handleSubscribe = (planName: string, coupon: string) => {
    console.log(`Subscribing to ${planName} with coupon: ${coupon}`);
    alert(
      `Subscribing to ${planName}${coupon ? ` with coupon: ${coupon}` : ""}`
    );
  };

  const handleApplyCoupon = (planIndex: number) => {
    const coupon =
      planIndex === 0
        ? dailyCoupon
        : planIndex === 1
        ? monthlyCoupon
        : yearlyCoupon;
    console.log(`Applying coupon for plan ${planIndex}: ${coupon}`);
    alert(`Coupon applied: ${coupon}`);
  };

  return (
    <div className=" h-screen p-12 overflow-auto scrollbar-hide scroll bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
     

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Banner */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg px-4 py-2 mb-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-slate-200 text-sm">
              Today's Quizzes Remaining: 1
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">
            Upgrade Your Plan
          </h2>
          <p className="text-slate-300">
            Unlock premium features and accelerate your learning.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className="bg-slate-900/60 backdrop-blur border border-slate-700/50 rounded-xl p-6 hover:border-slate-600 hover:shadow-xl hover:shadow-blue-900/20 transition-all relative"
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-slate-400 text-sm mb-6 h-16">
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-slate-400 text-lg">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-slate-300 text-sm"
                  >
                    <Check className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-slate-700/50 pt-6 mt-6">
                <p className="text-slate-400 text-sm mb-3">
                  Have a coupon code?
                </p>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={
                      index === 0
                        ? dailyCoupon
                        : index === 1
                        ? monthlyCoupon
                        : yearlyCoupon
                    }
                    onChange={(e) => {
                      if (index === 0) setDailyCoupon(e.target.value);
                      else if (index === 1) setMonthlyCoupon(e.target.value);
                      else setYearlyCoupon(e.target.value);
                    }}
                    className="flex-1 px-3 py-2 bg-slate-950/60 border border-slate-700 rounded text-white text-sm placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                  <button
                    onClick={() => handleApplyCoupon(index)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-sm transition-colors"
                  >
                    Apply
                  </button>
                </div>

                <button
                  onClick={() =>
                    handleSubscribe(
                      plan.name,
                      index === 0
                        ? dailyCoupon
                        : index === 1
                        ? monthlyCoupon
                        : yearlyCoupon
                    )
                  }
                  className="w-full py-3 mt-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-orange-500/30"
                >
                  Subscribe with UPI
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SubscriptionPage;
