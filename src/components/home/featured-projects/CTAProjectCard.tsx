'use client';

import React from 'react';
import AntigravityCTA from '@/components/ui/AntigravityCTA';

/**
 * CTAProjectCard - Featured Projects Section CTA
 *
 * Spec:
 * - Background: #0d003b (dark)
 * - Headline: "Like what you see?" - font normal
 * - On hover: text becomes #0057FF
 * - Button: Compound pill (full pill text + circular icon overlapping)
 * - Animation: translateY(-1px) on hover, ease-out, 200ms
 * - Mobile: Texto à esquerda, seta à direita
 */
export default function CTAProjectCard() {
  return (
    <div className="group relative flex flex-col items-center justify-center h-full bg-transparent p-6 md:p-12 isolate">
      {/* Ghost Atmosphere Glow - Desktop Only */}
      <div className="absolute inset-0 opacity-40 hidden md:block bg-[radial-gradient(circle_at_50%_50%,oklch(from_var(--color-primary)_l_c_h_/_0.12),transparent_70%)] z-[var(--z-layer-base)]" />

      {/* Headline - Centered on all breakpoints */}
      <h3 className="relative z-[var(--z-layer-content)] text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-normal text-center mb-6 md:mb-12 tracking-tight leading-[1.1] text-white transition-colors duration-300 md:group-hover:text-bluePrimary">
        Like what <br aria-hidden="true" />
        you see?
      </h3>

      {/* CTA Button - Centered on all breakpoints */}
      <div className="relative z-[var(--z-layer-cta)] w-full flex justify-center">
        <AntigravityCTA
          href="/portfolio"
          text="view projects"
          className="relative w-auto"
        />
      </div>
    </div>
  );
}
