'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import type { OriginSceneConfig } from '@/components/sobre/origin/data';
import { useMotionGate } from '@/hooks/useMotionGate';
import { cn } from '@/lib/utils';

interface OriginParallaxSceneProps {
  config: OriginSceneConfig;
  isActive: boolean;
  fallbackImage: string;
  priority?: boolean;
  className?: string;
}

const TWO_PI = Math.PI * 2;

/**
 * OriginParallaxScene
 * High-performance 4-layer parallax scene engine adhering to Ghost System & Apple Design principles.
 *
 * Performance & Resilience Contract:
 * - Recalculates all dimension metrics (width, height, maxSide, scaledSide, layer amplitudes)
 *   on window resize, orientation change and container ResizeObserver without triggering React re-renders.
 * - Single RAF loop per active scene.
 * - Auto-pauses immediately on document.hidden, out-of-viewport, reduced-motion, or when inactive.
 * - Smooth resumption on visibilitychange with no visual jumps.
 * - Zero querySelector DOM lookup for fallbacks: each layer handles error states independently.
 * - Full reduced-motion accessibility: stops all parallax transforms and uses gentle cross-fade.
 */
export function OriginParallaxScene({
  config,
  isActive,
  fallbackImage,
  priority = false,
  className = '',
}: OriginParallaxSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const amplitudesRef = useRef<number[]>([]);
  const prefersReducedMotion = useMotionGate();

  const [isInViewport, setIsInViewport] = useState(false);
  const [layersLoaded, setLayersLoaded] = useState<boolean[]>(() =>
    new Array(config.layers.length).fill(false)
  );
  const [hasLayerError, setHasLayerError] = useState(false);
  const [layerSources, setLayerSources] = useState<string[]>(() =>
    config.layers.map((l) => l.src)
  );

  // Sync layer sources if config changes
  useEffect(() => {
    setLayerSources(config.layers.map((l) => l.src));
    setLayersLoaded(new Array(config.layers.length).fill(false));
    setHasLayerError(false);
  }, [config.layers]);

  // Guard trackRefs array length
  trackRefs.current = trackRefs.current.slice(0, config.layers.length);

  // Monitor visibility in viewport to pause RAF when offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Recalculate dimension-dependent metrics (amplitudes, sides)
  const recalculateMetrics = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;
    const maxSide = Math.max(width, height);
    const scaledSide = maxSide * config.scale;

    amplitudesRef.current = config.layers.map(
      (layer) => scaledSide * layer.depth
    );
  }, [config.scale, config.layers]);

  // Dynamic Resize & Orientation Observer (P0 Fix)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    recalculateMetrics();

    let resizeRafId: number | null = null;
    const scheduleRecalculate = () => {
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        recalculateMetrics();
        resizeRafId = null;
      });
    };

    const resizeObserver = new ResizeObserver(scheduleRecalculate);
    resizeObserver.observe(container);

    window.addEventListener('resize', scheduleRecalculate, { passive: true });
    window.addEventListener('orientationchange', scheduleRecalculate, {
      passive: true,
    });

    return () => {
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', scheduleRecalculate);
      window.removeEventListener('orientationchange', scheduleRecalculate);
    };
  }, [recalculateMetrics]);

  const handleLayerLoad = useCallback((index: number) => {
    setLayersLoaded((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  // Safe fallback without any querySelector DOM lookups (P0 Fix)
  const handleLayerError = useCallback(
    (index: number) => {
      const layer = config.layers[index];
      setLayerSources((prev) => {
        const currentSrc = prev[index];
        // If remote URL failed, try the local fallbackUrl if available
        if (layer?.fallbackUrl && currentSrc !== layer.fallbackUrl) {
          const next = [...prev];
          next[index] = layer.fallbackUrl;
          return next;
        }
        // If fallbackUrl also failed or is unavailable, fallback to consolidated image
        setHasLayerError(true);
        return prev;
      });
    },
    [config.layers]
  );

  // Parallax RAF Loop (P0 Fix: Single loop per active scene, tab hidden pause & restart)
  useEffect(() => {
    const shouldAnimate =
      isActive && isInViewport && !prefersReducedMotion && !hasLayerError;

    if (!shouldAnimate) {
      // Reset layers to neutral transform when not animating
      trackRefs.current.forEach((track) => {
        if (track) {
          track.style.transform = 'translate3d(0px, 0px, 0px)';
        }
      });
      return;
    }

    let rafId: number | null = null;
    let startTimestamp: number | null = null;
    let isTabVisible = !document.hidden;

    const tick = (now: number) => {
      if (!isTabVisible) return;
      if (startTimestamp === null) {
        startTimestamp = now;
      }

      const elapsed = now - startTimestamp;
      const cycle = config.cycleMs || 6000;
      const phase = (elapsed % cycle) / cycle;

      // Wave calculation
      const waveVal =
        config.wave === 'cosine'
          ? Math.cos(phase * TWO_PI)
          : Math.sin(phase * TWO_PI);

      const secondaryWaveVal = Math.cos(phase * TWO_PI);
      const amps = amplitudesRef.current;

      for (let i = 0; i < config.layers.length; i++) {
        const track = trackRefs.current[i];
        if (!track) continue;

        const amp = amps[i] ?? 0;
        const x = Math.round(amp * waveVal * 100) / 100;
        const y =
          config.motionMode === 'diagonal' && config.verticalRatio > 0
            ? Math.round(amp * config.verticalRatio * secondaryWaveVal * 100) /
              100
            : 0;

        track.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (!isTabVisible) {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      } else {
        if (rafId === null) {
          // Restart smoothly without frame jump
          startTimestamp = null;
          rafId = requestAnimationFrame(tick);
        }
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [
    isActive,
    isInViewport,
    prefersReducedMotion,
    hasLayerError,
    config.cycleMs,
    config.wave,
    config.motionMode,
    config.verticalRatio,
    config.layers.length,
  ]);

  const allLayersReady = layersLoaded.every(Boolean);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={config.description || `Composição visual ${config.name}`}
      className={cn(
        'relative w-full h-full overflow-hidden select-none pointer-events-none rounded-[1.5rem]',
        className
      )}
    >
      {/* Consolidated Fallback Image (shown if any layer fails or while loading) */}
      <div
        className={cn(
          'absolute inset-0 w-full h-full transition-opacity duration-500 ease-out z-[1]',
          hasLayerError || !allLayersReady ? 'opacity-100' : 'opacity-0'
        )}
      >
        <Image
          src={fallbackImage}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 1024px) 92vw, 40vw"
          preload={priority}
          loading={priority ? 'eager' : 'lazy'}
          className="object-cover rounded-[1.5rem]"
        />
      </div>

      {/* 4 Multi-depth Parallax Layers */}
      {!hasLayerError && (
        <div
          className={cn(
            'absolute inset-0 w-full h-full z-[2] transition-opacity duration-500 ease-out',
            allLayersReady ? 'opacity-100' : 'opacity-0'
          )}
        >
          {config.layers.map((layer, index) => (
            <div
              key={index}
              ref={(el) => {
                trackRefs.current[index] = el;
              }}
              className="absolute inset-0 w-full h-full will-change-transform backface-hidden"
              style={{
                transform: 'translate3d(0px, 0px, 0px)',
              }}
            >
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: `scale(${config.scale})`,
                  transformOrigin: 'center center',
                }}
              >
                <Image
                  src={layerSources[index] || layer.src}
                  alt=""
                  aria-hidden="true"
                  fill
                  preload={priority && index <= 1}
                  loading={priority && index <= 1 ? 'eager' : 'lazy'}
                  sizes="(max-width: 1024px) 92vw, 40vw"
                  onLoad={() => handleLayerLoad(index)}
                  onError={() => handleLayerError(index)}
                  className="object-cover pointer-events-none user-select-none"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
