import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import FilmsPage from './pages/FilmsPage';

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
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setShowLoading(false);
    } else {
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  if (showLoading) {
    return <LoadingScreen onSlideStart={handleSlideStart} slideUp={slideUp} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/films" element={<FilmsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;