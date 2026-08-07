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
    <div className="relative">
      {/* Horizontal Progress Line */}
      <div className="relative mb-20">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 rounded-full -translate-y-1/2" />
        
        {/* Active Progress Line */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full -translate-y-1/2 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isActive = activeSteps.has(step.step);
            const isCompleted = progress >= ((index + 1) / steps.length) * 100;
            
            return (
              <div 
                key={step.step} 
                className="flex flex-col items-center"
                style={{ width: `${100 / steps.length}%` }}
              >
                {/* Step Circle with Icon */}
                <div className="relative mb-6">
                  {/* Outer Ring */}
                  <div 
                    className={`
                      w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500
                      ${isActive || isCompleted
                        ? 'bg-blue-600 shadow-lg shadow-blue-500/30 scale-110' 
                        : 'bg-white border-2 border-slate-200'
                      }
                    `}
                  >
                    {/* Icon */}
                    <div 
                      className={`
                        transition-all duration-500
                        ${isActive || isCompleted ? 'text-white scale-110' : 'text-slate-400'}
                      `}
                    >
                      {step.icon}
                    </div>
                  </div>

                  {/* Step Number Badge */}
                  <div 
                    className={`
                      absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500
                      ${isCompleted
                        ? 'bg-green-500 text-white' 
                        : isActive
                        ? 'bg-blue-600 text-white animate-pulse'
                        : 'bg-slate-300 text-slate-600'
                      }
                    `}
                  >
                    {isCompleted ? '✓' : step.step}
                  </div>

                  {/* Glow Effect for Active Step */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-blue-400 opacity-20 animate-ping" />
                  )}
                </div>

                {/* Step Content */}
                <div className="text-center max-w-[200px]">
                  <h3 
                    className={`
                      font-sf-pro text-lg font-semibold mb-2 transition-all duration-500
                      ${isActive || isCompleted ? 'text-blue-600' : 'text-slate-500'}
                    `}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className={`
                      font-inter text-sm leading-relaxed transition-all duration-500
                      ${isActive || isCompleted ? 'text-slate-600' : 'text-slate-400'}
                    `}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;