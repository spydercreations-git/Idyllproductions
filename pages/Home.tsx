import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import Play from 'lucide-react/dist/esm/icons/play';
import X from 'lucide-react/dist/esm/icons/x';
import Video from 'lucide-react/dist/esm/icons/video';
import Gamepad2 from 'lucide-react/dist/esm/icons/gamepad-2';
import Layout from 'lucide-react/dist/esm/icons/layout';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import Maximize2 from 'lucide-react/dist/esm/icons/maximize-2';
import Edit3 from 'lucide-react/dist/esm/icons/edit-3';
import Camera from 'lucide-react/dist/esm/icons/camera';
import Activity from 'lucide-react/dist/esm/icons/activity';
import Heart from 'lucide-react/dist/esm/icons/heart';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import Globe from 'lucide-react/dist/esm/icons/globe';
import MessageSquare from 'lucide-react/dist/esm/icons/message-square';
import Plus from 'lucide-react/dist/esm/icons/plus';
import Minus from 'lucide-react/dist/esm/icons/minus';
import Zap from 'lucide-react/dist/esm/icons/zap';
import Monitor from 'lucide-react/dist/esm/icons/monitor';
import Headphones from 'lucide-react/dist/esm/icons/headphones';
import Target from 'lucide-react/dist/esm/icons/target';
import Check from 'lucide-react/dist/esm/icons/check';
import Mail from 'lucide-react/dist/esm/icons/mail';
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
import HlsVideo, { HoverHlsVideo } from '../components/HlsVideo';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TimelineCard, RetentionCard, ReframeCard, SoundCard } from '../components/WhyChooseIdyll';
import ScrollTextReveal from '../components/ScrollTextReveal';
import BrandCollaborationModal from '../components/BrandCollaborationModal';
import '../components/HowItWorks/HowItWorks.css';
import { HiwIcons, VisionCard, PlanningCard, EditingCard, DeliveryCard } from '../components/HowItWorks';

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
    name: "UGC",
    description: "Creator & brand ad editing",
    text: "Engineered for high engagement, authentic hooks, and conversions.",
    videos: getVideosForCategory("UGC")
  },
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
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("UGC");
  const [scrollY, setScrollY] = useState(0);
  const [videoMuted, setVideoMuted] = useState<{ [key: number]: boolean }>({});
  const ugcSectionRef = useRef<HTMLDivElement>(null);
  const [ugcScrollProgress, setUgcScrollProgress] = useState(0);
  const [viewCount, setViewCount] = useState(300);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [isHeroVideoPlaying, setIsHeroVideoPlaying] = useState(false);
  const workSectionRef = useRef<HTMLDivElement>(null);

  const heroSectionRef = useRef<HTMLElement>(null);
  const logoSectionRef = useRef<HTMLDivElement>(null);
  const testimonialsSectionRef = useRef<HTMLDivElement>(null);

  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [isTestimonialVisible, setIsTestimonialVisible] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });

  // URL to category name mapping
  const urlToCategoryMap: { [key: string]: string } = {
    '/category/ugc': 'UGC',
    '/category/short-form-content': 'Short-Form Content',
    '/category/long-form': 'Long-Form',
    '/category/saas-tech-videos': 'SaaS & Tech Videos',
    '/category/gaming-content': 'Gaming Content',
    '/category/rhythmic-montage': 'Rhythmic Montage',
  };

  // Section ID mapping for anchor navigation
  const sectionMap: { [key: string]: string } = {
    '/ugc': 'our-work',
    '/short-form': 'our-work',
    '/long-form': 'our-work',
    '/saas-tech': 'our-work',
    '/gaming': 'our-work',
    '/rhythmic-montage': 'our-work',
  };

  // Handle URL-based category selection and section scrolling
  useEffect(() => {
    const path = location.pathname;
    
    // Handle category routes
    if (path.startsWith('/category/')) {
      const categoryName = urlToCategoryMap[path];
      if (categoryName) {
        setSelectedCategory(categoryName);
        
        // Scroll to work section after category is set
        setTimeout(() => {
          const workSection = document.getElementById('our-work');
          if (workSection) {
            workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }
    }
    
    // Handle section anchor routes
    else if (sectionMap[path]) {
      const sectionId = sectionMap[path];
      
      // For work-related sections, also set the category
      if (path === '/short-form') setSelectedCategory('Short-Form Content');
      else if (path === '/long-form') setSelectedCategory('Long-Form');
      else if (path === '/saas-tech') setSelectedCategory('SaaS & Tech Videos');
      else if (path === '/gaming') setSelectedCategory('Gaming Content');
      else if (path === '/rhythmic-montage') setSelectedCategory('Rhythmic Montage');
      
      // Scroll to the section
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.pathname]);

  // Animate view count: 300 → 800 → 300 in a loop
  useEffect(() => {
    const duration = 1800000; // 30 minutes per direction
    let start: number | null = null;
    let goingUp = true;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = (timestamp - start) % (duration * 2);
      const half = elapsed < duration;
      const progress = half ? elapsed / duration : 1 - (elapsed - duration) / duration;
      const value = Math.round(300 + progress * 500);
      setViewCount(prev => (prev !== value ? value : prev));
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Initialize Cal.com floating popup
  useEffect(() => {
    // Add custom CSS to ensure floating button is visible
    const style = document.createElement('style');
    style.innerHTML = `
      /* Cal.com floating button visibility fix */
      [data-cal-namespace="quick-meet"] {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 9999 !important;
        pointer-events: auto !important;
      }
      
      /* Ensure the button itself is visible */
      cal-floating-button,
      [class*="cal-floating"],
      [id*="cal-floating"] {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        border-radius: 8px !important;
        height: 44px !important;
        overflow: visible !important;
      }
      
      /* Fix any transform or positioning issues */
      cal-floating-button button,
      [data-cal-namespace] button {
        border-radius: 8px !important;
        height: 44px !important;
        min-height: 44px !important;
        box-shadow: none !important;
        filter: none !important;
      }
    `;
    document.head.appendChild(style);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function (C, A, L) { 
        let p = function (a, ar) { a.q.push(ar); }; 
        let d = C.document; 
        C.Cal = C.Cal || function () { 
          let cal = C.Cal; 
          let ar = arguments; 
          if (!cal.loaded) { 
            cal.ns = {}; 
            cal.q = cal.q || []; 
            d.head.appendChild(d.createElement("script")).src = A; 
            cal.loaded = true; 
          } 
          if (ar[0] === L) { 
            const api = function () { p(api, arguments); }; 
            const namespace = ar[1]; 
            api.q = api.q || []; 
            if(typeof namespace === "string"){
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar); 
            return;
          } 
          p(cal, ar); 
        }; 
      })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", "quick-meet", {origin:"https://app.cal.com"});
      Cal.ns["quick-meet"]("floatingButton", {
        "calLink":"harsh-pawar-vtrl47/quick-meet",
        "config":{"layout":"month_view","useSlotsViewOnSmallScreen":"true"},
        "buttonText":"Book a Call"
      }); 
      Cal.ns["quick-meet"]("ui", {
        "cssVarsPerTheme":{"light":{"cal-brand":"#292929"},"dark":{"cal-brand":"#ffffff"}},
        "hideEventTypeDetails":false,
        "layout":"month_view"
      });
    `;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(style);
      document.body.removeChild(script);
    };
  }, []);
  
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [serviceVisible, setServiceVisible] = useState<boolean[]>(new Array(6).fill(false));
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
        color: "orange",
        icon: (
          <div className="relative w-10 h-10">
            <div className="w-8 h-6 rounded-lg transform rotate-3" style={{ background: '#FF8156' }}></div>
            <div className="absolute top-1 left-1 w-6 h-4 rounded-md" style={{ background: 'rgba(255,107,52,0.5)' }}></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse" style={{ background: '#FF8156' }}></div>
            <div className="absolute bottom-0 left-2 w-4 h-1 rounded-full" style={{ background: '#FF8156' }}></div>
          </div>
        )
      },
      { 
        step: 2, 
        title: "Strategic Planning", 
        desc: "We analyze your content and create a detailed editing strategy.", 
        color: "orange",
        icon: (
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="w-8 h-8 border-2 rounded-full" style={{ borderColor: '#FF7A3A' }}></div>
            <div className="absolute w-6 h-6 border-2 rounded-full" style={{ borderColor: '#FFB86A' }}></div>
            <div className="absolute w-4 h-4 border-2 rounded-full" style={{ borderColor: '#FFD56A' }}></div>
            <div className="absolute w-2 h-2 rounded-full animate-ping" style={{ background: '#F06A00' }}></div>
          </div>
        )
      },
      { 
        step: 3, 
        title: "Expert Editing", 
        desc: "Our team crafts your video with precision, focusing on engagement.", 
        color: "orange",
        icon: (
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="w-6 h-1 rounded-full transform rotate-45" style={{ background: '#FF7A3A' }}></div>
            <div className="w-6 h-1 rounded-full transform -rotate-45" style={{ background: '#FFB86A' }}></div>
            <div className="w-1 h-6 rounded-full" style={{ background: '#FFD56A' }}></div>
            <div className="absolute w-2 h-2 rounded-full animate-spin" style={{ background: '#F06A00' }}></div>
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
            <div className="w-6 h-4 rounded-t-lg" style={{ background: '#FF7A3A' }}></div>
            <div className="absolute top-2 left-1 w-4 h-2 rounded-sm" style={{ background: 'rgba(255,184,106,0.7)' }}></div>
            <div className="absolute bottom-0 left-0 w-8 h-2 rounded-b-lg" style={{ background: '#F06A00' }}></div>
            <div className="absolute -top-1 right-1 w-2 h-2 rounded-full animate-bounce" style={{ background: '#FFD56A' }}></div>
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
    
    // Update URL without page reload
    const categoryToUrlMap: { [key: string]: string } = {
      'UGC': '/category/ugc',
      'Short-Form Content': '/category/short-form-content',
      'Long-Form': '/category/long-form',
      'SaaS & Tech Videos': '/category/saas-tech-videos',
      'Gaming Content': '/category/gaming-content',
      'Rhythmic Montage': '/category/rhythmic-montage',
    };
    
    const newUrl = categoryToUrlMap[categoryName];
    if (newUrl && location.pathname !== newUrl) {
      navigate(newUrl, { replace: true });
    }
    
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
            const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight * 0.7)));
            setUgcScrollProgress(progress);
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
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    let heroObserver: IntersectionObserver | null = null;
    let logoObserver: IntersectionObserver | null = null;
    let testimonialObserver: IntersectionObserver | null = null;

    if (typeof IntersectionObserver !== 'undefined') {
      heroObserver = new IntersectionObserver(
        ([entry]) => setIsHeroVisible(entry.isIntersecting),
        { threshold: 0.05 }
      );
      if (heroSectionRef.current) heroObserver.observe(heroSectionRef.current);

      logoObserver = new IntersectionObserver(
        ([entry]) => setIsLogoVisible(entry.isIntersecting),
        { threshold: 0.05 }
      );
      if (logoSectionRef.current) logoObserver.observe(logoSectionRef.current);

      testimonialObserver = new IntersectionObserver(
        ([entry]) => setIsTestimonialVisible(entry.isIntersecting),
        { threshold: 0.05 }
      );
      if (testimonialsSectionRef.current) testimonialObserver.observe(testimonialsSectionRef.current);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      heroObserver?.disconnect();
      logoObserver?.disconnect();
      testimonialObserver?.disconnect();
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
    <div className="min-h-screen relative overflow-x-clip" style={{ backgroundColor: '#ffffff' }}>
      
      {/* Video Section Router for direct URL access */}
      <VideoSectionRouter onCategorySelect={handleCategorySelect} />
      
      {/* Global dots pattern with top-to-bottom fade */}
      <div className="absolute top-0 left-0 right-0 h-[85vh] pointer-events-none" style={{
        zIndex: 1,
        backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.12) 1.2px, transparent 1.2px)`,
        backgroundSize: '24px 24px',
        maskImage: `linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.2) 75%, transparent 100%)`,
        WebkitMaskImage: `linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.2) 75%, transparent 100%)`
      }} />



      {/* --- HERO SECTION --- */}
      <section ref={heroSectionRef} className="relative pt-24 sm:pt-28 md:pt-40 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 md:px-8 overflow-hidden">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/Background_2.webp")',
            backgroundSize: '100% 100%',
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
            {/* Badge Above Title - solid on mobile, blur only on desktop */}
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-1.5 sm:py-2 bg-white md:bg-white/80 md:backdrop-blur-sm border border-slate-200 rounded-[10px] mb-6 shadow-sm max-w-[90%] sm:max-w-none mx-auto">
              <span className="font-bold text-sm sm:text-lg inline-block text-right shrink-0" style={{
                color: '#FF8156',
                minWidth: '3.5rem'
              }}>{viewCount}M+</span>
              <span className="text-slate-700 font-medium text-[11px] sm:text-base whitespace-nowrap">
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
                  <div className="words" style={{ animationPlayState: isHeroVisible ? 'running' : 'paused' }}>
                    <span className="word" style={{ animationPlayState: isHeroVisible ? 'running' : 'paused' }}>creators</span>
                    <span className="word" style={{ animationPlayState: isHeroVisible ? 'running' : 'paused' }}>brands</span>
                    <span className="word" style={{ animationPlayState: isHeroVisible ? 'running' : 'paused' }}>audiences</span>
                    <span className="word" style={{ animationPlayState: isHeroVisible ? 'running' : 'paused' }}>stories</span>
                    <span className="word" style={{ animationPlayState: isHeroVisible ? 'running' : 'paused' }}>creators</span>
                  </div>
                </div>
              </div>
            </h2>
            
            <p className="font-inter text-base sm:text-lg md:text-xl lg:text-2xl text-slate-500 max-w-3xl mx-auto mb-16 sm:mb-16 md:mb-24 leading-relaxed px-6 sm:px-4">
              We edit quietly, so your story speaks loudly.
            </p>
            
            {/* Hero Video - With orange border and scroll animation */}
            <div className="relative max-w-7xl mx-auto mb-12 sm:mb-16">
              <div 
                className="aspect-video rounded-2xl overflow-hidden relative group cursor-pointer p-[3px]"
                style={{
                  background: '#FF8156',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                  transform: `scale(${Math.min(1, 0.7 + (scrollY / 800))})`,
                  transformOrigin: 'center center',
                  willChange: 'transform'
                }}
              >
                <div 
                  className="w-full h-full rounded-[14px] overflow-hidden p-2 sm:p-3 relative"
                  style={{
                    backgroundColor: '#0a0a0a',
                    backgroundImage: 'url(/videoframe_8090.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="w-full h-full rounded-xl overflow-hidden relative" style={{ minHeight: '200px' }}>
                    {/* Native HLS video — no player UI, 10% zoom, muted, autoplay, infinite loop */}
                    <HlsVideo
                      src={HERO_VIDEO}
                      muted
                      loop
                      zoom={1.1}
                      poster="/videoframe_8090.png"
                      onPlaying={() => setIsHeroVideoPlaying(true)}
                      objectFit="cover"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                    />

                    {/* Instant thumbnail fallback: visible while video loads or buffers to eliminate black screen/lag */}
                    <img
                      src="/videoframe_8090.png"
                      alt="Idyll Productions Showreel Preview"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out pointer-events-none z-10 ${
                        isHeroVideoPlaying ? 'opacity-0' : 'opacity-100'
                      }`}
                      style={{
                        transform: 'scale(1.1)',
                        transformOrigin: 'center center',
                      }}
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Buttons with increased gap from video */}
            <div className="flex flex-row gap-2 sm:gap-4 md:gap-6 justify-center items-center px-2 sm:px-0 mt-12 sm:mt-16 md:mt-20">
              <button
                onClick={() => document.getElementById('our-work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="w-auto relative h-10 sm:h-11 md:h-12 px-3 sm:px-10 md:px-12 rounded-lg text-[11px] sm:text-base font-medium bg-[#111111] text-white hover:bg-[#222222] transition-all duration-300 hover:shadow-lg hover:scale-105 transform flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap flex-1 sm:flex-none"
              >
                View Work
                <ArrowRight className="inline-block w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const cal = (window as any).Cal;
                  if (cal && cal.ns && cal.ns["quick-meet"]) {
                    cal.ns["quick-meet"]("modal", {
                      calLink: "harsh-pawar-vtrl47/quick-meet",
                      config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"}
                    });
                  }
                }}
                className="w-auto relative h-10 sm:h-11 md:h-12 px-3 sm:px-10 md:px-12 rounded-lg text-[11px] sm:text-base font-medium bg-[#111111] text-white hover:bg-[#222222] transition-all duration-300 hover:shadow-lg hover:scale-105 transform flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap flex-1 sm:flex-none"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Call
              </button>
              <button
                onClick={() => document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="w-auto relative h-10 sm:h-11 md:h-12 px-3 sm:px-10 md:px-12 rounded-lg text-[11px] sm:text-base font-medium bg-[#111111] text-white hover:bg-[#222222] transition-all duration-300 hover:shadow-lg hover:scale-105 transform flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap flex-1 sm:flex-none"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- UGC CONTENT SHOWCASE --- */}
      <section id="ugc-section" ref={ugcSectionRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-20 xl:gap-24 items-center mb-12 sm:mb-16">
            <div 
              className="text-left pr-0 lg:pr-8"
              style={{
                opacity: ugcScrollProgress,
                willChange: 'opacity'
              }}
            >
              <h2 className="font-sf-pro text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-8">
                Best Editors Team for <span style={{ color: '#FF8156' }}>UGC Content</span>
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
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => {
                    handleCategorySelect('UGC');
                    document.getElementById('our-work')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF8156] text-white rounded-lg font-medium hover:bg-[#e87245] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 transform cursor-pointer"
                >
                  View All UGC Work
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
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
            </div>

            {/* Right Content - UGC Gallery (Desktop only; on mobile all work is in Our Work section) */}
            <div className="hidden lg:block relative">
              <UGCGallery items={ugcItems} autoScrollSpeed={0.5} />
            </div>
          </div>
        </div>
      </section>

      {/* --- CLIENT LOGO STRIP --- */}
      <div className="relative py-8 sm:py-10 md:py-12 overflow-hidden" style={{ background: 'transparent' }}>
        {/* Featured Brands Badge in One Frame */}
        <div className="flex justify-center mb-6 sm:mb-8 px-4">
          <div 
            className="flex flex-col items-center text-center px-6 py-4 sm:px-8 sm:py-5 rounded-2xl relative shadow-sm max-w-lg w-auto"
            style={{
              background: '#ffffff',
              border: '2px solid #FF8156'
            }}
          >
            {/* 3 Client Pics on Upper Side */}
            <div className="flex items-center -space-x-2 mb-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold z-30 shadow-sm"
                style={{ background: '#FF8156' }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold z-20 shadow-sm"
                style={{ background: '#FF8156' }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold z-10 shadow-sm"
                style={{ background: '#FF8156' }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Text 1: Heading */}
            <span className="font-sf-pro text-sm sm:text-base font-bold text-slate-900 leading-snug">
              Content Featured Across Top Brands
            </span>

            {/* Know More Button */}
            <button
              type="button"
              onClick={() => setShowBrandModal(true)}
              className="mt-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[8px] text-[11px] font-semibold text-[#FF8156] bg-[#FF8156]/10 hover:bg-[#FF8156]/20 border border-[#FF8156]/20 hover:border-[#FF8156]/40 transition-all duration-200 cursor-pointer group"
              style={{ borderRadius: '8px' }}
            >
              <span>Know More</span>
              <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Brand Collaboration Info Modal */}
        <BrandCollaborationModal 
          isOpen={showBrandModal} 
          onClose={() => setShowBrandModal(false)} 
        />

        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right, #ffffff, transparent)' }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to left, #ffffff, transparent)' }} />

        <div 
          ref={logoSectionRef} 
          className="flex logo-scroll-container" 
          style={{ 
            width: 'max-content',
            animationPlayState: isLogoVisible ? 'running' : 'paused'
          }}
        >
          {[
            { name: 'Picsart', src: '/picsart-logo.png' },
            { name: 'Pizza Hut', src: '/pizzahut-logo.png' },
            { name: 'Snapchat', src: '/snapchat-logo.png' },
            { name: 'TechFlow Solutions', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317981/10_bxfwdr.png' },
            { name: 'Evo Agency', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317981/6_ajbvpc.png' },
            { name: 'Physics Wallah', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317981/7_qin1jy.png' },
            { name: 'Vedantu', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317981/11_tfpwmc.png' },
            { name: 'Unacademy', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317981/8_ckndqw.png' },
            { name: 'GrowthX', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317981/5_cq6oxb.png' },
            { name: 'Scaler', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317980/1_iwfdhc.png' },
            { name: 'NextWave', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317980/4_viqguw.png' },
            { name: 'UpGrad', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317980/3_yfsgon.png' },
            { name: 'Simplilearn', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317980/2_vws6tz.png' },
            { name: 'Kofluence', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317980/9_sogiaz.png' },
            // duplicate for seamless loop
            { name: 'Picsart', src: '/picsart-logo.png' },
            { name: 'Pizza Hut', src: '/pizzahut-logo.png' },
            { name: 'Snapchat', src: '/snapchat-logo.png' },
            { name: 'TechFlow Solutions', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317981/10_bxfwdr.png' },
            { name: 'Evo Agency', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317981/6_ajbvpc.png' },
            { name: 'Physics Wallah', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317981/7_qin1jy.png' },
            { name: 'Vedantu', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317981/11_tfpwmc.png' },
            { name: 'Unacademy', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317981/8_ckndqw.png' },
            { name: 'GrowthX', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317981/5_cq6oxb.png' },
            { name: 'Scaler', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317980/1_iwfdhc.png' },
            { name: 'NextWave', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317980/4_viqguw.png' },
            { name: 'UpGrad', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317980/3_yfsgon.png' },
            { name: 'Simplilearn', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317980/2_vws6tz.png' },
            { name: 'Kofluence', src: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1779317980/9_sogiaz.png' },
          ].map((item, i) => (
            <div key={i} className="flex-shrink-0 flex items-center justify-center mx-6 sm:mx-10 md:mx-12 lg:mx-14">
              <img
                src={item.src}
                alt={`${item.name} logo`}
                className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain opacity-80"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <style>{`
          .logo-scroll-container {
            animation: logoScroll 120s linear infinite;
          }
          @media (min-width: 640px) {
            .logo-scroll-container {
              animation: logoScroll 90s linear infinite;
            }
          }
          @media (min-width: 1024px) {
            .logo-scroll-container {
              animation: logoScroll 75s linear infinite;
            }
          }
          @media (min-width: 1440px) {
            .logo-scroll-container {
              animation: logoScroll 50s linear infinite;
            }
          }
          @keyframes logoScroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* --- WORK SHOWCASE WITH NAVIGATION --- */}
      <section id="our-work" className="pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 md:px-8 relative overflow-hidden z-10">
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="font-sf-pro text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-slate-900 mb-4 sm:mb-6 md:mb-8">
              Specialized editing for every platform
            </h2>
            <p className="font-inter text-base sm:text-lg md:text-xl xl:text-2xl text-slate-600 max-w-2xl xl:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Crafted with precision and strategic intent for maximum performance.
            </p>
          </div>

          {/* Category Navigation */}
          <div className="flex items-center justify-center mb-10 sm:mb-14 xl:mb-16">
            {/* Category Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-4 2xl:gap-5 w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto py-1 px-2">
              {editingCategories.map((category, i) => (
                <button
                  key={i}
                  data-category={category.name}
                  onClick={() => handleCategorySelect(category.name)}
                  className={`px-3 sm:px-3.5 md:px-4 lg:px-5 xl:px-6 2xl:px-8 py-1.5 sm:py-2 lg:py-2.5 xl:py-3.5 2xl:py-4 rounded-[8px] font-medium sm:font-semibold text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category.name
                      ? 'bg-[#111111] text-white border border-[#111111] shadow-md'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:text-slate-900 hover:shadow-sm'
                  }`}
                  style={{ borderRadius: '8px' }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Category Info */}
          {selectedCategory && (
            <div className="text-center mb-8 sm:mb-12 xl:mb-16">
              <h3 className="font-sf-pro text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-slate-900 mb-2 sm:mb-4">
                {selectedCategory}
              </h3>
              <p className="font-inter text-base sm:text-lg lg:text-xl text-slate-600 max-w-xl xl:max-w-2xl mx-auto">
                {editingCategories.find(cat => cat.name === selectedCategory)?.text}
              </p>
            </div>
          )}

          {/* Video Grid */}
          {selectedCategory && (
            <div className="relative" key={selectedCategory}>
              <div className="animate-fade-in">
                {selectedCategory === "Short-Form Content" || selectedCategory === "UGC" ? (
                  /* Vertical layout for Short-Form Content & UGC */
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
                    {editingCategories.find(cat => cat.name === selectedCategory)?.videos.map((videoSrc, i, arr) => {
                      const isLast = i === arr.length - 1;
                      const hideOnMobile = isLast && (selectedCategory === "UGC" || arr.length % 2 !== 0);
                      return (
                        <div
                          key={`${selectedCategory}-${i}`}
                          className={`relative rounded-xl overflow-hidden shadow-xl w-full max-w-[180px] sm:max-w-sm mx-auto ${
                            hideOnMobile ? 'hidden lg:block' : ''
                          }`}
                        >
                          <HoverHlsVideo
                            src={videoSrc}
                            aspectClass="aspect-[9/16]"
                            className="w-full"
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Horizontal layout for other categories */
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {editingCategories.find(cat => cat.name === selectedCategory)?.videos.map((videoSrc, i) => {
                      const categoryVideos = editingCategories.find(cat => cat.name === selectedCategory)?.videos || [];
                      const isLastOdd = categoryVideos.length % 2 !== 0 && i === categoryVideos.length - 1;
                      return (
                        <div
                          key={`${selectedCategory}-${i}`}
                          className={`relative rounded-xl overflow-hidden shadow-xl animate-slide-up ${
                            isLastOdd ? 'lg:col-span-2 max-w-2xl mx-auto w-full' : 'max-w-2xl mx-auto lg:mx-0 w-full'
                          }`}
                          style={{ animationDelay: `${i * 150}ms` }}
                        >
                          <HoverHlsVideo
                            src={videoSrc}
                            aspectClass="aspect-video"
                            className="w-full"
                          />
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

      {/* --- SCROLL TEXT REVEAL SECTION --- */}
      <ScrollTextReveal />

      {/* --- OUR SERVICES with Animated Icons --- */}
      <section id="our-services" className="pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 md:px-8 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* SVG Gradient Definitions for Service Icons */}
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="serviceGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF8156" />
                <stop offset="100%" stopColor="#FF8156" />
              </linearGradient>
              <linearGradient id="serviceGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF8156" />
                <stop offset="100%" stopColor="#FF8156" />
              </linearGradient>
              <linearGradient id="serviceGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF8156" />
                <stop offset="100%" stopColor="#FF8156" />
              </linearGradient>
              <linearGradient id="serviceGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF8156" />
                <stop offset="100%" stopColor="#FF8156" />
              </linearGradient>
              <linearGradient id="serviceGradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF8156" />
                <stop offset="100%" stopColor="#FF8156" />
              </linearGradient>
              <linearGradient id="serviceGradient6" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF8156" />
                <stop offset="100%" stopColor="#FF8156" />
              </linearGradient>
            </defs>
          </svg>

          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] mb-6" style={{
              background: 'rgba(255, 107, 52, 0.1)',
              border: '1px solid rgba(255, 107, 52, 0.2)'
            }}>
              <div className="w-2 h-2 rounded-full" style={{
                background: '#FF8156'
              }}></div>
              <span className="font-medium text-sm" style={{
                color: '#FF8156'
              }}>What we offer</span>
            </div>
            
            <h2 className="font-sf-pro text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 mb-4 sm:mb-6 md:mb-8">Our <span className="brush-highlight">Services</span></h2>
            <p className="font-inter text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">Comprehensive video editing solutions tailored to your needs.</p>
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
                  background: 'linear-gradient(135deg, rgba(255, 129, 86, 0.1) 0%, rgba(247, 147, 30, 0.1) 33%, rgba(255, 140, 0, 0.1) 66%, rgba(232, 101, 10, 0.1) 100%)'
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

          <div className="why-idyll grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-12">
            <TimelineCard
              ref={el => (whyChooseRefs.current[0] = el)}
              isVisibleOnScroll={whyChooseVisible[0]}
            />
            <RetentionCard
              ref={el => (whyChooseRefs.current[1] = el)}
              isVisibleOnScroll={whyChooseVisible[1]}
            />
            <ReframeCard
              ref={el => (whyChooseRefs.current[2] = el)}
              isVisibleOnScroll={whyChooseVisible[2]}
            />
            <SoundCard
              ref={el => (whyChooseRefs.current[3] = el)}
              isVisibleOnScroll={whyChooseVisible[3]}
            />
          </div>

          {/* SVG Gradient Definitions for Why Choose Icons */}
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="whyGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF8156" />
                <stop offset="100%" stopColor="#FF8156" />
              </linearGradient>
              <linearGradient id="whyGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF8156" />
                <stop offset="100%" stopColor="#FF8156" />
              </linearGradient>
              <linearGradient id="whyGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF8156" />
                <stop offset="100%" stopColor="#FF8156" />
              </linearGradient>
              <linearGradient id="whyGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF8156" />
                <stop offset="100%" stopColor="#FF8156" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* --- NUMBERS THAT MATTER Section --- */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden z-10 bg-white">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] mb-6" style={{
              background: 'rgba(255, 107, 52, 0.1)',
              border: '1px solid rgba(255, 107, 52, 0.2)'
            }}>
              <div className="w-2 h-2 rounded-full" style={{
                background: '#FF8156'
              }}></div>
              <span className="font-medium text-sm" style={{
                color: '#FF8156'
              }}>Proof in numbers</span>
            </div>
            <h2 className="font-sf-pro text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 mb-4">
              Numbers that<br />actually matter
            </h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16 md:mb-20">
            <div className="text-center">
              <div className="font-sf-pro font-bold mb-3 sm:mb-4 text-4xl sm:text-5xl md:text-6xl leading-none" style={{
                color: '#FF8156'
              }}>
                <CounterStat number={200} suffix="M+" label="" delay={0} oscillate={true} oscillateMin={200} oscillateMax={300} oscillateSpeed={4000} />
              </div>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">Views generated across<br />TikTok, Reels & Shorts</p>
            </div>
            <div className="text-center">
              <div className="font-sf-pro font-bold mb-3 sm:mb-4 text-4xl sm:text-5xl md:text-6xl leading-none" style={{
                color: '#FF8156'
              }}>
                <CounterStat number={3.1} suffix="M+" label="" delay={200} oscillate={true} oscillateMin={3.1} oscillateMax={123.1} oscillateSpeed={4000} />
              </div>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">In tracked revenue<br />for our clients</p>
            </div>
            <div className="text-center">
              <div className="font-sf-pro font-bold mb-3 sm:mb-4 text-4xl sm:text-5xl md:text-6xl leading-none" style={{
                color: '#FF8156'
              }}>
                <CounterStat number={4.2} suffix="/5" label="" delay={400} oscillate={true} oscillateMin={4.2} oscillateMax={4.9} oscillateSpeed={4000} />
              </div>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">Rating from 120+<br />verified businesses</p>
            </div>
          </div>

          {/* Problem Cards */}
          <div ref={problemCardsRef} className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200 shadow-sm">
                <p className="text-slate-700 text-base sm:text-lg md:text-xl leading-relaxed">You post every day but your videos get 50 views and zero sales.</p>
              </div>
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200 shadow-sm">
                <p className="text-slate-700 text-base sm:text-lg md:text-xl leading-relaxed">You spend hours editing videos that nobody sees or shares.</p>
              </div>
            </div>

            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px]" style={{
                background: 'rgba(255, 107, 52, 0.1)',
                border: '1px solid rgba(255, 107, 52, 0.2)'
              }}>
                <div className="w-2 h-2 rounded-full" style={{
                  background: '#FF8156'
                }}></div>
                <span className="font-medium text-sm" style={{
                  color: '#FF8156'
                }}>If this sounds familiar</span>
              </div>
            </div>

            <h3 className="font-sf-pro text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-slate-900 mb-12">
              Does this sound<br />like you?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200 shadow-sm">
                <p className="text-slate-700 text-base sm:text-lg md:text-xl leading-relaxed">Your competitors blow up on social while you stay invisible.</p>
              </div>
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200 shadow-sm">
                <p className="text-slate-700 text-base sm:text-lg md:text-xl leading-relaxed">You know video works but you have no time to figure it out.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS - Simple Connected Steps --- */}
      <section ref={howItWorksSectionRef} className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 md:px-8 relative overflow-hidden z-10" id="how-it-works">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            {/* Gradient-underlined heading */}
            <div className="inline-block relative mb-4 sm:mb-6 md:mb-8">
              <h2 className="font-sf-pro text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900">
                How It Works
              </h2>
              {/* Orange underline bar */}
              <div className="mt-3 mx-auto h-1.5 rounded-full" style={{
                width: '70%',
                background: '#FF8156'
              }} />
            </div>
            <p className="font-inter text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">A streamlined process designed for speed, quality, and results.</p>
          </div>

          {/* Steps Grid */}
          <div className="how-it-works-cards">
            <HiwIcons />
            <VisionCard />
            <PlanningCard />
            <EditingCard />
            <DeliveryCard />
          </div>
        </div>
      </section>

      
      {/* --- TESTIMONIALS Infinite Carousel --- */}
      <section className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 md:px-8 relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="font-sf-pro text-3xl sm:text-4xl md:text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 mb-4 sm:mb-6 md:mb-8">What Our <span className="brush-highlight">Clients Say</span></h2>
            <p className="font-inter text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">Real feedback from creators who trust us with their content.</p>
          </div>

          <div className="relative">
            {/* Fade gradients on sides */}
            <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <div className="overflow-x-auto md:overflow-hidden scrollbar-hide">
              <div 
                ref={testimonialsSectionRef}
                className="flex gap-4 sm:gap-8 mobile-testimonial-scroll" 
                style={{
                  width: 'max-content',
                  animation: 'scroll-left 40s linear infinite',
                  animationPlayState: isTestimonialVisible ? 'running' : 'paused'
                }}
              >
                {(isMobile ? testimonials : [...testimonials, ...testimonials]).map((testimonial, i) => (
                  <div key={i} className="flex-shrink-0 w-72 sm:w-80 md:w-96 bg-white md:bg-white/80 md:backdrop-blur-sm rounded-lg p-5 sm:p-6 md:p-8 shadow-sm border border-[#FF8156]">
                    <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, starIndex) => (
                        <svg key={starIndex} className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF8156]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="font-inter text-sm sm:text-base text-slate-600 leading-relaxed mb-4 sm:mb-6">"{testimonial.text}"</p>
                    <div className="border-t border-slate-200 pt-3 sm:pt-4">
                      <div className="font-sf-pro text-base sm:text-lg font-semibold text-slate-900">{testimonial.name}</div>
                      <div className="font-inter text-xs sm:text-sm text-slate-500">{testimonial.company}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT US SECTION --- */}
      <section id="contact-us" className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 md:px-8 relative overflow-hidden z-10" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="font-sf-pro text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 mb-4 sm:mb-6">
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
                background: 'rgba(255, 107, 52, 0.08)'
              }}>
                <svg className="w-7 h-7" fill="#FF8156" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.346"/>
                </svg>
              </div>
              <h3 className="font-sf-pro text-base font-semibold text-slate-900 group-hover:text-[#FF8156] transition-all duration-300">WhatsApp</h3>
            </a>

            {/* Discord */}
            <a
              href="https://discord.com/users/1466675809568817246"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl p-6 transition-all duration-300 hover:scale-105"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm transition-all duration-300" style={{
                background: 'rgba(255, 107, 52, 0.08)'
              }}>
                <svg className="w-7 h-7" fill="#FF8156" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                </svg>
              </div>
              <h3 className="font-sf-pro text-base font-semibold text-slate-900 group-hover:text-[#FF8156] transition-all duration-300">Discord</h3>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/idyll.productions/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl p-6 transition-all duration-300 hover:scale-105"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm transition-all duration-300" style={{
                background: 'rgba(255, 107, 52, 0.08)'
              }}>
                <svg className="w-7 h-7 transition-all duration-300" fill="#FF8156" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <h3 className="font-sf-pro text-base font-semibold text-slate-900 group-hover:text-[#FF8156] transition-all duration-300">Instagram</h3>
            </a>

            {/* Twitter/X */}
            <a
              href="https://x.com/madebyidyll"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl p-6 transition-all duration-300 hover:scale-105"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm transition-all duration-300" style={{
                background: 'rgba(255, 107, 52, 0.08)'
              }}>
                <svg className="w-7 h-7 transition-all duration-300" fill="#FF8156" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <h3 className="font-sf-pro text-base font-semibold text-slate-900 group-hover:text-[#FF8156] transition-all duration-300">Twitter</h3>
            </a>
          </div>

          {/* Email Address Buttons */}
          <div className="mb-8">
            <p className="font-inter text-lg text-slate-600 mb-6 text-center">Email us directly:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-6xl mx-auto px-4">
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=harsh@idyllproductions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl p-3 transition-all duration-300 hover:scale-[1.02] bg-[#FF8156]/5 border border-[#FF8156]/15 hover:border-[#FF8156]/50 hover:shadow-md flex flex-row items-center gap-3 shadow-sm min-w-0 text-slate-800 visited:text-slate-800 hover:text-[#FF8156] visited:hover:text-[#FF8156]"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white border border-[#FF8156]/20 shadow-xs transition-all duration-300 group-hover:scale-110 shrink-0">
                  <Mail className="w-4.5 h-4.5 text-[#FF8156]" />
                </div>
                <div className="flex flex-col min-w-0 text-left">
                  <span className="font-semibold text-current transition-colors duration-300 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis w-full">harsh@idyllproductions.com</span>
                  <span className="text-[10px] text-slate-500 font-medium">Harsh • CEO & Partnerships</span>
                </div>
              </a>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=rohitidyllproductions@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl p-3 transition-all duration-300 hover:scale-[1.02] bg-[#FF8156]/5 border border-[#FF8156]/15 hover:border-[#FF8156]/50 hover:shadow-md flex flex-row items-center gap-3 shadow-sm min-w-0 text-slate-800 visited:text-slate-800 hover:text-[#FF8156] visited:hover:text-[#FF8156]"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white border border-[#FF8156]/20 shadow-xs transition-all duration-300 group-hover:scale-110 shrink-0">
                  <Mail className="w-4.5 h-4.5 text-[#FF8156]" />
                </div>
                <div className="flex flex-col min-w-0 text-left">
                  <span className="font-semibold text-current transition-colors duration-300 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis w-full">rohitidyllproductions@gmail.com</span>
                  <span className="text-[10px] text-slate-500 font-medium">Rohit • Chief Operating Officer</span>
                </div>
              </a>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=zadaidyllproductions@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl p-3 transition-all duration-300 hover:scale-[1.02] bg-[#FF8156]/5 border border-[#FF8156]/15 hover:border-[#FF8156]/50 hover:shadow-md flex flex-row items-center gap-3 shadow-sm min-w-0 text-slate-800 visited:text-slate-800 hover:text-[#FF8156] visited:hover:text-[#FF8156]"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white border border-[#FF8156]/20 shadow-xs transition-all duration-300 group-hover:scale-110 shrink-0">
                  <Mail className="w-4.5 h-4.5 text-[#FF8156]" />
                </div>
                <div className="flex flex-col min-w-0 text-left">
                  <span className="font-semibold text-current transition-colors duration-300 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis w-full">zadaidyllproductions@gmail.com</span>
                  <span className="text-[10px] text-slate-500 font-medium">Zada • Chief Sales Officer</span>
                </div>
              </a>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=nishaidyllproductions@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl p-3 transition-all duration-300 hover:scale-[1.02] bg-[#FF8156]/5 border border-[#FF8156]/15 hover:border-[#FF8156]/50 hover:shadow-md flex flex-row items-center gap-3 shadow-sm min-w-0 text-slate-800 visited:text-slate-800 hover:text-[#FF8156] visited:hover:text-[#FF8156]"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white border border-[#FF8156]/20 shadow-xs transition-all duration-300 group-hover:scale-110 shrink-0">
                  <Mail className="w-4.5 h-4.5 text-[#FF8156]" />
                </div>
                <div className="flex flex-col min-w-0 text-left">
                  <span className="font-semibold text-current transition-colors duration-300 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis w-full">nishaidyllproductions@gmail.com</span>
                  <span className="text-[10px] text-slate-500 font-medium">Nisha • Design Head</span>
                </div>
              </a>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch mb-8 max-w-5xl mx-auto">
            <button
              onClick={(e) => {
                e.preventDefault();
                const cal = (window as any).Cal;
                if (cal && cal.ns && cal.ns["quick-meet"]) {
                  cal.ns["quick-meet"]("modal", {
                    calLink: "harsh-pawar-vtrl47/quick-meet",
                    config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"}
                  });
                }
              }}
              className="flex-1 sm:flex-none sm:min-w-[200px] relative h-14 px-8 rounded-lg text-lg font-medium bg-[#111111] text-white hover:bg-[#222222] transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book a Call
            </button>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="flex-1 sm:flex-none sm:min-w-[200px] relative h-14 px-8 rounded-lg text-lg font-medium bg-transparent text-[#111111] border border-[#111111] hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-all duration-300 hover:scale-105 transform flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </button>
            <Link
              to="/apply"
              className="flex-1 sm:flex-none sm:min-w-[200px] relative h-14 px-8 rounded-lg text-lg font-medium bg-[#111111] text-white hover:bg-[#222222] transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Work at Idyll Productions
            </Link>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-sf-pro text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-inter text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about working with us
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {[
              {
                question: "What types of editing do you offer?",
                answer: "We handle short-form and long-form edits, ads and launch videos, explainers, motion graphics, captions, sound design, and platform-specific versions."
              },
              {
                question: "How long does a typical video take?",
                answer: "Most videos take about one to two days, but timing depends on complexity, production level, and the editing process. More complex projects can take longer."
              },
              {
                question: "What deliverables and formats will I receive?",
                answer: "You can receive exports in any required format for your platforms, along with a high-quality master file."
              },
              {
                question: "How do revisions work and what's included?",
                answer: "Each video includes three revisions at no extra cost. After that, additional revisions are charged. After the third revision, we take one day to process the final requested changes, and you must provide a single consolidated list for that last pass."
              },
              {
                question: "How is pricing calculated?",
                answer: "Pricing depends on the final length in seconds or minutes and the complexity. It's discussed on a call or chat, then finalized in an agreement."
              },
              {
                question: "How do you ensure brand consistency across edits?",
                answer: "We follow your brand guidelines for colors, fonts, tone, and layout, and reuse approved assets and templates so every video feels consistent."
              }
            ].map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
            ))}
          </div>

          {/* CTA at bottom */}
          <div className="mt-12 sm:mt-16 text-center">
            <p className="font-inter text-slate-600 mb-6">
              Still have questions? We're here to help.
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                const cal = (window as any).Cal;
                if (cal && cal.ns && cal.ns["quick-meet"]) {
                  cal.ns["quick-meet"]("modal", {
                    calLink: "harsh-pawar-vtrl47/quick-meet",
                    config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"}
                  });
                }
              }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold bg-[#111111] text-white hover:bg-[#222222] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <MessageSquare className="w-5 h-5" />
              Get in Touch
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

// FAQ Item Component with Animation
const FAQItem: React.FC<{ question: string; answer: string; index: number }> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div 
      className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-md"
      style={{
        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors duration-200"
      >
        <span className="font-sf-pro text-base sm:text-lg font-semibold text-slate-900 pr-4">
          {question}
        </span>
        <div 
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen 
              ? 'rotate-180' 
              : 'bg-slate-100'
          }`}
          style={isOpen ? { background: '#FF8156' } : {}}
        >
          {isOpen ? (
            <Minus className="w-4 h-4 text-white" />
          ) : (
            <Plus className="w-4 h-4 text-slate-600" />
          )}
        </div>
      </button>
      
      <div
        style={{
          height: `${height}px`,
          transition: 'height 0.3s ease-in-out'
        }}
        className="overflow-hidden"
      >
        <div ref={contentRef} className="px-6 pb-5">
          <p className="font-inter text-sm sm:text-base text-slate-600 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
