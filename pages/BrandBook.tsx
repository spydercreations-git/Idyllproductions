import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Volume2, Sparkles, Info, ArrowRight, Download
} from 'lucide-react';

const BrandBook: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');

  // Smooth scroll and intersection observer to highlight active sidebar item
  useEffect(() => {
    const sections = document.querySelectorAll('.brand-section');
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleSpeak = () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    const AUDIO_URLS = [
      'https://res.cloudinary.com/dxd79mrse/video/upload/v1781437964/ElevenLabs_2026-06-14T11_51_23_Max_-_eLearning_Documentary_Friendly_pvc_sp100_s50_sb75_v3_rkfs7a.mp3',
      'https://res.cloudinary.com/dxd79mrse/video/upload/v1781437964/ElevenLabs_2026-06-14T11_51_07_Jessica_-_Playful_Bright_Warm_pre_sp104_s65_sb85_v3_pj8vxw.mp3'
    ];

    // Pick a random audio URL
    const randomIndex = Math.floor(Math.random() * AUDIO_URLS.length);
    const audioUrl = AUDIO_URLS[randomIndex];

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.onplay = () => {
      setIsPlaying(true);
    };

    audio.onended = () => {
      setIsPlaying(false);
    };

    audio.onerror = () => {
      setIsPlaying(false);
      speakFallback();
    };

    audio.play().catch((err) => {
      console.error('Audio playback failed:', err);
      speakFallback();
    });
  };

  const speakFallback = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('Idyll Productions');
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Pronunciation: EYE-dull Productions");
    }
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadOrangeLogo = async () => {
    try {
      const WHITE_LOGO_URL = 'https://res.cloudinary.com/dxd79mrse/image/upload/v1781437519/Idyll_Productions_White_jenmwr.png';
      // Fetch the image as a blob to avoid CORS tainting issues
      const response = await fetch(WHITE_LOGO_URL);
      const blob = await response.blob();
      const bitmap = await createImageBitmap(blob);

      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const ctx = canvas.getContext('2d')!;

      // Fill orange, then clip to logo shape using destination-in
      ctx.fillStyle = '#FF6B35';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'destination-in';
      ctx.drawImage(bitmap, 0, 0);

      // Export as PNG and trigger download
      canvas.toBlob((pngBlob) => {
        if (!pngBlob) return;
        const url = URL.createObjectURL(pngBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'idyll-productions-orange.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (err) {
      console.error('Orange logo download failed:', err);
    }
  };

  const sidebarItems = [
    { id: 'cover', label: 'Cover', num: '00' },
    { header: 'Part 1 - What We Are' },
    { id: 'intro', label: 'Pronunciation & Meaning', num: '01' },
    { id: 'story', label: 'Our Story', num: '02' },
    { id: 'values', label: 'Core Values', num: '03' },
    { header: 'Part 2 - How We Look' },
    { id: 'logo', label: 'Logo Design', num: '04' },
    { id: 'colors', label: 'Brand Colors', num: '05' },
    { id: 'typography', label: 'Typography', num: '06' },
    { id: 'voice', label: 'Brand Voice', num: '07' },
    { id: 'closing', label: 'Closing', num: '08' }
  ];

  const logos = [
    {
      url: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1781437519/Idyll_Productions_White_jenmwr.png',
      label: 'White Logo',
      filename: 'idyll-productions-white.png',
      bg: 'bg-slate-950',
      border: 'border-slate-800',
      labelColor: 'text-slate-400',
      subLabel: 'On Dark Backgrounds'
    },
    {
      url: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1781437518/Idyll_Productions_Black_aburqi.png',
      label: 'Black Logo',
      filename: 'idyll-productions-black.png',
      bg: 'bg-white',
      border: 'border-slate-200',
      labelColor: 'text-slate-600',
      subLabel: 'On Light Backgrounds'
    },
    {
      url: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1781437519/Idyll_Productions_Red_bxhyb6.png',
      label: 'Red Logo',
      filename: 'idyll-productions-red.png',
      bg: 'bg-white',
      border: 'border-slate-200',
      labelColor: 'text-slate-600',
      subLabel: 'Red Variant'
    },
    {
      url: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1781437519/Idyll_Productions_Green_n67nwm.png',
      label: 'Green Logo',
      filename: 'idyll-productions-green.png',
      bg: 'bg-white',
      border: 'border-slate-200',
      labelColor: 'text-slate-600',
      subLabel: 'Green Variant'
    },
    {
      url: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1781437519/Idyll_Productions_Cobalt_Blue_a1aqsy.png',
      label: 'Cobalt Blue Logo',
      filename: 'idyll-productions-cobalt.png',
      bg: 'bg-white',
      border: 'border-slate-200',
      labelColor: 'text-slate-600',
      subLabel: 'Cobalt Variant'
    },
    {
      url: 'https://res.cloudinary.com/dxd79mrse/image/upload/v1781437518/Idyll_Productions_Blue_u7ytzj.png',
      label: 'Blue Logo',
      filename: 'idyll-productions-blue.png',
      bg: 'bg-white',
      border: 'border-slate-200',
      labelColor: 'text-slate-600',
      subLabel: 'Blue Variant'
    }
  ];

  const brandColors = [
    {
      name: 'Primary Brand Orange',
      hex: '#FF6B35',
      bg: 'bg-[#FF6B35]',
      border: 'border-[#FF6B35]',
      description: 'Main brand accents, highlights & buttons.',
      textHex: 'text-[#FF6B35]'
    },
    {
      name: 'Neutral Obsidian',
      hex: '#0A0A0F',
      bg: 'bg-slate-950',
      border: 'border-slate-700',
      description: 'Premium backgrounds, headers & dark text.',
      textHex: 'text-slate-700'
    },
    {
      name: 'Neutral Alabaster',
      hex: '#FAF9F6',
      bg: 'bg-[#FAF9F6]',
      border: 'border-slate-300',
      description: 'Clean canvases, cards & section layouts.',
      textHex: 'text-slate-400'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 font-inter" style={{ scrollBehavior: 'smooth' }}>
      
      {/* Background elegant grid */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.04) 1.2px, transparent 1.2px)`,
        backgroundSize: '32px 32px'
      }} />

      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row gap-12 pt-32 pb-24 items-start">
        
        {/* LEFT SIDEBAR - Navigation */}
        <aside className="lg:w-64 flex-shrink-0 lg:sticky lg:top-32 z-20 h-fit max-h-[calc(100vh-8rem)] flex flex-col">
          
          {/* Info Card / Header (Stays Fixed) */}
          <div className="p-5 rounded-2xl border bg-white border-slate-200/80 shadow-sm flex-shrink-0 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6B35]">Idyll Productions</span>
            <h2 className="text-lg font-bold mt-1 tracking-tight">Brand Book</h2>
            <p className="text-xs text-slate-500 mt-1">Official brand guidelines and identity standards.</p>

            {/* Back to Home button */}
            <Link
              to="/"
              className="mt-4 w-full h-10 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold border transition-all duration-300 bg-slate-900 hover:bg-[#FF6B35] text-white border-slate-900 hover:border-[#FF6B35] group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>

          {/* Navigation Links (Scrollable internal area) */}
          <nav className="hidden lg:flex flex-col space-y-1 overflow-y-auto pb-4 pr-2" style={{ scrollbarWidth: 'thin' }}>
            {sidebarItems.map((item, idx) => {
              if (item.header) {
                return (
                  <div
                    key={idx}
                    className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 pt-4 pb-2 pl-3"
                  >
                    {item.header}
                  </div>
                );
              }
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id!)}
                  className={`w-full flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 group flex-shrink-0 ${
                    isActive
                      ? 'text-[#FF6B35] bg-[#FF6B35]/5 font-semibold translate-x-1'
                      : 'text-slate-500 hover:text-slate-950 hover:translate-x-1'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`text-[10px] font-mono tracking-wider ${isActive ? 'text-[#FF6B35]' : 'text-slate-400'}`}>
                      {item.num}
                    </span>
                    <span>{item.label}</span>
                  </span>
                  <span className={`w-1.5 h-1.5 rounded-full bg-[#FF6B35] transition-all duration-300 ${
                    isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-40'
                  }`} />
                </button>
              );
            })}
          </nav>
        </aside>

        {/* RIGHT CONTENT AREA - Sections */}
        <main className="flex-1 max-w-3xl space-y-24 lg:space-y-36">
          
          {/* SECTION 00: COVER */}
          <section 
            id="cover" 
            className="brand-section min-h-[50vh] flex flex-col justify-center border-b pb-16 transition-all duration-500"
            style={{ borderColor: 'rgba(0,0,0,0.06)' }}
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/15 w-fit">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Brand Standards v1.0</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
                Idyll<br />
                <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF8C00] to-[#E8650A] text-transparent bg-clip-text">Productions</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-500 font-normal leading-relaxed max-w-2xl">
                A premium, modern design framework & philosophical foundation representing clarity, reliability, and clean creative systems.
              </p>
              
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => handleScrollTo('intro')}
                  className="h-12 px-6 bg-slate-900 text-white hover:bg-[#FF6B35] font-bold rounded-xl transition-all duration-300 flex items-center gap-2 group shadow-md"
                >
                  <span>Explore Brand Book</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 01: PRONUNCIATION & MEANING */}
          <section id="intro" className="brand-section scroll-mt-24">
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35]">01 / Nomenclature</span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Pronunciation & Meaning</h2>
              </div>

              {/* Interactive Audio Card */}
              <div className="p-6 sm:p-8 rounded-3xl border bg-white border-slate-200 relative overflow-hidden">
                {/* Floating blur effect */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF6B35]/10 rounded-full blur-2xl" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-2">
                    <span className="text-sm font-semibold text-slate-400">How to say it</span>
                    <h3 className="text-4xl font-black tracking-tight text-[#FF6B35]">Idyll Productions</h3>
                    <p className="text-lg font-medium text-slate-500">
                      Pronounced: <span className="text-slate-900 font-bold underline decoration-[#FF6B35] decoration-2">"EYE-dull Productions"</span>
                    </p>
                  </div>

                  {/* Audio Playback Trigger */}
                  <button
                    onClick={handleSpeak}
                    className={`h-16 w-16 sm:h-20 sm:w-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg relative group flex-shrink-0 ${
                      isPlaying 
                        ? 'bg-[#FF6B35] text-white scale-95' 
                        : 'bg-slate-900 text-white hover:bg-[#FF6B35]'
                    }`}
                  >
                    {isPlaying ? (
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <span className="w-1 h-6 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <span className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                      </div>
                    ) : (
                      <Volume2 className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
                    )}
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35] flex-shrink-0 mt-0.5">
                    <Info className="w-4 h-4" />
                  </div>
                  <div className="space-y-1.5 text-sm leading-relaxed text-slate-500">
                    <p className="font-semibold text-slate-900">
                      Ideal vs. Idyll
                    </p>
                    <p>
                      Many people mistakenly read the name as "Ideal Productions." The correct term is <strong>Idyll</strong>.
                    </p>
                    <p>
                      An <strong>idyll</strong> is a peaceful, pleasant, and idealized scene or place. This captures our core philosophy: achieving elite-tier, high-impact creative results not through stress and chaotic hustle, but through a calm, highly organized, and dependable creative process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 02: THE STORY */}
          <section id="story" className="brand-section scroll-mt-24">
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35]">02 / Origin Narrative</span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Our Narrative & Story</h2>
              </div>

              <div className="space-y-6 text-base leading-relaxed text-slate-500">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 border-2 border-slate-200 flex-shrink-0 flex items-center justify-center text-slate-500 font-bold">
                    HP
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 leading-none">Harsh Pawar</h4>
                    <span className="text-xs text-slate-400">Founder & CEO, Idyll Productions</span>
                  </div>
                </div>

                <p>
                  Idyll Productions was founded by <strong>Harsh Pawar</strong>, who started his journey as a dedicated video editor. Working deep in the trenches on diverse projects, he repeatedly witnessed a core struggle: creators and businesses couldn't find editors who combined artistic talent with absolute execution reliability.
                </p>
                <p>
                  Deadlines were frequently missed, quality was inconsistent, and simple communication was shockingly rare. The creative industry was filled with friction.
                </p>
                <p>
                  Instead of creating another generic freelancing profile or standard video agency, Harsh decided to build a true production partner. He wanted a company backed by robust systems and a dedicated team, capable of delivering high-quality content consistently at scale, while keeping execution stress-free and communications completely transparent.
                </p>
                <p className="border-l-4 border-[#FF6B35] pl-4 italic text-slate-900 font-medium">
                  "We believe that the best creative assets are born in environments built on dependability, systems, and mutual respect."
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 03: CORE VALUES */}
          <section id="values" className="brand-section scroll-mt-24">
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35]">03 / Philosophies</span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">What We Stand For</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Value 1 */}
                <div className="p-6 rounded-2xl border bg-white border-slate-200/60 shadow-sm">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]" />
                    Simplicity
                  </h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    We remove complexity. From our logo to our onboarding systems and workflows, we design solutions that are simple, direct, and free of noise.
                  </p>
                </div>

                {/* Value 2 */}
                <div className="p-6 rounded-2xl border bg-white border-slate-200/60 shadow-sm">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]" />
                    Reliability
                  </h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Creative talent is nothing without dependability. We show up, hit deadlines, and execute consistently. Clients can trust us implicitly.
                  </p>
                </div>

                {/* Value 3 */}
                <div className="p-6 rounded-2xl border bg-white border-slate-200/60 shadow-sm">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]" />
                    Creativity with Purpose
                  </h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    We edit with performance in mind. Visuals should command attention, engage deeply, and convert viewers, rather than just look good on a timeline.
                  </p>
                </div>

                {/* Value 4 */}
                <div className="p-6 rounded-2xl border bg-white border-slate-200/60 shadow-sm">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]" />
                    Smooth Collaboration
                  </h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    We integrate smoothly. By building transparent pipelines, we keep feedback loops tight, clear, and positive.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 04: LOGO DESIGN */}
          <section id="logo" className="brand-section scroll-mt-24">
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35]">04 / Visual Asset</span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Logo Design & Philosophy</h2>
              </div>

              <p className="text-base leading-relaxed text-slate-500">
                The Idyll Productions logo is intentionally minimalist. It represents clarity, focus, and simplicity. By avoiding visual noise and complex geometry, it speaks to our core value: elite creative work doesn't need to shout to be noticed.
              </p>

              <p className="text-sm text-slate-400 flex items-center gap-2">
                <Download className="w-4 h-4 text-[#FF6B35]" />
                Click any logo to download it.
              </p>

              {/* Primary Orange Logo Showcase - click to download */}
              <button
                onClick={handleDownloadOrangeLogo}
                className="group relative w-full p-8 sm:p-12 rounded-3xl border text-center flex flex-col items-center justify-center bg-white border-slate-200 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-xl cursor-pointer overflow-hidden"
              >
                {/* Download badge — top-right corner, above everything */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-slate-900 text-white rounded-full px-3 py-1.5 text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <Download className="w-3.5 h-3.5" />
                  Download PNG
                </div>

                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-6">Primary Brand Identity</span>
                
                {/* Dynamic Orange Masked Logo - bigger */}
                <div className="w-full h-40 relative flex items-center justify-center mb-6">
                  <div 
                    style={{
                      backgroundColor: '#FF6B35',
                      maskImage: `url('https://res.cloudinary.com/dxd79mrse/image/upload/v1781437519/Idyll_Productions_White_jenmwr.png')`,
                      WebkitMaskImage: `url('https://res.cloudinary.com/dxd79mrse/image/upload/v1781437519/Idyll_Productions_White_jenmwr.png')`,
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      WebkitMaskPosition: 'center',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>

                <span className="text-xs font-semibold text-[#FF6B35]">Orange Logo (Primary) — Click to Download</span>
              </button>

              {/* All Logo Variations Grid - click to download */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {logos.map((logo) => (
                  <button
                    key={logo.filename}
                    onClick={() => handleDownload(logo.url, logo.filename)}
                    className={`group relative p-8 rounded-2xl border ${logo.bg} ${logo.border} flex flex-col items-center justify-center gap-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer`}
                  >
                    {/* Download overlay on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
                        <Download className="w-4 h-4 text-slate-800" />
                        <span className="text-xs font-bold text-slate-800">Download</span>
                      </div>
                    </div>

                    <span className={`text-[9px] font-bold tracking-widest uppercase ${logo.labelColor} opacity-70`}>{logo.subLabel}</span>
                    <img 
                      src={logo.url}
                      alt={logo.label}
                      className="h-28 object-contain"
                    />
                    <span className={`text-[10px] font-semibold ${logo.labelColor}`}>{logo.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 05: BRAND COLORS */}
          <section id="colors" className="brand-section scroll-mt-24">
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35]">05 / Palette</span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Approved Colors</h2>
              </div>

              <p className="text-base leading-relaxed text-slate-500">
                Our color system is built to balance intense creative energy with clean professionalism. It is presented visually to help teams understand pairings naturally.
              </p>

              {/* Color Swatches Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {brandColors.map((color) => (
                  <div key={color.name} className="space-y-3">
                    <div className={`h-36 w-full rounded-2xl shadow-md border-2 ${color.bg} ${color.border}`} />
                    <div>
                      <h5 className="font-bold text-sm text-slate-900">{color.name}</h5>
                      <p className={`text-xs font-mono font-semibold mt-0.5 ${color.textHex}`}>{color.hex}</p>
                      <span className="text-xs text-slate-400 mt-1 block">{color.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 06: TYPOGRAPHY */}
          <section id="typography" className="brand-section scroll-mt-24">
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35]">06 / Font Hierarchy</span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Typography</h2>
              </div>

              <p className="text-base leading-relaxed text-slate-500">
                We use modern, system-integrated fonts that prioritize legibility across platforms while conveying a clean, premium visual layout.
              </p>

              {/* Typography Preview Cards */}
              <div className="space-y-6">
                
                {/* Heading Font */}
                <div className="p-6 sm:p-8 rounded-2xl border bg-white border-slate-200/60 shadow-sm">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#FF6B35] block mb-3">Headings & Hero Titles</span>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold tracking-tight">SF Pro Display / Apple System</h3>
                    <p className="text-xs text-slate-400">Weight: Bold & Extrabold. Kerning: tight tracking (-0.02em).</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 text-slate-800">
                    <span className="text-4xl sm:text-5xl font-extrabold tracking-tight block">
                      Aa Bb Cc Dd Ee Ff Gg
                    </span>
                  </div>
                </div>

                {/* Body Font */}
                <div className="p-6 sm:p-8 rounded-2xl border bg-white border-slate-200/60 shadow-sm">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#FF6B35] block mb-3">Body & Interface Text</span>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-medium font-inter">Inter</h3>
                    <p className="text-xs text-slate-400">Weight: Light, Regular, Medium, Semi-bold. Kerning: Normal.</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 text-slate-500">
                    <p className="text-sm font-inter leading-relaxed">
                      "Dependability and clean systems enable high-velocity creative outputs. We avoid visual clutter to make sure client content remains the focal point."
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 07: BRAND VOICE */}
          <section id="voice" className="brand-section scroll-mt-24">
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35]">07 / Communication</span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Brand Voice</h2>
              </div>

              <div className="space-y-6 text-base leading-relaxed text-slate-500">
                <p>
                  At Idyll Productions, we communicate in a manner that is <strong>clear, direct, professional, and approachable</strong>. We avoid complex corporate terminology and unnecessary jargon, choosing instead to present ourselves honestly and directly.
                </p>
                <p>
                  Our tone of voice should reflect the following coordinates:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex gap-3">
                    <span className="text-[#FF6B35] font-bold text-lg">✓</span>
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm">Confident but Humble</h5>
                      <p className="text-xs text-slate-400 mt-1">We prove our value through execution and dependable results, not boastful pitches.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#FF6B35] font-bold text-lg">✓</span>
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm">Direct & Action-Oriented</h5>
                      <p className="text-xs text-slate-400 mt-1">We value our clients' time. We keep communications short, clear, and actionable.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#FF6B35] font-bold text-lg">✓</span>
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm">Supportive & Collaborative</h5>
                      <p className="text-xs text-slate-400 mt-1">We talk as creative partners, maintaining respect, positivity, and patience.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#FF6B35] font-bold text-lg">✓</span>
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm">Systemized & Structured</h5>
                      <p className="text-xs text-slate-400 mt-1">Even in conversation, we show organization, keeping feedback clear and timelines explicit.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 08: CLOSING */}
          <section id="closing" className="brand-section scroll-mt-24">
            <div className="p-8 sm:p-12 rounded-3xl border text-center relative overflow-hidden bg-white border-slate-200 shadow-md">
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#FF6B35]/5 rounded-full blur-3xl" />
              
              <div className="space-y-6 relative z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35]">08 / Conclusion</span>
                <h3 className="text-3xl font-extrabold tracking-tight">Creating Idylls in Content Creation</h3>
                <p className="text-slate-500 leading-relaxed max-w-xl mx-auto text-sm sm:text-base">
                  Idyll Productions exists to make content creation simpler, more reliable, and more enjoyable for brands and creators. By combining creative direction, organized systems, and dependable execution, we help our partners consistently produce elite content without the friction.
                </p>

                <div className="pt-6 border-t border-slate-100 max-w-sm mx-auto flex items-center justify-between text-xs text-slate-400">
                  <span>© 2026 Idyll Productions</span>
                  <span>Made by Idyll Studio</span>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default BrandBook;
