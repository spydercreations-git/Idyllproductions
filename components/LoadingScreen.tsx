import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onSlideStart: () => void;
  slideUp: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onSlideStart, slideUp }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation after 3 seconds
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Trigger home page transition
      setTimeout(() => {
        onSlideStart();
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onSlideStart]);

  return (
    <div className={`loading-container ${slideUp ? 'slide-up' : ''}`}>
      <div className={`content-wrapper ${isExiting ? 'exiting' : ''}`}>
        {/* Animated Banter Loader */}
        <div className="banter-loader">
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
        </div>
        
        {/* Welcome Text */}
        <h1 className="welcome-text">
          Welcome to Idyll Productions
        </h1>
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
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          animation: contentFadeIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards;
        }

        .content-wrapper.exiting {
          animation: contentSlideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        /* From Uiverse.io by Nawsome - Banter Loader */
        .banter-loader {
          position: relative;
          width: 72px;
          height: 72px;
          margin-bottom: 2rem;
        }

        .banter-loader__box {
          float: left;
          position: relative;
          width: 20px;
          height: 20px;
          margin-right: 6px;
        }

        .banter-loader__box:before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgb(37, 99, 235); /* Blue-600 to match theme */
        }

        .banter-loader__box:nth-child(3n) {
          margin-right: 0;
          margin-bottom: 6px;
        }

        .banter-loader__box:nth-child(1):before, 
        .banter-loader__box:nth-child(4):before {
          margin-left: 26px;
        }

        .banter-loader__box:nth-child(3):before {
          margin-top: 52px;
        }

        .banter-loader__box:last-child {
          margin-bottom: 0;
        }

        @keyframes moveBox-1 {
          9.0909090909% { transform: translate(-26px, 0); }
          18.1818181818% { transform: translate(0px, 0); }
          27.2727272727% { transform: translate(0px, 0); }
          36.3636363636% { transform: translate(26px, 0); }
          45.4545454545% { transform: translate(26px, 26px); }
          54.5454545455% { transform: translate(26px, 26px); }
          63.6363636364% { transform: translate(26px, 26px); }
          72.7272727273% { transform: translate(26px, 0px); }
          81.8181818182% { transform: translate(0px, 0px); }
          90.9090909091% { transform: translate(-26px, 0px); }
          100% { transform: translate(0px, 0px); }
        }

        .banter-loader__box:nth-child(1) {
          animation: moveBox-1 4s infinite;
        }

        @keyframes moveBox-2 {
          9.0909090909% { transform: translate(0, 0); }
          18.1818181818% { transform: translate(26px, 0); }
          27.2727272727% { transform: translate(0px, 0); }
          36.3636363636% { transform: translate(26px, 0); }
          45.4545454545% { transform: translate(26px, 26px); }
          54.5454545455% { transform: translate(26px, 26px); }
          63.6363636364% { transform: translate(26px, 26px); }
          72.7272727273% { transform: translate(26px, 26px); }
          81.8181818182% { transform: translate(0px, 26px); }
          90.9090909091% { transform: translate(0px, 26px); }
          100% { transform: translate(0px, 0px); }
        }

        .banter-loader__box:nth-child(2) {
          animation: moveBox-2 4s infinite;
        }

        @keyframes moveBox-3 {
          9.0909090909% { transform: translate(-26px, 0); }
          18.1818181818% { transform: translate(-26px, 0); }
          27.2727272727% { transform: translate(0px, 0); }
          36.3636363636% { transform: translate(-26px, 0); }
          45.4545454545% { transform: translate(-26px, 0); }
          54.5454545455% { transform: translate(-26px, 0); }
          63.6363636364% { transform: translate(-26px, 0); }
          72.7272727273% { transform: translate(-26px, 0); }
          81.8181818182% { transform: translate(-26px, -26px); }
          90.9090909091% { transform: translate(0px, -26px); }
          100% { transform: translate(0px, 0px); }
        }

        .banter-loader__box:nth-child(3) {
          animation: moveBox-3 4s infinite;
        }

        @keyframes moveBox-4 {
          9.0909090909% { transform: translate(-26px, 0); }
          18.1818181818% { transform: translate(-26px, 0); }
          27.2727272727% { transform: translate(-26px, -26px); }
          36.3636363636% { transform: translate(0px, -26px); }
          45.4545454545% { transform: translate(0px, 0px); }
          54.5454545455% { transform: translate(0px, -26px); }
          63.6363636364% { transform: translate(0px, -26px); }
          72.7272727273% { transform: translate(0px, -26px); }
          81.8181818182% { transform: translate(-26px, -26px); }
          90.9090909091% { transform: translate(-26px, 0px); }
          100% { transform: translate(0px, 0px); }
        }

        .banter-loader__box:nth-child(4) {
          animation: moveBox-4 4s infinite;
        }

        @keyframes moveBox-5 {
          9.0909090909% { transform: translate(0, 0); }
          18.1818181818% { transform: translate(0, 0); }
          27.2727272727% { transform: translate(0, 0); }
          36.3636363636% { transform: translate(26px, 0); }
          45.4545454545% { transform: translate(26px, 0); }
          54.5454545455% { transform: translate(26px, 0); }
          63.6363636364% { transform: translate(26px, 0); }
          72.7272727273% { transform: translate(26px, 0); }
          81.8181818182% { transform: translate(26px, -26px); }
          90.9090909091% { transform: translate(0px, -26px); }
          100% { transform: translate(0px, 0px); }
        }

        .banter-loader__box:nth-child(5) {
          animation: moveBox-5 4s infinite;
        }

        @keyframes moveBox-6 {
          9.0909090909% { transform: translate(0, 0); }
          18.1818181818% { transform: translate(-26px, 0); }
          27.2727272727% { transform: translate(-26px, 0); }
          36.3636363636% { transform: translate(0px, 0); }
          45.4545454545% { transform: translate(0px, 0); }
          54.5454545455% { transform: translate(0px, 0); }
          63.6363636364% { transform: translate(0px, 0); }
          72.7272727273% { transform: translate(0px, 26px); }
          81.8181818182% { transform: translate(-26px, 26px); }
          90.9090909091% { transform: translate(-26px, 0px); }
          100% { transform: translate(0px, 0px); }
        }

        .banter-loader__box:nth-child(6) {
          animation: moveBox-6 4s infinite;
        }

        @keyframes moveBox-7 {
          9.0909090909% { transform: translate(26px, 0); }
          18.1818181818% { transform: translate(26px, 0); }
          27.2727272727% { transform: translate(26px, 0); }
          36.3636363636% { transform: translate(0px, 0); }
          45.4545454545% { transform: translate(0px, -26px); }
          54.5454545455% { transform: translate(26px, -26px); }
          63.6363636364% { transform: translate(0px, -26px); }
          72.7272727273% { transform: translate(0px, -26px); }
          81.8181818182% { transform: translate(0px, 0px); }
          90.9090909091% { transform: translate(26px, 0px); }
          100% { transform: translate(0px, 0px); }
        }

        .banter-loader__box:nth-child(7) {
          animation: moveBox-7 4s infinite;
        }

        @keyframes moveBox-8 {
          9.0909090909% { transform: translate(0, 0); }
          18.1818181818% { transform: translate(-26px, 0); }
          27.2727272727% { transform: translate(-26px, -26px); }
          36.3636363636% { transform: translate(0px, -26px); }
          45.4545454545% { transform: translate(0px, -26px); }
          54.5454545455% { transform: translate(0px, -26px); }
          63.6363636364% { transform: translate(0px, -26px); }
          72.7272727273% { transform: translate(0px, -26px); }
          81.8181818182% { transform: translate(26px, -26px); }
          90.9090909091% { transform: translate(26px, 0px); }
          100% { transform: translate(0px, 0px); }
        }

        .banter-loader__box:nth-child(8) {
          animation: moveBox-8 4s infinite;
        }

        @keyframes moveBox-9 {
          9.0909090909% { transform: translate(-26px, 0); }
          18.1818181818% { transform: translate(-26px, 0); }
          27.2727272727% { transform: translate(0px, 0); }
          36.3636363636% { transform: translate(-26px, 0); }
          45.4545454545% { transform: translate(0px, 0); }
          54.5454545455% { transform: translate(0px, 0); }
          63.6363636364% { transform: translate(-26px, 0); }
          72.7272727273% { transform: translate(-26px, 0); }
          81.8181818182% { transform: translate(-52px, 0); }
          90.9090909091% { transform: translate(-26px, 0); }
          100% { transform: translate(0px, 0px); }
        }

        .banter-loader__box:nth-child(9) {
          animation: moveBox-9 4s infinite;
        }

        .welcome-text {
          font-size: 2rem;
          font-weight: 600;
          color: rgb(71, 85, 105); /* slate-600 */
          text-align: center;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          letter-spacing: -0.02em;
          line-height: 1.2;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          animation: textFadeIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s forwards;
          opacity: 0;
        }

        /* Slide up transition */
        .slide-up {
          transform: translateY(-100vh);
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
            transform: translateY(-30px);
          }
        }

        @keyframes textFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .welcome-text {
            font-size: 1.5rem;
            padding: 0 1rem;
          }
          
          .banter-loader {
            width: 60px;
            height: 60px;
            margin-bottom: 1.5rem;
          }
          
          .banter-loader__box {
            width: 16px;
            height: 16px;
            margin-right: 4px;
          }
          
          .banter-loader__box:nth-child(3n) {
            margin-bottom: 4px;
          }
        }

        @media (max-width: 480px) {
          .welcome-text {
            font-size: 1.25rem;
          }
          
          .banter-loader {
            width: 48px;
            height: 48px;
            margin-bottom: 1rem;
          }
          
          .banter-loader__box {
            width: 12px;
            height: 12px;
            margin-right: 3px;
          }
          
          .banter-loader__box:nth-child(3n) {
            margin-bottom: 3px;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .loading-container,
          .content-wrapper,
          .welcome-text,
          .banter-loader__box {
            animation: none;
            transition-duration: 0.2s;
          }

          .content-wrapper,
          .welcome-text {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;