
import React from 'react';
import { User, Building2, BookOpen } from 'lucide-react';

export const TargetUsers: React.FC = () => {
  const users = [
    {
      title: 'Small Farmers',
      icon: <User className="w-8 h-8" />,
      desc: 'Need low-cost, community-driven AI tools on basic smartphones. Focus: Local languages & high accessibility.',
      example: 'App-based pest alerts'
    },
    {
      title: 'Agribusinesses',
      icon: <Building2 className="w-8 h-8" />,
      desc: 'Large-scale farms using dense sensor networks, drone fleets, and fully autonomous fleet management.',
      example: 'Variable-rate irrigation'
    },
    {
      title: 'Researchers',
      icon: <BookOpen className="w-8 h-8" />,
      desc: 'Universities studying crop resilience, soil health, and improving AI models for the global community.',
      example: 'Climate-resilient seeds'
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Who is this for?</h2>
          <p className="text-gray-600">The agricultural ecosystem is diverse, and AI scales to meet every need.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {users.map((u) => (
            <div key={u.title} className="text-center group">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                {u.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{u.title}</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed px-4">{u.desc}</p>
              <div className="inline-block px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Ex: {u.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
