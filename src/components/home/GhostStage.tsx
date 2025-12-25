'use client';

import dynamic from 'next/dynamic';

type GhostStageProps = {
  enabled?: boolean;
};

const GhostCanvas = dynamic(
  () => import('@/components/home/webgl/GhostCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[#050505]" aria-hidden />
    ),
  }
);

export default function GhostStage({ enabled = true }: GhostStageProps) {
  if (!enabled) {
    return (
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0b0d3a_0%,#06071f_65%)]"
        aria-hidden
      />
    );
  }

  return <GhostCanvas />;
}
