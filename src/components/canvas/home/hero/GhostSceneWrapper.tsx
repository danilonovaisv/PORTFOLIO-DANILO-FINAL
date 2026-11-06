'use client';

import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';

const GhostScene = dynamic(
  () => import('@/components/canvas/home/hero/GhostScene'),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 w-full h-full bg-background" />
    ),
  }
);

export default function GhostSceneWrapper({
  onReady,
  ghostRef,
}: {
  onReady?: () => void;
  ghostRef?:
    | React.RefObject<THREE.Group | null>
    | React.MutableRefObject<THREE.Group | null>;
}) {
  const is3DDisabled = process.env.NEXT_PUBLIC_DISABLE_3D === 'true';
  const supportsWebGL = useWebGLSupport();

  if (is3DDisabled || !supportsWebGL) {
    return (
      <div
        className="absolute inset-0 w-full h-full bg-background"
        aria-hidden="true"
        role="presentation"
      />
    );
  }

  return (
    <div
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      role="presentation"
    >
      <GhostScene onReady={onReady} ghostRef={ghostRef} />
    </div>
  );
}
