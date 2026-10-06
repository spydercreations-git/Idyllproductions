import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Zap, Clock, ShieldCheck, Video, Play, Sparkles } from 'lucide-react';

const UgcVideoEditingPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen text-slate-800" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Background radial grid */}
      <div 
        className="absolute top-0 left-0 right-0 h-[85vh] pointer-events-none"
        style={{
          zIndex: 1,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.08) 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
          maskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.2) 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.2) 75%, transparent 100%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-24 relative z-10">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-200 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:-translate-x-1">
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#FF8156]/10 text-[#FF8156] border border-[#FF8156]/20 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turn Raw Footage Into High-Converting Paid Social Creative</span>
          </div>

          <h1 className="font-sf-pro text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05] mb-6">
            UGC video editing that turns raw clips into ads
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            We turn raw creator footage into ready-to-run UGC ads with scroll-stopping hooks, dynamic captions, and conversion-focused motion graphics. Fast one-day turnaround, from $15 per edit, 3 free revisions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-[#FF8156] text-white font-bold rounded-xl hover:bg-[#e87245] transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group text-base"
            >
              Get Started from $15
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/pricing"
              className="w-full sm:w-auto px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-all duration-300 border border-slate-200 flex items-center justify-center gap-2 text-base"
            >
              View Pricing Tiers
            </Link>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-8 hover:border-[#FF8156]/40 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-[#FF8156]/10 flex items-center justify-center text-[#FF8156] mb-6">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-sf-pro text-2xl font-bold text-slate-900 mb-3">1-Day Turnaround</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Never wait weeks for campaign iterations. Upload your raw footage and receive polished, render-ready UGC ads in just 24 hours.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-8 hover:border-[#FF8156]/40 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-[#FF8156]/10 flex items-center justify-center text-[#FF8156] mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-sf-pro text-2xl font-bold text-slate-900 mb-3">Hooks & Motion Graphics</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every UGC ad includes high-impact 3-second opening hook variations, animated captions, sound effects, and branded UI stickers.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-8 hover:border-[#FF8156]/40 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-[#FF8156]/10 flex items-center justify-center text-[#FF8156] mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-sf-pro text-2xl font-bold text-slate-900 mb-3">3 Free Revisions</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We refine each cut until it hits your brand benchmark. Three revision rounds included with transparent feedback loops.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 mb-20 relative overflow-hidden">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF8156]">Simple 3-Step Process</span>
            <h2 className="font-sf-pro text-3xl sm:text-4xl font-bold mt-2">How We Edit Your UGC Ads</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-t border-slate-800 pt-6">
              <span className="text-2xl font-black text-[#FF8156]">01</span>
              <h4 className="font-bold text-lg mt-2 mb-2 text-white">Send Raw Footage</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Drop your creator footage, brief, brand assets, and target aspect ratios (9:16, 1:1, 16:9) into your dedicated portal.
              </p>
            </div>

            <div className="border-t border-slate-800 pt-6">
              <span className="text-2xl font-black text-[#FF8156]">02</span>
              <h4 className="font-bold text-lg mt-2 mb-2 text-white">We Edit & Optimize</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                We craft retention-first hooks, punchy cuts, word-by-word animated captions, and audio sweetening designed to convert.
              </p>
            </div>

            <div className="border-t border-slate-800 pt-6">
              <span className="text-2xl font-black text-[#FF8156]">03</span>
              <h4 className="font-bold text-lg mt-2 mb-2 text-white">Review & Scale</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Receive your finished UGC video in 24 hours. Request instant revisions or push directly into TikTok, Meta, and YouTube ad managers.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="text-center bg-gradient-to-r from-slate-50 via-orange-50/30 to-slate-50 border border-slate-200 rounded-3xl p-10 sm:p-14">
          <h2 className="font-sf-pro text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Ready to turn your raw clips into winning UGC ads?
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto mb-8 text-base">
            Starts from just $15 per edit with 1-day delivery. Let our dedicated editors handle your paid media creative pipeline.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-[#FF8156] text-white font-bold rounded-xl hover:bg-[#e87245] transition-all duration-300 shadow-md"
            >
              Order Your First Edit
            </Link>
            <a
              href="/#our-work"
              className="px-8 py-3.5 bg-white text-slate-800 font-bold rounded-xl hover:bg-slate-50 transition-all duration-300 border border-slate-200"
            >
              Explore UGC Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UgcVideoEditingPage;
