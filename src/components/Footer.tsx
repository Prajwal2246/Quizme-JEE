import React from 'react';
import { Brain, Github, Twitter, Linkedin, Heart, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#05080f] border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">JEE Quiz Master</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm mb-6">
              Empowering JEE aspirants with smart practice quizzes. Master Physics, Chemistry, and Mathematics with our comprehensive question bank.
            </p>
            
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#subjects" className="hover:text-indigo-400 transition-colors">Subjects</a></li>
              <li><a href="#features" className="hover:text-indigo-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Mock Quizes</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">JEE Syllabus</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Previous Papers</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">FAQs</a></li>
            </ul>
          </div>
        </div>

        <div className="mb-8">
          <h4 className="font-bold text-white mb-4 text-center">Connect With Us</h4>
          <div className="flex gap-4 justify-center">
            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-indigo-400 transition-colors">Refund Policy</a>
            </div>
          </div>
          <div className="text-center mt-4 flex items-center justify-center gap-1 text-sm text-slate-500">
            © 2026 JEE Quiz Master. Made with <Heart className="w-4 h-4 text-rose-500 fill-rose-500 mx-1" /> for JEE Aspirants
          </div>
        </div>
      </div>
    </footer>
  );
};