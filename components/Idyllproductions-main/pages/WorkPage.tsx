
import React, { useState, useEffect } from 'react';
import { WORK_CATEGORIES } from '../constants';
import { Play, X, ChevronRight, Maximize2 } from 'lucide-react';
import { WorkCategory } from '../types';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const WorkPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<WorkCategory | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`pt-32 pb-20 px-6 md:px-12 bg-white min-h-screen relative ${selectedCategory ? 'overflow-hidden' : ''}`} style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)`,
      backgroundSize: '120px 120px'
    }}>
      {/* Fade overlay for grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-20 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0070F3] text-[10px] font-bold uppercase tracking-widest mb-6">
            Portfolio
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#001B3D] tracking-tight mb-6">Production Archive</h1>
          <p className="text-xl text-[#001B3D]/60 max-w-2xl font-medium leading-relaxed">
            A specialized overview of our creative outputs. Every project is handled with technical rigor and cinematic vision.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {WORK_CATEGORIES.map((category, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedCategory(category)}
              className="group relative cursor-pointer reveal"
            >
              <div className="aspect-[16/9] bg-gray-50 rounded-[2.5rem] overflow-hidden mb-8 border border-gray-100 shadow-sm transition-all duration-700 hover:shadow-2xl">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-[#001B3D]/0 group-hover:bg-[#001B3D]/20 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-[#001B3D] shadow-2xl">
                      <Play className="fill-current w-8 h-8 ml-1" />
                   </div>
                </div>
              </div>
              <div className="flex justify-between items-center px-4">
                <div>
                  <h3 className="text-2xl font-black text-[#001B3D] mb-1 group-hover:text-[#0070F3] transition-colors">{category.name}</h3>
                  <p className="text-[#001B3D]/30 font-bold text-[10px] tracking-[0.2em] uppercase">{category.format}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#0070F3] group-hover:text-white transition-all">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Work Preview Modal - Structured for 4 videos */}
      {selectedCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
          <div 
            className="absolute inset-0 bg-white/95 backdrop-blur-3xl animate-fade-in" 
            onClick={() => setSelectedCategory(null)}
          />
          <div className="relative w-full max-w-7xl bg-white rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl animate-scale-up flex flex-col max-h-[95vh] border border-gray-100">
            <div className="px-8 py-6 md:px-12 md:py-10 flex justify-between items-center border-b border-gray-50 bg-white/50 backdrop-blur-md sticky top-0 z-10">
              <div>
                <h2 className="text-xl md:text-3xl font-black text-[#001B3D] tracking-tighter mb-1">{selectedCategory.name}</h2>
                <p className="text-[10px] md:text-xs font-bold text-[#001B3D]/30 uppercase tracking-[0.2em]">{selectedCategory.format} Showcase</p>
              </div>
              <button 
                onClick={() => setSelectedCategory(null)}
                className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gray-50 flex items-center justify-center text-[#001B3D] hover:bg-red-50 hover:text-red-500 transition-all duration-300 group active:scale-90"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
            
            <div className="p-6 md:p-12 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {selectedCategory.previews.slice(0, 4).map((video, idx) => (
                  <div key={idx} className="group relative aspect-video bg-gray-50 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-[9px] font-black text-white uppercase tracking-widest pointer-events-none">
                      Clip 0{idx + 1}
                    </div>
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                    >
                      <source src={video} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-[#001B3D]/0 group-hover:bg-[#001B3D]/10 transition-colors" />
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0070F3] shadow-lg">
                        <Play className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-16 text-center pt-12 border-t border-gray-50">
                 <p className="text-sm font-bold text-[#001B3D]/40 mb-8 uppercase tracking-widest">Interested in this style for your brand?</p>
                 <Link to="/contact">
                   <Button variant="primary" className="h-16 px-16 text-base">Request a Quote</Button>
                 </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .animate-scale-up { animation: scale-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }
      `}</style>
    </div>
  );
};

export default WorkPage;
