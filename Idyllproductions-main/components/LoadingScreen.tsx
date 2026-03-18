import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onSlideStart: () => void;
  slideUp: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onSlideStart, slideUp }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0); // 0 = greeting, 1 = welcome
  
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
    // Show greeting for 1 second, then welcome message for 1 second
    const greetingTimer = setTimeout(() => {
      setCurrentMessage(1); // Switch to welcome message
    }, 1000);

    // Start exit animation after 2 seconds total
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      // Trigger home page transition
      setTimeout(() => {
        onSlideStart();
      }, 100);
    }, 2000);

    return () => {
      clearTimeout(greetingTimer);
      clearTimeout(exitTimer);
    };
  }, [onSlideStart]);

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
          animation: greetingSlideIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
                     gradientShift 3s ease-in-out infinite;
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