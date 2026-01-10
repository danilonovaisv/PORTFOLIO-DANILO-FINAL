import { useEffect, useState } from 'react';

export type QualityLevel = 'high' | 'medium' | 'low';

export interface PerformanceConfig {
  quality: QualityLevel;
  fireflyCount: number;
  particleCount: number;
  enablePostProcessing: boolean;
  pixelRatio: number;
}

export function usePerformanceAdaptive(): PerformanceConfig {
  const [quality, setQuality] = useState<QualityLevel>('high');

  useEffect(() => {
    // 1. Detectar dispositivo
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isLowEnd =
      navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    const hasLowMemory =
      'deviceMemory' in navigator && (navigator as any).deviceMemory < 4;

    if (isMobile || isLowEnd || hasLowMemory) {
      setQuality('low');
      return;
    }

    if (window.devicePixelRatio > 2) {
      setQuality('medium');
      return;
    }

    // 2. FPS Monitor
    let frames = 0;
    let lastTime = performance.now();
    let rafId: number;

    const checkFPS = () => {
      frames++;
      const now = performance.now();

      if (now >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (now - lastTime));

        // Downgrade se FPS < 30
        if (fps < 30 && quality !== 'low') {
          setQuality((prev) => (prev === 'high' ? 'medium' : 'low'));
        }

        frames = 0;
        lastTime = now;
      }

      rafId = requestAnimationFrame(checkFPS);
    };

    rafId = requestAnimationFrame(checkFPS);

    return () => cancelAnimationFrame(rafId);
  }, [quality]);

  // Configurações por nível
  const configs: Record<QualityLevel, PerformanceConfig> = {
    high: {
      quality: 'high',
      fireflyCount: 20,
      particleCount: 50,
      enablePostProcessing: true,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
    },
    medium: {
      quality: 'medium',
      fireflyCount: 10,
      particleCount: 25,
      enablePostProcessing: false,
      pixelRatio: 1,
    },
    low: {
      quality: 'low',
      fireflyCount: 5,
      particleCount: 10,
      enablePostProcessing: false,
      pixelRatio: 1,
    },
  };

  return configs[quality];
}
