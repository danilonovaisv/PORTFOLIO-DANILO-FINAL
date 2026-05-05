'use client';

import React from 'react';
import { cn } from '@/lib/utils';
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
type CTAProjectCardProps = {
  className?: string;
};

export default function CTAProjectCard({ className }: CTAProjectCardProps) {
  return (
    <div
      className={cn(
        'group relative isolate flex h-full min-h-0 flex-1 flex-col items-center justify-center gap-10 overflow-hidden rounded-md bg-background p-6 text-center md:p-8 lg:p-10',
        className
      )}
    >
      <div className="absolute inset-0 opacity-45 bg-[radial-gradient(circle_at_50%_50%,rgba(79,230,255,0.08),transparent_68%)]" />

      <h3 className="relative z-[var(--z-layer-content)] text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.05] text-white transition-colors duration-standard ease-ghost group-hover:text-bluePrimary">
        Like what <br aria-hidden="true" />
        you see?
      </h3>

      <div className="relative z-[var(--z-layer-cta)]">
        <AntigravityCTA
          text="view projects"
          href="/portfolio"
          className="static"
        />
      </div>
    </div>
  );
}
