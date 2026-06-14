
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
    <footer className="relative py-16 px-6 md:px-12 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dxd79mrse/image/upload/v1772566004/Frame_9_3_ffyoit.png')`,
          }}
        />
      </div>
      
      {/* Content overlay */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 pb-12 border-b border-gray-300">
          <div className="space-y-4">
            <img 
              src="/logo-white.png" 
              alt="Idyll Productions" 
              className="h-10 w-auto mb-3"
            />
            <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-black">Quick Links</h3>
            <div className="flex flex-col gap-3 text-xs font-bold text-black">
              <Link to="/" className="hover:opacity-70 transition-opacity">Home</Link>
              <Link to="/work" className="hover:opacity-70 transition-opacity">Work</Link>
              <button 
                onClick={() => scrollToSection('our-services')}
                className="hover:opacity-70 transition-opacity text-left"
              >
                Services
              </button>
              <Link to="/films" className="hover:opacity-70 transition-opacity">Films</Link>
              <Link to="/about" className="hover:opacity-70 transition-opacity">About</Link>
              <Link to="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-black">Social</h3>
            <div className="flex flex-col gap-3 text-xs font-bold text-black">
              <a 
                href="https://instagram.com/idyllproductions" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                Instagram
              </a>
              <a 
                href="https://twitter.com/idyllprod" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                Twitter
              </a>
              <a 
                href="https://discord.com/users/1011509586919960596" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                Discord
              </a>
              <a 
                href="https://wa.me/919373032009?text=Hi%20Idyll%20Productions,%20I%20want%20to%20discuss%20a%20video%20project" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                WhatsApp
              </a>
              <a 
                href="mailto:contact@idyllproductions.com" 
                className="hover:opacity-70 transition-opacity"
              >
                Email
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-6 flex justify-center">
          <p className="text-[8px] font-black uppercase tracking-[0.4em] text-center" style={{ color: '#000000', opacity: 1 }}>
            © 2023 Idyll Productions. All rights reserved. Developed by Harsh Pawar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;