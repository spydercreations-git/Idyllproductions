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
import TrustWarningPopup from '../components/TrustWarningPopup';

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

  // UGC Content Items
  const ugcItems = [
    {
      video: 'https://res.cloudinary.com/ddm4gglkp/video/upload/v1770657401/8_wbclt3.mp4',
      views: '1.2M',
      likes: '89K'
    },
    {
      video: 'https://res.cloudinary.com/ddm4gglkp/video/upload/v1770657343/7_fwarn9.mp4',
      views: '2.4M',
      likes: '156K'
    },
    {
      video: 'https://res.cloudinary.com/ddm4gglkp/video/upload/v1770657290/5_uk9wzp.mp4',
      views: '987K',
      likes: '72K'
    },
    {
      video: 'https://res.cloudinary.com/ddm4gglkp/video/upload/v1770657282/4_o2cpcc.mp4',
      views: '1.8M',
      likes: '134K'
    },
    {
      video: 'https://res.cloudinary.com/ddm4gglkp/video/upload/v1770657275/6_zehniz.mp4',
      views: '1.5M',
      likes: '98K'
    },
    {
      video: 'https://res.cloudinary.com/ddm4gglkp/video/upload/v1770657252/3_o8jo9n.mp4',
      views: '2.1M',
      likes: '145K'
    },
    {
      video: 'https://res.cloudinary.com/ddm4gglkp/video/upload/v1770657245/4_rokczv.mp4',
      views: '3.2M',
      likes: '201K'
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
    <div className="bg-white min-h-screen relative overflow-hidden">
      {/* Trust Warning Popup */}
      <TrustWarningPopup />
      
      {/* Organic dot pattern with varying opacity */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.15) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        maskImage: `
          radial-gradient(ellipse 800px 600px at 20% 30%, black 0%, transparent 70%),
          radial-gradient(ellipse 600px 800px at 80% 60%, black 0%, transparent 70%),
          radial-gradient(ellipse 700px 500px at 50% 90%, black 0%, transparent 70%)
        `,
        WebkitMaskImage: `
          radial-gradient(ellipse 800px 600px at 20% 30%, black 0%, transparent 70%),
          radial-gradient(ellipse 600px 800px at 80% 60%, black 0%, transparent 70%),
          radial-gradient(ellipse 700px 500px at 50% 90%, black 0%, transparent 70%)
        `,
        maskComposite: 'add',
        WebkitMaskComposite: 'source-over'
      }} />
      
      {/* Mobile: Lower opacity dots overlay */}
      <div className="absolute inset-0 pointer-events-none md:hidden" style={{
        backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        maskImage: `
          radial-gradient(ellipse 800px 600px at 20% 30%, black 0%, transparent 70%),
          radial-gradient(ellipse 600px 800px at 80% 60%, black 0%, transparent 70%),
          radial-gradient(ellipse 700px 500px at 50% 90%, black 0%, transparent 70%)
        `,
        WebkitMaskImage: `
          radial-gradient(ellipse 800px 600px at 20% 30%, black 0%, transparent 70%),
          radial-gradient(ellipse 600px 800px at 80% 60%, black 0%, transparent 70%),
          radial-gradient(ellipse 700px 500px at 50% 90%, black 0%, transparent 70%)
        `,
        maskComposite: 'add',
        WebkitMaskComposite: 'source-over'
      }} />
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
        
        {/* Darker dots overlay for hero section only - organic clusters with fade */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.05) 2px, transparent 2px)`,
          backgroundSize: '24px 24px',
          maskImage: `
            radial-gradient(ellipse 900px 700px at 25% 35%, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.4) 60%, transparent 80%),
            radial-gradient(ellipse 700px 900px at 75% 55%, black 0%, rgba(0, 0, 0, 0.7) 25%, rgba(0, 0, 0, 0.3) 55%, transparent 75%),
            radial-gradient(ellipse 800px 600px at 50% 85%, black 0%, rgba(0, 0, 0, 0.6) 20%, rgba(0, 0, 0, 0.2) 50%, transparent 70%)
          `,
          WebkitMaskImage: `
            radial-gradient(ellipse 900px 700px at 25% 35%, black 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.4) 60%, transparent 80%),
            radial-gradient(ellipse 700px 900px at 75% 55%, black 0%, rgba(0, 0, 0, 0.7) 25%, rgba(0, 0, 0, 0.3) 55%, transparent 75%),
            radial-gradient(ellipse 800px 600px at 50% 85%, black 0%, rgba(0, 0, 0, 0.6) 20%, rgba(0, 0, 0, 0.2) 50%, transparent 70%)
          `,
          maskComposite: 'add',
          WebkitMaskComposite: 'source-over'
        }} />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="reveal active">
            <h1 className="font-sf-pro text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-slate-900 leading-[0.9] mb-8 sm:mb-8 md:mb-12 animate-slide-up">
              Idyll Productions
            </h1>
            
            <h2 className="font-inter text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium tracking-tight text-slate-700 leading-[1.2] mb-8 sm:mb-8 md:mb-10 animate-slide-up px-4 sm:px-0" style={{ animationDelay: '0.3s' }}>
              <span className="inline-block">High-Performance Video Editing</span>
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
            
            <p className="font-inter text-base sm:text-lg md:text-xl lg:text-2xl text-slate-500 max-w-3xl mx-auto mb-16 sm:mb-16 md:mb-24 leading-relaxed animate-slide-up px-6 sm:px-4" style={{ animationDelay: '0.6s' }}>
              Paid ads, short-form content, and YouTube videos that convert.
              <br className="hidden sm:block" />
              {' '}Edited with intent, not noise.
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
                
                {/* Subtle Vignette Effect Only */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `
                      radial-gradient(circle at center, 
                        transparent 0%, 
                        transparent 60%, 
                        rgba(0,0,0,0.05) 100%
                      )
                    `
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
                className="w-full sm:w-auto relative h-11 sm:h-12 md:h-14 px-6 sm:px-8 md:px-10 rounded-lg text-sm sm:text-base md:text-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- UGC CONTENT SHOWCASE --- */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="font-sf-pro text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-slate-900 mb-4 sm:mb-6 md:mb-8">
              Best Editors Team for <span className="text-blue-600 brush-highlight">UGC Content</span>
            </h2>
            <p className="font-inter text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0 mb-6">
              Our expert team can produce <span className="font-bold text-blue-600">100+ videos per day easily</span> with scroll-stopping content that drives real engagement and conversions.
            </p>
            <button
              onClick={() => document.getElementById('our-work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              See Other Work
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* UGC Gallery */}
          <UGCGallery items={ugcItems} autoScrollSpeed={0.5} />
        </div>
      </section>

      {/* --- WORK SHOWCASE WITH NAVIGATION --- */}
      <section id="our-work" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="font-sf-pro text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-slate-900 mb-4 sm:mb-6 md:mb-8">
              Specialized editing for <span className="brush-highlight">every platform</span>
            </h2>
            <p className="font-inter text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              Crafted with precision and strategic intent for maximum performance.
            </p>
          </div>

          {/* Category Navigation with Arrows - Show 3 tabs on mobile with smooth sliding */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-12 sm:mb-16 px-2 sm:px-4">
            {/* Left Arrow */}
            <button
              onClick={handlePreviousCategory}
              className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg z-10"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Category Buttons - Smooth sliding carousel */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide relative max-w-full">
              <div 
                className="flex gap-2 sm:gap-3 transition-transform duration-500 ease-out justify-start md:justify-center min-w-max px-1"
              >
                {editingCategories.map((category, i) => (
                  <button
                    key={i}
                    data-category={category.name}
                    onClick={() => handleCategorySelect(category.name)}
                    className={`flex-shrink-0 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-lg font-medium text-xs sm:text-sm md:text-base transition-all duration-300 whitespace-nowrap ${
                      selectedCategory === category.name
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNextCategory}
              className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg z-10"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <h2 className="font-sf-pro text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 mb-8 whitespace-nowrap">Our <span className="brush-highlight">Services</span></h2>
            <p className="font-inter text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">Comprehensive video editing solutions tailored to your needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Talking Head Short Form / Motion Graphics", 
                desc: "Engaging short-form content with dynamic motion graphics for social media platforms.", 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                ),
                color: "blue"
              },
              { 
                title: "Creator Paid Ads", 
                desc: "High-converting advertisement videos designed specifically for content creators and influencers.", 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                color: "blue"
              },
              { 
                title: "Gaming Edits", 
                desc: "Fast-paced, energetic gaming content with seamless transitions and highlight reels.", 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                ),
                color: "blue"
              },
              { 
                title: "Cinematic Vlog/Travel Video Edit", 
                desc: "Stunning cinematic vlogs and travel videos with professional color grading and storytelling.", 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                color: "blue"
              },
              { 
                title: "SaaS Animation / Product Explainer Videos", 
                desc: "Clear, engaging explainer videos and animations for SaaS products and services.", 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                color: "blue"
              },
              { 
                title: "YouTube Long Form Videos", 
                desc: "Professional long-form YouTube content with strategic pacing and audience retention focus.", 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                color: "blue"
              }
            ].map((service, i) => (
              <div key={i} className="group relative">
                <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-100 transition-all duration-500 hover:-translate-y-1 transform h-full">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-all duration-500 text-blue-600">
                    {service.icon}
                  </div>
                  <h3 className="font-sf-pro text-xl font-semibold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                  <p className="font-inter text-base text-slate-600 leading-relaxed">{service.desc}</p>
                </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Clean Storytelling */}
            <div className="group bg-gradient-to-br from-white to-blue-50/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all duration-500 hover:-translate-y-2 transform text-center backdrop-blur-sm">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-blue-100 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-500 mx-auto text-blue-600">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <h3 className="font-sf-pro text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors">Clean Storytelling</h3>
              <p className="font-inter text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">Every cut serves a purpose. We eliminate noise and focus on narrative flow that keeps viewers engaged.</p>
            </div>

            {/* Retention-Focused */}
            <div className="group bg-gradient-to-br from-white to-blue-50/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all duration-500 hover:-translate-y-2 transform text-center backdrop-blur-sm">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-blue-100 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-500 mx-auto text-blue-600">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-sf-pro text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors">Retention-Focused Pacing</h3>
              <p className="font-inter text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">Strategic pacing that maximizes watch time. We understand platform algorithms and edit accordingly.</p>
            </div>

            {/* Platform-Specific */}
            <div className="group bg-gradient-to-br from-white to-blue-50/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all duration-500 hover:-translate-y-2 transform text-center backdrop-blur-sm">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-blue-100 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-500 mx-auto text-blue-600">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </div>
              <h3 className="font-sf-pro text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors">Platform-Specific Edits</h3>
              <p className="font-inter text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">Optimized for each platform's unique requirements. From TikTok hooks to YouTube retention curves.</p>
            </div>

            {/* Sound Design */}
            <div className="group bg-gradient-to-br from-white to-blue-50/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all duration-500 hover:-translate-y-2 transform text-center backdrop-blur-sm">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-blue-100 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-500 mx-auto text-blue-600">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="font-sf-pro text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors">Sound Design & Motion</h3>
              <p className="font-inter text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">Immersive audio and smooth motion graphics that enhance the story without overwhelming.</p>
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

          {/* Steps with Connected Line */}
          <div className="relative how-it-works-container">
            {/* Connecting Line with Animation */}
            <div className="absolute top-10 left-0 right-0 h-0.5 bg-slate-200 hidden md:block">
              <div className="how-it-works-line h-full bg-blue-600" />
            </div>
            
            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
              {/* Step 1 */}
              <div className="text-center group">
                <div className="relative inline-block mb-6 transition-transform duration-300 hover:scale-110">
                  <div className="how-it-works-icon w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 shadow-lg relative z-10 group-hover:shadow-blue-500/50 transition-all duration-300" data-delay="0">
                    <svg className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-sf-pro text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">Share Your Vision</h3>
                <p className="font-inter text-base text-slate-600 leading-relaxed">Send us your raw footage and creative brief. We'll understand your goals.</p>
              </div>

              {/* Step 2 */}
              <div className="text-center group">
                <div className="relative inline-block mb-6 transition-transform duration-300 hover:scale-110">
                  <div className="how-it-works-icon w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 shadow-lg relative z-10 group-hover:shadow-blue-500/50 transition-all duration-300" data-delay="0.8">
                    <svg className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-sf-pro text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">Strategic Planning</h3>
                <p className="font-inter text-base text-slate-600 leading-relaxed">We analyze your content and create a detailed editing strategy.</p>
              </div>

              {/* Step 3 */}
              <div className="text-center group">
                <div className="relative inline-block mb-6 transition-transform duration-300 hover:scale-110">
                  <div className="how-it-works-icon w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 shadow-lg relative z-10 group-hover:shadow-blue-500/50 transition-all duration-300" data-delay="1.6">
                    <svg className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-sf-pro text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">Expert Editing</h3>
                <p className="font-inter text-base text-slate-600 leading-relaxed">Our team crafts your video with precision, focusing on engagement.</p>
              </div>

              {/* Step 4 */}
              <div className="text-center group">
                <div className="relative inline-block mb-6 transition-transform duration-300 hover:scale-110">
                  <div className="how-it-works-icon w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 shadow-lg relative z-10 group-hover:shadow-blue-500/50 transition-all duration-300" data-delay="2.4">
                    <svg className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-sf-pro text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">Deliver & Optimize</h3>
                <p className="font-inter text-base text-slate-600 leading-relaxed">Receive your polished video with platform-specific formats.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS with Modern Design --- */}
      <section className="py-32 px-8 relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-sf-pro text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
              See Your <span className="brush-highlight">Content Grow</span>
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
                    <CounterStat number={0} suffix="+" label="" delay={0} oscillate={true} oscillateMin={3000} oscillateMax={4000} oscillateSpeed={6000} />
                  </div>
                  <p className="text-slate-600 text-sm">
                    Projects delivered<br />successfully
                  </p>
                </div>
              </div>
            </div>

            {/* Stat 2 - Average Video Views */}
            <div className="relative">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
                <div className="flex items-center justify-center mb-3">
                  <CounterStat number={0} suffix="M+" label="" delay={200} oscillate={true} oscillateMin={200} oscillateMax={300} oscillateSpeed={6000} />
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
                    <CounterStat number={0} suffix="%" label="" delay={400} oscillate={true} oscillateMin={50} oscillateMax={100} oscillateSpeed={8000} />
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
      <section id="contact-us" className="py-32 px-8 relative overflow-hidden z-10 bg-gradient-to-b from-white to-slate-50">
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
              className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 mx-auto mb-4 shadow-sm">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.346"/>
                </svg>
              </div>
              <h3 className="font-sf-pro text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">WhatsApp</h3>
            </a>

            {/* Discord */}
            <a
              href="https://discord.com/users/1466675809568817246"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 mx-auto mb-4 shadow-sm">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                </svg>
              </div>
              <h3 className="font-sf-pro text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">Discord</h3>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/idyllproductionsofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 mx-auto mb-4 shadow-sm">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <h3 className="font-sf-pro text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">Instagram</h3>
            </a>

            {/* Twitter/X */}
            <a
              href="https://x.com/madebyidyll"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 mx-auto mb-4 shadow-sm">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <h3 className="font-sf-pro text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">Twitter</h3>
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
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="w-full sm:w-auto relative h-14 px-8 rounded-lg text-lg font-medium bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 hover:border-blue-700 transition-all duration-300 hover:scale-105 transform flex items-center justify-center gap-3"
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
              className="w-full sm:w-auto relative h-14 px-8 rounded-lg text-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
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
