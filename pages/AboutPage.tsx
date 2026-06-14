import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
  // Initialize Cal.com floating popup
  useEffect(() => {
    // Add custom CSS to ensure floating button is visible
    const style = document.createElement('style');
    style.innerHTML = `
      /* Cal.com floating button visibility fix */
      [data-cal-namespace="quick-meet"] {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 9999 !important;
        pointer-events: auto !important;
      }
      
      /* Ensure the button itself is visible */
      cal-floating-button,
      [class*="cal-floating"],
      [id*="cal-floating"] {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        border-radius: 9999px !important;
        overflow: visible !important;
      }
      
      /* Fix any transform or positioning issues */
      cal-floating-button button,
      [data-cal-namespace] button {
        border-radius: 9999px !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
      }
    `;
    document.head.appendChild(style);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function (C, A, L) { 
        let p = function (a, ar) { a.q.push(ar); }; 
        let d = C.document; 
        C.Cal = C.Cal || function () { 
          let cal = C.Cal; 
          let ar = arguments; 
          if (!cal.loaded) { 
            cal.ns = {}; 
            cal.q = cal.q || []; 
            d.head.appendChild(d.createElement("script")).src = A; 
            cal.loaded = true; 
          } 
          if (ar[0] === L) { 
            const api = function () { p(api, arguments); }; 
            const namespace = ar[1]; 
            api.q = api.q || []; 
            if(typeof namespace === "string"){
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar); 
            return;
          } 
          p(cal, ar); 
        }; 
      })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", "quick-meet", {origin:"https://app.cal.com"});
      Cal.ns["quick-meet"]("floatingButton", {
        "calLink":"harsh-pawar-vtrl47/quick-meet",
        "config":{"layout":"month_view","useSlotsViewOnSmallScreen":"true"},
        "buttonText":"Book a Call"
      }); 
      Cal.ns["quick-meet"]("ui", {
        "cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#ffffff"}},
        "hideEventTypeDetails":false,
        "layout":"month_view"
      });
    `;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(style);
      document.body.removeChild(script);
    };
  }, []);

  const values = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Real Team",
      description: "Experienced professionals who understand content creation and audience engagement."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Clear Process",
      description: "Transparent workflow with regular updates and structured feedback rounds."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Proven Results",
      description: "Track record of helping creators and brands grow their audiences through better content."
    }
  ];

  const team = [
    {
      name: "Harsh Pawar",
      role: "CEO - CHIEF EXECUTIVE OFFICER",
      description: "CEO and Founder of Idyll Productions. Harsh is a professional motion designer and entrepreneur from Maharashtra, India (originally from the Kokan region), who operates the company from Mumbai."
    },
    {
      name: "Rohit Gaikwad",
      role: "COO - CHIEF OPERATING OFFICER",
      description: "Operations expert who operates all teams and ensures smooth project delivery and coordination."
    },
    {
      name: "Zada",
      role: "CSM - COMMERCIAL SALES MANAGER",
      description: "Commercial sales manager who drives business growth and manages key client relationships."
    },
    {
      name: "Smita",
      role: "CSO - CHIEF SALES OFFICER",
      description: "Our sales officer who handles our great clients and builds lasting business relationships."
    },
    {
      name: "Void",
      role: "CCO - CHIEF COMMERCIAL OFFICER",
      description: "Commercial manager handling client management and business development strategies."
    },
    {
      name: "Vishal",
      role: "CIO - CHIEF INFORMATION OFFICER",
      description: "Information manager and database saver, handling all technical data and systems."
    },
    {
      name: "Mansi",
      role: "CFO - CHIEF FINANCIAL OFFICER",
      description: "Financial manager who handles all payments and financial operations of the company."
    },
    {
      name: "Parth",
      role: "CDO - CHIEF DATA OFFICER",
      description: "Manages the industrial software for internal databases and ensures data integrity across all systems."
    }
  ];

  return (
    <div className="bg-white min-h-screen relative text-slate-800" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Global dots pattern */}
      <div className="absolute top-0 left-0 right-0 h-[85vh] pointer-events-none" style={{
        zIndex: 1,
        backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.12) 1.2px, transparent 1.2px)`,
        backgroundSize: '24px 24px',
        maskImage: `linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.2) 75%, transparent 100%)`,
        WebkitMaskImage: `linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.2) 75%, transparent 100%)`
      }} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden z-10">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-slate-50 border border-slate-200/60 rounded-full mb-8 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{
              background: 'linear-gradient(135deg, #FF6B35, #FF8C00)'
            }}></span>
            <span className="text-slate-700 font-semibold text-xs sm:text-sm uppercase tracking-wider">
              About Our Studio
            </span>
          </div>
          <h1 className="font-sf-pro text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
            About <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF8C00] to-[#E8650A] text-transparent bg-clip-text">Idyll Productions</span>
          </h1>
          <p className="font-inter text-base sm:text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed px-4">
            We are a genuine creative studio focused on editing, storytelling, and long term growth with creators and brands. No fancy words, no complicated processes. Just honest work that delivers results.
          </p>
        </div>
      </section>

      {/* Who We Are & What We Do */}
      <section className="py-16 px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Who We Are */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Who We Are</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Idyll Productions is a creative studio that specializes in video editing and storytelling. We partner with content creators, brands, and businesses to create videos that actually perform and connect with audiences.
                </p>
                <p>
                  We believe in transparency and building real relationships with our clients. Our approach is simple: understand what you need, deliver quality work on time, and help you grow your audience through better content.
                </p>
                <p>
                  With a production net worth around 5 million to 10 million rupees, we have the resources and experience to handle projects of any scale. We are real, transparent, and serious about our work.
                </p>
              </div>
            </div>

            {/* What We Do */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-slate-900">What We Do</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  We edit videos for YouTube creators, short form content for social media, product videos for e-commerce, SaaS companies, and gaming content that keeps viewers engaged. We also produce original films and cinematic advertisements when projects call for it.
                </p>
                <p>
                  Our team uses professional tools and proven workflows to ensure every project meets high standards. We focus on clean storytelling, strategic pacing, and platform specific optimization.
                </p>
                <p>
                  We manage everything through Notion for clear communication and transparent progress tracking. No confusion, no delays, just smooth collaboration from start to finish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-[#FF6B35] hover:shadow-xl hover:ring-1 hover:ring-[#FF6B35] transition-all duration-300"
              >
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-[#FF6B35]/10"
                >
                  <div className="text-[#FF6B35]">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-sf-pro text-3xl sm:text-4xl font-bold text-center mb-12 text-slate-900">Our Team</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-[#FF6B35] hover:shadow-xl hover:ring-1 hover:ring-[#FF6B35] transition-all duration-300 text-center"
              >
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-orange-50 border border-orange-200"
                >
                  <Users className="w-8 h-8 text-[#FF6B35]" />
                </div>
                <h3 className="text-xl font-bold mb-1 text-slate-900">{member.name}</h3>
                <p className="text-xs font-bold mb-3 text-[#FF6B35] uppercase tracking-wider">
                  {member.role}
                </p>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}

            {/* Our Editors Card */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-[#FF6B35] hover:shadow-xl hover:ring-1 hover:ring-[#FF6B35] transition-all duration-300 text-center">
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-orange-50 border border-orange-200"
              >
                <Users className="w-8 h-8 text-[#FF6B35]" />
              </div>
              <h3 className="text-xl font-bold mb-1 text-slate-900">Our Editors</h3>
              <p className="text-xs font-bold mb-3 text-[#FF6B35] uppercase tracking-wider">
                20+ HIGH SKILLED EDITORS
              </p>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                A talented team of 20+ professional editors working with us to deliver exceptional content every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IdyllTrack Section */}
      <section className="py-16 px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8 shadow-md hover:border-[#FF6B35] transition-all duration-300">
            <img
              src="https://res.cloudinary.com/dokban4io/image/upload/q_auto/f_auto/v1778411351/IdyllTrack_lynurx.png"
              alt="IdyllTrack"
              className="h-20 w-auto object-contain flex-shrink-0"
            />
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              All transactions and payments are securely managed through our official application, <span className="font-semibold text-slate-900">IdyllTrack</span>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 md:px-8 mb-16 relative z-10">
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl p-8 sm:p-12 md:p-16 relative" style={{
          background: 'linear-gradient(135deg, #FF6B35 0%, #E8650A 100%)'
        }}>
          {/* Glass Overlay effects */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amber-400/20 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="font-sf-pro text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
              Ready to Work Together?
            </h2>
            <p className="font-inter text-base sm:text-lg text-white/90 mb-10 leading-relaxed">
              Let's discuss your project and see how we can help you create content that connects with your audience and drives real results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const cal = (window as any).Cal;
                  if (cal && cal.ns && cal.ns["quick-meet"]) {
                    cal.ns["quick-meet"]("modal", {
                      calLink: "harsh-pawar-vtrl47/quick-meet",
                      config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"}
                    });
                  }
                }}
                className="w-full sm:w-auto relative h-12 px-10 rounded-lg text-base font-semibold text-slate-900 bg-white hover:bg-slate-50 transition-all duration-300 hover:shadow-lg hover:scale-105 transform flex items-center justify-center gap-2"
              >
                Book a Call
              </button>
              
              <Link
                to="/contact"
                className="w-full sm:w-auto relative h-12 px-10 rounded-lg text-base font-semibold text-white border border-white/40 bg-transparent hover:bg-white/10 hover:border-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                Start Convo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
