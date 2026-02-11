
import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Users, Target, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  // Scroll animation refs
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = contentRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleSections((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    contentRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !contentRefs.current.includes(el)) {
      contentRefs.current.push(el);
    }
  };

  const handleStartConvo = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('contact-us')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };
  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      {/* Organic dot pattern with varying opacity */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.15) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        maskImage: `
          radial-gradient(ellipse 800px 600px at 20% 30%, black 0%, transparent 70%),
          radial-gradient(ellipse 600px 800px at 80% 60%, black 0%, transparent 70%),
          radial-gradient(ellipse 700px 500px at 50% 90%, black 0%, transparent 70%)
        `,
        WebkitMaskImage: `
          radial-gradient(ellipse 800px 600px at 20% 30%, black 0%, transparent 70%),
          radial-gradient(ellipse 600px 800px at 80% 60%, black 0%, transparent 70%),
          radial-gradient(ellipse 700px 500px at 50% 90%, black 0%, transparent 70%)
        `,
        maskComposite: 'add',
        WebkitMaskComposite: 'source-over'
      }} />
      {/* Fade overlay for grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 pointer-events-none" />
      <section className="pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-12 relative z-10 animate-page-slide-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#001B3D] mb-4 sm:mb-6 md:mb-8">
              About Idyll Productions
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#001B3D]/50 max-w-5xl mx-auto font-normal leading-relaxed px-4 sm:px-0">
              We are a genuine creative studio focused on editing, storytelling, and long term growth with creators and brands. 
              No fancy words, no complicated processes. Just honest work that delivers results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16 md:mb-20">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-2xl sm:text-3xl font-black text-[#001B3D] mb-4 sm:mb-6 md:mb-8">Who We Are</h2>
              <p className="text-base sm:text-lg text-[#001B3D]/60 leading-relaxed font-normal">
                Idyll Productions is a creative studio that specializes in video editing and storytelling. We work with content creators, 
                brands, and businesses to create videos that actually perform and connect with audiences.
              </p>
              <p className="text-base sm:text-lg text-[#001B3D]/60 leading-relaxed font-normal">
                We believe in transparency and building real relationships with our clients. Our approach is simple: understand what you need, 
                deliver quality work on time, and help you grow your audience through better content.
              </p>
              <p className="text-base sm:text-lg text-[#001B3D]/60 leading-relaxed font-normal">
                With a production net worth around 5 million to 10 million rupees, we have the resources and experience to handle projects of any scale. 
                We are real, transparent, and serious about our work.
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-2xl sm:text-3xl font-black text-[#001B3D] mb-4 sm:mb-6 md:mb-8">What We Do</h2>
              <p className="text-base sm:text-lg text-[#001B3D]/60 leading-relaxed font-normal">
                We edit videos for YouTube creators, short form content for social media, product demos for SaaS companies, 
                and gaming content that keeps viewers engaged. We also produce original films and cinematic advertisements when projects call for it.
              </p>
              <p className="text-base sm:text-lg text-[#001B3D]/60 leading-relaxed font-normal">
                Our team uses professional tools and proven workflows to ensure every project meets high standards. 
                We focus on clean storytelling, strategic pacing, and platform specific optimization.
              </p>
              <p className="text-base sm:text-lg text-[#001B3D]/60 leading-relaxed font-normal">
                We manage everything through Notion for clear communication and transparent progress tracking. 
                No confusion, no delays, just smooth collaboration from start to finish.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-16 md:mb-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-50/80 flex items-center justify-center mx-auto mb-6 sm:mb-7 md:mb-8 text-[#0070F3]">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#001B3D] mb-3 sm:mb-4">Real Team</h3>
              <p className="text-base text-[#001B3D]/50 leading-relaxed font-normal">
                Experienced professionals who understand content creation and audience engagement.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-50/80 flex items-center justify-center mx-auto mb-6 sm:mb-7 md:mb-8 text-[#0070F3]">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#001B3D] mb-3 sm:mb-4">Clear Process</h3>
              <p className="text-base text-[#001B3D]/50 leading-relaxed font-normal">
                Transparent workflow with regular updates and structured feedback rounds.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-50/80 flex items-center justify-center mx-auto mb-6 sm:mb-7 md:mb-8 text-[#0070F3]">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#001B3D] mb-3 sm:mb-4">Proven Results</h3>
              <p className="text-base text-[#001B3D]/50 leading-relaxed font-normal">
                Track record of helping creators and brands grow their audiences through better content.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#001B3D] mb-3 sm:mb-4 md:mb-6">Meet Our Team</h2>
              <p className="text-base sm:text-lg text-[#001B3D]/50 max-w-2xl mx-auto">
                The creative minds behind Idyll Productions, dedicated to bringing your vision to life.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {/* Harsh Pawar - CEO */}
              <div 
                ref={addToRefs}
                className={`bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-slate-200 text-center hover:shadow-xl hover:-translate-y-2 hover:border-blue-300 transition-all duration-700 ${
                  visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '0ms' }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    HP
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#001B3D] mb-1 sm:mb-2">Harsh Pawar</h3>
                <p className="text-xs sm:text-sm font-semibold text-[#0070F3] uppercase tracking-widest mb-2 sm:mb-4">CEO - Chief Executive Officer</p>
                <p className="text-sm sm:text-base text-[#001B3D]/50 leading-relaxed font-normal">
                  Founder & Owner. Visionary leader driving the creative direction and strategic growth of Idyll Productions.
                </p>
              </div>

              {/* Rohit - COO */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 text-center hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    RG
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#001B3D] mb-1 sm:mb-2">Rohit Gaikwad</h3>
                <p className="text-xs sm:text-sm font-semibold text-[#0070F3] uppercase tracking-widest mb-2 sm:mb-4">COO - Chief Operating Officer</p>
                <p className="text-sm sm:text-base text-[#001B3D]/50 leading-relaxed font-normal">
                  Operations expert who operates all teams and ensures smooth project delivery and coordination.
                </p>
              </div>

              {/* Snow - CEM (moved up, now blue) */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 text-center hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    SN
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#001B3D] mb-1 sm:mb-2">Snow</h3>
                <p className="text-xs sm:text-sm font-semibold text-[#0070F3] uppercase tracking-widest mb-2 sm:mb-4">CEM - Chief Editing Manager</p>
                <p className="text-sm sm:text-base text-[#001B3D]/50 leading-relaxed font-normal">
                  Editing manager who handles our talented editors and ensures top-quality video production.
                </p>
              </div>

              {/* Smita - CSO (moved down, changed from CSM to CSO) */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 text-center hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    SM
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#001B3D] mb-1 sm:mb-2">Smita</h3>
                <p className="text-xs sm:text-sm font-semibold text-[#0070F3] uppercase tracking-widest mb-2 sm:mb-4">CSO - Chief Sales Officer</p>
                <p className="text-sm sm:text-base text-[#001B3D]/50 leading-relaxed font-normal">
                  Our sales officer who handles our great clients and builds lasting business relationships.
                </p>
              </div>

              {/* Void - CCO */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 text-center hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    VD
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#001B3D] mb-1 sm:mb-2">Void</h3>
                <p className="text-xs sm:text-sm font-semibold text-[#0070F3] uppercase tracking-widest mb-2 sm:mb-4">CCO - Chief Commercial Officer</p>
                <p className="text-sm sm:text-base text-[#001B3D]/50 leading-relaxed font-normal">
                  Commercial manager handling client management and business development strategies.
                </p>
              </div>

              {/* Vishal - CIO */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 text-center hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    VS
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#001B3D] mb-1 sm:mb-2">Vishal</h3>
                <p className="text-xs sm:text-sm font-semibold text-[#0070F3] uppercase tracking-widest mb-2 sm:mb-4">CIO - Chief Information Officer</p>
                <p className="text-sm sm:text-base text-[#001B3D]/50 leading-relaxed font-normal">
                  Information manager and database saver, handling all technical data and systems.
                </p>
              </div>

              {/* Mansi - CFO */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 text-center hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    MN
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#001B3D] mb-1 sm:mb-2">Mansi</h3>
                <p className="text-xs sm:text-sm font-semibold text-[#0070F3] uppercase tracking-widest mb-2 sm:mb-4">CFO - Chief Financial Officer</p>
                <p className="text-sm sm:text-base text-[#001B3D]/50 leading-relaxed font-normal">
                  Financial manager who handles all payments and financial operations of the company.
                </p>
              </div>

              {/* Vedant - Lead Project Manager */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 text-center hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    VT
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#001B3D] mb-1 sm:mb-2">Vedant</h3>
                <p className="text-xs sm:text-sm font-semibold text-[#0070F3] uppercase tracking-widest mb-2 sm:mb-4">Editor Animations Head</p>
                <p className="text-sm sm:text-base text-[#001B3D]/50 leading-relaxed font-normal">
                  Vedant does animations very good and brings creative vision to life through motion graphics.
                </p>
              </div>

              {/* Raj - Lead Project Manager */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 text-center hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    RJ
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#001B3D] mb-1 sm:mb-2">Raj</h3>
                <p className="text-xs sm:text-sm font-semibold text-[#0070F3] uppercase tracking-widest mb-2 sm:mb-4">Editor Color Grading Head</p>
                <p className="text-sm sm:text-base text-[#001B3D]/50 leading-relaxed font-normal">
                  Raj handles color grading parts specialized and ensures perfect visual aesthetics in every project.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-b from-slate-50/40 to-white rounded-3xl p-8 sm:p-10 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h2 className="text-2xl sm:text-3xl font-black text-[#001B3D] mb-4 sm:mb-5 md:mb-6">
                Ready to Work Together?
              </h2>
              <p className="text-base sm:text-lg text-[#001B3D]/50 mb-6 sm:mb-7 md:mb-8 max-w-2xl mx-auto">
                Let's discuss your project and see how we can help you create content that connects with your audience and drives real results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://calendly.com/smitaidyllproductions/talk-with-idyll-productions-csm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#0070F3] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#001B3D] transition-all duration-300 shadow-lg shadow-blue-500/10 hover:scale-105 transform"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book a Call
                </a>
                <button
                  onClick={handleStartConvo}
                  className="inline-flex items-center gap-3 bg-transparent text-[#0070F3] px-8 py-4 rounded-full font-semibold border-2 border-[#0070F3] hover:bg-[#0070F3] hover:text-white transition-all duration-300 hover:scale-105 transform"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                  </svg>
                  Start Convo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
