import React, { useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import { preloadCriticalVideos } from './utils/videoPreloader';
import { usePageSEO } from './hooks/usePageSEO';

// Lazy load non-homepage routes so homepage doesn't bundle them
const UGCPage = lazy(() => import('./pages/UGCPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const SocialsPage = lazy(() => import('./pages/SocialsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const Blog1 = lazy(() => import('./pages/blog/Blog1'));
const ApplyEditorPage = lazy(() => import('./pages/ApplyEditorPage'));
const BrandBook = lazy(() => import('./pages/BrandBook'));
const UgcVideoEditingPage = lazy(() => import('./pages/UgcVideoEditingPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const HarshPage = lazy(() => import('./pages/team/HarshPage'));
const RohitPage = lazy(() => import('./pages/team/RohitPage'));
const ZadaPage = lazy(() => import('./pages/team/ZadaPage'));


// Component to handle scroll to top on route change
export const ScrollToTop: React.FC<{ lenisRef: React.RefObject<Lenis | null> }> = ({ lenisRef }) => {
  const location = useLocation();
  
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Skip scroll to top for category and section routes (excluding /ugc to scroll it to top)
    const categoryPaths = ['/category/', '/short-form', '/long-form', '/saas-tech', '/gaming', '/rhythmic-montage'];
    const shouldSkipScroll = categoryPaths.some(path => location.pathname.includes(path));
    
    if (shouldSkipScroll) {
      return;
    }
    
    // Multiple approaches to ensure scroll to top works
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    };
    
    scrollToTop();
    setTimeout(scrollToTop, 0);
    setTimeout(scrollToTop, 10);
    setTimeout(scrollToTop, 50);
    
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname, lenisRef]);
  
  return null;
};

export const AppContent: React.FC = () => {
  const lenisRef = useRef<Lenis | null>(null);

  // Dynamic SEO meta updater on route changes
  usePageSEO();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
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
    if (typeof window === 'undefined') return;
    setTimeout(() => {
      preloadCriticalVideos();
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between" style={{ backgroundColor: '#000000' }}>
      <ScrollToTop lenisRef={lenisRef} />
      <Navbar />
      <main className="flex-grow w-full" style={{ backgroundColor: '#ffffff' }}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/work" element={<Navigate to="/" replace />} />
            <Route path="/films" element={<Navigate to="/" replace />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/socials" element={<SocialsPage />} />
            <Route path="/ugc-video-editing" element={<UgcVideoEditingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/team" element={<Navigate to="/about" replace />} />
            <Route path="/team/harsh" element={<HarshPage />} />
            <Route path="/team/rohit" element={<RohitPage />} />
            <Route path="/team/zada" element={<ZadaPage />} />
            <Route path="/apply" element={<ApplyEditorPage />} />
            <Route path="/brand-book" element={<BrandBook />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<Blog1 />} />
            
            {/* Category routes with URL parameter */}
            <Route path="/category/ugc" element={<Home />} />
            <Route path="/category/short-form-content" element={<Home />} />
            <Route path="/category/long-form" element={<Home />} />
            <Route path="/category/saas-tech-videos" element={<Home />} />
            <Route path="/category/gaming-content" element={<Home />} />
            <Route path="/category/rhythmic-montage" element={<Home />} />
            
            {/* Section anchor routes */}
            <Route path="/ugc" element={<Home />} />
            <Route path="/short-form" element={<Home />} />
            <Route path="/long-form" element={<Home />} />
            <Route path="/saas-tech" element={<Home />} />
            <Route path="/gaming" element={<Home />} />
            <Route path="/rhythmic-montage" element={<Home />} />

            {/* 404 Not Found Catch-All */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;