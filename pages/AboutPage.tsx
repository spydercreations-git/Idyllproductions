
import React from 'react';
import { CheckCircle2, Users, Target, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

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
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-[#001B3D] mb-6">Meet Our Team</h2>
              <p className="text-lg text-[#001B3D]/50 max-w-2xl mx-auto">
                The creative minds behind Idyll Productions, dedicated to bringing your vision to life.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Harsh Pawar - Founder & CEO */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 text-center hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center mx-auto mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                    HP
                  </div>
                </div>
                <h3 className="text-2xl font-black text-[#001B3D] mb-2">Harsh Pawar</h3>
                <p className="text-sm font-semibold text-[#0070F3] uppercase tracking-widest mb-4">Founder & CEO</p>
                <p className="text-base text-[#001B3D]/50 leading-relaxed font-normal">
                  Visionary leader driving the creative direction and strategic growth of Idyll Productions. 
                  Passionate about storytelling and building lasting relationships with creators and brands.
                </p>
              </div>

              {/* Rohit Gaikwad - Manager */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 text-center hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500/10 to-green-600/10 flex items-center justify-center mx-auto mb-6">
                  <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl">
                    RG
                  </div>
                </div>
                <h3 className="text-2xl font-black text-[#001B3D] mb-2">Rohit Gaikwad</h3>
                <p className="text-sm font-semibold text-[#0070F3] uppercase tracking-widest mb-4">Manager</p>
                <p className="text-base text-[#001B3D]/50 leading-relaxed font-normal">
                  Operations expert ensuring smooth project delivery and client satisfaction. 
                  Manages workflows, timelines, and coordinates between creative teams and clients.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-b from-slate-50/40 to-white rounded-3xl p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h2 className="text-3xl font-black text-[#001B3D] mb-6">
                Ready to Work Together?
              </h2>
              <p className="text-lg text-[#001B3D]/50 mb-8 max-w-2xl mx-auto">
                Let's discuss your project and see how we can help you create content that connects with your audience and drives real results.
              </p>
              <button
                onClick={handleStartConvo}
                className="inline-flex items-center gap-3 bg-[#0070F3] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#001B3D] transition-all duration-300 shadow-lg shadow-blue-500/10"
              >
                Start Convo
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
