import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onSlideStart: () => void;
  slideUp: boolean;
  heroLoaded?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onSlideStart, slideUp, heroLoaded = false }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0); // 0 = greeting, 1 = welcome
  const [canExit, setCanExit] = useState(false);
  const [startTime] = useState(Date.now());
  
  // Language detection and message mapping
  const getMessagesByLanguage = () => {
    const browserLang = navigator.language.toLowerCase();
    console.log('Detecting language:', browserLang);
    
    // Language to messages mapping [greeting, welcome]
    const messagesMap: { [key: string]: [string, string] } = {
      // English
      'en': ['Hello', 'Welcome to Idyll Productions'],
      'en-us': ['Hello', 'Welcome to Idyll Productions'],
      'en-gb': ['Hello', 'Welcome to Idyll Productions'],
      'en-au': ['Hello', 'Welcome to Idyll Productions'],
      'en-ca': ['Hello', 'Welcome to Idyll Productions'],
      
      // Hindi/Indian languages
      'hi': ['नमस्ते', 'इडिल प्रोडक्शंस में आपका स्वागत है'],
      'hi-in': ['नमस्ते', 'इडिल प्रोडक्शंस में आपका स्वागत है'],
      'mr': ['नमस्ते', 'इडिल प्रोडक्शंस में आपका स्वागत है'],
      'bn': ['নমস্কার', 'ইডিল প্রোডাকশনে স্বাগতম'],
      'ta': ['வணக்கம்', 'இடில் புரொடக்ஷன்ஸ்க்கு வரவேற்கிறோம்'],
      'te': ['నమస్కారం', 'ఇడిల్ ప్రొడక్షన్స్‌కు స్వాగతం'],
      'gu': ['નમસ્તે', 'ઇડિલ પ્રોડક્શન્સમાં આપનું સ્વાગત છે'],
      
      // French
      'fr': ['Bonjour', 'Bienvenue chez Idyll Productions'],
      'fr-fr': ['Bonjour', 'Bienvenue chez Idyll Productions'],
      'fr-ca': ['Bonjour', 'Bienvenue chez Idyll Productions'],
      'fr-be': ['Bonjour', 'Bienvenue chez Idyll Productions'],
      
      // Spanish
      'es': ['Hola', 'Bienvenido a Idyll Productions'],
      'es-es': ['Hola', 'Bienvenido a Idyll Productions'],
      'es-mx': ['Hola', 'Bienvenido a Idyll Productions'],
      'es-ar': ['Hola', 'Bienvenido a Idyll Productions'],
      
      // German
      'de': ['Hallo', 'Willkommen bei Idyll Productions'],
      'de-de': ['Hallo', 'Willkommen bei Idyll Productions'],
      'de-at': ['Hallo', 'Willkommen bei Idyll Productions'],
      
      // Italian
      'it': ['Ciao', 'Benvenuto a Idyll Productions'],
      'it-it': ['Ciao', 'Benvenuto a Idyll Productions'],
      
      // Portuguese
      'pt': ['Olá', 'Bem-vindo à Idyll Productions'],
      'pt-br': ['Olá', 'Bem-vindo à Idyll Productions'],
      'pt-pt': ['Olá', 'Bem-vindo à Idyll Productions'],
      
      // Japanese
      'ja': ['こんにちは', 'Idyll Productionsへようこそ'],
      'ja-jp': ['こんにちは', 'Idyll Productionsへようこそ'],
      
      // Chinese
      'zh': ['你好', '欢迎来到Idyll Productions'],
      'zh-cn': ['你好', '欢迎来到Idyll Productions'],
      'zh-tw': ['你好', '歡迎來到Idyll Productions'],
      
      // Korean
      'ko': ['안녕하세요', 'Idyll Productions에 오신 것을 환영합니다'],
      'ko-kr': ['안녕하세요', 'Idyll Productions에 오신 것을 환영합니다'],
      
      // Russian
      'ru': ['Привет', 'Добро пожаловать в Idyll Productions'],
      'ru-ru': ['Привет', 'Добро пожаловать в Idyll Productions'],
      
      // Arabic
      'ar': ['مرحبا', 'مرحبا بك في Idyll Productions'],
      'ar-sa': ['مرحبا', 'مرحبا بك في Idyll Productions'],
      
      // Dutch
      'nl': ['Hallo', 'Welkom bij Idyll Productions'],
      'nl-nl': ['Hallo', 'Welkom bij Idyll Productions'],
      
      // Swedish
      'sv': ['Hej', 'Välkommen till Idyll Productions'],
      'sv-se': ['Hej', 'Välkommen till Idyll Productions'],
      
      // Turkish
      'tr': ['Merhaba', 'Idyll Productions\'a Hoş Geldiniz'],
      'tr-tr': ['Merhaba', 'Idyll Productions\'a Hoş Geldiniz'],
      
      // Polish
      'pl': ['Cześć', 'Witamy w Idyll Productions'],
      'pl-pl': ['Cześć', 'Witamy w Idyll Productions'],
      
      // Indonesian
      'id': ['Halo', 'Selamat datang di Idyll Productions'],
      'id-id': ['Halo', 'Selamat datang di Idyll Productions'],
      
      // Thai
      'th': ['สวัสดี', 'ยินดีต้อนรับสู่ Idyll Productions'],
      'th-th': ['สวัสดี', 'ยินดีต้อนรับสู่ Idyll Productions'],
      
      // Vietnamese
      'vi': ['Xin chào', 'Chào mừng đến với Idyll Productions'],
      'vi-vn': ['Xin chào', 'Chào mừng đến với Idyll Productions']
    };

    // Check exact match first
    if (messagesMap[browserLang]) {
      console.log('Found exact match:', messagesMap[browserLang]);
      return messagesMap[browserLang];
    }

    // Check language code only (first 2 characters)
    const langCode = browserLang.split('-')[0];
    if (messagesMap[langCode]) {
      console.log('Found language code match:', messagesMap[langCode]);
      return messagesMap[langCode];
    }

    // Default to English
    console.log('Using default: English');
    return ['Hello', 'Welcome to Idyll Productions'];
  };

  const [messages] = useState(() => getMessagesByLanguage());

  useEffect(() => {
    console.log('LoadingScreen mounted, showing greeting:', messages[0]);
    
    // Always show greeting for exactly 1 second from start time
    const greetingTimer = setTimeout(() => {
      console.log('Switching to welcome message:', messages[1]);
      setCurrentMessage(1); // Switch to welcome message
    }, 1000);

    // Set canExit to true after minimum 2 seconds from start time
    const minDisplayTimer = setTimeout(() => {
      console.log('Can exit now, heroLoaded:', heroLoaded);
      setCanExit(true);
    }, 2000);

    return () => {
      clearTimeout(greetingTimer);
      clearTimeout(minDisplayTimer);
    };
  }, [startTime, messages, heroLoaded]);

  // Exit when both minimum time has passed, hero is loaded, and we've shown the welcome message
  useEffect(() => {
    if (canExit && heroLoaded) {
      // Calculate how much time has actually passed
      const elapsed = Date.now() - startTime;
      const minTime = 2000;
      
      // If less than minimum time, wait for the remaining time
      const remainingTime = Math.max(0, minTime - elapsed);
      
      setTimeout(() => {
        // Add a small delay before starting exit animation for smoothness
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onSlideStart();
          }, 100);
        }, 300);
      }, remainingTime);
    }
  }, [canExit, heroLoaded, onSlideStart, startTime]);

  return (
    <div className={`loading-container ${slideUp ? 'slide-up' : ''}`}>
      <div className={`content-wrapper ${isExiting ? 'exiting' : ''}`}>
        {/* Language-specific Messages */}
        <div className="greeting-container">
          <h1 className="greeting-text" key={currentMessage}>
            {messages[currentMessage]}
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
          transition: transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .content-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 1;
          will-change: opacity;
          transform: translateZ(0);
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
          color: #000000;
          opacity: 1 !important;
          animation: gentleFloat 3s ease-in-out infinite;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Slide up transition - Slower and smoother */
        .slide-up {
          transform: translateY(-100vh);
          transition: transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
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
          }
          to {
            opacity: 0;
          }
        }

        @keyframes greetingSlideIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
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