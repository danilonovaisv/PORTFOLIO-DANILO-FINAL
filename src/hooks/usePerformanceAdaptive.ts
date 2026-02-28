import { useEffect, useState } from 'react';

type QualityLevel = 'high' | 'medium' | 'low';

export interface PerformanceConfig {
  quality: QualityLevel;
  fireflyCount: number;
  particleCount: number;
  enablePostProcessing: boolean;
  pixelRatio: number;
}

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

export function usePerformanceAdaptive(): PerformanceConfig {
  const [quality, setQuality] = useState<QualityLevel>('high');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const nav = navigator as NavigatorWithMemory;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(nav.userAgent);
    const isLowEnd = nav.hardwareConcurrency && nav.hardwareConcurrency <= 4;
    const hasLowMemory = nav.deviceMemory && nav.deviceMemory < 4;

    if (isMobile || isLowEnd || hasLowMemory) {
      setQuality('low');
      return;
    }

    if (window.devicePixelRatio > 2) {
      setQuality('medium');
      return;
    }

    let frames = 0;
    let lastTime = performance.now();
    let rafId: number;
    let isMounted = true;

    const checkFPS = () => {
      frames++;
      const now = performance.now();

      if (now >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (now - lastTime));
        if (fps < 30 && isMounted) {
          setQuality((prev) => (prev === 'low' ? 'low' : 'medium'));
        }
        frames = 0;
        lastTime = now;
      }
      rafId = requestAnimationFrame(checkFPS);
    };

    rafId = requestAnimationFrame(checkFPS);
    return () => {
      isMounted = false;
      cancelAnimationFrame(rafId);
    };
  }, []);

  const configs: Record<QualityLevel, PerformanceConfig> = {
    high: {
      quality: 'high',
      fireflyCount: 20,
      particleCount: 50,
      enablePostProcessing: true,
      pixelRatio:
        typeof window !== 'undefined'
          ? Math.min(window.devicePixelRatio, 2)
          : 1,
    },
    medium: {
      quality: 'medium',
      fireflyCount: 12,
      particleCount: 25,
      enablePostProcessing: false,
      pixelRatio: 1.5,
    },
    low: {
      quality: 'low',
      fireflyCount: 6,
      particleCount: 10,
      enablePostProcessing: false,
      pixelRatio: 1,
    },
  };

  return configs[quality];
}
