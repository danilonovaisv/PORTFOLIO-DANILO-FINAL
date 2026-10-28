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
 * High-performance 4-layer parallax scene engine.
 *
 * Performance Contract:
 * - Single RAF loop per active scene.
 * - Auto-pauses on document.hidden, out-of-viewport, or reduced-motion.
 * - Direct DOM manipulation on transforms (ZERO React re-renders during 60FPS animation).
 * - Safe overscan (scale 1.12x - 1.16x) prevents border exposure.
 * - Graceful fallback to consolidated image if any remote layer fails.
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
  const prefersReducedMotion = useMotionGate();

  const [isInViewport, setIsInViewport] = useState(false);
  const [layersLoaded, setLayersLoaded] = useState<boolean[]>(() =>
    new Array(config.layers.length).fill(false)
  );
  const [hasLayerError, setHasLayerError] = useState(false);

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

  const handleLayerLoad = useCallback((index: number) => {
    setLayersLoaded((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  const handleLayerError = useCallback(() => {
    // If a layer fails to load, gracefully fall back to single consolidated image
    setHasLayerError(true);
  }, []);

  // Parallax RAF Loop
  useEffect(() => {
    // Only animate if scene is active, in viewport, and user allows motion
    const shouldAnimate =
      isActive && isInViewport && !prefersReducedMotion && !hasLayerError;

    if (!shouldAnimate) {
      // Reset layers to neutral position
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

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (!isTabVisible && rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
        startTimestamp = null;
      } else if (isTabVisible && rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    const container = containerRef.current;
    let containerWidth = container?.clientWidth || 500;
    let containerHeight = container?.clientHeight || 500;
    const maxSide = Math.max(containerWidth, containerHeight);
    const scaledSide = maxSide * config.scale;

    // Precalculate amplitude per layer
    const amplitudes = config.layers.map((layer) => scaledSide * layer.depth);

    const onResize = () => {
      if (!container) return;
      containerWidth = container.clientWidth;
      containerHeight = container.clientHeight;
    };
    window.addEventListener('resize', onResize);

    const tick = (now: number) => {
      if (!isTabVisible) return;
      if (startTimestamp === null) {
        startTimestamp = now;
      }

      const elapsed = now - startTimestamp;
      const cycle = config.cycleMs || 4000;
      const phase = (elapsed % cycle) / cycle;

      // Wave calculation
      const waveVal =
        config.wave === 'cosine'
          ? Math.cos(phase * TWO_PI)
          : Math.sin(phase * TWO_PI);

      const secondaryWaveVal = Math.cos(phase * TWO_PI);

      for (let i = 0; i < config.layers.length; i++) {
        const track = trackRefs.current[i];
        if (!track) continue;

        const amp = amplitudes[i] || 0;
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

    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', onResize);
    };
  }, [
    isActive,
    isInViewport,
    prefersReducedMotion,
    hasLayerError,
    config.cycleMs,
    config.scale,
    config.wave,
    config.motionMode,
    config.verticalRatio,
    config.layers,
  ]);

  const allLayersReady = layersLoaded.every(Boolean);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={`Composição visual ${config.name}`}
      className={cn(
        'relative w-full h-full overflow-hidden select-none pointer-events-none rounded-[1.5rem]',
        className
      )}
    >
      {/* Consolidated Fallback Image (shown if any layer fails or while loading) */}
      <div
        className={cn(
          'absolute inset-0 w-full h-full transition-opacity duration-700 ease-out z-[1]',
          hasLayerError || !allLayersReady ? 'opacity-100' : 'opacity-0'
        )}
      >
        <Image
          src={fallbackImage}
          alt={`Composição visual consolidada ${config.name}`}
          fill
          sizes="(max-width: 1024px) 92vw, 40vw"
          priority={priority}
          className="object-cover rounded-[1.5rem]"
        />
      </div>

      {/* 4 Multi-depth Parallax Layers */}
      {!hasLayerError && (
        <div
          className={cn(
            'absolute inset-0 w-full h-full z-[2] transition-opacity duration-700 ease-out',
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
                  src={layer.src}
                  alt=""
                  aria-hidden="true"
                  fill
                  priority={priority && index <= 1}
                  sizes="(max-width: 1024px) 92vw, 40vw"
                  onLoad={() => handleLayerLoad(index)}
                  onError={() => {
                    // Try local fallback if remote failed
                    const img =
                      containerRef.current?.querySelectorAll('img')[index];
                    if (
                      img &&
                      layer.fallbackUrl &&
                      img.src !== layer.fallbackUrl
                    ) {
                      img.src = layer.fallbackUrl;
                    } else {
                      handleLayerError();
                    }
                  }}
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
