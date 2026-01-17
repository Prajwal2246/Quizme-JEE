import React from "react";
import {
  Brain,
  Github,
  Twitter,
  Linkedin,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#05080f] border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                JEE Quiz Master
              </span>
            </Link>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Empowering JEE aspirants with smart practice quizzes. Master
              Physics, Chemistry, and Mathematics with our comprehensive
              question bank.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3 text-slate-400">
              <li>
                <Link to="/#subjects" className="hover:text-indigo-400 transition-colors">
                  Subjects
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-indigo-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/mock-tests" className="hover:text-indigo-400 transition-colors">
                  Mock Quizzes
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-indigo-400 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-3 text-slate-400">
              <li>
                <Link to="https://jeemain.nta.nic.in/document/syllabus-for-jee-main-2025/" className="hover:text-indigo-400 transition-colors">
                  JEE Syllabus
                </Link>
              </li>
              <li>
                <Link to="/previous-papers" className="hover:text-indigo-400 transition-colors">
                  Previous Papers
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-indigo-400 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social */}
        <div className="mb-8">
          <h4 className="font-bold text-white mb-4 text-center">
            Connect With Us
          </h4>

          <div className="flex gap-4 justify-center">
            <Link to="/social/twitter" className="social-btn">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link to="/social/github" className="social-btn">
              <Github className="w-5 h-5" />
            </Link>
            <Link to="/social/linkedin" className="social-btn">
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
            <Link to="/privacy-policy" className="hover:text-indigo-400">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-indigo-400">
              Terms of Service
            </Link>
            <span>•</span>
            <Link to="/refund-policy" className="hover:text-indigo-400">
              Refund Policy
            </Link>
          </div>

          <div className="text-center mt-4 flex items-center justify-center gap-1 text-sm text-slate-500">
            © 2026 JEE Quiz Master. Made with
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 mx-1" />
            for JEE Aspirants
          </div>
        </div>
      </div>
    </footer>
  );
};
