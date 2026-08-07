import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import UGCPage from './pages/UGCPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import Blog1 from './pages/blog/Blog1';
import ApplyEditorPage from './pages/ApplyEditorPage';
import BrandBook from './pages/BrandBook';
import { preloadCriticalVideos } from './utils/videoPreloader';

// Component to handle scroll to top on route change
const ScrollToTop: React.FC<{ lenisRef: React.RefObject<Lenis | null> }> = ({ lenisRef }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Skip scroll to top for category and section routes (excluding /ugc to scroll it to top)
    const categoryPaths = ['/category/', '/short-form', '/long-form', '/saas-tech', '/gaming', '/rhythmic-montage'];
    const shouldSkipScroll = categoryPaths.some(path => location.pathname.includes(path));
    
    if (shouldSkipScroll) {
      return;
    }
    
    // Multiple approaches to ensure scroll to top works
    const scrollToTop = () => {
      // Method 1: Immediate scroll
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      
      // Method 2: Document scroll
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Method 3: Force scroll on next frame
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    };
    
    // Execute immediately
    scrollToTop();
    
    // Also execute after a short delay to ensure it works
    setTimeout(scrollToTop, 0);
    setTimeout(scrollToTop, 10);
    setTimeout(scrollToTop, 50);
    
    // Reset Lenis scroll position if it exists
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname, lenisRef]);
  
  return null;
};

const App: React.FC = () => {
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8, // Reduced from 1.2 for faster scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2, // Increased for more responsive scrolling
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Preload critical videos for instant loading
  useEffect(() => {
    // Preload after a short delay to not block initial render
    setTimeout(() => {
      preloadCriticalVideos();
    }, 1000);
  }, []);

  return (
    <Router>
      <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
        <ScrollToTop lenisRef={lenisRef} />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/apply" element={<ApplyEditorPage />} />
            <Route path="/brand-book" element={<BrandBook />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<Blog1 />} />
            
            {/* Category routes with URL parameter */}
            <Route path="/category/short-form-content" element={<Home />} />
            <Route path="/category/long-form" element={<Home />} />
            <Route path="/category/saas-tech-videos" element={<Home />} />
            <Route path="/category/gaming-content" element={<Home />} />
            <Route path="/category/rhythmic-montage" element={<Home />} />
            
            {/* Section anchor routes */}
            <Route path="/ugc" element={<UGCPage />} />
            <Route path="/short-form" element={<Home />} />
            <Route path="/long-form" element={<Home />} />
            <Route path="/saas-tech" element={<Home />} />
            <Route path="/gaming" element={<Home />} />
            <Route path="/rhythmic-montage" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;