'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';

import type { FeaturedProjectBackgroundVariant } from '@/components/home/featured-projects/animated-backgrounds';

const Grainient = dynamic(() => import('@/components/Grainient'), {
  ssr: false,
});
const GhostCursor = dynamic(() => import('@/components/GhostCursor'), {
  ssr: false,
});
const Aurora = dynamic(() => import('@/components/Aurora'), {
  ssr: false,
});

type FeaturedProjectAnimatedBackgroundProps = {
  variant: FeaturedProjectBackgroundVariant;
  className?: string;
};

const FALLBACK_SURFACES: Record<FeaturedProjectBackgroundVariant, string> = {
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
  const reducedMotion = usePrefersReducedMotion();
  const supportsWebGL = useWebGLSupport();
  const { containerRef, shouldAnimate } = useAnimatedBackgroundVisibility(
    reducedMotion || !supportsWebGL
  );

  const surface = FALLBACK_SURFACES[variant];

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
        <div className="absolute inset-0 opacity-90">
          {variant === 'grainient' ? (
            <Grainient
              className="h-full w-full"
              maxDevicePixelRatio={1.25}
              color1="#8705f2"
              color2="#0048ff"
              color3="#4fe6ff"
              grainAmount={0.055}
              contrast={1.2}
              zoom={0.95}
            />
          ) : null}

          {variant === 'ghost' ? (
            <GhostCursor
              className="absolute inset-0"
              color="#8705f2"
              brightness={1.05}
              edgeIntensity={0.18}
              bloomStrength={0.22}
              bloomRadius={0.9}
              bloomThreshold={0.02}
              grainIntensity={0.03}
              maxDevicePixelRatio={0.65}
              targetPixels={180000}
            />
          ) : null}

          {variant === 'aurora' ? (
            <Aurora
              className="h-full w-full"
              maxDevicePixelRatio={1.1}
              colorStops={['#0048ff', '#4fe6ff', '#8705f2']}
              amplitude={0.9}
              blend={0.36}
              speed={0.85}
            />
          ) : null}
        </div>
      ) : null}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(135,5,242,0.12),transparent_70%)] opacity-70" />
    </div>
  );
}
