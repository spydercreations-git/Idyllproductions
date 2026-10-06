
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Sparkles, Zap, Film, Laptop, Gamepad2, Music } from 'lucide-react';
import GlassSurface from './GlassSurface';

const workCategories = [
  {
    title: 'UGC Video Ads',
    desc: 'High-converting creator & brand ad edits for TikTok & Meta',
    category: 'UGC',
    path: '/category/ugc',
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    title: 'Short-Form Content',
    desc: 'Scroll-stopping Reels, Shorts & TikToks built for retention',
    category: 'Short-Form Content',
    path: '/category/short-form-content',
    icon: <Zap className="w-4 h-4" />,
  },
  {
    title: 'Long-Form Video',
    desc: 'YouTube & storytelling edits crafted for high watch time',
    category: 'Long-Form',
    path: '/category/long-form',
    icon: <Film className="w-4 h-4" />,
  },
  {
    title: 'SaaS & Tech Videos',
    desc: 'Product demos, explainers & software feature walkthroughs',
    category: 'SaaS & Tech Videos',
    path: '/category/saas-tech-videos',
    icon: <Laptop className="w-4 h-4" />,
  },
  {
    title: 'Gaming Content',
    desc: 'Fast, energetic edits and viral stream highlights',
    category: 'Gaming Content',
    path: '/category/gaming-content',
    icon: <Gamepad2 className="w-4 h-4" />,
  },
  {
    title: 'Rhythmic Montage',
    desc: 'Cinematic edits with dynamic beats, motion & color grading',
    category: 'Rhythmic Montage',
    path: '/category/rhythmic-montage',
    icon: <Music className="w-4 h-4" />,
  },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWorkDropdownOpen, setIsWorkDropdownOpen] = useState(false);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (dropdownTimerRef.current) {
        clearTimeout(dropdownTimerRef.current);
      }
    };
  }, []);

  const handleWorkMouseEnter = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    setIsWorkDropdownOpen(true);
  };

  const handleWorkMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setIsWorkDropdownOpen(false);
    }, 180);
  };

  const handleCategoryClick = (categoryName: string, categoryPath: string) => {
    setIsWorkDropdownOpen(false);
    if (location.pathname === '/') {
      const btn = document.querySelector(`button[data-category="${categoryName}"]`) as HTMLButtonElement | null;
      if (btn) {
        btn.click();
      }
      document.getElementById('our-work')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    } else {
      navigate(categoryPath);
    }
  };

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
    setIsWorkDropdownOpen(false);
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
    { name: 'About', path: '/about', onClick: handleAboutClick },
    { name: 'Contact', path: '/contact', onClick: handleContactClick },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pt-0 md:pt-8 transition-all duration-500">
      <GlassSurface
        className={`transition-all duration-500 ease-out mx-auto px-4 md:px-8 max-md:!rounded-none max-md:!border-t-0 max-md:!border-x-0 max-md:!border-b max-md:!border-b-slate-200/50 max-md:w-full ${
          scrolled ? 'max-w-6xl' : 'max-w-7xl'
        }`}
        borderRadius={8}
        displace={0.6}
        distortionScale={-200}
        brightness={110}
        opacity={1}
      >
        <div className="flex justify-between items-center py-2 md:py-2">
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
                className="absolute inset-0 bg-[#FF8156]"
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
            {navLinks.map((link) => {
              if (link.name === 'Work') {
                return (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={handleWorkMouseEnter}
                    onMouseLeave={handleWorkMouseLeave}
                  >
                    <button
                      onClick={handleWorkClick}
                      className="inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-300 nav-link-gradient group cursor-pointer"
                      style={
                        isLinkActive(link.path) || isWorkDropdownOpen
                          ? { color: '#FF8156' }
                          : { color: '#0f172a' }
                      }
                    >
                      <span>Work</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ease-out ${
                          isWorkDropdownOpen
                            ? 'rotate-180 text-[#FF8156]'
                            : 'text-slate-400 group-hover:text-slate-700'
                        }`}
                      />
                    </button>

                    {/* Invisible hover bridge to eliminate gap flickers */}
                    <div className="absolute top-full left-0 right-0 h-4 bg-transparent pointer-events-auto" />

                    {/* Buttery Smooth Dropdown Menu */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-[36%] pt-3 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isWorkDropdownOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                          : 'opacity-0 -translate-y-2 pointer-events-none invisible'
                      }`}
                    >
                      <div
                        className="w-[740px] rounded-[8px] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.14),0_0_1px_rgba(0,0,0,0.08)] overflow-hidden"
                        style={{
                          backgroundColor: '#ffffff',
                          opacity: 1,
                          isolation: 'isolate',
                        }}
                      >
                        {/* 3-Column Grid */}
                        <div
                          className="grid grid-cols-3 divide-x divide-slate-100 p-4 gap-2"
                          style={{ backgroundColor: '#ffffff' }}
                        >
                          {/* Column 1 */}
                          <div className="flex flex-col gap-1 pr-2">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">Performance & Ads</span>
                            {workCategories.slice(0, 2).map((item) => (
                              <button
                                key={item.category}
                                type="button"
                                onClick={() => handleCategoryClick(item.category, item.path)}
                                className="w-full text-left p-2.5 rounded-[8px] hover:bg-slate-50 transition-all duration-200 group/item flex items-start gap-3 cursor-pointer"
                              >
                                <div className="w-8 h-8 rounded-[8px] bg-[#fff1ec] text-[#FF8156] flex items-center justify-center shrink-0 group-hover/item:bg-[#FF8156] group-hover/item:text-white transition-all duration-200 mt-0.5">
                                  {item.icon}
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#FF8156] transition-colors leading-snug">
                                    {item.title}
                                  </div>
                                  <p className="text-xs text-slate-500 leading-snug mt-0.5">
                                    {item.desc}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>

                          {/* Column 2 */}
                          <div className="flex flex-col gap-1 px-2">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">Narrative & Tech</span>
                            {workCategories.slice(2, 4).map((item) => (
                              <button
                                key={item.category}
                                type="button"
                                onClick={() => handleCategoryClick(item.category, item.path)}
                                className="w-full text-left p-2.5 rounded-[8px] hover:bg-slate-50 transition-all duration-200 group/item flex items-start gap-3 cursor-pointer"
                              >
                                <div className="w-8 h-8 rounded-[8px] bg-[#fff1ec] text-[#FF8156] flex items-center justify-center shrink-0 group-hover/item:bg-[#FF8156] group-hover/item:text-white transition-all duration-200 mt-0.5">
                                  {item.icon}
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#FF8156] transition-colors leading-snug">
                                    {item.title}
                                  </div>
                                  <p className="text-xs text-slate-500 leading-snug mt-0.5">
                                    {item.desc}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>

                          {/* Column 3 */}
                          <div className="flex flex-col gap-1 pl-2">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">Creative & Motion</span>
                            {workCategories.slice(4, 6).map((item) => (
                              <button
                                key={item.category}
                                type="button"
                                onClick={() => handleCategoryClick(item.category, item.path)}
                                className="w-full text-left p-2.5 rounded-[8px] hover:bg-slate-50 transition-all duration-200 group/item flex items-start gap-3 cursor-pointer"
                              >
                                <div className="w-8 h-8 rounded-[8px] bg-[#fff1ec] text-[#FF8156] flex items-center justify-center shrink-0 group-hover/item:bg-[#FF8156] group-hover/item:text-white transition-all duration-200 mt-0.5">
                                  {item.icon}
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#FF8156] transition-colors leading-snug">
                                    {item.title}
                                  </div>
                                  <p className="text-xs text-slate-500 leading-snug mt-0.5">
                                    {item.desc}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return link.onClick ? (
                <button
                  key={link.path}
                  onClick={link.onClick}
                  className="text-sm font-medium transition-all duration-300 nav-link-gradient"
                  style={
                    isLinkActive(link.path)
                    ? { color: '#FF8156' }
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
                    ? { color: '#FF8156' }
                    : { color: '#0f172a' }
                  }
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Contact Button */}
          <button 
            onClick={handleContactClick}
            className="hidden md:block px-4 lg:px-5 py-1.5 lg:py-2 rounded text-sm font-medium text-white transition-all duration-300 hover:scale-105 transform shadow-sm hover:shadow"
            style={{ backgroundColor: '#FF8156' }}
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
          <div className="md:hidden absolute top-full left-0 right-0 mt-0 mx-0 animate-fade-in bg-white shadow-xl border-b border-slate-200">
            <div className="py-4 px-6 space-y-4">
              {navLinks.map((link) => (
                link.onClick ? (
                  <button
                    key={link.path}
                    onClick={link.onClick}
                    className="block w-full text-left text-base font-medium transition-colors duration-300 py-2"
                    style={
                      isLinkActive(link.path)
                      ? { color: '#FF8156' }
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
                      ? { color: '#FF8156' }
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
                style={{ backgroundColor: '#FF8156' }}
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
