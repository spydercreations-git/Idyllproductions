import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import FilmsPage from './pages/FilmsPage';
import UGCPage from './pages/UGCPage';

// Page transition wrapper component
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div
      className={`page-transition ${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === 'fadeOut') {
          setTransitionStage('fadeIn');
          setDisplayLocation(location);
        }
      }}
    >
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [slideUp, setSlideUp] = useState(false);

  const handleSlideStart = () => {
    setSlideUp(true);
    setTimeout(() => {
      setShowLoading(false);
    }, 300);
  };

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

  if (showLoading) {
    return <LoadingScreen onSlideStart={handleSlideStart} slideUp={slideUp} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Chatbot />
        <PageTransition>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/films" element={<FilmsPage />} />
              <Route path="/ugc" element={<UGCPage />} />
            </Routes>
          </main>
        </PageTransition>
        <Footer />
      </div>
    </Router>
  );
};

export default App;