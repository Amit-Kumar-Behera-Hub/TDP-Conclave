import React from 'react';
import { Ruler, MapPin, Wind, Zap } from 'lucide-react';

export const SensorPlacement: React.FC = () => {
  return (
    <section id="sensors" className="py-24 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Precision Placement</h2>
          <p className="text-gray-600 max-w-2xl">
            AI is only as good as its data. Correct sensor placement ensures that 
            models receive a true representation of field conditions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center">
                  <Zap size={20} />
                </div>
                <h3 className="text-xl font-bold text-emerald-900">Soil Sensors (Root Zone)</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 font-bold text-emerald-700">1</div>
                    <p className="text-emerald-800 text-sm">
                      <strong>The 2-3 Inch Rule:</strong> Sensors should be placed 2-3 inches from a healthy plant, toward the wetted area for accurate moisture capture.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 font-bold text-emerald-700">2</div>
                    <p className="text-emerald-800 text-sm">
                      <strong>Multi-Depth Sensing:</strong> Probes are placed at 6", 12", 24", and 36" depths to profile the entire root zone.
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-emerald-100 flex flex-col items-center justify-center relative overflow-hidden h-48">
                  <div className="absolute inset-0 opacity-10 flex flex-col items-center justify-center">
                    <div className="w-px h-full bg-emerald-800" />
                    <div className="w-full h-px bg-emerald-800 absolute top-1/2" />
                  </div>
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg" />
                    <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400">Probe Location</span>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-12 -translate-y-8">
                     <SproutSmall />
                  </div>
                  <div className="absolute bottom-4 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">ROOT ZONE FOCUS</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-sky-50 rounded-3xl p-8 border border-sky-100">
                <div className="flex items-center gap-3 mb-4 text-sky-900">
                  <Wind className="w-5 h-5" />
                  <h4 className="font-bold">Canopy Sensors</h4>
                </div>
                <p className="text-sky-800 text-sm leading-relaxed">
                  Mounted at canopy height to measure temperature, humidity, 
                  and leaf wetness—crucial for disease modeling.
                </p>
              </div>
              <div className="bg-orange-50 rounded-3xl p-8 border border-orange-100">
                <div className="flex items-center gap-3 mb-4 text-orange-900">
                  <MapPin className="w-5 h-5" />
                  <h4 className="font-bold">Avoid the Edges</h4>
                </div>
                <p className="text-orange-800 text-sm leading-relaxed">
                  Never place sensors near field edges, wheel tracks, or irrigation heads. 
                  Represent the average, not the extreme.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 text-white rounded-3xl p-8 flex flex-col">
            <h3 className="text-xl font-bold mb-6">Field Operations</h3>
            <div className="space-y-6 flex-1">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-xs text-emerald-400 font-bold mb-2">DRONES</div>
                <p className="text-sm text-gray-400">Launched from flat safety zones. AI calculates flight paths to cover 100% of acreage in minutes.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-xs text-emerald-400 font-bold mb-2">ROBOTS</div>
                <p className="text-sm text-gray-400">Operate within digital geofences. GPS-guided with centimeter-level accuracy to avoid crop damage.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-xs text-emerald-400 font-bold mb-2">WEATHER STATIONS</div>
                <p className="text-sm text-gray-400">Placed in open areas away from trees or buildings to get true wind and solar data.</p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                <Ruler size={14} />
                <span>ALL UNITS IN METRIC/IMPERIAL SYNC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SproutSmall = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 2 1 2"/><path d="m20 2-1 2"/><path d="M11 13c3.17 0 6-2.5 6-6 0-3.5-2.83-6-6-6s-6 2.5-6 6c0 3.5 2.83 6 6 6Z"/><path d="M12 13v8"/><path d="M12 13c-3.17 0-6 2.5-6 6 0 3.5 2.83 6 6 6s6-2.5 6-6c0-3.5-2.83-6-6-6Z"/><path d="M13 3c0 4.66-3.58 8-8 8"/><path d="M11 3c0 4.66 3.58 8 8 8"/></svg>
);