import React, { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Send, Globe } from 'lucide-react';
import { getChatResponse } from '../api/chat';

interface Message {
  text: string;
  isBot: boolean;
  showButton?: boolean;
  showContactLinks?: boolean;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            text: "Hi! I'm here to help you learn about Idyll Productions. Ask me anything!",
            isBot: true
          }
        ]);
      }, 300);
    }
  }, [isOpen, messages.length]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const suggestionChips = [
    "What services do you offer?",
    "Tell me about your team",
    "How does your process work?",
    "What are your prices?",
    "How can I contact you?"
  ];

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      text: messageText,
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(messageText);
      
      // Check if response suggests contacting or has contact info
      const shouldShowButton = /contact|hire|start|project|get started|pricing|price|payment|cost/i.test(response);
      const hasContactInfo = /whatsapp|discord|instagram|twitter|email|calendly/i.test(response.toLowerCase());
      
      const botResponse: Message = {
        text: response,
        isBot: true,
        showButton: shouldShowButton && !hasContactInfo,
        showContactLinks: hasContactInfo
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      setMessages(prev => [...prev, {
        text: "Sorry, I encountered an error. Please try again or contact us directly.",
        isBot: true,
        showButton: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    handleSendMessage(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleContactClick = () => {
    handleClose();
    setTimeout(() => {
      document.getElementById('contact-us')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 300);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-[#111111] hover:bg-[#222222] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
          aria-label="Open chatbot"
        >
          <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div 
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200/50"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.03) 0%, rgba(247, 147, 30, 0.03) 25%, rgba(255, 105, 180, 0.03) 50%, rgba(218, 112, 214, 0.03) 75%, rgba(147, 112, 219, 0.03) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}
          onWheel={(e) => {
            e.stopPropagation();
          }}
          onMouseEnter={() => {
            document.body.style.overflow = 'hidden';
          }}
          onMouseLeave={() => {
            document.body.style.overflow = 'auto';
          }}
        >
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-slate-200/50"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#111111] rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Idyll Assistant</h3>
                <p className="text-xs text-slate-500">Always here to help</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors text-slate-600"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
            style={{
              background: 'rgba(248, 250, 252, 0.5)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
          >
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.isBot 
                    ? 'bg-white text-slate-800 border border-slate-200' 
                    : 'bg-blue-600 text-white'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  
                  {message.showContactLinks && (
                    <div className="mt-3 space-y-2">
                      <a
                        href="https://wa.me/919373032009?text=Hi%20Idyll%20Productions,%20I%20want%20to%20discuss%20a%20video%20project"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 w-full px-3 py-2 bg-white hover:bg-blue-50 border border-blue-200 text-slate-700 rounded-lg text-sm font-medium transition-all duration-200"
                      >
                        <MessageCircle className="w-4 h-4 text-blue-600" />
                        WhatsApp (Harsh)
                      </a>
                      <a
                        href="https://discord.com/users/1466675809568817246"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 w-full px-3 py-2 bg-white hover:bg-blue-50 border border-blue-200 text-slate-700 rounded-lg text-sm font-medium transition-all duration-200"
                      >
                        <MessageCircle className="w-4 h-4 text-blue-600" />
                        Discord (Harsh)
                      </a>
                      <a
                        href="https://www.instagram.com/idyllproductionsofficial/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 w-full px-3 py-2 bg-white hover:bg-blue-50 border border-blue-200 text-slate-700 rounded-lg text-sm font-medium transition-all duration-200"
                      >
                        <Globe className="w-4 h-4 text-blue-600" />
                        Instagram
                      </a>
                      <a
                        href="https://x.com/madebyidyll"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 w-full px-3 py-2 bg-white hover:bg-blue-50 border border-blue-200 text-slate-700 rounded-lg text-sm font-medium transition-all duration-200"
                      >
                        <Globe className="w-4 h-4 text-blue-600" />
                        Twitter/X
                      </a>
                      <a
                        href="https://calendly.com/smitaidyllproductions/talk-with-idyll-productions-csm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 w-full px-3 py-2 bg-white hover:bg-blue-50 border border-blue-200 text-slate-700 rounded-lg text-sm font-medium transition-all duration-200"
                      >
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Book a Call
                      </a>
                      <div className="pt-2 border-t border-slate-200 mt-3">
                        <p className="text-xs text-slate-600 mb-2 font-medium">Email:</p>
                        <a href="mailto:contact@idyllproductions.com" className="block text-xs text-blue-600 hover:underline mb-1">
                          contact@idyllproductions.com
                        </a>
                        <a href="mailto:smita@idyllproductions.com" className="block text-xs text-blue-600 hover:underline mb-1">
                          smita@idyllproductions.com
                        </a>
                        <a href="mailto:harsh@idyllproductions.com" className="block text-xs text-blue-600 hover:underline">
                          harsh@idyllproductions.com
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {message.showButton && (
                    <button
                      onClick={handleContactClick}
                      className="mt-3 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all duration-300"
                    >
                      Contact Us →
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {/* Suggestion Chips - Only show when no messages yet */}
            {messages.length === 1 && !isLoading && (
              <div className="flex flex-wrap gap-2 mt-4">
                {suggestionChips.map((chip, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(chip)}
                    className="px-3 py-2 bg-white border border-slate-300 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-600 rounded-full text-xs font-medium transition-all duration-200"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200/50"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-slate-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(226, 232, 240, 0.3);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.5);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.7);
        }
        
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(148, 163, 184, 0.5) rgba(226, 232, 240, 0.3);
        }
      `}</style>
    </>
  );
};

export default Chatbot;
