
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleServicesClick = () => {
    if (location.pathname === '/') {
      // If on home page, scroll to the services section
      document.getElementById('our-services')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    } else {
      // If on other page, navigate to home and then scroll
      navigate('/');
      setTimeout(() => {
        document.getElementById('our-services')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      // If on home page, scroll to top
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    } else {
      // If on other page, navigate to home
      navigate('/');
    }
  };

  const handleOurWorkClick = () => {
    if (location.pathname === '/') {
      // If on home page, scroll to the section
      document.getElementById('our-work')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    } else {
      // If on other page, navigate to home and then scroll
      navigate('/');
      setTimeout(() => {
        document.getElementById('our-work')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  };

  const handleContactClick = () => {
    if (location.pathname === '/') {
      // If on home page, scroll to the contact section
      document.getElementById('contact-us')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    } else {
      // If on other page, navigate to home and then scroll
      navigate('/');
      setTimeout(() => {
        document.getElementById('contact-us')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  };

  const handleFilmsClick = () => {
    navigate('/films');
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  const navLinks: Array<{ name: string; path: string; onClick?: () => void }> = [
    { name: 'Home', path: '/', onClick: handleHomeClick },
    { name: 'Our Work', path: '#our-work', onClick: handleOurWorkClick },
    { name: 'Our Services', path: '#our-services', onClick: handleServicesClick },
    { name: 'Our Films', path: '/films', onClick: handleFilmsClick },
    { name: 'About Us', path: '/about', onClick: handleAboutClick },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 py-6 transition-all duration-500">
      <div className={`transition-all duration-500 ease-out mx-auto px-8 ${
        scrolled 
          ? 'max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-lg' 
          : 'max-w-6xl bg-transparent'
      }`}>
        <div className="flex justify-between items-center py-3">
          <button onClick={handleHomeClick} className="flex items-center">
            <img 
              src="/logo-black.png" 
              alt="Idyll Productions" 
              className="w-auto h-12 transition-all duration-500 ease-out opacity-90 hover:opacity-100"
            />
          </button>
          
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              link.onClick ? (
                <button
                  key={link.path}
                  onClick={link.onClick}
                  className={`text-sm font-medium transition-all duration-300 ${
                    location.pathname === '/' && location.hash === link.path
                    ? 'text-slate-900' 
                    : 'text-slate-900 hover:text-slate-700'
                  }`}
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-all duration-300 ${
                    location.pathname === link.path 
                    ? 'text-slate-900' 
                    : 'text-slate-900 hover:text-slate-700'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          <button 
            onClick={handleContactClick}
            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-400 text-white border border-blue-300 hover:from-blue-700 hover:to-blue-500 transition-all duration-300 shadow-sm"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
