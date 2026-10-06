import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

const PricingPage: React.FC = () => {
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

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#FF8156]/10 text-[#FF8156] border border-[#FF8156]/20 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clear & Scalable Video Production Rates</span>
          </div>

          <h1 className="font-sf-pro text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
            UGC Editing Pricing | From $15 per Edit | Idyll
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
            No long commitments. No hidden fees. Get high-converting UGC and SaaS edits with fast 24-hour turnaround and 3 free revisions included.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
          {/* Starter Plan */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-300 transition-all duration-300">
            <div>
              <div className="inline-block px-3 py-1 bg-slate-200/70 text-slate-700 text-xs font-bold rounded-md mb-4 uppercase tracking-wider">
                Single Edits
              </div>
              <h3 className="font-sf-pro text-2xl font-bold text-slate-900 mb-2">Starter Cut</h3>
              <p className="text-sm text-slate-500 mb-6">Perfect for testing a single UGC ad creative or quick social edit.</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl sm:text-5xl font-extrabold text-slate-900">$15</span>
                <span className="text-slate-500 text-sm font-medium">/ edit</span>
              </div>

              <div className="space-y-3.5 text-sm text-slate-700 mb-8 border-t border-slate-200 pt-6">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#FF8156] flex-shrink-0" />
                  <span>1 ready-to-run UGC video</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#FF8156] flex-shrink-0" />
                  <span>1-day turnaround delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#FF8156] flex-shrink-0" />
                  <span>3 free revisions included</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#FF8156] flex-shrink-0" />
                  <span>Dynamic subtitles & captions</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#FF8156] flex-shrink-0" />
                  <span>Sound design & SFX</span>
                </div>
              </div>
            </div>

            <Link
              to="/contact"
              className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-center transition-all duration-200 text-sm"
            >
              Order Starter Edit
            </Link>
          </div>

          {/* Growth Plan - Featured */}
          <div className="bg-white border-2 border-[#FF8156] rounded-3xl p-8 flex flex-col justify-between shadow-xl relative scale-100 md:scale-105 z-10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF8156] text-white px-4 py-1 rounded-full text-xs font-black tracking-wider uppercase shadow-md">
              Most Popular
            </div>

            <div>
              <div className="inline-block px-3 py-1 bg-[#FF8156]/10 text-[#FF8156] text-xs font-bold rounded-md mb-4 uppercase tracking-wider">
                Batch Testing
              </div>
              <h3 className="font-sf-pro text-2xl font-bold text-slate-900 mb-2">Growth Pack</h3>
              <p className="text-sm text-slate-500 mb-6">Designed for SaaS teams scaling paid TikTok & Meta ad campaigns.</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl sm:text-5xl font-extrabold text-slate-900">$120</span>
                <span className="text-slate-500 text-sm font-medium">/ 10 edits ($12/ea)</span>
              </div>

              <div className="space-y-3.5 text-sm text-slate-700 mb-8 border-t border-slate-200 pt-6">
                <div className="flex items-center gap-3 font-semibold text-slate-900">
                  <Check className="w-4 h-4 text-[#FF8156] flex-shrink-0" />
                  <span>10 UGC video edits included</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#FF8156] flex-shrink-0" />
                  <span>Multiple hook variations for A/B testing</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#FF8156] flex-shrink-0" />
                  <span>24-hour turnaround per batch</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#FF8156] flex-shrink-0" />
                  <span>3 revisions per edit</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#FF8156] flex-shrink-0" />
                  <span>Product UI screen zooms & callouts</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#FF8156] flex-shrink-0" />
                  <span>Dedicated senior editor</span>
                </div>
              </div>
            </div>

            <Link
              to="/contact"
              className="w-full py-4 px-6 rounded-xl bg-[#FF8156] hover:bg-[#e87245] text-white font-bold text-center transition-all duration-200 shadow-md text-sm"
            >
              Get Growth Pack
            </Link>
          </div>

          {/* Scale Plan */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-300 transition-all duration-300">
            <div>
              <div className="inline-block px-3 py-1 bg-slate-200/70 text-slate-700 text-xs font-bold rounded-md mb-4 uppercase tracking-wider">
                Monthly Pipeline
              </div>
              <h3 className="font-sf-pro text-2xl font-bold text-slate-900 mb-2">Scale Partner</h3>
              <p className="text-sm text-slate-500 mb-6">Continuous creative supply for high-spending performance teams.</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl sm:text-5xl font-extrabold text-slate-900">Custom</span>
              </div>

              <div className="space-y-3.5 text-sm text-slate-700 mb-8 border-t border-slate-200 pt-6">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#FF8156] flex-shrink-0" />
                  <span>Unlimited requests queue</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#FF8156] flex-shrink-0" />
                  <span>Direct Slack channel integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#FF8156] flex-shrink-0" />
                  <span>Dedicated editing pod & art director</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#FF8156] flex-shrink-0" />
                  <span>Priority 1-day delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#FF8156] flex-shrink-0" />
                  <span>Custom motion graphics & animations</span>
                </div>
              </div>
            </div>

            <Link
              to="/contact"
              className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-center transition-all duration-200 text-sm"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>

        {/* Pricing FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="font-sf-pro text-3xl font-bold text-slate-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-6">
              <h4 className="font-bold text-slate-900 text-base mb-2">How fast is the one-day turnaround?</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                When you submit your raw creator footage and brief before 6 PM, your finished edit is delivered within 24 hours.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-6">
              <h4 className="font-bold text-slate-900 text-base mb-2">What happens during revisions?</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every video includes 3 free revisions. Leave timestamped notes directly on the video file, and we will update cuts, hooks, captions, or pacing promptly.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-6">
              <h4 className="font-bold text-slate-900 text-base mb-2">Can you handle SaaS dashboard screen recordings?</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Yes! We specialize in cutting together creator talking-head footage with slick UI zooms, cursor animations, and product highlights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
