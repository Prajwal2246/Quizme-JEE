import React, { useState, useEffect, useRef } from "react";
import { Brain } from "lucide-react";
import { signInWithGoogle } from "../auth/signInWithGoogle";
import { User } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import QuizFormModal from "./QuizFormModal";
import SubscriptionPage from "./SubscriptionPage";

interface NavbarProps {
  onLogoClick: () => void;
  user: User | null;
}

export const Navbar: React.FC<NavbarProps> = ({ onLogoClick, user }) => {
  const [scrolled, setScrolled] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [subscriptionOpen, setSubscriptionOpen] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0B0F19]/90 backdrop-blur-xl shadow-lg border-b border-slate-800"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={onLogoClick}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 transform group-hover:scale-105 transition-transform duration-200">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white transition-colors">
                JEE Quiz Master
              </h1>
            </div>

            {/* Right side */}
            {!user ? (
              <button
                onClick={signInWithGoogle}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-bold shadow-lg shadow-amber-500/20 transition-all active:scale-95 text-white"
              >
                Sign up with Google
              </button>
            ) : (
              <div ref={avatarRef} className="flex">
                {/* nav items */}
                <nav className="  items-center gap-2">
                  {/* Nav items */}
                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    onClick={() => setQuizModalOpen(true)}
                  >
                    New Quiz
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    Quiz History
                  </button>
                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    onClick={() => setSubscriptionOpen(true)}
                  >
                    Subscribe
                  </button>
                </nav>

                {/* Avatar button */}
                <button
                  onClick={() => setAvatarOpen((prev) => !prev)}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full overflow-hidden border-2 border-indigo-500 hover:border-indigo-400 transition"
                >
                  <img
                    src={user.photoURL || ""}
                    alt={user.displayName || "User"}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>

                {/* Dropdown */}
                {avatarOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-800 text-white rounded-md shadow-lg border border-gray-700 z-50">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="font-medium">{user.displayName}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>

                    {/* Menu items */}
                    <div className="flex flex-col">
                      <button className="border-white px-4 py-2 text-sm hover:bg-indigo-600 hover:text-white">
                        New Quiz
                      </button>
                      <button className="px-4 py-2 text-sm hover:bg-indigo-600 hover:text-white">
                        Quiz History
                      </button>
                      <button className="px-4 py-2 text-sm hover:bg-indigo-600 hover:text-white">
                        Subscribe
                      </button>
                      <button
                        onClick={() => signOut(auth)}
                        className="px-4 py-2 text-sm hover:bg-red-600 text-red-500 text-left"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* RENDER MODAL HERE - Outside the nav but inside the return fragment */}
      {
        <QuizFormModal
          isOpen={quizModalOpen}
          onClose={() => setQuizModalOpen(false)}
        />
      }
      {/* Render Subscription View */}
      {subscriptionOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0B0F19]">
          {/* Close button to return to main app */}
          <button
            onClick={() => setSubscriptionOpen(false)}
            className="absolute top-6 right-6 text-white bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors"
          >
            ✕ Close
          </button>
          <SubscriptionPage />
        </div>
      )}
    </>
  );
};
