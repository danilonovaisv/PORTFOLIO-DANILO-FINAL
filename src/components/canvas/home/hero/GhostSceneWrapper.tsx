'use client';

import dynamic from 'next/dynamic';

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
}: {
  onReady?: () => void;
}) {
  const is3DDisabled = process.env.NEXT_PUBLIC_DISABLE_3D === 'true';

  if (is3DDisabled) {
    return (
      <div className="absolute inset-0 w-full h-full bg-zinc-900 border-dashed border-2 border-zinc-700" />
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full" aria-hidden="true" role="presentation">
      <GhostScene onReady={onReady} />
    </div>
  );
}
