import { Mail, Briefcase, Github, Code, Linkedin, Instagram } from 'lucide-react';

export default function ContactLinksCard() {
  return (
      <div className="bg-black-800 rounded-2xl shadow-2xl p-12 max-w-4xl w-full">
        {/* Contact and Links */}
        
        <div className="flex flex-col items-center gap-8">
              <h2 className="flex items-center text-6xl pr-60 gap-4 text-gray-300 hover:text-gray-100 transition-colors p-4 rounded-lg hover:bg-gray-700/50"
              style={{ fontFamily: "'Times New Roman', Times, serif" }} >Developer Info</h2>
          <div className="grid grid-cols-2 gap-6 w-full">
            <a 
              href="mailto:dhayanithianandan@gmail.com"
              className="flex items-center gap-4 text-gray-300 hover:text-gray-100 transition-colors p-4 rounded-lg hover:bg-gray-700/50"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              <Mail className="w-8 h-8" />
              <span className="text-3xl">Contact</span>
            </a>
            
            <a 
              href="https://dhayanithi.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-gray-300 hover:text-gray-100 transition-colors p-4 rounded-lg hover:bg-gray-700/50"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              <Briefcase className="w-8 h-8" />
              <span className="text-3xl">Portfolio</span>
            </a>
            
            <a 
              href="https://github.com/Dhayanithi-545"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-gray-300 hover:text-gray-100 transition-colors p-4 rounded-lg hover:bg-gray-700/50"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              <Github className="w-8 h-8" />
              <span className="text-3xl">GitHub</span>
            </a>
            
            <a 
              href="https://leetcode.com/u/Dhayanithi_Anandan/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-gray-300 hover:text-gray-100 transition-colors p-4 rounded-lg hover:bg-gray-700/50"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              <Code className="w-8 h-8" />
              <span className="text-3xl">LeetCode</span>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/dhayanithi-anandan/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-gray-300 hover:text-gray-100 transition-colors p-4 rounded-lg hover:bg-gray-700/50"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              <Linkedin className="w-8 h-8" />
              <span className="text-3xl">LinkedIn</span>
            </a>
            
            <a 
              href="https://www.instagram.com/dhaya_545/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-gray-300 hover:text-gray-100 transition-colors p-4 rounded-lg hover:bg-gray-700/50"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              <Instagram className="w-8 h-8" />
              <span className="text-3xl">Instagram</span>
            </a>
          </div>
          
          {/* Copyright and Credits */}
          <div className="text-center mt-8 pt-8 border-t border-gray-700 w-full">
            <p className="text-gray-400 text-3xl mb-3" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              Built by Dhayanithi
            </p>
            <p className="text-gray-500 text-lg" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              © 2026 Times of World. All rights reserved.
            </p>
          </div>
        </div>
      </div>
  );
}