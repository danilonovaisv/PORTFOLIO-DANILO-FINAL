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
    <div className="group flex flex-col items-center justify-center h-full min-h-[300px] md:min-h-[400px] bg-transparent p-8 md:p-12 relative overflow-hidden">
      {/* Headline - font normal, hover changes to blue */}
      <h3 className="text-4xl md:text-6xl lg:text-7xl font-normal text-center mb-10 md:mb-16 tracking-tight leading-[1.1] text-white transition-colors duration-300 group-hover:text-[#0057FF]">
        Like what
        <br />
        you see?
      </h3>

      {/* CTA Button */}
      <div className="button-wrapper">
        <CTAButton href="/portfolio" variant="primary">
          view projects
        </CTAButton>
      </div>
    </div>
  );
}
