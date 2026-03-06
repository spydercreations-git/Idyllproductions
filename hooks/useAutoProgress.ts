import { useState, useEffect } from 'react';

export const useAutoProgress = (totalSteps: number, intervalMs: number = 3000) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    let stepTimer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    const startStepCycle = () => {
      // Reset to step 1 and start progress
      setCurrentStep(1);
      setProgress(0);

      // Total duration includes extra time to complete the line to 100%
      const totalDuration = (totalSteps + 1) * intervalMs; // Add extra interval for completion
      const progressIncrement = 100 / (totalDuration / 50); // Update every 50ms

      progressTimer = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + progressIncrement;
          if (newProgress >= 100) {
            clearInterval(progressTimer);
            return 100;
          }
          return newProgress;
        });
      }, 50);

      // Update steps at intervals
      let stepCount = 1;
      stepTimer = setInterval(() => {
        stepCount++;
        if (stepCount <= totalSteps) {
          setCurrentStep(stepCount);
        } else {
          // Clear step timer but let progress continue to 100%
          clearInterval(stepTimer);
          // Reset after progress completes
          setTimeout(() => {
            clearInterval(progressTimer);
            setTimeout(startStepCycle, 1000); // 1 second pause before restart
          }, intervalMs * 1.5); // Extra time for line to complete
        }
      }, intervalMs);
    };

    startStepCycle();

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
    };
  }, [totalSteps, intervalMs, isPlaying]);

  const goToStep = (step: number) => {
    setCurrentStep(step);
    setIsPlaying(false);
    // Resume auto-progress after 5 seconds
    setTimeout(() => setIsPlaying(true), 5000);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return {
    currentStep,
    progress,
    isPlaying,
    goToStep,
    togglePlayPause
  };
};