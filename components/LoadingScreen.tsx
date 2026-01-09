
import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onSlideStart: () => void;
  slideUp: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onSlideStart, slideUp }) => {
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const welcomeMessages = [
    { text: "Welcome to Idyll Productions", lang: "en" },
    { text: "आईडल प्रोडक्शन्स में आपका स्वागत है", lang: "hi" },
    { text: "アイデル・プロダクションズへようこそ", lang: "ja" },
    { text: "Willkommen bei Idyll Produktionen", lang: "de" },
    { text: "Bienvenue chez Idyll Productions", lang: "fr" }
  ];

  useEffect(() => {
    // Start language cycling with proper timing to prevent overlap
    const interval = setInterval(() => {
      setCurrentLanguage(prev => {
        const next = prev + 1;
        if (next >= welcomeMessages.length) {
          clearInterval(interval);
          // Start exit animation after brief pause
          setTimeout(() => {
            setIsExiting(true);
            // Trigger home page transition
            setTimeout(() => {
              onSlideStart();
            }, 800);
          }, 800); // Longer pause to ensure no overlap
          return prev;
        }
        return next;
      });
    }, 1200); // Increased interval to 1.2s to prevent overlap

    return () => clearInterval(interval);
  }, [onSlideStart, welcomeMessages.length]);

  return (
    <div className={`loading-container ${slideUp ? 'slide-up' : ''}`}>
      {/* Main content - only language text */}
      <div className={`content-wrapper ${isExiting ? 'exiting' : ''}`}>
        <div className="message-container">
          {welcomeMessages.map((message, index) => (
            <div 
              key={index}
              className={`welcome-message ${
                index === currentLanguage ? 'active' : 
                index < currentLanguage ? 'exited' : 'waiting'
              }`}
              data-lang={message.lang}
            >
              {message.text}
            </div>
          ))}
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
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .content-wrapper {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          animation: contentFadeIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s forwards;
        }

        .content-wrapper.exiting {
          animation: contentSlideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .message-container {
          position: relative;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 500px;
        }

        .welcome-message {
          position: absolute;
          font-size: 2.1rem;
          font-weight: 700;
          background: linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
          opacity: 0;
          transform: translateY(0);
          transition: opacity 0.4s ease-in-out;
          white-space: nowrap;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          letter-spacing: -0.02em;
          line-height: 1.1;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          overflow: hidden;
        }

        .welcome-message::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transition: left 0.8s ease-in-out;
          z-index: 1;
        }

        .welcome-message.active {
          opacity: 1;
          transform: translate(-50%, -50%);
          transition-delay: 0.2s;
          animation: shineText 2s ease-in-out infinite;
        }

        .welcome-message.active::before {
          left: 100%;
          transition: left 1.5s ease-in-out;
          animation: shine 2s ease-in-out infinite;
        }

        .welcome-message.exited {
          opacity: 0;
          transform: translate(-50%, -50%);
          transition: opacity 0.2s ease-in-out;
        }

        .welcome-message.waiting {
          opacity: 0;
          transform: translate(-50%, -50%);
        }

        @keyframes shineText {
          0%, 100% {
            background: linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          50% {
            background: linear-gradient(135deg, #60a5fa 0%, #93c5fd 50%, #dbeafe 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        }

        @keyframes shine {
          0% {
            left: -100%;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        /* Language-specific styling */
        .welcome-message[data-lang="hi"] {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Noto Sans Devanagari', sans-serif;
          font-size: 1.9rem;
        }

        .welcome-message[data-lang="ja"] {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Hiragino Sans', 'Noto Sans JP', sans-serif;
          font-size: 1.9rem;
        }

        .welcome-message[data-lang="de"] {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif;
          font-size: 2rem;
        }

        .welcome-message[data-lang="fr"] {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif;
        }

        /* Slide up transition */
        .slide-up {
          transform: translateY(-100vh);
        }

        /* Animations */
        @keyframes contentFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes contentSlideUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-30px);
          }
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .welcome-message {
            font-size: 1.7rem;
            padding: 0 1rem;
          }

          .welcome-message[data-lang="hi"],
          .welcome-message[data-lang="ja"] {
            font-size: 1.5rem;
          }

          .welcome-message[data-lang="de"] {
            font-size: 1.6rem;
          }

          .message-container {
            min-width: 350px;
            height: 50px;
          }
        }

        @media (max-width: 480px) {
          .welcome-message {
            font-size: 1.4rem;
          }

          .welcome-message[data-lang="hi"],
          .welcome-message[data-lang="ja"] {
            font-size: 1.3rem;
          }

          .welcome-message[data-lang="de"] {
            font-size: 1.3rem;
          }

          .message-container {
            min-width: 300px;
            height: 45px;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .loading-container,
          .content-wrapper,
          .welcome-message {
            animation: none;
            transition-duration: 0.2s;
          }

          .content-wrapper {
            opacity: 1;
          }
        }

        /* High DPI displays */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .welcome-message {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
