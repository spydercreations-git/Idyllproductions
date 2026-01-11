
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import FilmsPage from './pages/FilmsPage';
import AboutPage from './pages/AboutPage';
import WorkPage from './pages/WorkPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [slideUp, setSlideUp] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingSlide = () => {
    // Start slide animation
    setSlideUp(true);
    // Show content after slide completes
    setTimeout(() => {
      setShowContent(true);
      setLoading(false);
    }, 400); // Match the slide duration
  };

  return (
    <div className="relative min-h-screen">
      <Router>
        <ScrollToTop />
        
        {/* Navbar - Always visible */}
        <Navbar />
        
        {/* Main content with fade-in blur effect */}
        <div className={`relative z-[5] transition-all duration-1000 ${
          showContent 
            ? 'opacity-100 blur-0' 
            : 'opacity-0 blur-sm'
        }`}>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/films" element={<FilmsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        
        {/* Loading screen overlay */}
        {loading && (
          <LoadingScreen 
            onSlideStart={handleLoadingSlide}
            slideUp={slideUp}
          />
        )}
      </Router>
    </div>
  );
};

export default App;
