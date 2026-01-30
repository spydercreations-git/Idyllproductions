
import React, { useState } from 'react';
import { CheckCircle2, Users, Target, Award, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showSpecialButton, setShowSpecialButton] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [showHeartsRain, setShowHeartsRain] = useState(false);

  const handleStartConvo = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('contact-us')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  const handleReadyToWorkClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount === 5) {
      setShowSpecialButton(true);
    }
  };

  const handleSpecialButtonClick = () => {
    setShowEasterEgg(true);
    setShowSpecialButton(false);
    
    // Start text animations
    setTimeout(() => {
      setCurrentText('Hello Annika');
      setTimeout(() => {
        setCurrentText('');
        setTimeout(() => {
          setCurrentText('I love you');
          setShowHeartsRain(true);
        }, 1000);
      }, 2000);
    }, 500);
  };

  const closeEasterEgg = () => {
    setShowEasterEgg(false);
    setShowHeartsRain(false);
    setCurrentText('');
    setClickCount(0);
    setShowSpecialButton(false);
  };
  return (
    <div className="bg-white min-h-screen relative" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)`,
      backgroundSize: '120px 120px'
    }}>
      {/* Fade overlay for grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 pointer-events-none" />
      <section className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 md:px-12 relative z-10 animate-page-slide-in">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-24">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-[#001B3D] mb-6 sm:mb-8 md:mb-12">
              About Idyll Productions
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#001B3D]/50 max-w-4xl mx-auto font-normal leading-relaxed px-4 sm:px-0">
              We are a genuine creative studio focused on editing, storytelling, and long term growth with creators and brands. 
              No fancy words, no complicated processes. Just honest work that delivers results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 mb-16 sm:mb-24 md:mb-32">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-50/80 flex items-center justify-center mx-auto mb-8 text-[#0070F3]">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#001B3D] mb-4">Real Team</h3>
              <p className="text-base text-[#001B3D]/50 leading-relaxed font-normal">
                Experienced professionals who understand content creation and audience engagement.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-50/80 flex items-center justify-center mx-auto mb-8 text-[#0070F3]">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#001B3D] mb-4">Clear Process</h3>
              <p className="text-base text-[#001B3D]/50 leading-relaxed font-normal">
                Transparent workflow with regular updates and structured feedback rounds.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-50/80 flex items-center justify-center mx-auto mb-8 text-[#0070F3]">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#001B3D] mb-4">Proven Results</h3>
              <p className="text-base text-[#001B3D]/50 leading-relaxed font-normal">
                Track record of helping creators and brands grow their audiences through better content.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16 sm:mb-24 md:mb-32">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-black text-[#001B3D] mb-4 sm:mb-6">Meet Our Team</h2>
              <p className="text-base sm:text-lg text-[#001B3D]/50 max-w-2xl mx-auto">
                The creative minds behind Idyll Productions, dedicated to bringing your vision to life.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {/* Harsh Pawar - CEO */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 text-center hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500">
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-green-500/10 to-green-600/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    RG
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#001B3D] mb-1 sm:mb-2">Rohit Gaikwad</h3>
                <p className="text-xs sm:text-sm font-semibold text-[#0070F3] uppercase tracking-widest mb-2 sm:mb-4">COO - Chief Operating Officer</p>
                <p className="text-sm sm:text-base text-[#001B3D]/50 leading-relaxed font-normal">
                  Operations expert who operates all teams and ensures smooth project delivery and coordination.
                </p>
              </div>

              {/* Snow - CEM (moved up, now yellow) */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 text-center hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-pink-500/10 to-pink-600/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-500/10 to-purple-600/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-orange-500/10 to-orange-600/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-red-500/10 to-red-600/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-teal-500/10 to-teal-600/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
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
            <div className="bg-gradient-to-b from-slate-50/40 to-white rounded-3xl p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="flex items-center justify-center gap-3 mb-6">
                <h2 
                  className="text-3xl font-black text-[#001B3D] cursor-pointer select-none"
                  onClick={handleReadyToWorkClick}
                >
                  Ready to Work Together?
                </h2>
                
                {/* Small Easter Egg Button next to heading */}
                {showSpecialButton && (
                  <button
                    onClick={handleSpecialButtonClick}
                    className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full flex items-center justify-center hover:from-pink-600 hover:to-red-600 transition-all duration-300 shadow-lg shadow-pink-500/20 hover:scale-110 transform animate-bounce"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </button>
                )}
              </div>
              <p className="text-lg text-[#001B3D]/50 mb-8 max-w-2xl mx-auto">
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

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          {/* Close Button */}
          <button
            onClick={closeEasterEgg}
            className="absolute top-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Text Animation Container */}
          <div className="text-center z-10">
            {currentText && (
              <h1 
                className="text-4xl sm:text-6xl md:text-8xl font-bold text-white animate-fade-slide-up"
                key={currentText}
              >
                {currentText}
              </h1>
            )}
          </div>

          {/* Hearts Rain */}
          {showHeartsRain && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-red-500 text-2xl animate-heart-fall"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                >
                  ❤️
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AboutPage;
