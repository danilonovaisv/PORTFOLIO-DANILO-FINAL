'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';

import type { FeaturedProjectBackgroundVariant } from '@/components/home/featured-projects/animated-backgrounds';

const Grainient = dynamic(() => import('@/components/Grainient'), {
  ssr: false,
});
const GhostCursor = dynamic(() => import('@/components/GhostCursor'), {
  ssr: false,
});
// Aurora was removed as per cleanup audit


type FeaturedProjectAnimatedBackgroundProps = {
  variant: FeaturedProjectBackgroundVariant;
  className?: string;
};

const SURFACE_BY_VARIANT: Record<FeaturedProjectBackgroundVariant, string> = {
  grainient:
    'bg-[linear-gradient(145deg,rgba(4,0,19,1)_0%,rgba(135,5,242,0.62)_45%,rgba(0,72,255,0.9)_100%)]',
  ghost:
    'bg-[radial-gradient(circle_at_50%_44%,rgba(135,5,242,0.24),transparent_34%),radial-gradient(circle_at_50%_55%,rgba(79,230,255,0.16),transparent_62%),linear-gradient(160deg,rgba(4,0,19,1)_0%,rgba(11,13,58,1)_100%)]',
  aurora:
    'bg-[linear-gradient(180deg,rgba(4,0,19,0.94)_0%,rgba(0,72,255,0.62)_48%,rgba(135,5,242,0.72)_100%)]',
};

function useAnimatedBackgroundVisibility(disabled: boolean) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  useEffect(() => {
    if (disabled) {
      setIsInView(false);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.08);
      },
      { threshold: [0, 0.08, 0.2] }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [disabled]);

  useEffect(() => {
    if (disabled) {
      setIsDocumentVisible(false);
      return;
    }

    const handleVisibilityChange = () => {
      setIsDocumentVisible(!document.hidden);
    };

    handleVisibilityChange();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [disabled]);

  return {
    containerRef,
    shouldAnimate: !disabled && isInView && isDocumentVisible,
  };
}

export default function FeaturedProjectAnimatedBackground({
  variant,
  className,
}: FeaturedProjectAnimatedBackgroundProps) {
  const reducedMotion = useReducedMotion();
  const supportsWebGL = useWebGLSupport();
  const supportsFinePointer = useMediaQuery(
    '(hover: hover) and (pointer: fine)'
  );
  const { containerRef, shouldAnimate } = useAnimatedBackgroundVisibility(
    reducedMotion || !supportsWebGL || !supportsFinePointer
  );

  const surface = SURFACE_BY_VARIANT[variant];

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        'absolute inset-0 overflow-hidden pointer-events-none',
        className
      )}
    >
      <div className={cn('absolute inset-0', surface)} />
      {shouldAnimate ? (
        <div className="absolute inset-0 h-full w-full opacity-90">
          {variant === 'grainient' ? (
            <Grainient
              className="h-full w-full"
              maxDevicePixelRatio={1.25}
              color1="#0048ff"
              color2="#8705f2"
              color3="#9bc5fd"
              timeSpeed={2.5}
              colorBalance={0.18}
              warpStrength={1}
              warpFrequency={5}
              warpSpeed={2}
              warpAmplitude={50}
              blendAngle={0}
              blendSoftness={0.05}
              rotationAmount={500}
              noiseScale={2}
              grainAmount={0.1}
              grainScale={2}
              grainAnimated={false}
              contrast={1.5}
              gamma={1}
              saturation={1}
              centerX={0}
              centerY={0}
              zoom={0.9}
            />
          ) : null}

          {variant === 'ghost' ? (
            <div className="relative h-full w-full overflow-hidden">
              <GhostCursor
                className="absolute inset-0 h-full w-full"
                color="#8705f2"
                brightness={2}
                edgeIntensity={0}
                trailLength={50}
                inertia={0.5}
                grainIntensity={0.05}
                bloomStrength={0.1}
                bloomRadius={1}
                bloomThreshold={0.025}
                fadeDelayMs={1000}
                fadeDurationMs={1500}
                maxDevicePixelRatio={0.65}
                targetPixels={180000}
              />
            </div>
          ) : null}

          {/* Aurora variant fallback to surface gradient since Aurora component was removed */}
          {variant === 'aurora' ? null : null}
        </div>
      ) : null}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(135,5,242,0.12),transparent_70%)] opacity-70" />
    </div>
  );
}
