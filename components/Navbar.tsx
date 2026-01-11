import React, { useState } from 'react';
import { Leaf, Menu, X, LogOut } from 'lucide-react';

interface NavbarProps {
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Overview', href: '#hero' },
    { name: 'Monitoring', href: '#crop-monitoring' },
    { name: 'Soil', href: '#soil-health' },
    { name: 'Technologies', href: '#tech' },
    { name: 'Sensors', href: '#sensors' },
    { name: 'Benefits', href: '#benefits' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-b border-emerald-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3 text-emerald-600 font-bold text-2xl group cursor-pointer">
            <div className="bg-emerald-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-100">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="tracking-tight text-gray-900">Agri<span className="text-emerald-600">Tech</span></span>
          </div>
          
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-gray-600 hover:text-emerald-600 font-semibold transition-all text-sm rounded-lg hover:bg-emerald-50"
              >
                {link.name}
              </a>
            ))}
            <div className="h-6 w-px bg-gray-200 mx-4" />
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100 active:scale-95"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-4 space-y-1">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-4 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl font-bold transition-all"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="flex items-center justify-center gap-2 w-full mt-4 p-4 bg-red-50 text-red-600 font-bold rounded-xl active:bg-red-100 transition-all"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};