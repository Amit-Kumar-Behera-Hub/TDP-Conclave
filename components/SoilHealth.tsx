
import React, { useState, useRef, useEffect } from 'react';
import { Droplets, Sprout, Loader2, Camera, CheckCircle, History, Trash2, Search, Thermometer, X } from 'lucide-react';
import { analyzeSoilHealth } from '../services/geminiService';
import { SoilRecommendation, SoilHistoryItem } from '../types';
import { supabase } from '../services/supabaseClient';

interface Props {
  userId: string;
}

export const SoilHealth: React.FC<Props> = ({ userId }) => {
  const [moisture, setMoisture] = useState(30);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SoilRecommendation | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SoilHistoryItem[]>([]);
  const [fetchingHistory, setFetchingHistory] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchHistory();

    const channel = supabase
      .channel('soil-history-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'soil_history',
        filter: `user_id=eq.${userId}`
      }, () => {
        fetchHistory();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const fetchHistory = async () => {
    const { data, error } = await supabase
      .from('soil_history')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(6);

    if (!error && data) {
      setHistory(data.map(item => ({
        id: item.id,
        timestamp: new Date(item.timestamp).toLocaleString(),
        image: item.image,
        moisture: item.moisture,
        result: item.result
      })));
    }
    setFetchingHistory(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setCurrentImage(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Full = e.target?.result as string;
      setCurrentImage(base64Full);
      const base64Data = base64Full.split(',')[1];
      
      try {
        const data = await analyzeSoilHealth(base64Data, moisture);
        setResult(data);
        
        await supabase.from('soil_history').insert({
          user_id: userId,
          image: base64Full,
          moisture: moisture,
          result: data
        });
      } catch (err) {
        setError('Soil analysis failed. Try again with a clearer photo.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const selectItem = (item: SoilHistoryItem) => {
    setResult(item.result);
    setCurrentImage(item.image);
    setMoisture(item.moisture);
    const el = document.getElementById('soil-analysis-viewer');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const deleteItem = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await supabase.from('soil_history').delete().eq('id', id);
  };

  const clearHistory = async () => {
    if (confirm("Wipe all cloud soil logs? This action is permanent.")) {
      await supabase.from('soil_history').delete().eq('user_id', userId);
    }
  };

  return (
    <section id="soil-health" className="py-24 bg-emerald-950 text-white overflow-hidden relative scroll-mt-16">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-emerald-500/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8 animate-in slide-in-from-left duration-1000">
            <div className="space-y-2">
              <h2 className="text-5xl font-black mb-2">Smart Soil Lab</h2>
              <p className="text-emerald-400 font-bold uppercase tracking-widest text-sm">Real-time Suitability Analysis</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] space-y-10 shadow-2xl">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-3 font-bold text-lg">
                    <Droplets className="text-sky-400" /> Current Moisture
                  </label>
                  <div className="bg-sky-500/20 text-sky-400 px-4 py-1 rounded-full font-black text-2xl border border-sky-400/20">
                    {moisture}%
                  </div>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={moisture} 
                  onChange={(e) => setMoisture(Number(e.target.value))} 
                  className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer accent-sky-400" 
                />
                <div className="flex justify-between text-[10px] font-black text-white/30 uppercase tracking-widest">
                  <span>Arid Desert</span>
                  <span>Optimal Range</span>
                  <span>Saturated</span>
                </div>
              </div>

              <button 
                onClick={() => fileInputRef.current?.click()} 
                className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-black uppercase tracking-widest rounded-[1.5rem] flex items-center justify-center gap-4 transition-all shadow-xl shadow-emerald-950/50 hover:-translate-y-1 active:scale-95 group"
              >
                <Camera size={24} className="group-hover:rotate-12 transition-transform" />
                Analyze Sample
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
              </button>

              <div className="pt-8 border-t border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 flex items-center gap-2">
                    <History size={16} /> Cloud Soil Logs
                  </h4>
                  {history.length > 0 && (
                    <button onClick={clearHistory} className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-red-400 transition-colors">
                      Clear
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                  {fetchingHistory ? (
                    <div className="col-span-2 py-8 flex justify-center opacity-20"><Loader2 className="animate-spin" /></div>
                  ) : history.length === 0 ? (
                    <div className="col-span-2 py-8 text-center text-white/20 text-xs italic">Awaiting your first sample...</div>
                  ) : (
                    history.map(item => (
                      <div 
                        key={item.id} 
                        onClick={() => selectItem(item)}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 cursor-pointer transition-all border border-transparent hover:border-white/20 group relative overflow-hidden"
                      >
                        <img src={item.image} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-bold text-white truncate">{item.result.bestCrops[0]}</p>
                          <p className="text-[9px] text-white/40 uppercase font-black">{item.moisture}% Moisture</p>
                        </div>
                        <button 
                          onClick={(e) => deleteItem(item.id, e)}
                          className="absolute right-1 top-1 p-1.5 text-white/10 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          {/* Fixed error: Cannot find name 'X' by adding it to lucide-react imports */}
                          <X size={12} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div id="soil-analysis-viewer" className="bg-white rounded-[4rem] text-gray-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] min-h-[600px] flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-700">
            {loading && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                <Loader2 className="w-16 h-16 animate-spin text-emerald-600 mb-6" />
                <p className="font-black uppercase tracking-[0.3em] text-emerald-900 text-xs">Syncing with AI Soil Knowledge...</p>
              </div>
            )}
            
            {!result && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center p-16 text-center">
                <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-8">
                  <Sprout size={64} className="text-emerald-100" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">Precision Planting Lab</h3>
                <p className="text-gray-400 max-w-xs leading-relaxed">Adjust moisture and upload a soil sample to determine the perfect crop rotation for your land.</p>
              </div>
            )}

            {result && currentImage && (
              <div className="flex-1 flex flex-col animate-in fade-in duration-1000">
                <div className="h-64 relative">
                  <img src={currentImage} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-10 flex gap-4">
                    <div className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl">
                      <Thermometer size={14} /> Analysis Active
                    </div>
                  </div>
                </div>

                <div className="p-12 pt-4 space-y-10">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">Top Suitable Crops</h4>
                    <div className="flex flex-wrap gap-3">
                      {result.bestCrops.map(crop => (
                        <div key={crop} className="px-6 py-3 bg-emerald-50 text-emerald-700 rounded-2xl font-black text-sm border border-emerald-100 shadow-sm flex items-center gap-2">
                          <Sprout size={16} /> {crop}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">AI Scientist Assessment</h4>
                    <p className="text-gray-600 text-lg leading-relaxed italic font-medium">"{result.explanation}"</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">Sustainable Management Tips</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {result.tips.map((tip, i) => (
                        <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-[1.5rem] border border-gray-100 hover:border-emerald-200 transition-colors">
                          <div className="w-6 h-6 bg-emerald-600 text-white rounded-lg flex items-center justify-center shrink-0">
                            <CheckCircle size={14} />
                          </div>
                          <span className="text-sm font-semibold text-gray-700 leading-snug">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
