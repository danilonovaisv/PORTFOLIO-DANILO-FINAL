'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
    <div className="group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-md bg-[#040013] p-6 md:p-8 lg:p-10 isolate">
      <div className="absolute inset-0 opacity-45 bg-[radial-gradient(circle_at_50%_50%,rgba(79,230,255,0.08),transparent_68%)]" />

      <div className="relative z-[var(--z-layer-content)]">
        <h3 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.05] text-white transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-bluePrimary">
          Like what <br aria-hidden="true" />
          you see?
        </h3>
      </div>

      <div className="relative z-[var(--z-layer-cta)] mt-10">
        <Link
          href="/portfolio"
          className="inline-flex min-h-[48px] items-center gap-3 text-sm font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bluePrimary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040013] group-hover:text-bluePrimary"
        >
          <span>view projects</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
