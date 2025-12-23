// src/components/home/HomeHero.tsx
import GhostStage from './GhostStage';

export default function HomeHero() {
  return (
    <section className="relative w-full h-full bg-[#050505] overflow-hidden">
      {/* WebGL Atmosfera */}
      <GhostStage />

      {/* Overlay Radial (opcional, z-10) */}
      <div
        className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#050505_60%)] pointer-events-none opacity-50"
        aria-hidden="true"
      />
    </section>
  );
}
