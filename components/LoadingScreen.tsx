import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onSlideStart: () => void;
  slideUp: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onSlideStart, slideUp }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [currentGreeting, setCurrentGreeting] = useState(0);

  // Multilingual greetings - 5 languages only
  const greetings = [
    "Hello",
    "नमस्ते",
    "Bonjour", 
    "こんにちは",
    "Привет"
  ];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    // Custom timing for each greeting
    const showGreeting = (index: number, duration: number) => {
      setCurrentGreeting(index);
      return setTimeout(() => {
        if (index < greetings.length - 1) {
          // Move to next greeting based on custom durations
          if (index === 0) {
            timeoutId = showGreeting(1, 600); // Hello -> नमस्ते (600ms)
          } else if (index === 1) {
            timeoutId = showGreeting(2, 300); // नमस्ते -> Bonjour (600ms)
          } else if (index === 2) {
            timeoutId = showGreeting(3, 300); // Bonjour -> こんにちは (300ms)
          } else if (index === 3) {
            timeoutId = showGreeting(4, 300); // こんにちは -> Привет (300ms)
          }
        }
      }, duration);
    };

    // Start with Hello for 600ms
    timeoutId = showGreeting(0, 600);

    // Start exit animation after 2 seconds
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Trigger home page transition
      setTimeout(() => {
        onSlideStart();
      }, 100);
    }, 2000); // 2 seconds loading time

    return () => {
      clearTimeout(timer);
      clearTimeout(timeoutId);
    };
  }, [onSlideStart]);

  return (
    <div className={`loading-container ${slideUp ? 'slide-up' : ''}`}>
      <div className={`content-wrapper ${isExiting ? 'exiting' : ''}`}>
        {/* Multilingual Greeting Animation */}
        <div className="greeting-container">
          <h1 className="greeting-text" key={currentGreeting}>
            {greetings[currentGreeting]}
          </h1>
        </div>
      </div>

      <style>{`
        .loading-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #ffffff;
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .content-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          animation: contentFadeIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards;
        }

        .content-wrapper.exiting {
          animation: contentSlideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        /* Greeting Container */
        .greeting-container {
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
          padding: 20px;
        }

        /* Multilingual Greeting Animation */
        .greeting-text {
          font-size: 4.5rem;
          font-weight: 500;
          line-height: 1.2;
          margin: 0;
          padding: 10px 0;
          text-align: center;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          letter-spacing: -0.02em;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background: linear-gradient(45deg, #ffffff, #2563eb, #ffffff);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: greetingSlideIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
                     gradientShift 2s ease-in-out infinite;
        }

        /* Slide up transition */
        .slide-up {
          transform: translateY(-100vh);
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Animations */
        @keyframes contentFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes contentSlideUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-40px);
          }
        }

        @keyframes greetingSlideIn {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .greeting-text {
            font-size: 3.5rem;
            padding: 8px 0;
          }
          
          .greeting-container {
            height: 120px;
            padding: 15px;
          }
        }

        @media (max-width: 480px) {
          .greeting-text {
            font-size: 2.8rem;
            padding: 5px 0;
          }
          
          .greeting-container {
            height: 100px;
            padding: 10px;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .loading-container,
          .content-wrapper,
          .greeting-text {
            animation: none;
            transition-duration: 0.2s;
          }

          .content-wrapper,
          .greeting-text {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;