import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Play, X, Video, Gamepad2, Layout, Sparkles, 
  CheckCircle2, ChevronRight, Maximize2, Edit3, Camera, 
  Activity, Heart, ShieldCheck, Globe, MessageSquare, Plus, Minus,
  Zap, Monitor, Headphones, Target, Volume2, VolumeX
} from 'lucide-react';
import Button from '../components/Button';
import { FIREBASE_VIDEO_URLS, HERO_VIDEO_URL } from '../constants/firebaseVideoUrls';
import { TiltCard } from '../components/ui/tilt-card';
import { useScrollProgress } from '../hooks/useScrollProgress';
import ProgressBar from '../components/ProgressBar';

// Counter Animation Component
const CounterStat: React.FC<{
  number: number;
  suffix: string;
  label: string;
  delay: number;
}> = ({ number, suffix, label, delay }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setTimeout(() => {
            const duration = 2000;
            const increment = number / (duration / 16);
            let current = 0;
            const animate = () => {
              current += increment;
              if (current < number) {
                setCount(Math.floor(current));
                requestAnimationFrame(animate);
              } else {
                setCount(number);
              }
            };
            animate();
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [number, delay, isVisible]);

  return (
    <div ref={elementRef} className="inline-flex items-center">
      <span className="text-3xl lg:text-4xl font-bold text-current">{count}{suffix}</span>
      {label && <span className="text-base lg:text-lg font-medium text-slate-700 ml-2">{label}</span>}
    </div>
  );
};

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentWord, setCurrentWord] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [videoMuted, setVideoMuted] = useState<{ [key: number]: boolean }>({});
  const [cardOrigin, setCardOrigin] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isClosing, setIsClosing] = useState(false);
  
  const rotatingWords = ['creators', 'brands', 'audiences', 'stories'];

  const testimonials = [
    { name: "Dawson Gibbs", company: "Evo Agency", rating: 5, text: "Exceptional quality and lightning-fast turnaround. Our client retention improved by 40% after switching to Idyll." },
    { name: "Mohammed Shah", company: "Regal Dubai Travel Agency", rating: 5, text: "The attention to detail in every frame is remarkable. Our travel content now converts 3x better." },
    { name: "Vivek Kumar", company: "Physics Wallah", rating: 5, text: "Perfect understanding of educational content flow. Student engagement increased significantly." },
    { name: "Pintu Biswas", company: "Vedantu", rating: 5, text: "Professional, reliable, and consistently delivers beyond expectations. Highly recommended." },
    { name: "Editing Manager", company: "Meesho", rating: 5, text: "Seamless collaboration and outstanding results. Our e-commerce videos perform exceptionally well." },
    { name: "Sarah Chen", company: "TechFlow Solutions", rating: 5, text: "Transformed our SaaS demos into compelling stories. Conversion rates doubled within a month." },
    { name: "Marcus Rodriguez", company: "GameStream Studios", rating: 5, text: "Perfect balance of energy and clarity in gaming content. Subscriber growth has been phenomenal." },
    { name: "Emily Watson", company: "Creative Collective", rating: 5, text: "Consistently delivers premium quality on tight deadlines. Our go-to partner for all video projects." }
  ];

  // How It Works Progress Component
  const HowItWorksProgress = () => {
    const steps = [
      { 
        step: 1, 
        title: "Share Your Vision", 
        desc: "Send us your raw footage and creative brief. We'll understand your goals.", 
        color: "blue",
        icon: (
          <div className="relative w-10 h-10">
            <div className="w-8 h-6 bg-blue-500 rounded-lg transform rotate-3"></div>
            <div className="absolute top-1 left-1 w-6 h-4 bg-blue-300 rounded-md"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
            <div className="absolute bottom-0 left-2 w-4 h-1 bg-blue-400 rounded-full"></div>
          </div>
        )
      },
      { 
        step: 2, 
        title: "Strategic Planning", 
        desc: "We analyze your content and create a detailed editing strategy.", 
        color: "green",
        icon: (
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-green-500 rounded-full"></div>
            <div className="absolute w-6 h-6 border-2 border-green-400 rounded-full"></div>
            <div className="absolute w-4 h-4 border-2 border-green-300 rounded-full"></div>
            <div className="absolute w-2 h-2 bg-green-600 rounded-full animate-ping"></div>
          </div>
        )
      },
      { 
        step: 3, 
        title: "Expert Editing", 
        desc: "Our team crafts your video with precision, focusing on engagement.", 
        color: "purple",
        icon: (
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="w-6 h-1 bg-purple-500 rounded-full transform rotate-45"></div>
            <div className="w-6 h-1 bg-purple-400 rounded-full transform -rotate-45"></div>
            <div className="w-1 h-6 bg-purple-300 rounded-full"></div>
            <div className="absolute w-2 h-2 bg-purple-600 rounded-full animate-spin"></div>
          </div>
        )
      },
      { 
        step: 4, 
        title: "Deliver & Optimize", 
        desc: "Receive your polished video with platform-specific formats.", 
        color: "orange",
        icon: (
          <div className="relative w-10 h-10">
            <div className="w-6 h-4 bg-orange-500 rounded-t-lg"></div>
            <div className="absolute top-2 left-1 w-4 h-2 bg-orange-300 rounded-sm"></div>
            <div className="absolute bottom-0 left-0 w-8 h-2 bg-orange-600 rounded-b-lg"></div>
            <div className="absolute -top-1 right-1 w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
          </div>
        )
      }
    ];

    const { progress, activeSteps, sectionRef } = useScrollProgress();

    return (
      <div className="space-y-8" ref={sectionRef}>
        {/* Progress Bar */}
        <ProgressBar steps={steps} progress={progress} activeSteps={activeSteps} />
      </div>
    );
  };

  const editingCategories = [
    {
      name: "Short-Form Content",
      description: "Reels, Shorts, TikTok",
      text: "Built for retention and scroll-stopping hooks.",
      icon: (
        <div className="relative">
          {/* Mobile phone icon */}
          <div className="w-4 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-lg border-2 border-purple-600"></div>
          <div className="absolute top-0.5 left-0.5 w-3 h-4 bg-white/20 rounded-sm"></div>
          <div className="absolute bottom-0.5 left-1.5 w-1 h-1 bg-white rounded-full"></div>
          {/* Sparkle effect */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
        </div>
      ),
      videos: FIREBASE_VIDEO_URLS["short-form"]
    },
    {
      name: "SaaS & Tech Videos", 
      description: "Explainers, product demos, ads",
      text: "We simplify complex products into clear stories.",
      icon: (
        <div className="relative">
          {/* Monitor/screen icon */}
          <div className="w-6 h-4 bg-blue-500 rounded-md border border-blue-600"></div>
          <div className="absolute top-0.5 left-0.5 w-5 h-2.5 bg-blue-100 rounded-sm"></div>
          {/* Code lines */}
          <div className="absolute top-1 left-1 w-2 h-0.5 bg-blue-600 rounded-full"></div>
          <div className="absolute top-1.5 left-1 w-3 h-0.5 bg-blue-600 rounded-full"></div>
          <div className="absolute top-2 left-1 w-1.5 h-0.5 bg-blue-600 rounded-full"></div>
          {/* Tech indicator */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      ),
      videos: FIREBASE_VIDEO_URLS["saas-tech"]
    },
    {
      name: "Gaming Content",
      description: "YouTube & short-form gaming", 
      text: "Fast, energetic edits without chaos.",
      icon: (
        <div className="relative">
          {/* Game controller icon */}
          <div className="w-6 h-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full"></div>
          <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute bottom-1 left-2 w-2 h-1 bg-white/80 rounded-full"></div>
          {/* Action indicators */}
          <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></div>
          <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce"></div>
        </div>
      ),
      videos: FIREBASE_VIDEO_URLS["gaming"]
    },
    {
      name: "YouTube Long-Form",
      description: "Creators & storytelling",
      text: "Edited for watch time and flow.",
      icon: (
        <div className="relative">
          {/* YouTube play button icon */}
          <div className="w-6 h-4 bg-red-500 rounded-lg border border-red-600"></div>
          <div className="absolute top-0.5 left-0.5 w-5 h-3 bg-red-100 rounded-sm"></div>
          {/* Play triangle */}
          <div className="absolute top-1.5 left-2 w-0 h-0 border-l-2 border-l-red-600 border-t-1 border-t-transparent border-b-1 border-b-transparent"></div>
          {/* Duration indicator */}
          <div className="absolute bottom-0.5 right-0.5 w-1.5 h-0.5 bg-red-600 rounded-full"></div>
          {/* View indicator */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-red-400 rounded-full animate-pulse">
            <div className="w-1 h-1 bg-red-500 rounded-full m-0.5"></div>
          </div>
        </div>
      ),
      videos: FIREBASE_VIDEO_URLS["youtube-long-form"]
    }
  ];

  const handleCardClick = (categoryName: string, event: React.MouseEvent) => {
    // Prevent event bubbling
    event.stopPropagation();
    
    // Get the exact clicked element's bounding box
    const clickedElement = event.currentTarget as HTMLElement;
    const rect = clickedElement.getBoundingClientRect();
    
    // Calculate true page position (viewport position + scroll offset)
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    const originX = rect.left + scrollLeft + rect.width / 2;
    const originY = rect.top + scrollTop + rect.height / 2;
    
    setCardOrigin({
      x: originX,
      y: originY,
      width: rect.width,
      height: rect.height
    });
    
    setSelectedCategory(categoryName);
    setVideoMuted({});
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsClosing(true);
    // Wait for close animation to complete before hiding modal
    setTimeout(() => {
      setSelectedCategory(null);
      setIsClosing(false);
      // Unlock body scroll
      document.body.style.overflow = 'unset';
    }, 250); // Match close animation duration
  };

  const toggleVideoMute = (videoIndex: number) => {
    setVideoMuted(prev => ({
      ...prev,
      [videoIndex]: !prev[videoIndex]
    }));
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(wordInterval);
    };
  }, []);

  return (
    <div className="bg-white min-h-screen relative" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)`,
      backgroundSize: '120px 120px'
    }}>
      {/* Fade overlay for grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 pointer-events-none" />

      {/* Low opacity gradients in background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" style={{
          left: '10%',
          top: '20%',
          animation: 'float 8s ease-in-out infinite'
        }} />
        <div className="absolute w-80 h-80 bg-gradient-to-br from-green-500/4 to-blue-500/4 rounded-full blur-3xl" style={{
          right: '15%',
          top: '60%',
          animation: 'float 10s ease-in-out infinite reverse'
        }} />
        <div className="absolute w-72 h-72 bg-gradient-to-br from-purple-500/3 to-pink-500/3 rounded-full blur-3xl" style={{
          left: '60%',
          bottom: '30%',
          animation: 'float 12s ease-in-out infinite'
        }} />
      </div>

      {/* Floating Parallax Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-pulse" style={{
          left: `${20 + Math.sin(scrollY * 0.001) * 10}%`,
          top: `${30 + Math.cos(scrollY * 0.002) * 15}%`
        }} />
        <div className="absolute w-3 h-3 bg-purple-400/15 rounded-full animate-pulse" style={{
          right: `${15 + Math.cos(scrollY * 0.0015) * 12}%`,
          top: `${60 + Math.sin(scrollY * 0.001) * 8}%`
        }} />
        <div className="absolute w-1.5 h-1.5 bg-green-400/25 rounded-full animate-pulse" style={{
          left: `${70 + Math.sin(scrollY * 0.002) * 20}%`,
          bottom: `${40 + Math.cos(scrollY * 0.0012) * 10}%`
        }} />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 sm:pt-32 md:pt-64 pb-24 sm:pb-32 md:pb-48 px-4 sm:px-6 md:px-8 overflow-hidden z-10">
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="reveal active">
            <h1 className="font-sf-pro text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-slate-900 leading-[0.9] mb-6 sm:mb-8 md:mb-12 animate-slide-up">
              Idyll Productions
            </h1>
            
            <h2 className="font-inter text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-medium tracking-tight text-slate-700 leading-[1.3] mb-6 sm:mb-8 md:mb-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              High-Performance Video Editing<br className="hidden sm:block" />
              for Modern{' '}
              <div className="inline-block">
                <div className="loader">
                  <div className="words">
                    <span className="word">creators</span>
                    <span className="word">brands</span>
                    <span className="word">audiences</span>
                    <span className="word">stories</span>
                    <span className="word">creators</span>
                  </div>
                </div>
              </div>
            </h2>
            
            <p className="font-inter text-base sm:text-lg md:text-xl lg:text-2xl text-slate-500 max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-24 leading-relaxed animate-slide-up px-4 sm:px-0" style={{ animationDelay: '0.6s' }}>
              Short-form, SaaS, Gaming & YouTube<br className="hidden sm:block" />
              edited with intent, not noise.
            </p>
            
            {/* Hero Video - Mobile Optimized */}
            <div className="relative max-w-7xl mx-auto mb-12 sm:mb-16" style={{ perspective: '1200px' }}>
              <div 
                className="aspect-video rounded-lg sm:rounded-xl overflow-hidden shadow-lg relative group cursor-pointer hover:shadow-xl bg-black"
                style={{
                  transform: `rotateX(${scrollY * 0.01}deg)`,
                  transition: 'transform 0.1s ease-out',
                  transformStyle: 'preserve-3d'
                }}
              >
                {HERO_VIDEO_URL && !HERO_VIDEO_URL.includes('placeholder') ? (
                  <video
                    className="w-full h-full object-cover"
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    preload="auto"
                    loading="eager"
                    onLoadedData={() => console.log('Hero video loaded')}
                    controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
                    disablePictureInPicture 
                    disableRemotePlayback
                    style={{ 
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                      WebkitTransform: 'translateZ(0)',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <source src={HERO_VIDEO_URL} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                    <span className="text-slate-500">Loading video...</span>
                  </div>
                )}
                
                {/* Progressive Blur Overlay - Reduced for mobile */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out"
                  style={{
                    background: `
                      radial-gradient(circle at center, 
                        transparent 0%, 
                        transparent 30%, 
                        rgba(255,255,255,0.1) 50%, 
                        rgba(255,255,255,0.2) 70%, 
                        rgba(255,255,255,0.4) 90%, 
                        rgba(255,255,255,0.6) 100%
                      )
                    `,
                    backdropFilter: `blur(${Math.max(0, 4 - (scrollY * 0.01))}px)`,
                    WebkitBackdropFilter: `blur(${Math.max(0, 4 - (scrollY * 0.01))}px)`,
                    opacity: Math.max(0, 0.8 - (scrollY * 0.001))
                  }}
                />
                
                {/* Progressive Blur Rings - Simplified for mobile */}
                <div className="absolute inset-0 pointer-events-none hidden sm:block">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full border border-white/20 animate-pulse"
                      style={{
                        width: `${30 + i * 20}%`,
                        height: `${30 + i * 20}%`,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: '3s',
                        opacity: Math.max(0, 0.4 - (scrollY * 0.0005) - (i * 0.1))
                      }}
                    />
                  ))}
                </div>
                
                {/* Center Focus Point - Mobile optimized */}
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    opacity: Math.max(0, 0.8 - (scrollY * 0.002))
                  }}
                >
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white/40 rounded-full animate-ping" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/60 rounded-full" />
                </div>
                
                {/* Scroll Hint - Mobile optimized */}
                <div 
                  className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 transition-opacity duration-500"
                  style={{
                    opacity: Math.max(0, 1 - (scrollY * 0.003))
                  }}
                >
                  <span className="hidden sm:inline">Scroll to reveal</span>
                  <span className="sm:hidden">Scroll</span>
                  <div className="w-0.5 h-4 sm:w-1 sm:h-6 bg-white/60 rounded-full" />
                </div>
                
                {/* Security overlays */}
                <div className="absolute inset-0 pointer-events-none select-none" />
                <div className="absolute inset-0 pointer-events-none select-none bg-transparent" />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center animate-slide-up px-4 sm:px-0" style={{ animationDelay: '0.9s' }}>
              <button
                onClick={() => document.getElementById('our-work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="w-full sm:w-auto relative h-11 sm:h-12 md:h-14 px-6 sm:px-8 md:px-10 rounded-lg text-sm sm:text-base md:text-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
              >
                View Our Work
                <ArrowRight className="inline-block w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ml-2" />
              </button>
              <button
                onClick={() => document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="w-full sm:w-auto relative h-11 sm:h-12 md:h-14 px-6 sm:px-8 md:px-10 rounded-lg text-sm sm:text-base md:text-lg font-medium bg-transparent text-slate-700 border border-slate-300 hover:border-blue-500 transition-all duration-300 hover:scale-105 transform"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- WORK SHOWCASE --- */}
      <section id="our-work" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="font-sf-pro text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-slate-900 mb-4 sm:mb-6 md:mb-8">
              Specialized editing for every platform
            </h2>
            <p className="font-inter text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              Crafted with precision and strategic intent for maximum performance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 relative">
            {editingCategories.map((category, i) => (
              <div 
                key={i}
                onClick={(e) => handleCardClick(category.name, e)}
                className="group cursor-pointer bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm border border-slate-200/50 hover:shadow-xl hover:border-slate-300/60 transition-all duration-500 hover:bg-white hover:scale-105 transform"
              >
                <div className="aspect-video relative overflow-hidden bg-slate-100">
                  <video 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    preload="metadata"
                    loading="lazy"
                    style={{ 
                      filter: 'blur(6px) brightness(0.8)',
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                      WebkitTransform: 'translateZ(0)',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <source src={category.videos[0]} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/5 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 ml-0.5" />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-slate-200 transition-all duration-500">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-sf-pro text-lg sm:text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-500 mb-1 sm:mb-2">{category.name}</h3>
                      <p className="font-inter text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider">{category.description}</p>
                    </div>
                  </div>
                  <p className="font-inter text-base sm:text-lg text-slate-600 leading-relaxed mb-4 sm:mb-6">{category.text}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-inter text-xs sm:text-sm text-slate-400">Click to explore</span>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* --- VIDEO MODAL - Positioned over video cards --- */}
            {selectedCategory && (
              <div 
                className="absolute inset-0 z-[9999] flex items-center justify-center p-4"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                onClick={closeModal}
              >
                {/* Modal container */}
                <div 
                  className={`relative bg-white rounded-lg sm:rounded-xl w-full ${
                    selectedCategory === "Short-Form Content" ? 'max-w-7xl' : 'max-w-5xl'
                  } max-h-[90vh] sm:max-h-[85vh] overflow-auto shadow-2xl ${
                    isClosing ? 'animate-contextual-close' : 'animate-contextual-preview'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="flex justify-between items-center p-3 sm:p-4 md:p-6 border-b bg-gray-50 rounded-t-lg sm:rounded-t-xl">
                    {/* Apple 3 dots */}
                    <div className="hidden sm:flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    
                    {/* Category name */}
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 truncate max-w-[200px] sm:max-w-none">{selectedCategory}</h2>
                    
                    <button 
                      onClick={closeModal}
                      className="text-slate-500 hover:text-slate-700 text-xl sm:text-2xl w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-slate-200 transition-all duration-200 flex-shrink-0"
                    >
                      ×
                    </button>
                  </div>
                  
                  {/* Video Grid */}
                  <div className="p-3 sm:p-4 md:p-6">
                    {selectedCategory === "Short-Form Content" ? (
                      /* Vertical layout for Short-Form Content */
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                        {editingCategories.find(cat => cat.name === selectedCategory)?.videos.map((videoSrc, i) => (
                          <div key={i} className="relative aspect-[9/16] bg-black rounded-md sm:rounded-lg overflow-hidden group animate-card-bounce" style={{ animationDelay: `${i * 100}ms` }}>
                            <video 
                              className="w-full h-full object-cover" 
                              autoPlay 
                              loop 
                              muted={videoMuted[i] !== false}
                              playsInline
                              preload="metadata"
                              loading="lazy"
                            >
                              <source src={videoSrc} type="video/mp4" />
                            </video>
                            
                            {/* Mute/Unmute Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleVideoMute(i);
                              }}
                              className="absolute top-1 right-1 sm:top-2 sm:right-2 w-6 h-6 sm:w-7 sm:h-7 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-110"
                            >
                              {videoMuted[i] === false ? (
                                <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                              ) : (
                                <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Horizontal layout for other categories */
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                        {editingCategories.find(cat => cat.name === selectedCategory)?.videos.map((videoSrc, i) => (
                          <div key={i} className="relative aspect-video bg-black rounded-md sm:rounded-lg overflow-hidden group animate-card-bounce" style={{ animationDelay: `${i * 100}ms` }}>
                            <video 
                              className="w-full h-full object-cover" 
                              autoPlay 
                              loop 
                              muted={videoMuted[i] !== false}
                              playsInline
                              preload="metadata"
                              loading="lazy"
                            >
                              <source src={videoSrc} type="video/mp4" />
                            </video>
                            
                            {/* Mute/Unmute Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleVideoMute(i);
                              }}
                              className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-110"
                            >
                              {videoMuted[i] === false ? (
                                <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                              ) : (
                                <VolumeX className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- VIDEO MODAL - Mobile Optimized --- */}
        {selectedCategory && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Background overlay */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
              onClick={closeModal}
            />
            
            {/* Modal container - Mobile responsive */}
            <div 
              className={`relative bg-white rounded-lg sm:rounded-xl w-full ${
                selectedCategory === "Short-Form Content" ? 'max-w-7xl' : 'max-w-5xl'
              } max-h-[90vh] sm:max-h-[85vh] overflow-auto shadow-2xl ${
                isClosing ? 'animate-contextual-close' : 'animate-contextual-preview'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header - Mobile optimized */}
              <div className="flex justify-between items-center p-3 sm:p-4 md:p-6 border-b bg-gray-50 rounded-t-lg sm:rounded-t-xl">
                {/* Apple 3 dots - Hidden on mobile */}
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                
                {/* Mobile: Show category name on left */}
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 truncate max-w-[200px] sm:max-w-none">{selectedCategory}</h2>
                
                <button 
                  onClick={closeModal}
                  className="text-slate-500 hover:text-slate-700 text-xl sm:text-2xl w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-slate-200 transition-all duration-200 flex-shrink-0"
                >
                  ×
                </button>
              </div>
              
              {/* Video Grid - Mobile responsive */}
              <div className="p-3 sm:p-4 md:p-6">
                {selectedCategory === "Short-Form Content" ? (
                  /* Vertical layout for Short-Form Content - Mobile responsive */
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                    {editingCategories.find(cat => cat.name === selectedCategory)?.videos.map((videoSrc, i) => (
                      <div key={i} className="relative aspect-[9/16] bg-black rounded-md sm:rounded-lg overflow-hidden group animate-card-bounce" style={{ animationDelay: `${i * 100}ms` }}>
                        <video 
                          className="w-full h-full object-cover" 
                          autoPlay 
                          loop 
                          muted={videoMuted[i] !== false}
                          playsInline
                          preload="metadata"
                          loading="lazy"
                          onLoadedData={() => console.log(`Short-form video ${i} loaded`)}
                          style={{ 
                            pointerEvents: 'auto',
                            willChange: 'transform',
                            backfaceVisibility: 'hidden',
                            transform: 'translateZ(0)',
                            WebkitTransform: 'translateZ(0)',
                            WebkitBackfaceVisibility: 'hidden'
                          }}
                        >
                          <source src={videoSrc} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        
                        {/* Mute/Unmute Button - Mobile optimized */}
                        <button
                          onClick={() => toggleVideoMute(i)}
                          className="absolute top-1 right-1 sm:top-2 sm:right-2 w-6 h-6 sm:w-7 sm:h-7 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-110"
                          style={{ pointerEvents: 'auto' }}
                        >
                          {videoMuted[i] === false ? (
                            <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          ) : (
                            <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Horizontal layout for other categories - Mobile responsive */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    {editingCategories.find(cat => cat.name === selectedCategory)?.videos.map((videoSrc, i) => (
                      <div key={i} className="relative aspect-video bg-black rounded-md sm:rounded-lg overflow-hidden group animate-card-bounce" style={{ animationDelay: `${i * 100}ms` }}>
                        <video 
                          className="w-full h-full object-cover" 
                          autoPlay 
                          loop 
                          muted={videoMuted[i] !== false}
                          playsInline
                          preload="metadata"
                          loading="lazy"
                          onLoadedData={() => console.log(`Horizontal video ${i} loaded`)}
                          style={{ 
                            pointerEvents: 'auto',
                            willChange: 'transform',
                            backfaceVisibility: 'hidden',
                            transform: 'translateZ(0)',
                            WebkitTransform: 'translateZ(0)',
                            WebkitBackfaceVisibility: 'hidden'
                          }}
                        >
                          <source src={videoSrc} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        
                        {/* Mute/Unmute Button - Mobile optimized */}
                        <button
                          onClick={() => toggleVideoMute(i)}
                          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-110"
                          style={{ pointerEvents: 'auto' }}
                        >
                          {videoMuted[i] === false ? (
                            <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                          ) : (
                            <VolumeX className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* --- OUR SERVICES with Animated Icons --- */}
      <section id="our-services" className="py-32 px-8 relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-sf-pro text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 mb-8 whitespace-nowrap">Our Services</h2>
            <p className="font-inter text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">Comprehensive video editing solutions tailored to your needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { 
                title: "Video Editing", 
                desc: "Professional editing with attention to pacing, storytelling, and platform optimization.", 
                icon: (
                  <div className="relative">
                    <div className="w-6 h-6 bg-blue-500 rounded-sm transform rotate-12"></div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-300 rounded-full"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-600 rounded-sm transform rotate-45"></div>
                  </div>
                ),
                color: "blue",
                shape: "rounded-lg"
              },
              { 
                title: "Motion Graphics", 
                desc: "Eye-catching animations and graphics that enhance your message without distraction.", 
                icon: (
                  <div className="relative">
                    <div className="w-5 h-5 border-2 border-green-500 rounded-full animate-spin"></div>
                    <div className="absolute top-1 left-1 w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                  </div>
                ),
                color: "green",
                shape: "rounded-full"
              },
              { 
                title: "Color Grading", 
                desc: "Professional color correction and grading to achieve the perfect mood and aesthetic.", 
                icon: (
                  <div className="relative flex space-x-1">
                    <div className="w-2 h-6 bg-gradient-to-t from-purple-600 to-purple-300 rounded-full"></div>
                    <div className="w-2 h-6 bg-gradient-to-t from-pink-600 to-pink-300 rounded-full"></div>
                    <div className="w-2 h-6 bg-gradient-to-t from-blue-600 to-blue-300 rounded-full"></div>
                  </div>
                ),
                color: "purple",
                shape: "rounded-xl"
              },
              { 
                title: "Audio Enhancement", 
                desc: "Crystal-clear audio mixing, noise reduction, and sound design for immersive experiences.", 
                icon: (
                  <div className="relative flex items-center space-x-0.5">
                    <div className="w-1 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                    <div className="w-1 h-5 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-4 bg-orange-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-6 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                    <div className="w-1 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                ),
                color: "orange",
                shape: "rounded-lg"
              },
              { 
                title: "Film Making", 
                desc: "We make ad films and short films for you with professional production quality.", 
                icon: (
                  <div className="relative">
                    <div className="w-6 h-4 bg-red-500 rounded-sm"></div>
                    <div className="absolute top-1 left-1 w-4 h-2 bg-red-300 rounded-sm"></div>
                    <div className="absolute -top-1 left-2 w-2 h-2 bg-red-600 rounded-full"></div>
                  </div>
                ),
                color: "red",
                shape: "rounded-full"
              },
              { 
                title: "Strategy Consultation", 
                desc: "Expert guidance on content strategy, platform optimization, and audience engagement.", 
                icon: (
                  <div className="relative">
                    <div className="w-5 h-5 border-2 border-cyan-500 rounded-full"></div>
                    <div className="absolute top-1 left-1 w-3 h-3 border border-cyan-400 rounded-full"></div>
                    <div className="absolute top-2 left-2 w-1 h-1 bg-cyan-600 rounded-full animate-ping"></div>
                  </div>
                ),
                color: "cyan",
                shape: "rounded-xl"
              }
            ].map((service, i) => (
              <TiltCard key={i} className="group relative">
                <div className="absolute inset-0 rounded-lg opacity-5 group-hover:opacity-8 transition-opacity duration-1000" style={{
                  background: `linear-gradient(45deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
                  backgroundSize: '400% 400%',
                  animation: 'gradientShift 6s ease-in-out infinite'
                }} />
                <div className="relative bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-sm border border-slate-200/50 hover:shadow-xl hover:border-slate-300/60 transition-all duration-500 hover:scale-105 transform" style={{ animation: `floating 6s ease-in-out infinite`, animationDelay: `${i}s` }}>
                  <div className={`w-16 h-16 ${service.shape} bg-gradient-to-br from-${service.color}-500/10 to-${service.color}-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 text-${service.color}-600`}>
                    <div className="animate-pulse">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className={`font-sf-pro text-2xl font-semibold text-slate-900 mb-4 group-hover:text-${service.color}-600 transition-colors`}>{service.title}</h3>
                  <p className="font-inter text-lg text-slate-600 leading-relaxed">{service.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE IDYLL with Animated Shapes --- */}
      <section className="py-32 px-8 relative overflow-hidden z-10">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-64 h-64 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl" style={{
            left: `${10 + Math.sin(scrollY * 0.001) * 5}%`,
            top: `${20 + Math.cos(scrollY * 0.0008) * 10}%`
          }} />
          <div className="absolute w-48 h-48 bg-gradient-to-br from-green-100/20 to-blue-100/20 rounded-full blur-2xl" style={{
            right: `${15 + Math.cos(scrollY * 0.0012) * 8}%`,
            bottom: `${30 + Math.sin(scrollY * 0.001) * 12}%`
          }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-sf-pro text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 mb-8 whitespace-nowrap">Why Choose Idyll</h2>
            <p className="font-inter text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">We don't just edit videos—we engineer content that performs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Clean Storytelling - Animated Timeline */}
            <TiltCard className="group bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-sm border border-slate-200/50 hover:shadow-md hover:border-slate-300/60 transition-all duration-500 hover:scale-105 transform cursor-pointer">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 flex flex-col gap-1">
                    <div className="h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
                    <div className="h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="h-1 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    <div className="h-1 bg-blue-200 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                  </div>
                  <div className="absolute -right-1 top-1 w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                </div>
              </div>
              <h3 className="font-sf-pro text-2xl font-semibold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Clean Storytelling</h3>
              <p className="font-inter text-lg text-slate-600 leading-relaxed">Every cut serves a purpose. We eliminate noise and focus on narrative flow that keeps viewers engaged.</p>
            </TiltCard>

            {/* Retention-Focused - Animated Graph */}
            <TiltCard className="group bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-sm border border-slate-200/50 hover:shadow-md hover:border-slate-300/60 transition-all duration-500 hover:scale-105 transform cursor-pointer">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <div className="relative w-8 h-8">
                  <svg className="w-full h-full" viewBox="0 0 32 32">
                    <path d="M2 28 L8 20 L14 16 L20 12 L26 8 L30 4" stroke="currentColor" strokeWidth="2" fill="none" className="text-green-500" />
                    <circle cx="8" cy="20" r="2" className="text-green-400 animate-pulse" fill="currentColor" />
                    <circle cx="20" cy="12" r="2" className="text-green-500 animate-pulse" fill="currentColor" style={{ animationDelay: '0.5s' }} />
                    <circle cx="30" cy="4" r="2" className="text-green-600 animate-pulse" fill="currentColor" style={{ animationDelay: '1s' }} />
                  </svg>
                </div>
              </div>
              <h3 className="font-sf-pro text-2xl font-semibold text-slate-900 mb-4 group-hover:text-green-600 transition-colors">Retention-Focused Pacing</h3>
              <p className="font-inter text-lg text-slate-600 leading-relaxed">Strategic pacing that maximizes watch time. We understand platform algorithms and edit accordingly.</p>
            </TiltCard>

            {/* Platform-Specific - Animated Icons */}
            <TiltCard className="group bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-sm border border-slate-200/50 hover:shadow-md hover:border-slate-300/60 transition-all duration-500 hover:scale-105 transform cursor-pointer">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <div className="relative w-8 h-8 grid grid-cols-2 gap-1">
                  <div className="w-3 h-3 bg-purple-500 rounded animate-pulse" />
                  <div className="w-3 h-3 bg-purple-400 rounded-sm animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <div className="w-3 h-3 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                  <div className="w-3 h-3 bg-purple-200 rounded animate-pulse" style={{ animationDelay: '0.9s' }} />
                </div>
              </div>
              <h3 className="font-sf-pro text-2xl font-semibold text-slate-900 mb-4 group-hover:text-purple-600 transition-colors">Platform-Specific Edits</h3>
              <p className="font-inter text-lg text-slate-600 leading-relaxed">Optimized for each platform's unique requirements. From TikTok hooks to YouTube retention curves.</p>
            </TiltCard>

            {/* Sound Design - Animated Waveform */}
            <TiltCard className="group bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-sm border border-slate-200/50 hover:shadow-md hover:border-slate-300/60 transition-all duration-500 hover:scale-105 transform cursor-pointer">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <div className="relative w-8 h-8 flex items-center justify-center gap-0.5">
                  <div className="w-0.5 bg-orange-500 rounded-full animate-pulse" style={{ height: '8px' }} />
                  <div className="w-0.5 bg-orange-400 rounded-full animate-pulse" style={{ height: '16px', animationDelay: '0.1s' }} />
                  <div className="w-0.5 bg-orange-500 rounded-full animate-pulse" style={{ height: '12px', animationDelay: '0.2s' }} />
                  <div className="w-0.5 bg-orange-600 rounded-full animate-pulse" style={{ height: '20px', animationDelay: '0.3s' }} />
                  <div className="w-0.5 bg-orange-400 rounded-full animate-pulse" style={{ height: '6px', animationDelay: '0.4s' }} />
                  <div className="w-0.5 bg-orange-500 rounded-full animate-pulse" style={{ height: '14px', animationDelay: '0.5s' }} />
                </div>
              </div>
              <h3 className="font-sf-pro text-2xl font-semibold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors">Sound Design & Motion</h3>
              <p className="font-inter text-lg text-slate-600 leading-relaxed">Immersive audio and smooth motion graphics that enhance the story without overwhelming.</p>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS - Progress Bar Design --- */}
      <section 
        className="py-32 px-8 relative overflow-hidden z-10" 
        style={{ 
          pointerEvents: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-sf-pro text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 mb-8 whitespace-nowrap">How It Works</h2>
            <p className="font-inter text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">A streamlined process designed for speed, quality, and results.</p>
          </div>

          <HowItWorksProgress />
        </div>
      </section>

      {/* --- STATS with Modern Design --- */}
      <section className="py-32 px-8 relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-sf-pro text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
              See Your <span className="text-blue-600">Content Grow</span>
            </h2>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Stat 1 - Success Rate */}
            <div className="relative">
              <div className="bg-blue-50 rounded-2xl p-8 text-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 left-4 w-8 h-8 text-slate-400">✕</div>
                  <div className="absolute top-8 right-6 w-6 h-6 text-slate-400">✕</div>
                  <div className="absolute bottom-6 left-8 w-4 h-4 text-slate-400">✕</div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 text-slate-400">✕</div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-3">
                    <span className="text-blue-600 mr-2">↗</span>
                    <CounterStat number={98} suffix="%" label="" delay={0} />
                  </div>
                  <p className="text-slate-600 text-sm">
                    Projects delivered<br />successfully
                  </p>
                </div>
              </div>
            </div>

            {/* Stat 2 - Average Savings */}
            <div className="relative">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
                <div className="flex items-center justify-center mb-3">
                  <CounterStat number={3000} suffix="+" label="" delay={200} />
                </div>
                <p className="text-slate-600 text-sm">
                  Our clients' average<br />video views
                </p>
              </div>
            </div>

            {/* Stat 3 - Growth */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-center text-white relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-3">
                    <span className="mr-2">↗</span>
                    <CounterStat number={50} suffix="%" label="" delay={400} />
                  </div>
                  <p className="text-blue-100 text-sm">
                    Effective in engagement<br />growth than before
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-center mt-12">
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Numbers that speak to our commitment to delivering results that matter.
            </p>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS Infinite Carousel --- */}
      <section className="py-32 px-8 relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-sf-pro text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 mb-8 whitespace-nowrap">What Our Clients Say</h2>
            <p className="font-inter text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">Real feedback from creators who trust us with their content.</p>
          </div>

          <div className="relative">
            {/* Fade gradients on sides */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <div className="overflow-hidden">
              <div className="flex gap-8 hover:pause-animation" style={{
                width: 'calc(400px * 16)',
                animation: 'scroll-left 40s linear infinite'
              }}>
                {[...testimonials, ...testimonials].map((testimonial, i) => (
                  <div key={i} className="flex-shrink-0 w-96 bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-sm border border-slate-200/50">
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(testimonial.rating)].map((_, starIndex) => (
                        <span key={starIndex} className="text-yellow-400">⭐</span>
                      ))}
                    </div>
                    <p className="font-inter text-base text-slate-600 leading-relaxed mb-6">"{testimonial.text}"</p>
                    <div className="border-t border-slate-200 pt-4">
                      <div className="font-sf-pro text-lg font-semibold text-slate-900">{testimonial.name}</div>
                      <div className="font-inter text-sm text-slate-500">{testimonial.company}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT US SECTION --- */}
      <section id="contact-us" className="py-32 px-8 relative overflow-hidden z-10">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-sf-pro text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 mb-8">Let's create something amazing together</h2>
          <p className="font-inter text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">Ready to elevate your content? Get in touch and let's discuss how we can bring your vision to life.</p>
          
          {/* Contact Methods */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {/* WhatsApp */}
            <a
              href="https://wa.me/919373032009?text=Hi%20Idyll%20Productions,%20I%20want%20to%20discuss%20a%20video%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-slate-200/50 hover:shadow-xl hover:border-green-300/60 transition-all duration-500 hover:scale-105 transform"
            >
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-500 mx-auto mb-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.346"/>
                </svg>
              </div>
              <h3 className="font-sf-pro text-sm font-semibold text-slate-900 group-hover:text-green-600 transition-colors">WhatsApp</h3>
            </a>

            {/* Discord */}
            <a
              href="https://discord.com/users/1011509586919960596"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-slate-200/50 hover:shadow-xl hover:border-indigo-300/60 transition-all duration-500 hover:scale-105 transform"
            >
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-200 group-hover:scale-110 transition-all duration-500 mx-auto mb-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                </svg>
              </div>
              <h3 className="font-sf-pro text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">Discord</h3>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/idyllproductionsofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-slate-200/50 hover:shadow-xl hover:border-pink-300/60 transition-all duration-500 hover:scale-105 transform"
            >
              <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600 group-hover:bg-pink-200 group-hover:scale-110 transition-all duration-500 mx-auto mb-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <h3 className="font-sf-pro text-sm font-semibold text-slate-900 group-hover:text-pink-600 transition-colors">Instagram</h3>
            </a>

            {/* Twitter/X */}
            <a
              href="https://x.com/madebyidyll"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-slate-200/50 hover:shadow-xl hover:border-slate-300/60 transition-all duration-500 hover:scale-105 transform"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-slate-200 group-hover:scale-110 transition-all duration-500 mx-auto mb-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <h3 className="font-sf-pro text-sm font-semibold text-slate-900 group-hover:text-slate-600 transition-colors">Twitter</h3>
            </a>
          </div>

          {/* Email Address */}
          <div className="mb-8">
            <p className="font-inter text-lg text-slate-600 mb-2">Email us directly:</p>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=idyllproductionsofficial@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sf-pro text-xl font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              idyllproductionsofficial@gmail.com
            </a>
          </div>
          
          <div className="flex justify-center">
            <button onClick={() => document.getElementById('our-work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="relative h-14 px-10 rounded-lg text-lg font-medium bg-transparent text-slate-700 border border-slate-300 hover:border-blue-500 transition-all duration-300 hover:scale-105 transform">
              View Our Portfolio
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
