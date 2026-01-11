import React, { useState, useRef, useEffect } from 'react';
import { Camera, Loader2, AlertCircle, History, X, Search, CheckCircle, Trash2 } from 'lucide-react';
import { analyzeCropImage } from '../services/geminiService';
import { AnalysisResult, CropHistoryItem } from '../types';
import { supabase } from '../services/supabaseClient';

interface Props {
  userId: string;
}

export const CropMonitoring: React.FC<Props> = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<CropHistoryItem[]>([]);
  const [fetchingHistory, setFetchingHistory] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchHistory();

    // Set up Real-time subscription for instant updates
    const channel = supabase
      .channel('crop-history-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'crop_history',
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
      .from('crop_history')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(10);

    if (!error && data) {
      setHistory(data.map(item => ({
        id: item.id,
        timestamp: new Date(item.timestamp).toLocaleString(),
        image: item.image,
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
        const data = await analyzeCropImage(base64Data);
        setResult(data);
        
        await supabase.from('crop_history').insert({
          user_id: userId,
          image: base64Full,
          result: data
        });
      } catch (err) {
        setError('Analysis failed. Please try a clearer image.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const deleteItem = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await supabase.from('crop_history').delete().eq('id', id);
  };

  const clearHistory = async () => {
    if (confirm("Permanently delete all crop scans from your cloud history?")) {
      await supabase.from('crop_history').delete().eq('user_id', userId);
    }
  };

  const selectItem = (item: CropHistoryItem) => {
    setResult(item.result);
    setCurrentImage(item.image);
    const el = document.getElementById('analysis-viewer');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'warning': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <section id="crop-monitoring" className="py-24 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Crop Monitoring</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cloud-synced real-time diagnostics powered by computer vision. Securely stored in your farmer profile.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-emerald-200 rounded-[2.5rem] p-10 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/50 transition-all group"
            >
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-600 group-hover:rotate-6 transition-all">
                <Camera className="w-8 h-8 text-emerald-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Scan New Crop</h3>
              <p className="text-gray-500 text-sm mt-1">Upload a photo for AI diagnostic report.</p>
            </div>

            <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-gray-900 flex items-center gap-2 uppercase text-xs tracking-widest">
                  <History className="w-4 h-4 text-emerald-600" /> Cloud History
                </h4>
                {history.length > 0 && (
                  <button onClick={clearHistory} className="text-[10px] font-black text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors">
                    Clear All
                  </button>
                )}
              </div>
              
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                {fetchingHistory ? (
                  <div className="py-12 flex flex-col items-center opacity-30">
                    <Loader2 className="animate-spin text-emerald-600 mb-2" />
                    <span className="text-xs font-bold uppercase tracking-widest">Syncing Cloud...</span>
                  </div>
                ) : history.length === 0 ? (
                  <div className="text-center py-12">
                    <Search className="w-8 h-8 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm italic">No records found in cloud storage.</p>
                  </div>
                ) : (
                  history.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => selectItem(item)}
                      className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-transparent hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer group animate-in slide-in-from-left-4 duration-300"
                    >
                      <img src={item.image} className="w-14 h-14 rounded-xl object-cover shrink-0 border border-gray-100" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{item.result.title}</p>
                        <p className="text-[10px] text-gray-400 uppercase mt-0.5">{item.timestamp}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border shrink-0 ${getStatusStyles(item.result.status)}`}>
                          {item.result.status}
                        </div>
                        <button 
                          onClick={(e) => deleteItem(item.id, e)}
                          className="p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div id="analysis-viewer" className="lg:col-span-7 min-h-[550px] bg-gray-50 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden flex flex-col">
            {loading && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center z-20">
                <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
                <p className="font-black text-emerald-900 animate-pulse tracking-widest uppercase text-xs">AI Analyzing Biological Patterns...</p>
              </div>
            )}

            {!result && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center h-full text-center p-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 opacity-40">
                  <Search size={40} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Awaiting Diagnostic Data</h3>
                <p className="text-gray-500 max-w-sm">Upload a field photo or select an entry from your history to generate a precision report.</p>
              </div>
            )}

            {result && currentImage && (
              <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="h-80 relative overflow-hidden">
                  <img src={currentImage} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                  <div className={`absolute bottom-6 left-8 inline-flex px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border backdrop-blur-md shadow-xl ${getStatusStyles(result.status)}`}>
                    {result.status} Health Profile
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-4xl font-black text-gray-900 mb-6">{result.title}</h3>
                  <div className="prose prose-emerald max-w-none">
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">{result.description}</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">AI Treatment Recommendations</h4>
                    <div className="grid gap-3">
                      {result.recommendations.map((rec, i) => (
                        <div key={i} className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-200 transition-colors">
                          <div className="w-6 h-6 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                            <CheckCircle size={16} />
                          </div>
                          <p className="text-sm font-semibold text-gray-700">{rec}</p>
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