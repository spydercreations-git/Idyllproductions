import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Sparkles, ArrowRight, Laptop, Film, Zap, Layers, PlaySquare } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const services = [
    {
      title: "UGC Video Ads",
      slug: "/ugc-video-editing",
      desc: "Turn creator footage into viral, high-converting TikTok, Instagram Reels, and YouTube Shorts paid social creative.",
      features: ["3-second hook variations", "Dynamic animated subtitles", "Native sound effects & music", "1-day turnaround"],
      icon: <Video className="w-8 h-8 text-[#FF8156]" />
    },
    {
      title: "SaaS Product & Explainer Videos",
      slug: "/category/saas-tech-videos",
      desc: "Highlight software workflows, UI dashboards, and key value propositions with crisp motion graphics and zooms.",
      features: ["Screen recording enhancement", "Kinetic typography", "Feature callout overlays", "Conversion-focused pacing"],
      icon: <Laptop className="w-8 h-8 text-[#FF8156]" />
    },
    {
      title: "Short-Form Retention Content",
      slug: "/category/short-form-content",
      desc: "Algorithm-optimized vertical videos engineered for maximum watch time, retention spikes, and follower growth.",
      features: ["Pattern interrupts", "Pacing & rhythm edits", "Sound design", "Platform-native formats"],
      icon: <Zap className="w-8 h-8 text-[#FF8156]" />
    },
    {
      title: "YouTube Long-Form Editing",
      slug: "/category/long-form",
      desc: "Documentary-style storytelling, podcasts, and long-form video essays edited to sustain 50%+ retention rates.",
      features: ["Multi-cam syncing", "Custom chapter animations", "B-roll integration", "Color grading & mastering"],
      icon: <PlaySquare className="w-8 h-8 text-[#FF8156]" />
    },
    {
      title: "Motion Graphics & Kinetic Design",
      slug: "/#our-work",
      desc: "2D animations, custom lower-thirds, graphic title cards, and logo stingers tailored to your brand identity.",
      features: ["Custom animated assets", "Brand guideline matching", "Clean vector movement", "Transparent alpha exports"],
      icon: <Layers className="w-8 h-8 text-[#FF8156]" />
    },
    {
      title: "Cinematic Color & Sound Design",
      slug: "/category/rhythmic-montage",
      desc: "Professional color grading and immersive audio design that transforms standard camera output into cinema.",
      features: ["Mood-specific color grading", "Foley & ambient audio", "Voice mastering & cleanup", "Loudness normalization"],
      icon: <Film className="w-8 h-8 text-[#FF8156]" />
    }
  ];

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
            <span>Comprehensive Video Production & Creative Editing</span>
          </div>

          <h1 className="font-sf-pro text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
            Video Editing Services | Idyll Productions
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            From high-converting UGC video ads and SaaS product demos to YouTube retention editing, we deliver dependable creative post-production at scale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FF8156] text-white font-bold rounded-xl hover:bg-[#e87245] transition-all duration-300 shadow-md flex items-center justify-center gap-2 text-base"
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pricing"
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-100 text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-all duration-300 border border-slate-200 text-base"
            >
              View Pricing
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 hover:border-[#FF8156]/50 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center shadow-sm mb-6">
                  {service.icon}
                </div>
                <h3 className="font-sf-pro text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">{service.desc}</p>
                <div className="space-y-2 mb-8 border-t border-slate-200/60 pt-4">
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF8156]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={service.slug}
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-[#FF8156] transition-colors"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-slate-900 text-white rounded-3xl p-10 sm:p-14">
          <h2 className="font-sf-pro text-3xl sm:text-4xl font-bold mb-4">
            Need customized video editing for your brand?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 text-base">
            Reach out directly to Harsh, Rohit, or Zada to schedule an onboarding call and discuss tailored creative workflows.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FF8156] text-white font-bold rounded-xl hover:bg-[#e87245] transition-all duration-300 shadow-md"
          >
            Contact Our Team
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
