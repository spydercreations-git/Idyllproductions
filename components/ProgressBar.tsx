import React from 'react';

interface ProgressBarProps {
  steps: Array<{
    step: number;
    title: string;
    desc: string;
    color: string;
    icon: React.ReactNode;
  }>;
  progress: number;
  activeSteps: Set<number>;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, progress, activeSteps }) => {
  return (
    <div 
      className="relative" 
      style={{ 
        pointerEvents: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
    >
      {/* Progress Line - GPU Accelerated */}
      <div 
        className="absolute top-10 left-0 right-0 h-2 bg-slate-200 rounded-full overflow-hidden" 
        style={{ 
          pointerEvents: 'none',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)'
        }}
      >
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full origin-left"
          style={{ 
            transform: `scaleX(${progress / 100})`,
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: 'none',
            willChange: 'transform',
            backfaceVisibility: 'hidden'
          }}
        />
      </div>

      {/* Steps */}
      <div 
        className="relative flex justify-between" 
        style={{ 
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        {steps.map((step) => {
          const isActive = activeSteps.has(step.step);
          
          return (
            <div 
              key={step.step} 
              className="flex flex-col items-center text-center max-w-xs"
              style={{ 
                pointerEvents: 'none',
                userSelect: 'none',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)'
              }}
            >
              {/* Step Circle */}
              <div 
                className={`
                  relative w-20 h-20 rounded-full border-4 mb-4 transition-all duration-500 ease-out
                  ${isActive 
                    ? 'border-blue-600 bg-blue-100 shadow-lg scale-105' 
                    : 'border-slate-200 bg-slate-50'
                  }
                `}
                style={{ 
                  pointerEvents: 'none',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  transform: `translateZ(0) ${isActive ? 'scale(1.05)' : 'scale(1)'}`
                }}
              >
                {/* Step Number */}
                <div 
                  className={`
                    absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ease-out
                    ${isActive 
                      ? 'bg-blue-600 text-white scale-110' 
                      : 'bg-slate-300 text-slate-500 scale-90'
                    }
                  `}
                  style={{ 
                    pointerEvents: 'none',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {isActive ? '✓' : step.step}
                </div>

                {/* Icon */}
                <div 
                  className={`
                    w-full h-full flex items-center justify-center transition-all duration-500 ease-out
                    ${isActive 
                      ? 'text-blue-700 scale-110' 
                      : 'text-slate-400'
                    }
                  `}
                  style={{ 
                    pointerEvents: 'none',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {step.icon}
                </div>

                {/* Blue Glow Effect */}
                {isActive && (
                  <div 
                    className="absolute inset-0 rounded-full bg-blue-200 opacity-30 animate-pulse" 
                    style={{ 
                      pointerEvents: 'none',
                      willChange: 'opacity',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                )}
              </div>

              {/* Step Content */}
              <div 
                className="space-y-2" 
                style={{ 
                  pointerEvents: 'none',
                  userSelect: 'none'
                }}
              >
                <h3 
                  className={`
                    font-sf-pro text-lg font-semibold transition-all duration-500 ease-out
                    ${isActive ? 'text-blue-800' : 'text-slate-400'}
                  `}
                  style={{ 
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                >
                  {step.title}
                </h3>
                <p 
                  className={`
                    font-inter text-sm leading-relaxed transition-all duration-500 ease-out
                    ${isActive ? 'text-blue-600' : 'text-slate-400'}
                  `}
                  style={{ 
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;