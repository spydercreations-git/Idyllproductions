
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="relative py-16 px-6 md:px-12 bg-black overflow-hidden">
      {/* Background Image - Idyll text on grassy hill */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-black bg-center bg-no-repeat opacity-50"
          style={{
            backgroundImage: `url('/idyll-hill.png')`,
            backgroundSize: '120%', // More zoom out effect
          }}
        />
      </div>
      
      {/* Content overlay */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 pb-12 border-b border-gray-800">
          <div className="space-y-4">
            <img 
              src="/logo-white.png" 
              alt="Idyll Productions" 
              className="h-10 w-auto mb-3"
            />
            <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-white">Quick Links</h3>
            <div className="flex flex-col gap-3 text-xs font-bold text-gray-300">
              <Link to="/" className="hover:text-[#007AFF] transition-colors">Home</Link>
              <button 
                onClick={() => document.getElementById('our-work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="hover:text-[#007AFF] transition-colors text-left"
              >
                Work
              </button>
              <button 
                onClick={() => document.getElementById('our-services')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="hover:text-[#007AFF] transition-colors text-left"
              >
                Services
              </button>
              <Link to="/films" className="hover:text-[#007AFF] transition-colors">Films</Link>
              <Link to="/about" className="hover:text-[#007AFF] transition-colors">About</Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-white">Social</h3>
            <div className="flex flex-col gap-3 text-xs font-bold text-gray-300">
              <a 
                href="https://www.instagram.com/idyllproductionsofficial/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#007AFF] transition-colors"
              >
                Instagram
              </a>
              <a 
                href="https://x.com/madebyidyll" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#007AFF] transition-colors"
              >
                Twitter
              </a>
              <a 
                href="https://discord.com/users/1011509586919960596" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#007AFF] transition-colors"
              >
                Discord
              </a>
              <a 
                href="https://wa.me/919373032009?text=Hi%20Idyll%20Productions,%20I%20want%20to%20discuss%20a%20video%20project" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#007AFF] transition-colors"
              >
                WhatsApp
              </a>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@idyllproductions.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#007AFF] transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-6 flex justify-center">
          <p className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-400 text-center">
            © 2023 Idyll Productions. All Rights Reserved. Developed by Harsh Pawar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
2222