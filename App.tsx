
import React, { useState, useEffect } from 'react';
import { Leaf, ArrowRight, Mail, Loader2, CheckCircle, User, Globe, GraduationCap, UserCircle } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { CropMonitoring } from './components/CropMonitoring';
import { SoilHealth } from './components/SoilHealth';
import { Technologies } from './components/Technologies';
import { SensorPlacement } from './components/SensorPlacement';
import { SustainabilityBenefits } from './components/SustainabilityBenefits';
import { TargetUsers } from './components/TargetUsers';
import { ProcessFlow } from './components/ProcessFlow';
import { JudgesSection } from './components/JudgesSection';
import { supabase } from './services/supabaseClient';

const App: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check local storage for existing session
    const savedUser = localStorage.getItem('agritech_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    setIsSubmitting(true);
    
    try {
      // Record the login entry in Supabase for the academic record
      await supabase.from('login_entries').insert({
        full_name: formData.name,
        email: formData.email,
        timestamp: new Date().toISOString()
      });

      // Save session locally
      const userData = { name: formData.name, email: formData.email };
      localStorage.setItem('agritech_user', JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      console.error('Failed to log entry, but proceeding anyway for demo:', err);
      // Still allow access even if DB write fails for maximum simplicity
      const userData = { name: formData.name, email: formData.email };
      localStorage.setItem('agritech_user', JSON.stringify(userData));
      setUser(userData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('agritech_user');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
          <p className="text-emerald-500/50 font-bold uppercase tracking-widest text-xs">AgriTech System Initializing</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-emerald-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-emerald-400/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
        
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-700">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Academic Access</h1>
            <p className="text-emerald-300 text-[10px] font-black tracking-widest uppercase opacity-80">AI in Sustainable Agriculture Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100/60 flex items-center gap-2 px-1">
                  <UserCircle size={12} /> Full Name
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Jane Smith"
                  className="w-full px-6 py-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-emerald-800/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100/60 flex items-center gap-2 px-1">
                  <Mail size={12} /> University Email
                </label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@university.edu"
                  className="w-full px-6 py-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-emerald-800/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl shadow-emerald-950/20 group"
            >
              {isSubmitting ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Enter Research Portal
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
            <p className="text-center text-[10px] text-emerald-100/30 uppercase tracking-[0.1em] font-medium leading-relaxed">
              Instant Institutional Access Enabled
            </p>
          </form>
        </div>
      </div>
    );
  }

  // Use email as a deterministic ID for the demo components
  const mockId = btoa(user.email).substring(0, 20);

  return (
    <div className="relative animate-in fade-in duration-1000">
      <Navbar onLogout={handleLogout} />
      
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16 scroll-mt-16">
        <div className="absolute top-0 right-0 w-[65%] h-full pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1600" 
            alt="Vertical farming AI" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8 border border-emerald-100 shadow-sm">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Active Session: {user.name}
            </div>
            <h1 className="text-6xl lg:text-[5.5rem] font-black text-gray-900 mb-8 leading-[0.95] tracking-tight">
              The Crucial Role of <span className="text-emerald-600 italic">AI</span> in <span className="underline decoration-emerald-500/30">Sustainability</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-xl font-medium">
              Agricultural transformation through Artificial Intelligence is no longer a luxury, but a necessity to meet global food security and environmental targets by 2030.
            </p>
            <div className="flex flex-wrap gap-5">
              <a href="#crop-monitoring" className="px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest rounded-2xl inline-flex items-center gap-4 transition-all shadow-2xl hover:-translate-y-1 active:scale-95 group">
                Access Field Tools <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-6 px-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-gray-900">2030</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sustainability Target</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CropMonitoring userId={mockId} />
      <SoilHealth userId={mockId} />
      <ProcessFlow />
      <Technologies />
      <SensorPlacement />
      <TargetUsers />
      <SustainabilityBenefits />
      <JudgesSection />
    </div>
  );
};

export default App;
