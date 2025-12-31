'use client';

import React from 'react';
import { useReducedMotion } from 'framer-motion';
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
 */
export default function CTAProjectCard() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="group flex flex-col items-center justify-center h-full min-h-[300px] md:min-h-[400px] bg-transparent p-8 md:p-12 relative overflow-hidden">
      {/* Headline - font normal, hover changes to blue */}
      <h3 className="text-4xl md:text-6xl lg:text-7xl font-normal text-center mb-10 md:mb-16 tracking-tight leading-[1.1] text-white transition-colors duration-300 group-hover:text-[#0057FF]">
        Like what
        <br />
        you see?
      </h3>

      {/* CTA Button - Compound Pill Style */}
      <div className="button-wrapper">
        <Link
          href="/portfolio"
          className={`
            inline-flex items-center group/btn
            ${prefersReducedMotion ? '' : 'hover:-translate-y-px transition ease-out duration-200'}
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4fe6ff] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0d003b]
          `}
        >
          {/* Text Container - Full Pill Shape */}
          <span className="inline-flex items-center px-8 py-3 bg-[#0057FF] text-white font-medium uppercase tracking-wide text-sm rounded-full">
            view projects
          </span>

          {/* Icon Container - Circular Badge Overlapping Right */}
          <span className="flex items-center justify-center w-12 h-12 bg-[#0057FF] text-white rounded-full -ml-4">
            <ArrowRight
              className={`w-5 h-5 -rotate-45 ${prefersReducedMotion ? '' : 'transition-transform duration-300 group-hover/btn:rotate-0'}`}
            />
          </span>
        </Link>
      </div>
    </div>
  );
}
