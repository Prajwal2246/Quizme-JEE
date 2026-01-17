import React, { useState, useEffect, useRef } from "react";
import { Brain } from "lucide-react";
import { signInWithGoogle } from "../auth/signInWithGoogle";
import { User, signOut } from "firebase/auth";
import { auth } from "../firebase";
import QuizFormModal from "./QuizFormModal";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onLogoClick: () => void;
  user: User | null;
  onNewQuizClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onLogoClick,
  user,
  onNewQuizClick,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            ? "bg-[#0B0F19]/90 backdrop-blur-xl border-b border-slate-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={onLogoClick}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">JEE Quiz Master</h1>
            </div>

            {!user ? (
              <button
                onClick={signInWithGoogle}
                className="px-6 py-2.5 bg-amber-600 rounded-lg text-sm font-bold text-white"
              >
                Sign up with Google
              </button>
            ) : (
              <div ref={avatarRef} className="flex items-center gap-4">
                <button className="px-2" onClick={onNewQuizClick}>
                  New Quiz
                </button>
                <button onClick={() => navigate("/history")}>
                  Quiz History
                </button>

                <button onClick={() => navigate("/subscription")}>
                  Subscribe
                </button>

                <button
                  onClick={() => setAvatarOpen((p) => !p)}
                  className="h-10 w-10 rounded-full overflow-hidden border-2 border-indigo-500"
                >
                  <img
                    src={user.photoURL || ""}
                    alt="user"
                    className="h-full w-full object-cover"
                  />
                </button>

                {avatarOpen && (
                  <div className="absolute mr-4 right-0 top-full mt-2 w-56 bg-gray-800 rounded-md border border-purple-300 z-50 shadow-lg">
                    <div className="px-2 py-1.5 text-sm font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.displayName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <button
                      className="px-4 py-2 w-full text-left hover:bg-indigo-600"
                      onClick={onNewQuizClick}
                    >
                      New Quiz
                    </button>

                    <button
                      className="px-4 py-2 w-full text-left hover:bg-indigo-600"
                      onClick={() => navigate("/history")}
                    >
                      Quiz History
                    </button>

                    <button
                      className="px-4 py-2 w-full text-left hover:bg-indigo-600"
                      onClick={() => navigate("/subscription")}
                    >
                      Subscribe
                    </button>

                    <button
                      className="px-4 py-2 w-full font-bold text-left text-red-500 hover:bg-purple-800 hover:text-white"
                      onClick={() => signOut(auth)}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
