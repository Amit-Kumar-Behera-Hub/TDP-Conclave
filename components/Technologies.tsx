
import React, { useState } from 'react';
import { Cpu, Camera, Signal, Send, Disc, LayoutDashboard, X, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface DetailedTech {
  id: string;
  title: string;
  icon: React.ReactNode;
  shortDesc: string;
  longDesc: string;
  points: string[];
  tooltip: string;
  image: string;
  useCase: string;
  stat: string;
}

export const Technologies: React.FC = () => {
  const [activeTech, setActiveTech] = useState<DetailedTech | null>(null);

  const techs: DetailedTech[] = [
    {
      id: 'ml',
      title: 'Machine Learning',
      icon: <Cpu className="w-6 h-6" />,
      shortDesc: 'Predicts irrigation needs and disease risk using historical data patterns.',
      longDesc: 'Machine Learning algorithms process massive datasets from weather stations, historical crop yields, and soil sensors. By identifying non-linear patterns, these models can predict future outcomes with high accuracy, allowing farmers to prepare for droughts or pest outbreaks weeks in advance.',
      points: ['Water demand prediction', 'Yield forecasting', 'Risk assessment'],
      tooltip: 'A form of AI that enables systems to learn and improve from data without being explicitly programmed.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1200',
      useCase: 'Predictive analytics for optimizing harvest schedules to avoid climate-related losses.',
      stat: 'Reduces harvest waste by up to 15%'
    },
    {
      id: 'cv',
      title: 'Computer Vision',
      icon: <Camera className="w-6 h-6" />,
      shortDesc: 'Uses imagery to detect crop stress and pests early through visual patterns.',
      longDesc: 'Computer Vision acts as the "eyes" of the farm. High-resolution cameras on drones or handheld devices capture leaf imagery. Deep Learning models then analyze these images for the earliest signs of fungal infection or nitrogen deficiency—often before the human eye can see them.',
      points: ['Pest identification', 'Leaf color analysis', 'Growth tracking'],
      tooltip: 'AI that allows computers to derive meaningful information from digital images and videos.',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1200',
      useCase: 'Real-time detection of leaf rust in wheat fields using mobile smartphone cameras.',
      stat: '98% accuracy in disease detection'
    },
    {
      id: 'iot',
      title: 'IoT Sensors',
      icon: <Signal className="w-6 h-6" />,
      shortDesc: 'Real-time soil and climate data sent instantly to AI cloud models.',
      longDesc: 'The Internet of Things (IoT) creates a nervous system for the field. Buried probes measure moisture and salinity, while canopy stations track humidity and solar radiation. This constant stream of ground-truth data fuels AI models, ensuring they reflect reality.',
      points: ['Live telemetry', 'Automated alerts', 'Micro-climate data'],
      tooltip: 'Internet of Things: Devices with sensors connected to the internet for real-time monitoring.',
      image: 'https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?auto=format&fit=crop&q=80&w=1200',
      useCase: 'Smart moisture probes that trigger automated irrigation valves only when necessary.',
      stat: 'Saves 30% of freshwater usage'
    },
    {
      id: 'drones',
      title: 'AI Drones',
      icon: <Send className="w-6 h-6" />,
      shortDesc: 'Autonomous aerial mapping for irrigation leaks and precision spraying.',
      longDesc: 'Drones provide a macro-perspective. Equipped with multispectral sensors, they map the "Normalized Difference Vegetation Index" (NDVI) across hundreds of acres in minutes. This identifies exactly which areas of a field need attention, preventing blanket chemical application.',
      points: ['Multispectral imaging', 'Topography mapping', 'Targeted application'],
      tooltip: 'Unmanned Aerial Vehicles (UAVs) controlled by AI for efficient field scanning.',
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=1200',
      useCase: 'Generating heat maps of fields to identify irrigation pipe leaks hidden beneath the surface.',
      stat: 'Scans 100 acres in 15 minutes'
    },
    {
      id: 'robotics',
      title: 'Robotics',
      icon: <Disc className="w-6 h-6" />,
      shortDesc: 'Smart bots that perform precise weeding and seeding without chemical overkill.',
      longDesc: 'Agricultural robots take the labor out of precision. These autonomous machines navigate rows using GPS and lidar, using mechanical pluckers or laser precision to eliminate weeds individually. This removes the need for broad-spectrum herbicides that can harm soil health.',
      points: ['Reduced fuel usage', 'Mechanical weeding', 'Precise seeding'],
      tooltip: 'Autonomous or semi-autonomous machines that handle physical labor on the farm.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
      useCase: 'Autonomous weeding robots that distinguish between crop and weed in milliseconds.',
      stat: '90% reduction in herbicide use'
    },
    {
      id: 'dashboards',
      title: 'Dashboards',
      icon: <LayoutDashboard className="w-6 h-6" />,
      shortDesc: 'Actionable mobile and web interfaces for data-driven farm management.',
      longDesc: 'Dashboards translate complex AI math into simple, actionable insights. A farmer doesn\'t need to see raw sensor data; they need to see a "Water Today" alert. These interfaces provide a command center for the entire operation, accessible from anywhere in the world.',
      points: ['Real-time insights', 'Economic reports', 'Resource tracking'],
      tooltip: 'Visual interfaces that aggregate and display data for quick decision-making.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
      useCase: 'Mobile command center showing live fuel levels and location of all autonomous fleet units.',
      stat: 'Increases decision speed by 4x'
    }
  ];

  return (
    <section id="tech" className="py-24 bg-gray-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">The AI Engine Room</h2>
          <p className="text-gray-600 max-w-2xl mx-auto italic">
            "Click on a technology module below to explore its specific role in modern sustainable agriculture."
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techs.map((tech) => (
            <div 
              key={tech.id} 
              onClick={() => setActiveTech(tech)}
              className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  <ArrowRight size={18} />
                </div>
              </div>
              
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                {tech.icon}
              </div>
              
              <h3 className="text-2xl font-black text-gray-900 mb-3 flex items-center gap-2">
                <Tooltip text={tech.tooltip}>{tech.title}</Tooltip>
              </h3>
              
              <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-2">{tech.shortDesc}</p>
              
              <div className="flex flex-wrap gap-2">
                {tech.points.slice(0, 2).map(p => (
                  <span key={p} className="px-3 py-1 bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-full border border-gray-100">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep Dive Modal */}
      {activeTech && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setActiveTech(null)}
          />
          
          <div className="relative w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 max-h-[90vh]">
            {/* Close Button Mobile */}
            <button 
              onClick={() => setActiveTech(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-white/20 backdrop-blur-md rounded-full text-white lg:hidden"
            >
              <X size={24} />
            </button>

            {/* Image Side */}
            <div className="lg:w-2/5 relative h-48 lg:h-auto overflow-hidden">
              <img 
                src={activeTech.image} 
                alt={activeTech.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-gray-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 text-white">
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-xl">
                  {/* Fixed TypeScript error by casting icon element to React.ReactElement<any> to permit className property */}
                  {React.cloneElement(activeTech.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
                </div>
                <h3 className="text-3xl font-black">{activeTech.title}</h3>
                <p className="text-emerald-400 font-bold uppercase tracking-widest text-xs mt-2">Core Component</p>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:w-3/5 p-8 lg:p-16 overflow-y-auto custom-scrollbar bg-white">
              <div className="flex justify-between items-start mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                  <ExternalLink size={12} /> Technical Specifications
                </div>
                <button 
                  onClick={() => setActiveTech(null)}
                  className="hidden lg:flex p-2 text-gray-300 hover:text-gray-900 transition-colors"
                >
                  <X size={32} />
                </button>
              </div>

              <div className="space-y-10">
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-4">Academic Description</h4>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {activeTech.longDesc}
                  </p>
                </section>

                <div className="grid sm:grid-cols-2 gap-8">
                  <section>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-4">Capabilities</h4>
                    <ul className="space-y-3">
                      {activeTech.points.map(point => (
                        <li key={point} className="flex items-center gap-3 text-gray-700 font-semibold">
                          <CheckCircle2 size={18} className="text-emerald-500" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-4">Impact Metric</h4>
                    <div className="bg-emerald-950 p-6 rounded-[2rem] text-center">
                      <p className="text-3xl font-black text-white mb-1">{activeTech.stat}</p>
                      <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Sustainability Yield</p>
                    </div>
                  </section>
                </div>

                <section className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">Real-World Case Study</h4>
                  <p className="text-gray-900 font-bold leading-relaxed italic">
                    "{activeTech.useCase}"
                  </p>
                </section>
                
                <button 
                  onClick={() => setActiveTech(null)}
                  className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-3"
                >
                  Return to Engine Room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
