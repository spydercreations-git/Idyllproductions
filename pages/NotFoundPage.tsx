import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight, Film, Clapperboard } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div
      className="min-h-[85vh] bg-white flex flex-col justify-center items-center px-6 pt-32 sm:pt-40 pb-20 sm:pb-28 relative overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.08) 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Ambient warm orange background glow */}
      <div
        className="absolute w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full blur-3xl pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle, #FF8156 0%, transparent 70%)',
          top: '25%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Film / Cut Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF8156]/10 border border-[#FF8156]/25 text-[#FF8156] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#FF8156] animate-ping" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF8156] -ml-2.5" />
          <span>Cut 404 • Missing Scene</span>
        </div>

        {/* Big 404 Display with Styled Clapperboard Tag */}
        <div className="relative inline-block mb-6 select-none">
          <h1 className="text-8xl sm:text-9xl md:text-[11rem] font-black tracking-tighter text-slate-900 leading-none block font-sf-pro">
            404
          </h1>
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-mono tracking-wider uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap border border-slate-700">
            <Clapperboard className="w-3.5 h-3.5 text-[#FF8156]" />
            <span>Page Not Found</span>
          </div>
        </div>

        {/* Narrative & Explanation */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3 font-sf-pro">
          Looks like this cut didn’t make the final edit.
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-slate-500 max-w-lg mx-auto mb-10 leading-relaxed font-inter">
          The page you requested doesn't exist, was moved, or got trimmed in post-production. Don't worry—the rest of the reel is ready.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-slate-900 hover:bg-[#FF8156] text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group cursor-pointer"
          >
            <Home className="w-4 h-4 text-[#FF8156] group-hover:text-white transition-colors" />
            <span>Go Back to Home</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="/#our-work"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-semibold text-sm sm:text-base hover:bg-slate-50 transition-all duration-300 shadow-sm"
          >
            <Film className="w-4 h-4 text-slate-500" />
            <span>Explore Work</span>
          </a>
        </div>

        {/* Quick Recovery Links */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 w-full max-w-md mx-auto">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Or jump directly to
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <a
              href="/#our-work"
              className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Work Portfolio
            </a>
            <Link
              to="/services"
              className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Services
            </Link>
            <Link
              to="/pricing"
              className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/category/ugc"
              className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              UGC Videos
            </Link>
            <Link
              to="/contact"
              className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
