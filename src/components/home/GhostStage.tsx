'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

type GhostStageProps = {
  enabled?: boolean;
};

const FallbackGradient = () => {
  const layers = useMemo(
    () => [
      'radial-gradient(circle at 30% 52%, rgba(0, 119, 255, 0.85) 0%, rgba(0, 119, 255, 0.6) 18%, rgba(22, 28, 67, 0.45) 36%, rgba(6, 7, 31, 0.82) 58%, #04061a 72%)',
      'radial-gradient(circle at 32% 52%, rgba(38, 159, 255, 0.35) 0%, rgba(8, 13, 46, 0.4) 32%, rgba(3, 4, 17, 0.75) 60%, #030414 88%)',
    ],
    []
  );

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ backgroundImage: layers.join(', ') }}
      aria-hidden
    />
  );
};

const GhostCanvas = dynamic(
  () => import('@/components/home/webgl/GhostCanvas'),
  {
    ssr: false,
    loading: () => <FallbackGradient />,
  }
);

export default function GhostStage({ enabled = true }: GhostStageProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [supportsWebGL, setSupportsWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setSupportsWebGL(!!(window.WebGLRenderingContext && gl));
    } catch {
      setSupportsWebGL(false);
    }
  }, []);

  const shouldRenderCanvas = enabled && !!supportsWebGL;

  return (
    <div ref={parentRef} className="absolute inset-0 pointer-events-none">
      {shouldRenderCanvas ? (
        <GhostCanvas eventSource={parentRef as React.RefObject<HTMLElement>} />
      ) : (
        <FallbackGradient />
      )}
    </div>
  );
}
