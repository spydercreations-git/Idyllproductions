import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import FilmsPage from './pages/FilmsPage';
import UGCPage from './pages/UGCPage';

const App: React.FC = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [slideUp, setSlideUp] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  const handleSlideStart = () => {
    setSlideUp(true);
    setTimeout(() => {
      setShowLoading(false);
    }, 800); // Match the slide-up animation duration
  };

  // Check if hero section is loaded
  useEffect(() => {
    if (!showLoading) return;
    
    const checkHeroLoaded = () => {
      // Check if hero background image is loaded
      const heroImage = new Image();
      heroImage.src = '/Bg%20Image.jpg';
      
      heroImage.onload = () => {
        console.log('Hero background loaded');
        setHeroLoaded(true);
      };
      
      heroImage.onerror = () => {
        console.log('Hero background failed to load, proceeding anyway');
        setHeroLoaded(true);
      };
      
      // Fallback: if image takes too long, proceed after 3 seconds
      const fallbackTimer = setTimeout(() => {
        console.log('Hero load timeout, proceeding');
        setHeroLoaded(true);
      }, 3000);
      
      return () => clearTimeout(fallbackTimer);
    };
    
    checkHeroLoaded();
  }, [showLoading]);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Create Lenis instance with custom settings
    const lenis = new Lenis({
      duration: 1.2, // Scroll duration in seconds (slower = smoother)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false, // Disable on touch devices for better performance
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, [showLoading]);

  // Skip loading screen on subsequent visits
  useEffect(() => {
    // Removed sessionStorage check - loading screen will show every time
    // const hasVisited = sessionStorage.getItem('hasVisited');
    // if (hasVisited) {
    //   setShowLoading(false);
    // } else {
    //   sessionStorage.setItem('hasVisited', 'true');
    // }
  }, []);

  return (
    <Router>
      <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
        {/* Loading Screen Overlay */}
        {showLoading && (
          <LoadingScreen onSlideStart={handleSlideStart} slideUp={slideUp} heroLoaded={heroLoaded} />
        )}
        
        {/* Main Content - Always rendered but hidden behind loading screen */}
        <div style={{ visibility: showLoading && !slideUp ? 'hidden' : 'visible' }}>
          <Navbar />
          <Chatbot />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/films" element={<FilmsPage />} />
              <Route path="/ugc" element={<UGCPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;