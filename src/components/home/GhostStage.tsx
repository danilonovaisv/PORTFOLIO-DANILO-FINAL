'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import styles from './GhostStage.module.css';

type GhostStageProps = {
  enabled?: boolean;
};

const FallbackGradient = () => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${styles.fallbackGradient}`}
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
