'use client';

import React from 'react';
import { CTAButton } from '@/components/ui/CTAButton';

/**
 * CTAProjectCard - Featured Projects Section CTA
 *
 * Spec:
 * - Background: #0d003b (dark)
 * - Headline: "Like what you see?" - font normal
 * - On hover: text becomes #0057FF
 * - Button: Compound pill (full pill text + circular icon overlapping)
 * - Animation: translateY(-1px) on hover, ease-out, 200ms
 */
export default function CTAProjectCard() {
  return (
    <div className="group relative flex flex-col items-center justify-center h-full min-h-[280px] md:min-h-[400px] bg-linear-to-br from-neutral/80 to-ghost-bg p-8 md:p-12 overflow-hidden rounded-md border border-white/5 transition-all duration-500 hover:border-primary/20 hover:shadow-[0_0_40px_rgba(var(--color-primary),0.1)]">
      {/* Ghost Atmosphere Glow */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,var(--color-primary-faint),transparent_70%)]" />

      {/* Headline - font normal, hover changes to blue */}
      <h3 className="relative z-10 text-3xl md:text-5xl lg:text-6xl font-normal text-center mb-8 md:mb-12 tracking-tight leading-[1.1] text-white transition-colors duration-300 group-hover:text-primary">
        Like what
        <br />
        you see?
      </h3>

      {/* CTA Button */}
      <div className="relative z-10">
        <CTAButton href="/portfolio" variant="primary">
          view projects
        </CTAButton>
      </div>
    </div>
  );
}
