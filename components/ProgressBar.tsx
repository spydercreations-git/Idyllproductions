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

// Orange palette
const ORANGE_GRAD = 'linear-gradient(135deg, #FFB86A 0%, #FF7A3A 40%, #F06A00 70%, #FF6B4A 100%)';
const ORANGE_GLOW = 'rgba(255, 122, 58, 0.25)';

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, progress, activeSteps }) => {
  return (
    <div className="relative">
      {/* Horizontal Progress Line */}
      <div className="relative mb-20">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 rounded-full -translate-y-1/2" />
        
        {/* Active Progress Line — orange gradient */}
        <div 
          className="absolute top-1/2 left-0 h-1 rounded-full -translate-y-1/2 transition-all duration-700 ease-out"
          style={{ width: `${progress}%`, background: ORANGE_GRAD }}
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
                    className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500"
                    style={
                      isActive || isCompleted
                        ? {
                            background: ORANGE_GRAD,
                            boxShadow: `0 8px 24px ${ORANGE_GLOW}`,
                            transform: 'scale(1.1)'
                          }
                        : {
                            background: '#ffffff',
                            border: '2px solid #e2e8f0'
                          }
                    }
                  >
                    {/* Icon */}
                    <div 
                      className="transition-all duration-500"
                      style={{
                        filter: isActive || isCompleted ? 'brightness(10)' : 'none',
                        transform: isActive || isCompleted ? 'scale(1.1)' : 'scale(1)'
                      }}
                    >
                      {step.icon}
                    </div>
                  </div>

                  {/* Step Number Badge */}
                  <div 
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 text-white"
                    style={{
                      background: isCompleted
                        ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                        : isActive
                        ? ORANGE_GRAD
                        : '#94a3b8',
                      animation: isActive && !isCompleted ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'
                    }}
                  >
                    {isCompleted ? '✓' : step.step}
                  </div>

                  {/* Glow Effect for Active Step */}
                  {isActive && (
                    <div 
                      className="absolute inset-0 rounded-full opacity-20 animate-ping"
                      style={{ background: '#FF7A3A' }}
                    />
                  )}
                </div>

                {/* Step Content */}
                <div className="text-center max-w-[200px]">
                  <h3 
                    className="font-sf-pro text-lg font-semibold mb-2 transition-all duration-500"
                    style={{
                      color: isActive || isCompleted ? '#F06A00' : '#94a3b8',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="font-inter text-sm leading-relaxed transition-all duration-500"
                    style={{ color: isActive || isCompleted ? '#475569' : '#94a3b8' }}
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