import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import { Navbar } from "./src/components/Navbar";
import { Hero } from "./src/components/Hero";
import { Features } from "./src/components/Features";
import { SubjectCard } from "./src/components/SubjectCard";
import { QuizInterface } from "./src/components/QuizInterface";
import { ResultsView } from "./src/components/ResultsView";
import { Footer } from "./src/components/Footer";

import { SUBJECTS } from "./constants";
import { SubjectData, QuizResult } from "./types";

import { ArrowRight, Star } from "lucide-react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "./src/firebase"; // Added db import
import MainLayout from "./src/layouts/MainLayout";
import SubscriptionPage from "./src/components/SubscriptionPage";
import { PrivacyPolicy } from "./src/components/PrivacyPolicy";
import { TermsConditions } from "./src/components/TermsConditions";
import { Refund } from "./src/components/Refund";
import ScrollToTop from "./src/scroll/ScrollToTop";
import { Details } from "./src/components/Details";
import QuizFormModal from "./src/components/QuizFormModal";
import { HistoryList } from "./src/components/HistoryList";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

/* -------------------- APP -------------------- */

const App = () => {
  const navigate = useNavigate();

  const [selectedSubject, setSelectedSubject] = useState<SubjectData | null>(
    null
  );
  const [lastResult, setLastResult] = useState<QuizResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* Auth */
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /* -------------------- HANDLERS -------------------- */
  const handleStartCustomQuiz = async (config: any) => {
    setIsModalOpen(false);
    setIsGenerating(true);

    try {
      const response = await fetch("http://localhost:5001/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "AI Generation Failed");
      }

      const data = await response.json();

      if (!data.questions || data.questions.length === 0) {
        throw new Error("AI returned no questions.");
      }

      setSelectedSubject({
        id: `ai-${Date.now()}`,
        name: config.topic,
        icon: "✨",
        gradient: "from-purple-600 to-indigo-600",
        questions: data.questions,
      });

      navigate(`/quiz/ai-generated`);
    } catch (error: any) {
      console.error("Quiz Start Error:", error);
      alert(`Oops! ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartQuiz = (subject: SubjectData) => {
    setSelectedSubject(subject);
    navigate(`/quiz/${subject.id}`, { state: { subject } });
    window.scrollTo(0, 0);
  };

  const handleQuizComplete = async (result: QuizResult) => {
    setLastResult(result);

    if (user) {
      try {
        // 🟢 DIRECT FIREBASE SAVE (Replacing the fetch call)
        await addDoc(collection(db, "quiz_history"), {
          userId: user.uid,
          topic: selectedSubject?.name || "AI Generated Quiz",
          score: result.score,
          totalQuestions: result.totalQuestions,
          difficulty: "Advanced",
          date: serverTimestamp(), // Uses Firebase server time
          // Optional: for later review
        });
        console.log("✅ History saved to Firestore");
      } catch (err) {
        console.error("❌ Firestore Save Error:", err);
      }
    }

    navigate("/results", { state: { result, subject: selectedSubject } });
  };

  const handleReturnHome = () => {
    setSelectedSubject(null);
    setLastResult(null);
    navigate("/");
    window.scrollTo(0, 0);
  };

  const handleRetry = () => {
    if (selectedSubject) {
      navigate(`/quiz/${selectedSubject.id}`);
    }
  };

  /* -------------------- UI -------------------- */

  return (
    <div className="min-h-screen bg-[#0B0F19] font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar
        onLogoClick={handleReturnHome}
        user={user}
        onClick={() => navigate("/")}
        onNewQuizClick={() => {
          console.log("Modal state before:", isModalOpen);
          setIsModalOpen(true);
          console.log("Modal state after: true");
        }}
      />
      <ScrollToTop />
      <Routes>
        {/* ---------------- HOME ---------------- */}
        <Route
          path="/"
          element={
            <>
              {/* Hero */}
              <div className="relative bg-[#0f1115] overflow-hidden">
                <div className="absolute inset-0">
                  <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]" />
                  <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]" />
                  <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[40%] h-[40%] rounded-full bg-pink-600/10 blur-[100px]" />
                </div>

                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                <div className="relative z-10 pb-20">
                  <Hero />
                </div>

                <div className="absolute bottom-0 w-full h-24 bg-[#0B0F19] rounded-t-[3rem] z-20" />
              </div>

              <main className="relative z-20 bg-[#0B0F19]">
                <Features />

                {/* Subjects */}
                <div className="py-24">
                  <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase mb-6">
                        <Star className="w-3 h-3 fill-indigo-400" />
                        Start Learning
                      </span>
                      <h3 className="text-4xl font-bold text-white mb-6">
                        Select Your Subject
                      </h3>
                      <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Begin your journey with topic-wise quizzes.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {Object.values(SUBJECTS).map((subject) => (
                        <div key={subject.id} className="h-[450px]">
                          <SubjectCard
                            subject={subject}
                            onSelect={handleStartQuiz}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="max-w-7xl mx-auto px-4 py-20">
                  <div className="bg-gradient-to-br from-indigo-900 to-[#1a1b4b] rounded-[2.5rem] p-12 text-center">
                    <h4 className="text-4xl font-bold text-white mb-6">
                      Ready to crack JEE 2026?
                    </h4>
                    <p className="text-indigo-200 mb-8">
                      Premium quizzes, mock tests, and analysis.
                    </p>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="bg-white text-indigo-900 px-8 py-4 rounded-xl font-bold flex items-center gap-2 mx-auto"
                    >
                      Start Full Mock Quiz <ArrowRight />
                    </button>
                  </div>
                </div>
              </main>
            </>
          }
        />
        {/* ---------------- QUIZ ---------------- */}
        <Route
          path="/quiz/:id"
          element={
            selectedSubject && (
              <QuizInterface
                subject={selectedSubject}
                onComplete={handleQuizComplete}
                onExit={handleReturnHome}
              />
            )
          }
        />
        {/* ---------------- RESULTS ---------------- */}
        <Route
          path="/results"
          element={
            lastResult &&
            selectedSubject && (
              <ResultsView
                result={lastResult}
                subject={selectedSubject}
                onHome={handleReturnHome}
                onRetry={handleRetry}
              />
            )
          }
        />

        {/* ---------------- PROTECTED ROUTES ---------------- */}
        <Route element={<MainLayout user={user} />}>
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/history" element={<HistoryList user={user} />} />
        </Route>

        {/* ---------------- STATICS ---------------- */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/refund-policy" element={<Refund />} />
        <Route path="/features" element={<Details />} />
      </Routes>
      <Footer />

      <QuizFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStart={handleStartCustomQuiz}
      />

      {isGenerating && (
        <div className="fixed inset-0 z-[100] bg-[#0B0F19]/90 backdrop-blur-md flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
              <Star className="w-8 h-8 text-indigo-400 fill-indigo-400" />
            </div>
          </div>
          <h2 className="mt-6 text-xl font-bold text-white tracking-tight">
            Generating Custom Quiz
          </h2>
          <p className="mt-2 text-slate-400 text-sm animate-pulse">
            AI is analyzing your topic and preparing questions...
          </p>
        </div>
      )}
    </div>
  );
};

/* -------------------- ROOT -------------------- */

const root = createRoot(document.getElementById("root")!);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
