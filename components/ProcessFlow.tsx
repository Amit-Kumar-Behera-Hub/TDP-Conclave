
import React from 'react';
import { Database, Search, MessageSquare, Activity, ChevronRight } from 'lucide-react';

export const ProcessFlow: React.FC = () => {
  const steps = [
    { title: 'Collect Data', icon: <Database />, desc: 'Sensors & Drones' },
    { title: 'AI Analyzes', icon: <Search />, desc: 'ML & Vision Models' },
    { title: 'Get Insights', icon: <MessageSquare />, desc: 'Smart Recs' },
    { title: 'Take Action', icon: <Activity />, desc: 'Precise Application' }
  ];

  return (
    <div className="py-24 bg-emerald-950 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/50 via-transparent to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-emerald-400 uppercase tracking-[0.2em] mb-4">How it Works</h2>
          <p className="text-gray-400 max-w-lg mx-auto">The circular loop of data-driven decision making in smart agriculture.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {steps.map((step, idx) => (
            <div key={step.title} className="group relative flex flex-col items-center text-center">
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-10 left-[70%] w-[60%] items-center justify-center z-0">
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-emerald-600 to-transparent border-t border-dashed border-emerald-500/30" />
                  <ChevronRight className="text-emerald-800" size={24} />
                </div>
              )}
              
              <div className="w-20 h-20 bg-emerald-900 rounded-[2rem] flex items-center justify-center mb-6 relative z-10 border border-emerald-700/50 shadow-xl group-hover:bg-emerald-600 group-hover:scale-110 transition-all duration-500">
                {/* Fixed TypeScript error by casting icon element to React.ReactElement<any> to permit className property */}
                {React.cloneElement(step.icon as React.ReactElement<any>, { className: 'w-8 h-8 text-emerald-400 group-hover:text-white transition-colors' })}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-black shadow-lg">
                  {idx + 1}
                </div>
              </div>
              
              <h4 className="font-bold text-lg mb-2 text-white group-hover:text-emerald-400 transition-colors">{step.title}</h4>
              <p className="text-emerald-500/80 text-xs font-bold uppercase tracking-widest">{step.desc}</p>
              <p className="mt-4 text-sm text-gray-500 max-w-[200px] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity">
                {idx === 0 && "Continuous monitoring of soil and sky conditions."}
                {idx === 1 && "Patterns identified via deep learning neural networks."}
                {idx === 2 && "Actionable advice delivered directly to your device."}
                {idx === 3 && "Resource conservation through targeted intervention."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
