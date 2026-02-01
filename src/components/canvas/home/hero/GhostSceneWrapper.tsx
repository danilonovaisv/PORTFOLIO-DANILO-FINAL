import dynamic from 'next/dynamic';

const GhostCanvas = dynamic(
  () => import('@/components/canvas/home/hero/GhostCanvas'),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-background" />,
  }
);

export default function GhostSceneWrapper() {
  return <GhostCanvas />;
}
