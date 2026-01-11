
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleServicesClick = () => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      document.getElementById('our-services')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    } else {
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
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    } else {
      navigate('/');
    }
  };

  const handleWorkClick = () => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      document.getElementById('our-work')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    } else {
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
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      document.getElementById('contact-us')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    } else {
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
    setMobileMenuOpen(false);
    navigate('/films');
  };

  const handleAboutClick = () => {
    setMobileMenuOpen(false);
    navigate('/about');
  };

  const navLinks: Array<{ name: string; path: string; onClick?: () => void }> = [
    { name: 'Home', path: '/', onClick: handleHomeClick },
    { name: 'Work', path: '#work', onClick: handleWorkClick },
    { name: 'Services', path: '#services', onClick: handleServicesClick },
    { name: 'Films', path: '/films', onClick: handleFilmsClick },
    { name: 'About', path: '/about', onClick: handleAboutClick },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 py-4 md:py-6 transition-all duration-500">
      <div className={`transition-all duration-500 ease-out mx-auto px-4 md:px-8 ${
        scrolled 
          ? 'max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-lg' 
          : 'max-w-6xl bg-transparent'
      }`}>
        <div className="flex justify-between items-center py-2 md:py-3">
          {/* Logo */}
          <button onClick={handleHomeClick} className="flex items-center">
            <img 
              src="/logo-black.png" 
              alt="Idyll Productions" 
              className="w-auto h-8 md:h-12 transition-all duration-500 ease-out opacity-90 hover:opacity-100"
            />
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
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

          {/* Desktop Contact Button */}
          <button 
            onClick={handleContactClick}
            className="hidden md:block px-4 lg:px-5 py-2 lg:py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-400 text-white border border-blue-300 hover:from-blue-700 hover:to-blue-500 transition-all duration-300 shadow-sm"
          >
            Contact Us
          </button>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
          >
            <div className={`w-6 h-0.5 bg-slate-900 transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}></div>
            <div className={`w-6 h-0.5 bg-slate-900 transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}></div>
            <div className={`w-6 h-0.5 bg-slate-900 transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}></div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-lg animate-fade-in">
            <div className="py-4 px-6 space-y-4">
              {navLinks.map((link) => (
                link.onClick ? (
                  <button
                    key={link.path}
                    onClick={link.onClick}
                    className="block w-full text-left text-base font-medium text-slate-900 hover:text-blue-600 transition-colors duration-300 py-2"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-base font-medium text-slate-900 hover:text-blue-600 transition-colors duration-300 py-2"
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <button 
                onClick={handleContactClick}
                className="w-full mt-4 px-4 py-3 rounded-lg text-base font-medium bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:from-blue-700 hover:to-blue-500 transition-all duration-300 shadow-sm"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
