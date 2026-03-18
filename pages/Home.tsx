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
import UGCGallery from '../components/UGCGallery';
import ScrollFloat from '../components/ScrollFloat';
import { getVideosForCategory, UGC_VIDEOS, HERO_VIDEO } from '../constants/videoConfig';
import VideoSectionRouter from '../components/VideoSectionRouter';
import LazyVideo from '../components/LazyVideo';
import { videoPreloader } from '../utils/videoPreloader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Counter Animation Component
const CounterStat: React.FC<{
  number: number;
  suffix: string;
  label: string;
  delay: number;
  oscillate?: boolean;
  oscillateMin?: number;
  oscillateMax?: number;
  oscillateSpeed?: number;
}> = ({ number, suffix, label, delay, oscillate = false, oscillateMin, oscillateMax, oscillateSpeed = 4000 }) => {
  const [count, setCount] = useState(oscillate ? (oscillateMin ?? 0) : 0);
  const elementRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedRef.current) {
          hasStartedRef.current = true;
          
          setTimeout(() => {
            if (oscillate) {
              // Oscillate between min and max values
              const startTime = Date.now();
              const minValue = oscillateMin ?? 50;
              const maxValue = oscillateMax ?? 100;
              const cycleDuration = oscillateSpeed;
              
              const animate = () => {
                const elapsed = Date.now() - startTime;
                const cycleProgress = (elapsed % cycleDuration) / cycleDuration;
                
                // Use sine wave for smooth oscillation
                const sineWave = Math.sin(cycleProgress * Math.PI);
                const current = minValue + (sineWave * (maxValue - minValue));
                
                setCount(Math.floor(current));
                animationFrameRef.current = requestAnimationFrame(animate);
              };
              animate();
            } else {
              // Original animation for other stats
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
                  const slowIncrement = (elapsed - 3000) / 1000;
                  current = number + slowIncrement;
                }
                
                setCount(Math.floor(current));
                animationFrameRef.current = requestAnimationFrame(animate);
              };
              animate();
            }
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    
    if (elementRef.current) observer.observe(elementRef.current);
    
    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [number, delay, oscillate, oscillateMin, oscillateMax, oscillateSpeed]);

  return (
    <div ref={elementRef} className="inline-flex items-center">
      <span style={{ fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>{count}{suffix}</span>
      {label && <span className="text-base lg:text-lg font-medium text-slate-700 ml-2">{label}</span>}
    </div>
  );
};

const rotatingWords = ["creators", "brands", "audiences", "stories"];

const editingCategories = [
  {
    name: "Short-Form Content",
    description: "Reels, Shorts, TikTok",
    text: "Built for retention and scroll-stopping hooks.",
    videos: getVideosForCategory("Short-Form Content")
  },
  {
    name: "Long-Form",
    description: "Creators & storytelling",
    text: "Edited for watch time and flow.",
    videos: getVideosForCategory("Long-Form")
  },
  {
    name: "SaaS & Tech Videos", 
    description: "Explainers, product demos, ads",
    text: "We simplify complex products into clear stories.",
    videos: getVideosForCategory("SaaS & Tech Videos")
  },
  {
    name: "Gaming Content",
    description: "YouTube & short-form gaming", 
    text: "Fast, energetic edits without chaos.",
    videos: getVideosForCategory("Gaming Content")
  },
  {
    name: "Rhythmic Montage",
    description: "Film-style storytelling", 
    text: "Cinematic quality with professional color grading and motion.",
    videos: getVideosForCategory("Rhythmic Montage")
  }
];

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Short-Form Content");
  const [currentWord, setCurrentWord] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [videoMuted, setVideoMuted] = useState<{ [key: number]: boolean }>({});
  const ugcSectionRef = useRef<HTMLDivElement>(null);
  const [ugcScrollProgress, setUgcScrollProgress] = useState(0);
  const [rotatingIcon, setRotatingIcon] = useState<number | null>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [serviceVisible, setServiceVisible] = useState<boolean[]>(new Array(6).fill(false));
  const whatYouGetRef = useRef<HTMLDivElement>(null);
  const [whatYouGetProgress, setWhatYouGetProgress] = useState(0);
  const whyChooseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [whyChooseVisible, setWhyChooseVisible] = useState<boolean[]>(new Array(4).fill(false));
  const howItWorksLineRef = useRef<HTMLDivElement>(null);
  const howItWorksSectionRef = useRef<HTMLDivElement>(null);
  const problemCardsRef = useRef<HTMLDivElement>(null);
  const [problemCardsProgress, setProblemCardsProgress] = useState(0);
  
  // Preload videos of current category for instant loading
  useEffect(() => {
    const currentCategoryVideos = editingCategories.find(cat => cat.name === selectedCategory)?.videos || [];
    
    // Preload videos with priority (first 3 get high priority)
    if (currentCategoryVideos.length > 0) {
      videoPreloader.preloadWithPriority(currentCategoryVideos, 3);
    }
  }, [selectedCategory, editingCategories]);

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

  // UGC Content Items
  const ugcItems = UGC_VIDEOS;

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
    
    // Auto-scroll selected button into view on mobile
    setTimeout(() => {
      const selectedButton = document.querySelector(`button[data-category="${categoryName}"]`);
      if (selectedButton) {
        selectedButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
      
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

  const handleIconClick = (iconIndex: number) => {
    setRotatingIcon(iconIndex);
    setTimeout(() => {
      setRotatingIcon(null);
    }, 1200);
  };

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          
          // Calculate UGC section scroll progress
          if (ugcSectionRef.current) {
            const rect = ugcSectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionTop = rect.top;
            
            // Start animation when section enters viewport
            // Progress from 0 to 1 as section moves from bottom to center of viewport
            const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight * 0.7)));
            setUgcScrollProgress(progress);
          }

          // Calculate What You Get section scroll progress
          if (whatYouGetRef.current) {
            const rect = whatYouGetRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            
            // Progress from 0 to 1 as section scrolls into view
            const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight * 0.6)));
            setWhatYouGetProgress(progress);
          }

          // Check service cards visibility
          serviceRefs.current.forEach((ref, index) => {
            if (ref) {
              const rect = ref.getBoundingClientRect();
              const windowHeight = window.innerHeight;
              if (rect.top < windowHeight * 0.85) {
                setServiceVisible(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }
            }
          });

          // Check Why Choose cards visibility
          whyChooseRefs.current.forEach((ref, index) => {
            if (ref) {
              const rect = ref.getBoundingClientRect();
              const windowHeight = window.innerHeight;
              if (rect.top < windowHeight * 0.85) {
                setWhyChooseVisible(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }
            }
          });

          // Calculate Problem Cards scroll progress
          if (problemCardsRef.current) {
            const rect = problemCardsRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            
            // Progress from 0 to 1 as section enters and moves through viewport
            // Start when section is at bottom of viewport, complete when it's in center
            if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
              const progress = Math.max(0, Math.min(1, 1 - (sectionTop / windowHeight)));
              setProblemCardsProgress(progress);
            } else if (sectionTop <= -sectionHeight) {
              setProblemCardsProgress(1);
            } else {
              setProblemCardsProgress(0);
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(wordInterval);
    };
  }, []);

  // GSAP Animation for How It Works line
  useEffect(() => {
    if (howItWorksLineRef.current && howItWorksSectionRef.current) {
      gsap.fromTo(
        howItWorksLineRef.current,
        { 
          width: '0%',
          opacity: 0
        },
        {
          width: '100%',
          opacity: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: howItWorksSectionRef.current,
            start: 'top 70%',
            end: 'top 20%',
            scrub: 1.5,
            once: false,
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      
      {/* Video Section Router for direct URL access */}
      <VideoSectionRouter onCategorySelect={handleCategorySelect} />
      
      {/* Global dots pattern with top-to-bottom fade */}
      <div className="fixed inset-0 pointer-events-none" style={{
        zIndex: 1,
        backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.15) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        maskImage: `linear-gradient(to bottom, black 0%, black 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%)`,
        WebkitMaskImage: `linear-gradient(to bottom, black 0%, black 30%, rgba(0, 0, 0, 0.5) 60%, transparent 100%)`
      }} />

      {/* Floating Parallax Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
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
      <section className="relative pt-24 sm:pt-28 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 md:px-8 overflow-hidden">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/Bg%20Image.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0,
            animation: 'none !important',
            transform: 'translate3d(0, 0, 0) !important',
            transition: 'none !important',
            willChange: 'auto',
            opacity: 0.6,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        />
        
        <div className="max-w-7xl mx-auto text-center relative" style={{ zIndex: 10 }}>
          <div>
            {/* Badge Above Title */}
            <div className="inline-flex items-center gap-3 px-8 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full mb-6 shadow-sm">
              <span className="font-bold text-lg sm:text-xl" style={{
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #FF69B4 50%, #DA70D6 75%, #9370DB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>300M+</span>
              <span className="text-slate-700 font-medium text-base sm:text-lg">
                Views Driven by Strategic Editing
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight text-slate-900 leading-[0.9] mb-8 sm:mb-8 md:mb-12" style={{ fontFamily: 'Inter, sans-serif' }}>
              Idyll Productions
            </h1>
            
            <h2 className="font-sf-pro text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal tracking-tight text-slate-700 leading-[1.2] mb-8 sm:mb-8 md:mb-10 px-4 sm:px-0">
              <span className="inline-block">High-Performance Video Editing Company</span>
              <br className="hidden sm:block" />
              <span className="inline-block">for Modern{' '}</span>
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
            
            <p className="font-inter text-base sm:text-lg md:text-xl lg:text-2xl text-slate-500 max-w-3xl mx-auto mb-16 sm:mb-16 md:mb-24 leading-relaxed px-6 sm:px-4">
              Edited with intent, not noise.
            </p>
            
            {/* Hero Video - With gradient border and scroll animation */}
            <div className="relative max-w-7xl mx-auto mb-12 sm:mb-16">
              <div 
                className="aspect-video rounded-2xl overflow-hidden relative group cursor-pointer p-[3px]"
                style={{
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #FF69B4 50%, #DA70D6 75%, #9370DB 100%)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                  transform: `scale(${Math.min(1, 0.7 + (scrollY / 800))})`,
                  transformOrigin: 'center center',
                  willChange: 'transform'
                }}
              >
                <div className="w-full h-full rounded-[14px] overflow-hidden bg-white p-2 sm:p-3">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-black">
                    <LazyVideo
                      src={HERO_VIDEO}
                      className="w-full h-full object-cover hero-video"
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
                      disablePictureInPicture 
                      disableRemotePlayback
                      data-priority="high"
                      style={{ 
                        willChange: 'transform',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                        WebkitTransform: 'translateZ(0)',
                        WebkitBackfaceVisibility: 'hidden'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Buttons with increased gap from video */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center px-4 sm:px-0 mt-12 sm:mt-16 md:mt-20">
              <button
                onClick={() => document.getElementById('our-work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="w-full sm:w-auto relative h-10 sm:h-11 md:h-12 px-8 sm:px-10 md:px-12 rounded-lg text-sm sm:text-base font-medium bg-[#111111] text-white hover:bg-[#222222] transition-all duration-300 hover:shadow-lg hover:scale-105 transform flex items-center justify-center gap-2"
              >
                View Our Work
                <ArrowRight className="inline-block w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <a
                href="https://calendly.com/smitaidyllproductions/talk-with-idyll-productions-csm"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto relative h-10 sm:h-11 md:h-12 px-8 sm:px-10 md:px-12 rounded-lg text-sm sm:text-base font-medium bg-[#111111] text-white hover:bg-[#222222] transition-all duration-300 hover:shadow-lg hover:scale-105 transform flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book a Call
              </a>
              <button
                onClick={() => document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="w-full sm:w-auto relative h-10 sm:h-11 md:h-12 px-8 sm:px-10 md:px-12 rounded-lg text-sm sm:text-base font-medium bg-[#111111] text-white hover:bg-[#222222] transition-all duration-300 hover:shadow-lg hover:scale-105 transform flex items-center justify-center gap-2"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- UGC CONTENT SHOWCASE --- */}
      <section ref={ugcSectionRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-20 xl:gap-24 items-center mb-12 sm:mb-16">
            {/* Left Content */}
            <div 
              className="text-left pr-0 lg:pr-8"
              style={{
                transform: `translateX(${-100 + (ugcScrollProgress * 100)}px)`,
                opacity: ugcScrollProgress,
                willChange: 'transform, opacity'
              }}
            >
              <h2 className="font-sf-pro text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-8">
                Best Editors Team for <span style={{
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #FF69B4 50%, #DA70D6 75%, #9370DB 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>UGC Content</span>
              </h2>
              <p className="font-inter text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
                Our expert team can produce <span className="font-bold text-black">100+ videos per day</span> easily with scroll-stopping content that drives real engagement and conversions.
              </p>
              
              {/* Platform Badges */}
              <div className="mb-8">
                <p className="font-inter text-sm text-slate-500 mb-3">
                  Powering Campaigns Across the Ad Ecosystem
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <img 
                    src="https://res.cloudinary.com/dxd79mrse/image/upload/v1772579097/icons_j8elqn.png" 
                    alt="Meta, TikTok, YouTube, Google Ads" 
                    className="h-8 w-auto object-contain"
                  />
                </div>
              </div>

              <button
                onClick={() => document.getElementById('our-work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] text-white rounded-lg font-medium hover:bg-[#222222] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                See Other Work
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Right Content - UGC Gallery */}
            <div className="relative">
              <UGCGallery items={ugcItems} autoScrollSpeed={0.5} />
            </div>
          </div>
        </div>
      </section>

      {/* --- WORK SHOWCASE WITH NAVIGATION --- */}
      <section id="our-work" className="pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 md:px-8 relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <ScrollFloat 
              containerClassName="font-sf-pro text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-slate-900 mb-4 sm:mb-6 md:mb-8"
              scrollStart="top bottom+=300px"
              scrollEnd="top center"
              stagger={0.01}
              animationDuration={0.5}
            >
              Specialized editing for every platform
            </ScrollFloat>
            <p className="font-inter text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              Crafted with precision and strategic intent for maximum performance.
            </p>
          </div>

          {/* Category Navigation */}
          <div className="flex items-center justify-center mb-12 sm:mb-16 px-4">
            {/* Category Buttons */}
            <div className="flex flex-nowrap gap-3 sm:gap-4 justify-center max-w-6xl overflow-x-auto scrollbar-hide py-2">
              {editingCategories.map((category, i) => (
                <button
                  key={i}
                  data-category={category.name}
                  onClick={() => handleCategorySelect(category.name)}
                  className={`px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    selectedCategory === category.name
                      ? 'bg-[#111111] text-white shadow-xl hover:bg-[#222222]'
                      : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-[#111111] shadow-md'
                  }`}
                  style={{
                    transform: selectedCategory === category.name ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
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
                          className="relative aspect-[9/16] bg-black rounded-xl overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-500 sm:hover:scale-105 w-full max-w-[180px] sm:max-w-sm mx-auto mobile-stable video-container"
                        >
                          <LazyVideo 
                            key={`video-${selectedCategory}-${i}`}
                            data-video-index={i}
                            src={videoSrc}
                            className={`w-full h-full object-cover transition-transform duration-300 ${i < 2 ? 'video-critical' : ''}`}
                            autoPlay 
                            loop 
                            muted={videoMuted[i] !== false}
                            playsInline
                            data-priority={i < 2 ? "high" : "normal"}
                            style={{
                              willChange: 'transform',
                              backfaceVisibility: 'hidden',
                              transform: 'translateZ(0)'
                            }}
                          />
                          
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
                          className={`relative aspect-video bg-black rounded-xl overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-slide-up video-container ${
                            isLastVideoOfFive ? 'lg:col-span-2 max-w-2xl mx-auto' : 'max-w-2xl mx-auto lg:mx-0'
                          }`}
                          style={{ animationDelay: `${i * 150}ms` }}
                        >
                          <LazyVideo 
                            key={`video-${selectedCategory}-${i}`}
                            data-video-index={i}
                            src={videoSrc}
                            className={`w-full h-full object-cover transition-transform duration-300 ${i < 2 ? 'video-critical' : ''}`}
                            autoPlay 
                            loop 
                            muted={videoMuted[i] !== false}
                            playsInline
                            data-priority={i < 2 ? "high" : "normal"}
                            style={{
                              willChange: 'transform',
                              backfaceVisibility: 'hidden',
                              transform: 'translateZ(0)'
                            }}
                          />
                          
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

      {/* --- WHAT YOU GET Section --- */}
      <section ref={whatYouGetRef} className="py-24 px-8 relative overflow-hidden z-10 bg-white" style={{ perspective: '1000px' }}>
        <div 
          className="max-w-6xl mx-auto relative z-10"
          style={{
            transform: `rotateX(${(1 - whatYouGetProgress) * 15}deg) scale(${0.8 + (whatYouGetProgress * 0.2)})`,
            opacity: 0.3 + (whatYouGetProgress * 0.7),
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* SVG Gradient Definitions */}
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="iconGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="25%" stopColor="#F7931E" />
                <stop offset="50%" stopColor="#FF69B4" />
                <stop offset="75%" stopColor="#DA70D6" />
                <stop offset="100%" stopColor="#9370DB" />
              </linearGradient>
              <linearGradient id="iconGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="25%" stopColor="#F7931E" />
                <stop offset="50%" stopColor="#FF69B4" />
                <stop offset="75%" stopColor="#DA70D6" />
                <stop offset="100%" stopColor="#9370DB" />
              </linearGradient>
              <linearGradient id="iconGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="25%" stopColor="#F7931E" />
                <stop offset="50%" stopColor="#FF69B4" />
                <stop offset="75%" stopColor="#DA70D6" />
                <stop offset="100%" stopColor="#9370DB" />
              </linearGradient>
              <linearGradient id="iconGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="25%" stopColor="#F7931E" />
                <stop offset="50%" stopColor="#FF69B4" />
                <stop offset="75%" stopColor="#DA70D6" />
                <stop offset="100%" stopColor="#9370DB" />
              </linearGradient>
              <linearGradient id="iconGradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="25%" stopColor="#F7931E" />
                <stop offset="50%" stopColor="#FF69B4" />
                <stop offset="75%" stopColor="#DA70D6" />
                <stop offset="100%" stopColor="#9370DB" />
              </linearGradient>
              <linearGradient id="iconGradient6" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="25%" stopColor="#F7931E" />
                <stop offset="50%" stopColor="#FF69B4" />
                <stop offset="75%" stopColor="#DA70D6" />
                <stop offset="100%" stopColor="#9370DB" />
              </linearGradient>
            </defs>
          </svg>

          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{
              background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.1) 25%, rgba(255, 105, 180, 0.1) 50%, rgba(218, 112, 214, 0.1) 75%, rgba(147, 112, 219, 0.1) 100%)',
              border: '1px solid rgba(255, 107, 53, 0.2)'
            }}>
              <div className="w-2 h-2 rounded-full" style={{
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #FF69B4 50%, #DA70D6 75%, #9370DB 100%)'
              }}></div>
              <span className="font-medium text-sm" style={{
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #FF69B4 50%, #DA70D6 75%, #9370DB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>What you get</span>
            </div>
            <h2 className="font-sf-pro text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
              Videos that bring<br />customers
            </h2>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Benefit 1 */}
            <div 
              className="text-center group"
              style={{
                transform: `translateX(${(1 - whatYouGetProgress) * -200}px)`,
                opacity: whatYouGetProgress,
                transition: 'transform 0.6s ease-out, opacity 0.6s ease-out'
              }}
            >
              <div 
                onClick={() => handleIconClick(1)}
                className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 cursor-pointer" 
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(247, 147, 30, 0.15) 25%, rgba(255, 105, 180, 0.15) 50%, rgba(218, 112, 214, 0.15) 75%, rgba(147, 112, 219, 0.15) 100%)',
                  transform: rotatingIcon === 1 ? 'rotateY(360deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s ease-in-out'
                }}
              >
                <svg className="w-8 h-8" fill="none" stroke="url(#iconGradient1)" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-sf-pro text-xl font-semibold text-slate-900 mb-3">Videos that bring customers</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Short clips turn viewers into buyers and grow your sales each week.</p>
            </div>

            {/* Benefit 2 */}
            <div 
              className="text-center group"
              style={{
                opacity: whatYouGetProgress,
                transition: 'opacity 0.6s ease-out 0.1s'
              }}
            >
              <div 
                onClick={() => handleIconClick(2)}
                className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 cursor-pointer" 
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(247, 147, 30, 0.15) 25%, rgba(255, 105, 180, 0.15) 50%, rgba(218, 112, 214, 0.15) 75%, rgba(147, 112, 219, 0.15) 100%)',
                  transform: rotatingIcon === 2 ? 'rotateY(360deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s ease-in-out'
                }}
              >
                <svg className="w-8 h-8" fill="none" stroke="url(#iconGradient2)" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-sf-pro text-xl font-semibold text-slate-900 mb-3">Hooks that stop scrolling</h3>
              <p className="text-slate-600 text-sm leading-relaxed">We craft strong openings that hold attention and raise watch time fast.</p>
            </div>

            {/* Benefit 3 */}
            <div 
              className="text-center group"
              style={{
                transform: `translateX(${(1 - whatYouGetProgress) * 200}px)`,
                opacity: whatYouGetProgress,
                transition: 'transform 0.6s ease-out 0.2s, opacity 0.6s ease-out 0.2s'
              }}
            >
              <div 
                onClick={() => handleIconClick(3)}
                className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 cursor-pointer" 
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(247, 147, 30, 0.15) 25%, rgba(255, 105, 180, 0.15) 50%, rgba(218, 112, 214, 0.15) 75%, rgba(147, 112, 219, 0.15) 100%)',
                  transform: rotatingIcon === 3 ? 'rotateY(360deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s ease-in-out'
                }}
              >
                <svg className="w-8 h-8" fill="none" stroke="url(#iconGradient3)" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-sf-pro text-xl font-semibold text-slate-900 mb-3">More leads from every video</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Each video drives clicks, messages, and calls from people ready to buy.</p>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 4 */}
            <div 
              className="text-center group"
              style={{
                transform: `translateX(${(1 - whatYouGetProgress) * -200}px)`,
                opacity: whatYouGetProgress,
                transition: 'transform 0.6s ease-out 0.3s, opacity 0.6s ease-out 0.3s'
              }}
            >
              <div 
                onClick={() => handleIconClick(4)}
                className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 cursor-pointer" 
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(247, 147, 30, 0.15) 25%, rgba(255, 105, 180, 0.15) 50%, rgba(218, 112, 214, 0.15) 75%, rgba(147, 112, 219, 0.15) 100%)',
                  transform: rotatingIcon === 4 ? 'rotateY(360deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s ease-in-out'
                }}
              >
                <svg className="w-8 h-8" fill="none" stroke="url(#iconGradient4)" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-sf-pro text-xl font-semibold text-slate-900 mb-3">Less work for your team</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Use the checklist to catch small mistakes before publishing.</p>
            </div>

            {/* Benefit 5 */}
            <div 
              className="text-center group"
              style={{
                opacity: whatYouGetProgress,
                transition: 'opacity 0.6s ease-out 0.4s'
              }}
            >
              <div 
                onClick={() => handleIconClick(5)}
                className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 cursor-pointer" 
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(247, 147, 30, 0.15) 25%, rgba(255, 105, 180, 0.15) 50%, rgba(218, 112, 214, 0.15) 75%, rgba(147, 112, 219, 0.15) 100%)',
                  transform: rotatingIcon === 5 ? 'rotateY(360deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s ease-in-out'
                }}
              >
                <svg className="w-8 h-8" fill="none" stroke="url(#iconGradient5)" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-sf-pro text-xl font-semibold text-slate-900 mb-3">One style, every platform</h3>
              <p className="text-slate-600 text-sm leading-relaxed">We resize and format videos for TikTok, Reels, and Shorts fast.</p>
            </div>

            {/* Benefit 6 */}
            <div 
              className="text-center group"
              style={{
                transform: `translateX(${(1 - whatYouGetProgress) * 200}px)`,
                opacity: whatYouGetProgress,
                transition: 'transform 0.6s ease-out 0.5s, opacity 0.6s ease-out 0.5s'
              }}
            >
              <div 
                onClick={() => handleIconClick(6)}
                className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 cursor-pointer" 
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(247, 147, 30, 0.15) 25%, rgba(255, 105, 180, 0.15) 50%, rgba(218, 112, 214, 0.15) 75%, rgba(147, 112, 219, 0.15) 100%)',
                  transform: rotatingIcon === 6 ? 'rotateY(360deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s ease-in-out'
                }}
              >
                <svg className="w-8 h-8" fill="none" stroke="url(#iconGradient6)" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-sf-pro text-xl font-semibold text-slate-900 mb-3">Numbers you can trust</h3>
              <p className="text-slate-600 text-sm leading-relaxed">We track results weekly and improve what brings sales and leads.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR SERVICES with Animated Icons --- */}
      <section id="our-services" className="py-32 px-8 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* SVG Gradient Definitions for Service Icons */}
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="serviceGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="25%" stopColor="#F7931E" />
                <stop offset="50%" stopColor="#FF69B4" />
                <stop offset="75%" stopColor="#DA70D6" />
                <stop offset="100%" stopColor="#9370DB" />
              </linearGradient>
              <linearGradient id="serviceGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="25%" stopColor="#F7931E" />
                <stop offset="50%" stopColor="#FF69B4" />
                <stop offset="75%" stopColor="#DA70D6" />
                <stop offset="100%" stopColor="#9370DB" />
              </linearGradient>
              <linearGradient id="serviceGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="25%" stopColor="#F7931E" />
                <stop offset="50%" stopColor="#FF69B4" />
                <stop offset="75%" stopColor="#DA70D6" />
                <stop offset="100%" stopColor="#9370DB" />
              </linearGradient>
              <linearGradient id="serviceGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="25%" stopColor="#F7931E" />
                <stop offset="50%" stopColor="#FF69B4" />
                <stop offset="75%" stopColor="#DA70D6" />
                <stop offset="100%" stopColor="#9370DB" />
              </linearGradient>
              <linearGradient id="serviceGradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="25%" stopColor="#F7931E" />
                <stop offset="50%" stopColor="#FF69B4" />
                <stop offset="75%" stopColor="#DA70D6" />
                <stop offset="100%" stopColor="#9370DB" />
              </linearGradient>
              <linearGradient id="serviceGradient6" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="25%" stopColor="#F7931E" />
                <stop offset="50%" stopColor="#FF69B4" />
                <stop offset="75%" stopColor="#DA70D6" />
                <stop offset="100%" stopColor="#9370DB" />
              </linearGradient>
            </defs>
          </svg>

          <div className="text-center mb-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{
              background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.1) 25%, rgba(255, 105, 180, 0.1) 50%, rgba(218, 112, 214, 0.1) 75%, rgba(147, 112, 219, 0.1) 100%)',
              border: '1px solid rgba(255, 107, 53, 0.2)'
            }}>
              <div className="w-2 h-2 rounded-full" style={{
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #FF69B4 50%, #DA70D6 75%, #9370DB 100%)'
              }}></div>
              <span className="font-medium text-sm" style={{
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #FF69B4 50%, #DA70D6 75%, #9370DB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>What we offer</span>
            </div>
            
            <h2 className="font-sf-pro text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 mb-8 whitespace-nowrap">Our <span className="brush-highlight">Services</span></h2>
            <p className="font-inter text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">Comprehensive video editing solutions tailored to your needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {[
              { 
                title: "Short Form Content & Creator Ads", 
                desc: "Engaging short-form content with dynamic motion graphics and high-converting ads for social media platforms.", 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="url(#serviceGradient1)" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                ),
                gradientId: "serviceGradient1",
                category: "Short-Form Content"
              },
              { 
                title: "UGC Ads", 
                desc: "Authentic user-generated content style ads that drive engagement and conversions for brands.", 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="url(#serviceGradient2)" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                gradientId: "serviceGradient2",
                scrollToSection: true
              },
              { 
                title: "Gaming Edits", 
                desc: "Fast-paced, energetic gaming content with seamless transitions and highlight reels.", 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="url(#serviceGradient3)" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                ),
                gradientId: "serviceGradient3",
                category: "Gaming"
              },
              { 
                title: "Cinematic Vlog/Travel Video Edit", 
                desc: "Stunning cinematic vlogs and travel videos with professional color grading and storytelling.", 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="url(#serviceGradient4)" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                gradientId: "serviceGradient4",
                category: "Cinematic"
              },
              { 
                title: "SaaS Animation / Product Explainer Videos", 
                desc: "Clear, engaging explainer videos and animations for SaaS products and services.", 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="url(#serviceGradient5)" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                gradientId: "serviceGradient5",
                category: "SaaS & Tech Videos"
              },
              { 
                title: "YouTube Long Form Videos", 
                desc: "Professional long-form YouTube content with strategic pacing and audience retention focus.", 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="url(#serviceGradient6)" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                gradientId: "serviceGradient6",
                category: "Long-Form"
              }
            ].map((service, i) => (
              <div 
                key={i} 
                ref={el => serviceRefs.current[i] = el}
                onClick={() => {
                  if (service.scrollToSection) {
                    ugcSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else if (service.category) {
                    handleCategorySelect(service.category);
                  }
                }}
                className="group text-center cursor-pointer"
                style={{
                  opacity: serviceVisible[i] ? 1 : 0,
                  transition: 'opacity 0.8s ease-out',
                  transitionDelay: `${i * 0.1}s`
                }}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center mb-6 transition-all duration-500 mx-auto group-hover:scale-110" style={{
                  background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.1) 25%, rgba(255, 105, 180, 0.1) 50%, rgba(218, 112, 214, 0.1) 75%, rgba(147, 112, 219, 0.1) 100%)'
                }}>
                  {service.icon}
                </div>
                <h3 className="font-sf-pro text-xl md:text-2xl font-semibold text-slate-900 mb-4 transition-colors duration-300 group-hover:text-slate-700">{service.title}</h3>
                <p className="font-inter text-base md:text-lg text-slate-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE IDYLL with ScrollStack --- */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="font-sf-pro text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 mb-6 sm:mb-8">Why Choose Idyll</h2>
            <p className="font-inter text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">We don't just edit videos, we engineer content that performs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            {/* Clean Storytelling - Left Card */}
            <div 
              ref={el => whyChooseRefs.current[0] = el}
              className="bg-white rounded-3xl p-8 sm:p-10 md:p-12 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-700" 
              style={{
                transition: 'background 0.7s ease, box-shadow 0.3s ease, transform 0.8s ease, opacity 0.8s ease',
                transform: whyChooseVisible[0] ? 'translateX(0)' : 'translateX(-100px)',
                opacity: whyChooseVisible[0] ? 1 : 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(247, 147, 30, 0.15) 25%, rgba(255, 105, 180, 0.15) 50%, rgba(218, 112, 214, 0.15) 75%, rgba(147, 112, 219, 0.15) 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
              }}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-6 sm:mb-7" style={{
                background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.1) 25%, rgba(255, 105, 180, 0.1) 50%, rgba(218, 112, 214, 0.1) 75%, rgba(147, 112, 219, 0.1) 100%)'
              }}>
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" stroke="url(#whyGradient1)" />
                </svg>
              </div>
              <h3 className="font-sf-pro text-xl sm:text-2xl font-semibold text-slate-900 mb-4">Clean Storytelling</h3>
              <p className="font-inter text-base sm:text-lg text-slate-600 leading-relaxed">Every cut serves a purpose. We eliminate noise and focus on narrative flow that keeps viewers engaged.</p>
            </div>

            {/* Retention-Focused - Right Card */}
            <div 
              ref={el => whyChooseRefs.current[1] = el}
              className="bg-white rounded-3xl p-8 sm:p-10 md:p-12 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-700" 
              style={{
                transition: 'background 0.7s ease, box-shadow 0.3s ease, transform 0.8s ease, opacity 0.8s ease',
                transform: whyChooseVisible[1] ? 'translateX(0)' : 'translateX(100px)',
                opacity: whyChooseVisible[1] ? 1 : 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(247, 147, 30, 0.15) 25%, rgba(255, 105, 180, 0.15) 50%, rgba(218, 112, 214, 0.15) 75%, rgba(147, 112, 219, 0.15) 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
              }}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-6 sm:mb-7" style={{
                background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.1) 25%, rgba(255, 105, 180, 0.1) 50%, rgba(218, 112, 214, 0.1) 75%, rgba(147, 112, 219, 0.1) 100%)'
              }}>
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" stroke="url(#whyGradient2)" />
                </svg>
              </div>
              <h3 className="font-sf-pro text-xl sm:text-2xl font-semibold text-slate-900 mb-4">Retention-Focused Pacing</h3>
              <p className="font-inter text-base sm:text-lg text-slate-600 leading-relaxed">Strategic pacing that maximizes watch time. We understand platform algorithms and edit accordingly.</p>
            </div>

            {/* Platform-Specific - Left Card */}
            <div 
              ref={el => whyChooseRefs.current[2] = el}
              className="bg-white rounded-3xl p-8 sm:p-10 md:p-12 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-700" 
              style={{
                transition: 'background 0.7s ease, box-shadow 0.3s ease, transform 0.8s ease, opacity 0.8s ease',
                transform: whyChooseVisible[2] ? 'translateX(0)' : 'translateX(-100px)',
                opacity: whyChooseVisible[2] ? 1 : 0,
                transitionDelay: '0.1s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(247, 147, 30, 0.15) 25%, rgba(255, 105, 180, 0.15) 50%, rgba(218, 112, 214, 0.15) 75%, rgba(147, 112, 219, 0.15) 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
              }}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-6 sm:mb-7" style={{
                background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.1) 25%, rgba(255, 105, 180, 0.1) 50%, rgba(218, 112, 214, 0.1) 75%, rgba(147, 112, 219, 0.1) 100%)'
              }}>
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" stroke="url(#whyGradient3)" />
                </svg>
              </div>
              <h3 className="font-sf-pro text-xl sm:text-2xl font-semibold text-slate-900 mb-4">Platform-Specific Edits</h3>
              <p className="font-inter text-base sm:text-lg text-slate-600 leading-relaxed">Optimized for each platform's unique requirements. From TikTok hooks to YouTube retention curves.</p>
            </div>

            {/* Sound Design - Right Card */}
            <div 
              ref={el => whyChooseRefs.current[3] = el}
              className="bg-white rounded-3xl p-8 sm:p-10 md:p-12 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-700" 
              style={{
                transition: 'background 0.7s ease, box-shadow 0.3s ease, transform 0.8s ease, opacity 0.8s ease',
                transform: whyChooseVisible[3] ? 'translateX(0)' : 'translateX(100px)',
                opacity: whyChooseVisible[3] ? 1 : 0,
                transitionDelay: '0.1s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(247, 147, 30, 0.15) 25%, rgba(255, 105, 180, 0.15) 50%, rgba(218, 112, 214, 0.15) 75%, rgba(147, 112, 219, 0.15) 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
              }}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-6 sm:mb-7" style={{
                background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.1) 25%, rgba(255, 105, 180, 0.1) 50%, rgba(218, 112, 214, 0.1) 75%, rgba(147, 112, 219, 0.1) 100%)'
              }}>
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" stroke="url(#whyGradient4)" />
                </svg>
              </div>
              <h3 className="font-sf-pro text-xl sm:text-2xl font-semibold text-slate-900 mb-4">Sound Design & Motion</h3>
              <p className="font-inter text-base sm:text-lg text-slate-600 leading-relaxed">Immersive audio and smooth motion graphics that enhance the story without overwhelming.</p>
            </div>
          </div>

          {/* SVG Gradient Definitions for Why Choose Icons */}
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="whyGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="25%" stopColor="#F7931E" />
                <stop offset="50%" stopColor="#FF69B4" />
                <stop offset="75%" stopColor="#DA70D6" />
                <stop offset="100%" stopColor="#9370DB" />
              </linearGradient>
              <linearGradient id="whyGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="25%" stopColor="#F7931E" />
                <stop offset="50%" stopColor="#FF69B4" />
                <stop offset="75%" stopColor="#DA70D6" />
                <stop offset="100%" stopColor="#9370DB" />
              </linearGradient>
              <linearGradient id="whyGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="25%" stopColor="#F7931E" />
                <stop offset="50%" stopColor="#FF69B4" />
                <stop offset="75%" stopColor="#DA70D6" />
                <stop offset="100%" stopColor="#9370DB" />
              </linearGradient>
              <linearGradient id="whyGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="25%" stopColor="#F7931E" />
                <stop offset="50%" stopColor="#FF69B4" />
                <stop offset="75%" stopColor="#DA70D6" />
                <stop offset="100%" stopColor="#9370DB" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* --- NUMBERS THAT MATTER Section --- */}
      <section className="py-24 md:py-28 px-8 relative overflow-hidden z-10 bg-white">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{
              background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.1) 25%, rgba(255, 105, 180, 0.1) 50%, rgba(218, 112, 214, 0.1) 75%, rgba(147, 112, 219, 0.1) 100%)',
              border: '1px solid rgba(255, 107, 53, 0.2)'
            }}>
              <div className="w-2 h-2 rounded-full" style={{
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #FF69B4 50%, #DA70D6 75%, #9370DB 100%)'
              }}></div>
              <span className="font-medium text-sm" style={{
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #FF69B4 50%, #DA70D6 75%, #9370DB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Proof in numbers</span>
            </div>
            <h2 className="font-sf-pro text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 mb-4">
              Numbers that<br />actually matter
            </h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-16 md:mb-20">
            <div className="text-center">
              <div className="font-sf-pro font-bold mb-4" style={{
                fontSize: '56px',
                lineHeight: '1',
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #FF69B4 50%, #DA70D6 75%, #9370DB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                <CounterStat number={200} suffix="M+" label="" delay={0} oscillate={true} oscillateMin={200} oscillateMax={300} oscillateSpeed={4000} />
              </div>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">Views generated across<br />TikTok, Reels & Shorts</p>
            </div>
            <div className="text-center">
              <div className="font-sf-pro font-bold mb-4" style={{
                fontSize: '56px',
                lineHeight: '1',
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #FF69B4 50%, #DA70D6 75%, #9370DB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                <CounterStat number={3.1} suffix="M+" label="" delay={200} oscillate={true} oscillateMin={3.1} oscillateMax={123.1} oscillateSpeed={4000} />
              </div>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">In tracked revenue<br />for our clients</p>
            </div>
            <div className="text-center">
              <div className="font-sf-pro font-bold mb-4" style={{
                fontSize: '56px',
                lineHeight: '1',
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #FF69B4 50%, #DA70D6 75%, #9370DB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                <CounterStat number={4.2} suffix="/5" label="" delay={400} oscillate={true} oscillateMin={4.2} oscillateMax={4.9} oscillateSpeed={4000} />
              </div>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">Rating from 120+<br />verified businesses</p>
            </div>
          </div>

          {/* Problem Cards */}
          <div ref={problemCardsRef} className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div 
                className="bg-white rounded-3xl p-8 md:p-10 transition-all duration-700 border border-slate-200 shadow-sm"
                style={{
                  transform: `rotate(${-6 + (problemCardsProgress * 4)}deg)`
                }}
              >
                <p className="text-slate-700 text-lg md:text-xl leading-relaxed">You post every day but your videos get 50 views and zero sales.</p>
              </div>
              <div 
                className="bg-white rounded-3xl p-8 md:p-10 transition-all duration-700 border border-slate-200 shadow-sm"
                style={{
                  transform: `rotate(${6 - (problemCardsProgress * 4)}deg)`
                }}
              >
                <p className="text-slate-700 text-lg md:text-xl leading-relaxed">You spend hours editing videos that nobody sees or shares.</p>
              </div>
            </div>

            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{
                background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.1) 25%, rgba(255, 105, 180, 0.1) 50%, rgba(218, 112, 214, 0.1) 75%, rgba(147, 112, 219, 0.1) 100%)',
                border: '1px solid rgba(255, 107, 53, 0.2)'
              }}>
                <div className="w-2 h-2 rounded-full" style={{
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #FF69B4 50%, #DA70D6 75%, #9370DB 100%)'
                }}></div>
                <span className="font-medium text-sm" style={{
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #FF69B4 50%, #DA70D6 75%, #9370DB 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>If this sounds familiar</span>
              </div>
            </div>

            <h3 className="font-sf-pro text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-slate-900 mb-12">
              Does this sound<br />like you?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className="bg-white rounded-3xl p-8 md:p-10 transition-all duration-700 border border-slate-200 shadow-sm"
                style={{
                  transform: `rotate(${6 - (problemCardsProgress * 4)}deg)`
                }}
              >
                <p className="text-slate-700 text-lg md:text-xl leading-relaxed">Your competitors blow up on social while you stay invisible.</p>
              </div>
              <div 
                className="bg-white rounded-3xl p-8 md:p-10 transition-all duration-700 border border-slate-200 shadow-sm"
                style={{
                  transform: `rotate(${-6 + (problemCardsProgress * 4)}deg)`
                }}
              >
                <p className="text-slate-700 text-lg md:text-xl leading-relaxed">You know video works but you have no time to figure it out.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS - Simple Connected Steps --- */}
      <section className="py-32 px-8 relative overflow-hidden z-10" id="how-it-works">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-sf-pro text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 mb-8">How It Works</h2>
            <p className="font-inter text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">A streamlined process designed for speed, quality, and results.</p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
            {/* Step 1 */}
            <div className="group">
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                {/* Icon with background */}
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center relative z-10 transition-all duration-500" style={{
                    background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.1) 50%, rgba(255, 105, 180, 0.1) 100%)'
                  }}>
                    <svg className="w-10 h-10 transition-transform duration-500 group-hover:scale-110" fill="none" viewBox="0 0 24 24">
                      <defs>
                        <linearGradient id="step1Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FF6B35" />
                          <stop offset="50%" stopColor="#F7931E" />
                          <stop offset="100%" stopColor="#FF69B4" />
                        </linearGradient>
                      </defs>
                      <path stroke="url(#step1Gradient)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="font-sf-pro text-xl font-semibold text-slate-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-[#FF6B35] group-hover:to-[#F7931E] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">Share Your Vision</h3>
                <p className="font-inter text-base text-slate-600 leading-relaxed">Send us your raw footage and creative brief. We'll understand your goals.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group">
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                {/* Icon with background */}
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center relative z-10 transition-all duration-500" style={{
                    background: 'linear-gradient(135deg, rgba(247, 147, 30, 0.1) 0%, rgba(255, 105, 180, 0.1) 50%, rgba(218, 112, 214, 0.1) 100%)'
                  }}>
                    <svg className="w-10 h-10 transition-transform duration-500 group-hover:scale-110" fill="none" viewBox="0 0 24 24">
                      <defs>
                        <linearGradient id="step2Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#F7931E" />
                          <stop offset="50%" stopColor="#FF69B4" />
                          <stop offset="100%" stopColor="#DA70D6" />
                        </linearGradient>
                      </defs>
                      <path stroke="url(#step2Gradient)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="font-sf-pro text-xl font-semibold text-slate-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-[#F7931E] group-hover:to-[#FF69B4] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">Strategic Planning</h3>
                <p className="font-inter text-base text-slate-600 leading-relaxed">We analyze your content and create a detailed editing strategy.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group">
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                {/* Icon with background */}
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center relative z-10 transition-all duration-500" style={{
                    background: 'linear-gradient(135deg, rgba(255, 105, 180, 0.1) 0%, rgba(218, 112, 214, 0.1) 50%, rgba(147, 112, 219, 0.1) 100%)'
                  }}>
                    <svg className="w-10 h-10 transition-transform duration-500 group-hover:scale-110" fill="none" viewBox="0 0 24 24">
                      <defs>
                        <linearGradient id="step3Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FF69B4" />
                          <stop offset="50%" stopColor="#DA70D6" />
                          <stop offset="100%" stopColor="#9370DB" />
                        </linearGradient>
                      </defs>
                      <path stroke="url(#step3Gradient)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path stroke="url(#step3Gradient)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="font-sf-pro text-xl font-semibold text-slate-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-[#FF69B4] group-hover:to-[#DA70D6] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">Expert Editing</h3>
                <p className="font-inter text-base text-slate-600 leading-relaxed">Our team crafts your video with precision, focusing on engagement.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="group">
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                {/* Icon with background */}
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center relative z-10 transition-all duration-500" style={{
                    background: 'linear-gradient(135deg, rgba(218, 112, 214, 0.1) 0%, rgba(147, 112, 219, 0.1) 50%, rgba(255, 107, 53, 0.1) 100%)'
                  }}>
                    <svg className="w-10 h-10 transition-transform duration-500 group-hover:scale-110" fill="none" viewBox="0 0 24 24">
                      <defs>
                        <linearGradient id="step4Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#DA70D6" />
                          <stop offset="50%" stopColor="#9370DB" />
                          <stop offset="100%" stopColor="#FF6B35" />
                        </linearGradient>
                      </defs>
                      <path stroke="url(#step4Gradient)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="font-sf-pro text-xl font-semibold text-slate-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-[#DA70D6] group-hover:to-[#9370DB] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">Deliver & Optimize</h3>
                <p className="font-inter text-base text-slate-600 leading-relaxed">Receive your polished video with platform-specific formats.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS Infinite Carousel --- */}
      <section className="py-32 px-8 relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-sf-pro text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 mb-8 whitespace-nowrap">What Our <span className="brush-highlight">Clients Say</span></h2>
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
      <section id="contact-us" className="py-32 px-8 relative overflow-hidden z-10" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="font-sf-pro text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 mb-6">
            Let's create something <span className="brush-highlight">amazing</span> together
          </h2>
          <p className="font-inter text-xl text-slate-600 max-w-2xl mx-auto mb-16 leading-relaxed">
            Ready to elevate your content? Get in touch and let's discuss how we can bring your vision to life.
          </p>
          
          {/* Social Media Grid - Clean Blue Theme */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {/* WhatsApp */}
            <a
              href="https://wa.me/919373032009?text=Hi%20Idyll%20Productions,%20I%20want%20to%20discuss%20a%20video%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl p-6 transition-all duration-300 hover:scale-105"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm transition-all duration-300" style={{
                background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.1) 25%, rgba(255, 105, 180, 0.1) 50%, rgba(218, 112, 214, 0.1) 75%, rgba(147, 112, 219, 0.1) 100%)'
              }}>
                <svg className="w-7 h-7" fill="url(#whatsappGradient)" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="whatsappGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF6B35" />
                      <stop offset="25%" stopColor="#F7931E" />
                      <stop offset="50%" stopColor="#FF69B4" />
                      <stop offset="75%" stopColor="#DA70D6" />
                      <stop offset="100%" stopColor="#9370DB" />
                    </linearGradient>
                  </defs>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.346"/>
                </svg>
              </div>
              <h3 className="font-sf-pro text-base font-semibold text-slate-900 group-hover:bg-gradient-to-r group-hover:from-[#FF6B35] group-hover:to-[#9370DB] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">WhatsApp</h3>
            </a>

            {/* Discord */}
            <a
              href="https://discord.com/users/1466675809568817246"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl p-6 transition-all duration-300 hover:scale-105"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm transition-all duration-300" style={{
                background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.1) 25%, rgba(255, 105, 180, 0.1) 50%, rgba(218, 112, 214, 0.1) 75%, rgba(147, 112, 219, 0.1) 100%)'
              }}>
                <svg className="w-7 h-7" fill="url(#discordGradient)" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="discordGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF6B35" />
                      <stop offset="25%" stopColor="#F7931E" />
                      <stop offset="50%" stopColor="#FF69B4" />
                      <stop offset="75%" stopColor="#DA70D6" />
                      <stop offset="100%" stopColor="#9370DB" />
                    </linearGradient>
                  </defs>
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                </svg>
              </div>
              <h3 className="font-sf-pro text-base font-semibold text-slate-900 group-hover:bg-gradient-to-r group-hover:from-[#FF6B35] group-hover:to-[#9370DB] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">Discord</h3>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/idyllproductionsofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl p-6 transition-all duration-300 hover:scale-105"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm transition-all duration-300" style={{
                background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.1) 25%, rgba(255, 105, 180, 0.1) 50%, rgba(218, 112, 214, 0.1) 75%, rgba(147, 112, 219, 0.1) 100%)'
              }}>
                <svg className="w-7 h-7 transition-all duration-300" fill="url(#instagramGradient)" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF6B35" />
                      <stop offset="25%" stopColor="#F7931E" />
                      <stop offset="50%" stopColor="#FF69B4" />
                      <stop offset="75%" stopColor="#DA70D6" />
                      <stop offset="100%" stopColor="#9370DB" />
                    </linearGradient>
                  </defs>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <h3 className="font-sf-pro text-base font-semibold text-slate-900 group-hover:bg-gradient-to-r group-hover:from-[#FF6B35] group-hover:to-[#9370DB] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">Instagram</h3>
            </a>

            {/* Twitter/X */}
            <a
              href="https://x.com/madebyidyll"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl p-6 transition-all duration-300 hover:scale-105"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm transition-all duration-300" style={{
                background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.1) 25%, rgba(255, 105, 180, 0.1) 50%, rgba(218, 112, 214, 0.1) 75%, rgba(147, 112, 219, 0.1) 100%)'
              }}>
                <svg className="w-7 h-7 transition-all duration-300" fill="url(#twitterGradient)" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="twitterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF6B35" />
                      <stop offset="25%" stopColor="#F7931E" />
                      <stop offset="50%" stopColor="#FF69B4" />
                      <stop offset="75%" stopColor="#DA70D6" />
                      <stop offset="100%" stopColor="#9370DB" />
                    </linearGradient>
                  </defs>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <h3 className="font-sf-pro text-base font-semibold text-slate-900 group-hover:bg-gradient-to-r group-hover:from-[#FF6B35] group-hover:to-[#9370DB] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">Twitter</h3>
            </a>
          </div>

          {/* Email Address Buttons */}
          <div className="mb-8">
            <p className="font-inter text-lg text-slate-600 mb-6 text-center">Email us directly:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch max-w-5xl mx-auto">
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@idyllproductions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none sm:min-w-[280px] relative h-14 px-6 rounded-lg text-base font-medium bg-white border-2 border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300 hover:scale-105 transform shadow-xl hover:shadow-2xl flex flex-col items-center justify-center"
              >
                <span className="font-semibold text-slate-900">contact@idyllproductions.com</span>
                <span className="text-xs text-slate-500">General inquiries</span>
              </a>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=smita@idyllproductions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none sm:min-w-[280px] relative h-14 px-6 rounded-lg text-base font-medium bg-white border-2 border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300 hover:scale-105 transform shadow-xl hover:shadow-2xl flex flex-col items-center justify-center"
              >
                <span className="font-semibold text-slate-900">smita@idyllproductions.com</span>
                <span className="text-xs text-slate-500">CSM - Sales & Client Management</span>
              </a>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=harsh@idyllproductions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none sm:min-w-[280px] relative h-14 px-6 rounded-lg text-base font-medium bg-white border-2 border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300 hover:scale-105 transform shadow-xl hover:shadow-2xl flex flex-col items-center justify-center"
              >
                <span className="font-semibold text-slate-900">harsh@idyllproductions.com</span>
                <span className="text-xs text-slate-500">CEO - Executive Partnerships</span>
              </a>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch mb-8 max-w-5xl mx-auto">
            <a
              href="https://calendly.com/smitaidyllproductions/talk-with-idyll-productions-csm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none sm:min-w-[200px] relative h-14 px-8 rounded-lg text-lg font-medium bg-[#111111] text-white hover:bg-[#222222] transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book a Call
            </a>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="flex-1 sm:flex-none sm:min-w-[200px] relative h-14 px-8 rounded-lg text-lg font-medium bg-transparent text-[#111111] border border-[#111111] hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-all duration-300 hover:scale-105 transform flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </button>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdVcAB8z3LFYADnkUzit6upstPAKvkpFe-uW4cQExYdQv1C1w/viewform?usp=publish-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none sm:min-w-[200px] relative h-14 px-8 rounded-lg text-lg font-medium bg-[#111111] text-white hover:bg-[#222222] transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Apply to be the Editor
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
