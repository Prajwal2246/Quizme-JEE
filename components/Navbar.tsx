import React, { useState, useEffect } from "react";
import { Brain, Menu, X, ChevronRight } from "lucide-react";

interface NavbarProps {
  onLogoClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLogoClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white transition-colors">
                JEE Quiz Master
              </h1>
            </div>
          </div>

          {/* signup btn */}
          <button className="py-3 px-2 bg-indigo-600 text-white rounded-xl font-bold sm:text-sm shadow-lg shadow-indigo-900/50">
            Sign up with Google
          </button>
        </div>
      </div>
    </nav>
  );
};
