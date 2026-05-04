import { useRef, useCallback, useState } from 'react';

export function usePreloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  const updateProgress = useCallback((step: number) => {
    const loadingSteps = Math.min(step, 5);
    const percentage = (loadingSteps / 5) * 100;
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${percentage}%`;
    }
  }, []);

  const complete = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (isComplete) return;
      setIsComplete(true);
      updateProgress(5);

      setTimeout(() => {
        if (preloaderRef.current) {
          preloaderRef.current.classList.add('fade-out');
        }
        canvas.classList.add('fade-in');

        setTimeout(() => {
          if (preloaderRef.current) {
            preloaderRef.current.style.display = 'none';
          }
        }, 1000);
      }, 1500);
    },
    [isComplete, updateProgress]
  );

  return {
    preloaderRef,
    progressBarRef,
    updateProgress,
    complete,
    isComplete,
  };
}
