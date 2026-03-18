import React from 'react';
import { ExternalLink, Instagram, Youtube, Twitter, Linkedin } from 'lucide-react';

const SocialsPage: React.FC = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      handle: '@idyllproductions',
      url: 'https://instagram.com/idyllproductions',
      icon: <Instagram className="w-8 h-8" />,
      description: 'Behind the scenes content and daily updates'
    },
    {
      name: 'YouTube',
      handle: 'Idyll Productions',
      url: 'https://youtube.com/@idyllproductions',
      icon: <Youtube className="w-8 h-8" />,
      description: 'Our latest work and creative process videos'
    },
    {
      name: 'Twitter',
      handle: '@idyllprod',
      url: 'https://twitter.com/idyllprod',
      icon: <Twitter className="w-8 h-8" />,
      description: 'Industry insights and quick updates'
    },
    {
      name: 'LinkedIn',
      handle: 'Idyll Productions',
      url: 'https://linkedin.com/company/idyllproductions',
      icon: <Linkedin className="w-8 h-8" />,
      description: 'Professional updates and company news'
    }
  ];

  return (
    <div className="bg-white min-h-screen relative" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)`,
      backgroundSize: '120px 120px'
    }}>
      {/* Fade overlay for grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 pointer-events-none" />
      <section className="pt-40 pb-32 px-6 md:px-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#001B3D] mb-12">
              Follow Our Journey
            </h1>
            <p className="text-xl text-[#001B3D]/50 max-w-3xl mx-auto font-normal">
              Stay connected with Idyll Productions across all platforms. Get the latest updates, behind-the-scenes content, and creative insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] hover:-translate-y-3 transition-all duration-700 hover:bg-white"
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50/80 flex items-center justify-center text-[#0070F3] group-hover:bg-blue-50/80 group-hover:scale-105 transition-all duration-500">
                    {social.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#001B3D] mb-1">{social.name}</h3>
                    <p className="text-sm font-semibold text-[#0070F3]/80 uppercase tracking-widest">{social.handle}</p>
                  </div>
                </div>
                
                <p className="text-lg text-[#001B3D]/50 leading-relaxed font-normal mb-8">
                  {social.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#001B3D]/30">Visit Platform</span>
                  <div className="w-12 h-12 rounded-full bg-slate-50/80 flex items-center justify-center group-hover:bg-[#0070F3] group-hover:text-white transition-all duration-500">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-24 text-center">
            <div className="bg-gradient-to-b from-slate-50/40 to-white rounded-3xl p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h2 className="text-3xl font-black text-[#001B3D] mb-6">
                Want to Collaborate?
              </h2>
              <p className="text-lg text-[#001B3D]/50 mb-8 max-w-2xl mx-auto">
                Reach out to us directly for partnerships, collaborations, or just to say hello.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#0070F3] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#001B3D] transition-all duration-300 shadow-lg shadow-blue-500/10"
              >
                Get in Touch
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SocialsPage;