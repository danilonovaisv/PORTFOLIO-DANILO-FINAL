'use client';

import React from 'react';
import Link from 'next/link';

export default function HeroCopy() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none pb-[5vh]">
      <div className="w-[90%] max-w-[min(90%,1100px)] max-h-[80vh] overflow-hidden pointer-events-auto text-center flex flex-col items-center gap-4">
        {/* Tag */}
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#9cb3ff] opacity-80 mb-[0.5vh]">
          [BRAND AWARENESS]
        </div>

        {/* Main Quote */}
        <h1 className="font-sans font-black tracking-[-0.025em] leading-[1.05] mb-[1vh] text-[#d9ddec] mix-blend-screen text-[clamp(2rem,5vw,5rem)] max-w-[90%] break-words drop-shadow-[0_0_24px_rgba(71,128,255,0.35)]">
          Você não vê o design.
        </h1>

        {/* Sub Quote */}
        <h2 className="font-sans font-black tracking-[-0.02em] leading-[1.05] mb-[4vh] text-[#9ca5c3] mix-blend-screen text-[clamp(1.5rem,3.5vw,3.5rem)] max-w-[90%] break-words drop-shadow-[0_0_18px_rgba(71,128,255,0.25)]">
          Mas ele vê você.
        </h2>

        {/* CTA Button */}
        <Link
          href="/sobre"
          className="group inline-flex items-center gap-4 mt-2 bg-[#0c5bff] text-white no-underline font-semibold lowercase transition-all duration-300 shadow-[0_0_40px_rgba(12,91,255,0.55)] ring-1 ring-white/12 hover:bg-[#0a46d4] hover:shadow-[0_0_55px_rgba(12,91,255,0.75)] text-[clamp(14px,3vw,17px)] p-[clamp(12px,3vw,16px)_clamp(20px,5vw,32px)] rounded-[clamp(20px,5vw,32px)]"
        >
          <span>step inside</span>
          <span className="flex items-center justify-center w-9 h-9 bg-white/15 rounded-full border border-white/15 shadow-[0_0_30px_rgba(12,91,255,0.45)] transition-transform duration-300 group-hover:rotate-45">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current"
            >
              <path
                d="M2 10L10 2M10 2H4M10 2V8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}
