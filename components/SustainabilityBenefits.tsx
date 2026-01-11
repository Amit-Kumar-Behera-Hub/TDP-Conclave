import React from 'react';
import { Droplet, FlaskConical, Shovel, TrendingUp } from 'lucide-react';

export const SustainabilityBenefits: React.FC = () => {
  const benefits = [
    {
      title: 'Save Water',
      icon: <Droplet className="text-sky-500" />,
      desc: 'AI precision irrigation reduces water waste by up to 30%, protecting vital local groundwater supplies.',
      color: 'bg-sky-50 border-sky-100'
    },
    {
      title: 'Reduce Chemicals',
      icon: <FlaskConical className="text-purple-500" />,
      desc: 'Targeted spraying means fewer pesticides and fertilizers leak into the surrounding ecosystem.',
      color: 'bg-purple-50 border-purple-100'
    },
    {
      title: 'Protect Soil',
      icon: <Shovel className="text-amber-600" />,
      desc: 'Avoids over-watering and nutrient leaching, keeping the soil microbiologically active and fertile.',
      color: 'bg-amber-50 border-amber-100'
    },
    {
      title: 'Boost Income',
      icon: <TrendingUp className="text-emerald-600" />,
      desc: 'Higher yields and lower input costs make farming more resilient to economic and climate shifts.',
      color: 'bg-emerald-50 border-emerald-100'
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-gray-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Sustainability Wins</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            AI isn't just about efficiency; it's about ensuring our planet can 
            continue to feed future generations.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className={`${b.color} p-8 rounded-3xl border shadow-sm transition-all hover:shadow-md`}>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                {b.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{b.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};