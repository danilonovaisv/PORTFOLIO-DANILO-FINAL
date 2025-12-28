'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

type GhostStageProps = {
  enabled?: boolean;
};

const GhostCanvas = dynamic(
  () => import('@/components/home/webgl/GhostCanvas'),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-ghost-bg" aria-hidden />,
  }
);

export default function GhostStage({ enabled = true }: GhostStageProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [supportsWebGL, setSupportsWebGL] = useState(true);

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

  if (!enabled || !supportsWebGL) {
    return (
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-ghost-abyss)_0%,var(--color-ghost-void)_65%)]"
        aria-hidden
      />
    );
  }

  return (
    <div ref={parentRef} className="absolute inset-0 pointer-events-none">
      {/* Use wrapper div as event source */}
      <GhostCanvas eventSource={parentRef as React.RefObject<HTMLElement>} />
    </div>
  );
}
