import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Play, X, Video, Gamepad2, Layout, Sparkles, 
  CheckCircle2, ChevronRight, Maximize2, Edit3, Camera, 
  Activity, Heart, ShieldCheck, Globe, MessageSquare, Plus, Minus,
  Zap, Monitor, Headphones, Target, Volume2, VolumeX
} from 'lucide-react';
import Button from '../components/Button';
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
            let current = 0;
            const startTime = Date.now();
            
            const animate = () => {
              const elapsed = Date.now() - startTime;
              
              // Initial fast animation to reach the base number (first 3 seconds)
              if (elapsed < 3000) {
                const progress = elapsed / 3000;
                current = number * progress;
              } else {
                // Continuous slow increment after reaching base number
                const slowIncrement = (elapsed - 3000) / 1000; // 1 unit per second
                current = number + slowIncrement;
              }
              
              setCount(Math.floor(current));
              requestAnimationFrame(animate);
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
  const [selectedCategory, setSelectedCategory] = useState<string>("Short-Form Content");
  const [currentWord, setCurrentWord] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [videoMuted, setVideoMuted] = useState<{ [key: number]: boolean }>({});
  
  const rotatingWords = ['creators', 'brands', 'audiences', 'stories'];

  const testimonials = [
    { name: "Dawson Gibbs", company: "Evo Agency", rating: 5, text: "Exceptional quality and lightning-fast turnaround. Our client retention improved by 40% after switching to Idyll." },
    { name: "Mohammed Shah", company: "Regal Dubai Travel Agency", rating: 5, text: "The attention to detail in every frame is remarkable. Our travel content now converts 3x better." },
    { name: "Vivek Kumar", company: "Physics Wallah", rating: 5, text: "Perfect understanding of educational content flow. Student engagement increased significantly." },
    { name: "Pintu Biswas", company: "Vedantu", rating: 5, text: "Professional, reliable, and consistently delivers beyond expectations. Highly recommended." },
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
      videos: [
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750326/Ad_4_el6fgj.mp4",
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750322/Ad_2_zo3me4.mp4",
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750320/Ad_3_tkfp5f.mp4",
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750310/Ad_1_ahbw0h.mp4",
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768768798/Ad_7_o6vuhr.mp4",
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768768798/Ad_6_paniy8.mp4"
      ]
    },
    {
      name: "Long-Form",
      description: "Creators & storytelling",
      text: "Edited for watch time and flow.",
      videos: [
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768768563/1_nqrexm.mp4",
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768768566/2_p5mns9.mp4",
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768768567/3_r5xgfn.mp4",
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768768565/4_lha4nt.mp4"
      ]
    },
    {
      name: "SaaS & Tech Videos", 
      description: "Explainers, product demos, ads",
      text: "We simplify complex products into clear stories.",
      videos: [
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750335/Shapes_flet7d.mp4",
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750334/Doks_Ai_Fiinal_iwuzvv.mp4",
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750333/Waves_Final_kdxxpz.mp4",
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768762722/5_apnity.mp4",
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768762734/3_nulnsz.mp4"
      ]
    },
    {
      name: "Gaming Content",
      description: "YouTube & short-form gaming", 
      text: "Fast, energetic edits without chaos.",
      videos: [
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768762658/5_bsd5zy.mp4",
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750341/4_kwlmnp.mp4",
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750339/3_G_fvet0k.mp4",
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750337/1_G_pvafu1.mp4",
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750337/2_o5btbp.mp4"
      ]
    },
    {
      name: "Rhythmic Montage",
      description: "Film-style storytelling", 
      text: "Cinematic quality with professional color grading and motion.",
      videos: [
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768762199/3_aqwokq.mp4",
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768762192/Cinematic_Video_1_iyyyji.mp4",
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768762190/Cinematic_Video_4_qgo2oq.mp4",
        "https://res.cloudinary.com/ddm4gglkp/video/upload/v1768762184/Cinematic_Video_2_kxtfvk.mp4"
      ]
    }
  ];

  // Debug: Log the video URLs to console
  console.log('Short-form videos:', editingCategories[0].videos);
  console.log('Cinematic videos:', editingCategories[3].videos);
  console.log('Selected category:', selectedCategory);
  console.log('Current category videos:', editingCategories.find(cat => cat.name === selectedCategory)?.videos);

  const handleCategorySelect = (categoryName: string) => {
    console.log('Category selected:', categoryName);
    console.log('Previous category:', selectedCategory);
    setSelectedCategory(categoryName);
    setVideoMuted({}); // Reset muted state when switching categories
    
    // Force a small delay to ensure state updates
    setTimeout(() => {
      console.log('New selected category:', categoryName);
      const categoryVideos = editingCategories.find(cat => cat.name === categoryName)?.videos;
      console.log('Videos for', categoryName, ':', categoryVideos);
    }, 100);
  };

  const handlePreviousCategory = () => {
    const currentIndex = editingCategories.findIndex(cat => cat.name === selectedCategory);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : editingCategories.length - 1;
    handleCategorySelect(editingCategories[previousIndex].name);
  };

  const handleNextCategory = () => {
    const currentIndex = editingCategories.findIndex(cat => cat.name === selectedCategory);
    const nextIndex = currentIndex < editingCategories.length - 1 ? currentIndex + 1 : 0;
    handleCategorySelect(editingCategories[nextIndex].name);
  };

  const toggleVideoMute = (videoIndex: number) => {
    const videoElement = document.querySelector(`[data-video-index="${videoIndex}"]`) as HTMLVideoElement;
    if (videoElement) {
      videoElement.muted = !videoElement.muted;
      setVideoMuted(prev => ({
        ...prev,
        [videoIndex]: videoElement.muted
      }));
      console.log(`Video ${videoIndex} muted:`, videoElement.muted);
    }
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
      <section className="relative pt-32 sm:pt-32 md:pt-64 pb-24 sm:pb-32 md:pb-48 px-4 sm:px-6 md:px-8 overflow-hidden z-10">
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="reveal active">
            <h1 className="font-sf-pro text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-slate-900 leading-[0.9] mb-8 sm:mb-8 md:mb-12 animate-slide-up">
              Idyll Productions
            </h1>
            
            <h2 className="font-inter text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium tracking-tight text-slate-700 leading-[1.2] mb-8 sm:mb-8 md:mb-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
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
            
            <p className="font-inter text-lg sm:text-xl md:text-xl lg:text-2xl text-slate-500 max-w-3xl mx-auto mb-16 sm:mb-16 md:mb-24 leading-relaxed animate-slide-up px-4 sm:px-0" style={{ animationDelay: '0.6s' }}>
              Paid ads, short-form content, and YouTube videos that convert.<br className="hidden sm:block" />
              Edited with intent, not noise.
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
                <video
                  className="w-full h-full object-cover"
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  preload="auto"
                  loading="eager"
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
                  <source src="https://res.cloudinary.com/ddm4gglkp/video/upload/v1768750338/main_white_rqzryb.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
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
              <a
                href="https://calendly.com/smitaidyllproductions/talk-with-idyll-productions-csm"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto relative h-11 sm:h-12 md:h-14 px-6 sm:px-8 md:px-10 rounded-lg text-sm sm:text-base md:text-lg font-medium bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 hover:border-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105 transform flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book a Call
              </a>
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

      {/* --- WORK SHOWCASE WITH NAVIGATION --- */}
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

          {/* Category Navigation with Arrows */}
          <div className="flex items-center justify-center gap-8 sm:gap-12 mb-12 sm:mb-16">
            {/* Left Arrow */}
            <button
              onClick={handlePreviousCategory}
              className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Category Buttons */}
            <div className="flex flex-nowrap justify-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide">
              {editingCategories.map((category, i) => (
                <button
                  key={i}
                  onClick={() => handleCategorySelect(category.name)}
                  className={`flex-shrink-0 px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category.name
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNextCategory}
              className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Selected Category Info */}
          {selectedCategory && (
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="font-sf-pro text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 mb-2 sm:mb-4">
                {selectedCategory}
              </h3>
              <p className="font-inter text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
                {editingCategories.find(cat => cat.name === selectedCategory)?.text}
              </p>
            </div>
          )}

          {/* Video Grid */}
          {selectedCategory && (
            <div className="relative" key={selectedCategory}>
              <div className="animate-fade-in">
                {selectedCategory === "Short-Form Content" ? (
                  /* Vertical layout for Short-Form Content - 2 videos per row on mobile, 3 on desktop */
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 lg:gap-10">
                    {editingCategories.find(cat => cat.name === selectedCategory)?.videos.map((videoSrc, i) => {
                      console.log(`Rendering ${selectedCategory} video ${i}:`, videoSrc);
                      return (
                        <div 
                          key={`${selectedCategory}-${i}`} 
                          className="relative aspect-[9/16] bg-black rounded-xl overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-500 sm:hover:scale-105 w-full max-w-[180px] sm:max-w-sm mx-auto mobile-stable"
                        >
                          <video 
                            key={`video-${selectedCategory}-${i}`}
                            data-video-index={i}
                            className="w-full h-full object-cover transition-transform duration-300" 
                            autoPlay 
                            loop 
                            muted={videoMuted[i] !== false}
                            playsInline
                            preload="metadata"
                            loading="lazy"
                          >
                            <source src={videoSrc} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          
                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Mute/Unmute Button */}
                          <button
                            onClick={() => toggleVideoMute(i)}
                            className="absolute top-3 right-3 w-10 h-10 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all duration-200 opacity-40 hover:opacity-100 hover:scale-110"
                          >
                            {videoMuted[i] === false ? (
                              <Volume2 className="w-5 h-5" />
                            ) : (
                              <VolumeX className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Horizontal layout for other categories */
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {editingCategories.find(cat => cat.name === selectedCategory)?.videos.map((videoSrc, i) => {
                      console.log(`Rendering ${selectedCategory} video ${i}:`, videoSrc);
                      const categoryVideos = editingCategories.find(cat => cat.name === selectedCategory)?.videos || [];
                      const isLastVideoOfFive = categoryVideos.length === 5 && i === 4;
                      
                      return (
                        <div 
                          key={`${selectedCategory}-${i}`} 
                          className={`relative aspect-video bg-black rounded-xl overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-slide-up ${
                            isLastVideoOfFive ? 'lg:col-span-2 max-w-2xl mx-auto' : 'max-w-2xl mx-auto lg:mx-0'
                          }`}
                          style={{ animationDelay: `${i * 150}ms` }}
                        >
                          <video 
                            key={`video-${selectedCategory}-${i}`}
                            data-video-index={i}
                            className="w-full h-full object-cover transition-transform duration-300" 
                            autoPlay 
                            loop 
                            muted={videoMuted[i] !== false}
                            playsInline
                            preload="metadata"
                            loading="lazy"
                          >
                            <source src={videoSrc} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          
                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Mute/Unmute Button */}
                          <button
                            onClick={() => toggleVideoMute(i)}
                            className="absolute top-4 right-4 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all duration-200 opacity-40 hover:opacity-100 hover:scale-110"
                          >
                            {videoMuted[i] === false ? (
                              <Volume2 className="w-6 h-6" />
                            ) : (
                              <VolumeX className="w-6 h-6" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
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
                title: "Talking Head Short Form / Motion Graphics", 
                desc: "Engaging short-form content with dynamic motion graphics for social media platforms.", 
                icon: (
                  <div className="relative">
                    <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-300 rounded-sm transform rotate-12 animate-pulse"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                  </div>
                ),
                color: "blue",
                shape: "rounded-lg"
              },
              { 
                title: "Creator Paid Ads", 
                desc: "High-converting advertisement videos designed specifically for content creators and influencers.", 
                icon: (
                  <div className="relative">
                    <div className="w-6 h-4 bg-green-500 rounded-sm"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 bg-green-300 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-1 left-1 w-4 h-2 bg-green-600 rounded-sm"></div>
                    <div className="absolute top-1 left-2 text-green-200 text-xs">$</div>
                  </div>
                ),
                color: "green",
                shape: "rounded-lg"
              },
              { 
                title: "Gaming Edits", 
                desc: "Fast-paced, energetic gaming content with seamless transitions and highlight reels.", 
                icon: (
                  <div className="relative">
                    <div className="w-5 h-5 bg-purple-500 rounded-sm transform rotate-12"></div>
                    <div className="absolute top-1 left-1 w-3 h-3 bg-purple-300 rounded-sm"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                  </div>
                ),
                color: "purple",
                shape: "rounded-lg"
              },
              { 
                title: "Cinematic Vlog/Travel Video Edit", 
                desc: "Stunning cinematic vlogs and travel videos with professional color grading and storytelling.", 
                icon: (
                  <div className="relative">
                    <div className="w-6 h-4 bg-orange-500 rounded-sm"></div>
                    <div className="absolute top-1 left-1 w-4 h-2 bg-orange-300 rounded-sm"></div>
                    <div className="absolute -top-1 left-2 w-2 h-2 bg-orange-600 rounded-full"></div>
                    <div className="absolute bottom-0 right-0 w-1 h-1 bg-orange-400 rounded-full animate-ping"></div>
                  </div>
                ),
                color: "orange",
                shape: "rounded-lg"
              },
              { 
                title: "SaaS Animation / Product Explainer Videos", 
                desc: "Clear, engaging explainer videos and animations for SaaS products and services.", 
                icon: (
                  <div className="relative">
                    <div className="w-5 h-5 border-2 border-red-500 rounded-full animate-spin"></div>
                    <div className="absolute top-1 left-1 w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                  </div>
                ),
                color: "red",
                shape: "rounded-full"
              },
              { 
                title: "YouTube Long Form Videos", 
                desc: "Professional long-form YouTube content with strategic pacing and audience retention focus.", 
                icon: (
                  <div className="relative">
                    <div className="w-6 h-4 bg-cyan-500 rounded-sm"></div>
                    <div className="absolute top-1 left-2 w-2 h-2 bg-cyan-300 rounded-full"></div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-cyan-600 rounded-sm transform rotate-45"></div>
                    <div className="absolute top-0 left-0 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
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
            <h2 className="font-sf-pro text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 mb-8">Why Choose Idyll</h2>
            <p className="font-inter text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">We don't just edit videos—we engineer content that performs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {/* Clean Storytelling - Animated Timeline */}
            <TiltCard className="group bg-white/80 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-sm border border-slate-200/50 hover:shadow-md hover:border-slate-300/60 transition-all duration-500 hover:scale-105 transform cursor-pointer text-center">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto">
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
              <h3 className="font-sf-pro text-xl sm:text-2xl font-semibold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Clean Storytelling</h3>
              <p className="font-inter text-base sm:text-lg text-slate-600 leading-relaxed">Every cut serves a purpose. We eliminate noise and focus on narrative flow that keeps viewers engaged.</p>
            </TiltCard>

            {/* Retention-Focused - Animated Graph */}
            <TiltCard className="group bg-white/80 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-sm border border-slate-200/50 hover:shadow-md hover:border-slate-300/60 transition-all duration-500 hover:scale-105 transform cursor-pointer text-center">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto">
                <div className="relative w-8 h-8">
                  <svg className="w-full h-full" viewBox="0 0 32 32">
                    <path d="M2 28 L8 20 L14 16 L20 12 L26 8 L30 4" stroke="currentColor" strokeWidth="2" fill="none" className="text-green-500" />
                    <circle cx="8" cy="20" r="2" className="text-green-400 animate-pulse" fill="currentColor" />
                    <circle cx="20" cy="12" r="2" className="text-green-500 animate-pulse" fill="currentColor" style={{ animationDelay: '0.5s' }} />
                    <circle cx="30" cy="4" r="2" className="text-green-600 animate-pulse" fill="currentColor" style={{ animationDelay: '1s' }} />
                  </svg>
                </div>
              </div>
              <h3 className="font-sf-pro text-xl sm:text-2xl font-semibold text-slate-900 mb-4 group-hover:text-green-600 transition-colors">Retention-Focused Pacing</h3>
              <p className="font-inter text-base sm:text-lg text-slate-600 leading-relaxed">Strategic pacing that maximizes watch time. We understand platform algorithms and edit accordingly.</p>
            </TiltCard>

            {/* Platform-Specific - Animated Icons */}
            <TiltCard className="group bg-white/80 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-sm border border-slate-200/50 hover:shadow-md hover:border-slate-300/60 transition-all duration-500 hover:scale-105 transform cursor-pointer text-center">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto">
                <div className="relative w-8 h-8 grid grid-cols-2 gap-1">
                  <div className="w-3 h-3 bg-purple-500 rounded animate-pulse" />
                  <div className="w-3 h-3 bg-purple-400 rounded-sm animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <div className="w-3 h-3 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                  <div className="w-3 h-3 bg-purple-200 rounded animate-pulse" style={{ animationDelay: '0.9s' }} />
                </div>
              </div>
              <h3 className="font-sf-pro text-xl sm:text-2xl font-semibold text-slate-900 mb-4 group-hover:text-purple-600 transition-colors">Platform-Specific Edits</h3>
              <p className="font-inter text-base sm:text-lg text-slate-600 leading-relaxed">Optimized for each platform's unique requirements. From TikTok hooks to YouTube retention curves.</p>
            </TiltCard>

            {/* Sound Design - Animated Waveform */}
            <TiltCard className="group bg-white/80 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-sm border border-slate-200/50 hover:shadow-md hover:border-slate-300/60 transition-all duration-500 hover:scale-105 transform cursor-pointer text-center">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto">
                <div className="relative w-8 h-8 flex items-center justify-center gap-0.5">
                  <div className="w-0.5 bg-orange-500 rounded-full animate-pulse" style={{ height: '8px' }} />
                  <div className="w-0.5 bg-orange-400 rounded-full animate-pulse" style={{ height: '16px', animationDelay: '0.1s' }} />
                  <div className="w-0.5 bg-orange-500 rounded-full animate-pulse" style={{ height: '12px', animationDelay: '0.2s' }} />
                  <div className="w-0.5 bg-orange-600 rounded-full animate-pulse" style={{ height: '20px', animationDelay: '0.3s' }} />
                  <div className="w-0.5 bg-orange-400 rounded-full animate-pulse" style={{ height: '6px', animationDelay: '0.4s' }} />
                  <div className="w-0.5 bg-orange-500 rounded-full animate-pulse" style={{ height: '14px', animationDelay: '0.5s' }} />
                </div>
              </div>
              <h3 className="font-sf-pro text-xl sm:text-2xl font-semibold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors">Sound Design & Motion</h3>
              <p className="font-inter text-base sm:text-lg text-slate-600 leading-relaxed">Immersive audio and smooth motion graphics that enhance the story without overwhelming.</p>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS - Progress Bar Design --- */}
      <section 
        className="py-32 px-8 relative overflow-hidden z-10 hidden md:block" 
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
              <div className="flex gap-8 hover:pause-animation mobile-testimonial-scroll" style={{
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
              href="https://discord.com/users/1466675809568817246"
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

          {/* Email Address Buttons */}
          <div className="mb-8">
            <p className="font-inter text-lg text-slate-600 mb-4">Email us directly:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@idyllproductions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto relative h-14 px-6 rounded-lg text-base font-medium bg-white border border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 hover:scale-105 transform shadow-md hover:shadow-lg flex flex-col items-center justify-center"
              >
                <span className="font-semibold text-blue-600 hover:text-blue-700">contact@idyllproductions.com</span>
                <span className="text-xs text-slate-500">General inquiries</span>
              </a>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=smita@idyllproductions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto relative h-14 px-6 rounded-lg text-base font-medium bg-white border border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 hover:scale-105 transform shadow-md hover:shadow-lg flex flex-col items-center justify-center"
              >
                <span className="font-semibold text-blue-600 hover:text-blue-700">smita@idyllproductions.com</span>
                <span className="text-xs text-slate-500">CSM - Sales & Client Management</span>
              </a>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="https://calendly.com/smitaidyllproductions/talk-with-idyll-productions-csm"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto relative h-14 px-8 rounded-lg text-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Talk with our Manager
            </a>
            <button 
              onClick={() => document.getElementById('our-work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} 
              className="w-full sm:w-auto relative h-14 px-8 rounded-lg text-lg font-medium bg-transparent text-slate-700 border border-slate-300 hover:border-blue-500 transition-all duration-300 hover:scale-105 transform flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4 4m4-4l-4-4" />
              </svg>
              View Our Portfolio
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
