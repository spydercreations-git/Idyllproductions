import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onSlideStart: () => void;
  slideUp: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onSlideStart, slideUp }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Multilingual greetings - 5 languages only
  const greetings = [
    "नमस्ते",
    "Bonjour", 
    "Hello",
    "こんにちは",
    "Привет"
  ];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    // Custom timing for each greeting with fade transitions
    const showGreeting = (index: number, displayDuration: number) => {
      setIsFading(false);
      setCurrentGreeting(index);
      
      return setTimeout(() => {
        if (index < greetings.length - 1) {
          // Fade out current greeting
          setIsFading(true);
          
          // Wait for fade out, then show next greeting
          setTimeout(() => {
            if (index === 0) {
              timeoutId = showGreeting(1, 500); // नमस्ते -> Bonjour (500ms)
            } else if (index === 1) {
              timeoutId = showGreeting(2, 500); // Bonjour -> Hello (500ms)
            } else if (index === 2) {
              timeoutId = showGreeting(3, 500); // Hello -> こんにちは (500ms)
            } else if (index === 3) {
              timeoutId = showGreeting(4, 500); // こんにちは -> Привет (500ms)
            }
          }, 300); // Fade out duration
        }
      }, displayDuration);
    };

    // Start with नमस्ते for 500ms
    timeoutId = showGreeting(0, 500);

    // Start exit animation after total time
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Trigger home page transition
      setTimeout(() => {
        onSlideStart();
      }, 100);
    }, 3500); // Total loading time (5 greetings × 500ms + 5 fades × 300ms = 4000ms, reduced to 3500ms)

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
          <h1 className={`greeting-text ${isFading ? 'fading' : ''}`} key={currentGreeting}>
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
          background: linear-gradient(45deg, #2563eb, #3b82f6, #60a5fa);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 1;
          transform: translateY(0) scale(1);
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
          animation: greetingSlideIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
                     gradientShift 3s ease-in-out infinite;
        }

        .greeting-text.fading {
          opacity: 0;
          transform: translateY(-20px) scale(0.95);
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