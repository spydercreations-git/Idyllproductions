import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Mail, ShieldAlert } from 'lucide-react';

const TrustWarningPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
    }, 400);
  };

  const handleOpen = () => {
    setIsVisible(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const handleContactClick = () => {
    handleClose();
    setTimeout(() => {
      document.getElementById('contact-us')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 500);
  };

  return (
    <>
      {/* Floating Button - Bottom Right */}
      {!isVisible && (
        <button
          onClick={handleOpen}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 transform"
          aria-label="Show trust warning"
        >
          <ShieldAlert className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}

      {/* Popup - Bottom Right */}
      {isVisible && (
        <div 
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-400 ${
            isAnimating 
              ? 'scale-100 opacity-100' 
              : 'scale-0 opacity-0'
          }`}
          style={{ 
            maxWidth: '340px',
            width: 'calc(100vw - 2rem)',
            transformOrigin: 'bottom right',
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-500 shadow-2xl rounded-2xl p-5 sm:p-6 relative backdrop-blur-sm">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all duration-200 hover:scale-110"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Warning Icon */}
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 sm:mb-2">
                  Important Notice
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Don't trust any other member or external contact. For genuine inquiries, please contact us through our official contact section only.
                </p>
              </div>
            </div>

            {/* Contact Button */}
            <button
              onClick={handleContactClick}
              className="w-full mt-3 sm:mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              Contact Us Officially
            </button>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/20 rounded-full blur-2xl -z-10" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-indigo-200/20 rounded-full blur-xl -z-10" />
          </div>
        </div>
      )}
    </>
  );
};

export default TrustWarningPopup;
