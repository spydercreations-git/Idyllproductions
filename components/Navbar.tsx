
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GlassSurface from './GlassSurface';

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
    navigate('/contact');
  };

  const handleUgcClick = () => {
    setMobileMenuOpen(false);
    navigate('/ugc');
  };

  const handleAboutClick = () => {
    setMobileMenuOpen(false);
    navigate('/about');
  };

  const isLinkActive = (linkPath: string) => {
    if (linkPath.startsWith('/')) {
      return location.pathname === linkPath;
    }
    return location.pathname === '/' && location.hash === linkPath;
  };

  const navLinks: Array<{ name: string; path: string; onClick?: () => void }> = [
    { name: 'Home', path: '/', onClick: handleHomeClick },
    { name: 'Work', path: '#work', onClick: handleWorkClick },
    { name: 'Services', path: '#services', onClick: handleServicesClick },
    { name: 'UGC', path: '/ugc', onClick: handleUgcClick },
    { name: 'About', path: '/about', onClick: handleAboutClick },
    { name: 'Contact', path: '/contact', onClick: handleContactClick },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pt-6 md:pt-8 transition-all duration-500">
      <GlassSurface
        className={`transition-all duration-500 ease-out mx-auto px-4 md:px-8 ${
          scrolled ? 'max-w-6xl' : 'max-w-7xl'
        }`}
        borderRadius={8}
        displace={0.6}
        distortionScale={-200}
        brightness={110}
        opacity={0.95}
      >
        <div className="flex justify-between items-center py-1.5 md:py-2">
          {/* Logo */}
          <button onClick={handleHomeClick} className="flex items-center group">
            <div className="relative h-9 md:h-12 flex items-center transition-all duration-500 ease-out opacity-90 group-hover:opacity-100">
              {/* Hidden image sets the exact natural width */}
              <img 
                src="/logo-black.png" 
                alt="Idyll Productions" 
                className="h-full w-auto opacity-0 pointer-events-none"
              />
              {/* Masked orange div provides the color */}
              <div 
                className="absolute inset-0 bg-[#FF6B35]"
                style={{ 
                  WebkitMaskImage: 'url(/logo-black.png)',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'left center',
                  maskImage: 'url(/logo-black.png)',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'left center',
                }}
              />
            </div>
          </button>
          
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              link.onClick ? (
                <button
                  key={link.path}
                  onClick={link.onClick}
                  className="text-sm font-medium transition-all duration-300 nav-link-gradient"
                  style={
                    isLinkActive(link.path)
                    ? {
                        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 33%, #FF8C00 66%, #E8650A 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }
                    : { color: '#0f172a' }
                  }
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm font-medium transition-all duration-300 nav-link-gradient"
                  style={
                    isLinkActive(link.path)
                    ? {
                        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 33%, #FF8C00 66%, #E8650A 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }
                    : { color: '#0f172a' }
                  }
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Desktop Contact Button */}
          <button 
            onClick={handleContactClick}
            className="hidden md:block px-4 lg:px-5 py-1.5 lg:py-2 rounded text-sm font-medium text-white transition-all duration-300 hover:scale-105 transform shadow-sm hover:shadow"
            style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 33%, #FF8C00 66%, #E8650A 100%)' }}
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
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 animate-fade-in bg-white rounded-2xl shadow-2xl border border-slate-200">
            <div className="py-4 px-6 space-y-4">
              {navLinks.map((link) => (
                link.onClick ? (
                  <button
                    key={link.path}
                    onClick={link.onClick}
                    className="block w-full text-left text-base font-medium transition-colors duration-300 py-2"
                    style={
                      isLinkActive(link.path)
                      ? {
                          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 33%, #FF8C00 66%, #E8650A 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }
                      : { color: '#0f172a' }
                    }
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-base font-medium transition-colors duration-300 py-2"
                    style={
                      isLinkActive(link.path)
                      ? {
                          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 33%, #FF8C00 66%, #E8650A 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }
                      : { color: '#0f172a' }
                    }
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <button 
                onClick={handleContactClick}
                className="w-full mt-4 px-4 py-2 rounded text-base font-medium text-white transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 33%, #FF8C00 66%, #E8650A 100%)' }}
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </GlassSurface>
    </div>
  );
};

export default Navbar;
