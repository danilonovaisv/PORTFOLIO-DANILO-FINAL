// src/components/home/HomeHero.tsx
'use client';

import * as React from 'react';
import HeroPreloader from './HeroPreloader';
import HeroCopy from './HeroCopy';
import ManifestoThumb from './ManifestoThumb'; // Importa o novo thumbnail
import GhostStage from './GhostStage';

export default function HomeHero() {
  return (
    <>
      <HeroPreloader />
      <section
        id="hero"
        className="relative w-full h-screen md:h-[85vh] bg-[#06071f] overflow-hidden"
      >
        {/* WebGL Atmosfera - z-0 */}
        <div className="absolute inset-0 z-0">
          <GhostStage />
        </div>

        {/* Overlay Radial (opcional, z-10) */}
        <div
          className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,#0b0d3a_0%,#06071f_60%)] pointer-events-none"
          aria-hidden="true"
        />

        {/* Conteúdo editorial — z-20 */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-4 sm:px-6">
          <HeroCopy />
          <ManifestoThumb />{' '}
          {/* O thumbnail agora é um componente independente */}
        </div>
      </section>
    </>
  );
}
