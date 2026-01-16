import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Navbar } from "./src/components/Navbar";
import { Hero } from "./src/components/Hero";
import { Features } from "./src/components/Features";
import { SubjectCard } from "./src/components/SubjectCard";
import { QuizInterface } from "./src/components/QuizInterface";
import { ResultsView } from "./src/components/ResultsView";
import { Footer } from "./src/components/Footer";
import { SUBJECTS } from "./constants";
import { AppView, SubjectData, QuizResult } from "./types";
import { ArrowRight, Star } from "lucide-react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./src/firebase";
import { BrowserRouter, useNavigate } from "react-router-dom";

const App = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [selectedSubject, setSelectedSubject] = useState<SubjectData | null>(
    null
  );
  const [lastResult, setLastResult] = useState<QuizResult | null>(null);
  const navigate= useNavigate();

  /* login render dashboard */
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-white">
        Checking Login...
      </div>
    );
  }

  const handleStartQuiz = (subject: SubjectData) => {
    setSelectedSubject(subject);
    setCurrentView(AppView.QUIZ);
    window.scrollTo(0, 0);
    navigate(`/quiz/${subject.id}`, { state: { subject } });
  };

  const handleQuizComplete = (result: QuizResult) => {
    setLastResult(result);
    setCurrentView(AppView.RESULTS);
    window.scrollTo(0, 0);
  };

  const handleReturnHome = () => {
    setCurrentView(AppView.HOME);
    setSelectedSubject(null);
    setLastResult(null);
    window.scrollTo(0, 0);
  };

  const handleRetry = () => {
    if (selectedSubject) {
      setCurrentView(AppView.QUIZ);
    }
  };

  if (currentView === AppView.QUIZ && selectedSubject) {
    return (
      <QuizInterface
        subject={selectedSubject}
        onComplete={handleQuizComplete}
        onExit={handleReturnHome}
      />
    );
  }

  if (currentView === AppView.RESULTS && lastResult && selectedSubject) {
    return (
      <ResultsView
        result={lastResult}
        subject={selectedSubject}
        onHome={handleReturnHome}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar onLogoClick={handleReturnHome} user={user} onClick={
        navigate("/")
      } />

      {/* Hero Section */}
      <div className="relative bg-[#0f1115] overflow-hidden">
        {/* Modern Mesh Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]"></div>
          <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[40%] h-[40%] rounded-full bg-pink-600/10 blur-[100px]"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

        <div className="relative z-10 pb-20">
          <Hero />
        </div>

        {/* Curver Bottom Divider */}
        <div className="absolute bottom-0 w-full h-24 bg-[#0B0F19] rounded-t-[3rem] z-20"></div>
      </div>

      <main className="relative z-20 bg-[#0B0F19]">
        {/* Features Section */}
        <Features />

        {/* Subjects Section */}
        <div className="py-24 bg-[#0B0F19] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 shadow-sm text-indigo-300 text-xs font-bold tracking-wider uppercase mb-6">
                <Star className="w-3 h-3 fill-indigo-400 text-indigo-400" />{" "}
                Start Learning
              </span>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Select Your Subject
              </h3>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Begin your journey with topic-wise quizzes updated for the
                latest syllabus.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {Object.values(SUBJECTS).map((subject) => (
                <div key={subject.id} className="h-[450px]">
                  <SubjectCard subject={subject} onSelect={handleStartQuiz} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Proof / Testimonial Section */}
        <div className="py-24 bg-[#0B0F19] border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">
                  Analysed and Exam Focused
                </h3>
                <p className="text-lg text-slate-400 mb-8">
                  "Quizzes are written to highlight underlying principles,
                  derivations, and reasoning paths used to arrive at the correct
                  answer."
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                  <div className="text-4xl font-bold text-indigo-400 mb-2">
                    120+
                  </div>
                  <div className="text-sm font-semibold text-slate-500">
                    Full Length Mock Quizzes
                  </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                  <div className="text-4xl font-bold text-purple-400 mb-2">
                    24/7
                  </div>
                  <div className="text-sm font-semibold text-slate-500">
                    Quizzes
                  </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                  <div className="text-4xl font-bold text-pink-400 mb-2">1</div>
                  <div className="text-sm font-semibold text-slate-500">
                    Solution for all Subject
                  </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                  <div className="text-4xl font-bold text-blue-400 mb-2">
                    100%
                  </div>
                  <div className="text-sm font-semibold text-slate-500">
                    Syllabus Mapping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gradient-to-br from-indigo-900 to-[#1a1b4b] rounded-[2.5rem] p-10 md:p-20 relative overflow-hidden text-center md:text-left border border-white/10 shadow-2xl">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-2xl">
                <h4 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Ready to crack JEE 2026?
                </h4>
                <p className="text-indigo-200 text-lg mb-8">
                  Join the community of serious aspirants today. Get access to
                  premium questions and mock tests.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-white text-indigo-900 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition shadow-lg flex items-center justify-center gap-2">
                    Start Full Mock Quiz <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="px-8 py-4 rounded-xl font-bold text-white border border-white/20 hover:bg-white/10 transition flex items-center justify-center gap-2">
                    View Pricing
                  </button>
                </div>
              </div>

              {/* Decorative elements for CTA */}
              <div className="hidden md:block relative">
                <div className="w-64 h-64 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl rotate-12 opacity-80 backdrop-blur-3xl absolute top-0 right-0"></div>
                <div className="w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl -rotate-6 relative z-10 flex items-center justify-center shadow-2xl border border-white/10">
                  <span className="text-6xl">🚀</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
