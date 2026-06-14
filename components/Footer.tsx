import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    // If not on home page, navigate to home first
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="relative pt-20 pb-36 sm:pb-20 px-6 md:px-12 overflow-visible mt-24" style={{ backgroundColor: '#000000' }}>
      {/* SVG Curve at the top to arch upward in the middle */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0]" style={{ transform: 'translateY(-99%)', pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[40px] sm:h-[60px] md:h-[80px]">
          <path d="M0,120 C480,20 960,20 1440,120 L1440,120 L0,120 Z" fill="#000000"></path>
        </svg>
      </div>
      
      {/* Content overlay */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 pb-12 border-b border-slate-800">
          {/* Left: Quick Links */}
          <div className="space-y-4 flex-1">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Quick Links</h3>
            <div className="flex flex-col gap-3 text-xs font-bold text-slate-300">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/work" className="hover:text-white transition-colors">Work</Link>
              <button 
                onClick={() => scrollToSection('our-services')}
                className="hover:text-white transition-colors text-left font-bold"
              >
                Services
              </button>
              <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link to="/brand-book" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                Brand Book
              </Link>
            </div>
          </div>

          {/* Middle: Logo & Branding */}
          <div className="flex flex-col items-center justify-center flex-1 self-center py-6 md:py-0">
            <img 
              src="/logo-white.png" 
              alt="Idyll Productions" 
              className="h-100 w-auto mb-4"
            />
            <p className="text-xs text-slate-400 text-center max-w-xs leading-relaxed font-medium">
              High-performance video editing for modern creators, brands, and businesses.
            </p>
          </div>
          
          {/* Right: Social Links */}
          <div className="space-y-4 flex-1 md:text-right flex flex-col md:items-end w-full">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Social</h3>
            <div className="flex flex-col gap-3 text-xs font-bold text-slate-300 w-full md:items-end">
              <a 
                href="https://www.instagram.com/idyllproductionsofficial/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a 
                href="https://x.com/madebyidyll" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a 
                href="https://discord.com/users/1466675809568817246" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Discord
              </a>
              <a 
                href="https://wa.me/919373032009?text=Hi%20Idyll%20Productions,%20I%20want%20to%20discuss%20a%20video%20project" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                WhatsApp
              </a>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=idyllproductionsoffical@gmail.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-6 flex justify-center px-4">
          <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.12em] sm:tracking-[0.3em] text-center leading-relaxed text-slate-500">
            © 2026 Idyll Productions. All rights reserved. | Designed & Developed by Harsh Pawar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;