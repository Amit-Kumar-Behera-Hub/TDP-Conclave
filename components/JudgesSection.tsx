
import React from 'react';
import { Github, Mail, Linkedin, Award } from 'lucide-react';

export const JudgesSection: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-full text-xs font-bold uppercase tracking-widest">
              <Award size={14} />
              TDP Academic Project
            </div>
            <h2 className="text-3xl font-bold leading-tight">Project Overview & Contribution</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              This website was designed as a capstone project to demonstrate how modern 
              Artificial Intelligence can be applied to solve critical sustainability 
              challenges in global agriculture.
            </p>
            <div className="space-y-4">
              <h3 className="font-bold text-emerald-400">Core Contributions:</h3>
              <ul className="space-y-3">
                {[
                  'Architected real-time AI image analysis for crop diagnostics',
                  'Designed data visualization for soil moisture profiling',
                  'Developed responsive UI using modern React & Tailwind CSS',
                  'Researched and distilled complex agritech sensor placement protocols'
                ].map(item => (
                  <li key={item} className="flex gap-3 items-start text-sm text-gray-300">
                    <span className="text-emerald-500 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-10 rounded-[3rem] border border-white/10 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Thank You for Visiting!</h3>
              <p className="text-gray-400">
                We hope this platform provides a clear vision of the future of farming. 
                For inquiries or technical documentation, please reach out via the 
                channels below.
              </p>
            </div>
            
            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <Linkedin size={20} />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <Github size={20} />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <Mail size={20} />
                </div>
              </div>
              <p className="text-xs text-gray-500 font-medium">© 2024 AgriTech TDP Project. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
