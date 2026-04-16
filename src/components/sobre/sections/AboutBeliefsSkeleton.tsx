'use client';

import React from 'react';

interface AboutBeliefsSkeletonProps {
  className?: string;
}

export function AboutBeliefsSkeleton({
  className = '',
}: AboutBeliefsSkeletonProps) {
  return (
    <section
      className={`relative w-full overflow-hidden bg-background text-text ${className}`.trim()}
      aria-label="Carregando O Que Me Move"
      aria-busy="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(79,230,255,0.1),transparent_42%),linear-gradient(180deg,#040013_0%,#0b0d3a_100%)]" />

      <div className="relative min-h-[550vh] md:min-h-[800vh]">
        <div className="sticky top-0 h-screen w-full">
          <div className="absolute inset-0 z-0 bg-background" />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-white/5 to-transparent" />

          <div className="absolute inset-x-0 top-0 z-20 flex h-screen items-center justify-end px-6 md:px-[8vw]">
            <div
              aria-hidden="true"
              className="w-full max-w-[18rem] space-y-4 md:max-w-[24rem]"
            >
              <div className="h-3 w-32 rounded-full bg-white/15 md:ml-auto" />
              <div className="h-10 w-full rounded-2xl bg-white/10 md:h-14" />
              <div className="h-10 w-5/6 rounded-2xl bg-white/10 md:ml-auto md:h-14" />
            </div>
          </div>

          <div className="absolute inset-y-0 left-0 z-20 hidden items-center pl-[15vw] md:flex">
            <div aria-hidden="true" className="space-y-3">
              <div className="h-14 w-64 rounded-2xl bg-blueAccent/20" />
              <div className="h-14 w-72 rounded-2xl bg-blueAccent/15" />
              <div className="h-14 w-56 rounded-2xl bg-blueAccent/10" />
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-[20vh] z-20 px-6 md:hidden">
            <div
              aria-hidden="true"
              className="mx-auto h-20 max-w-[82vw] rounded-3xl bg-blueAccent/15"
            />
          </div>

          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <div
              aria-hidden="true"
              className="h-[25vh] w-[38vw] min-w-[148px] max-w-[210px] rounded-[42%_42%_38%_38%/36%_36%_44%_44%] border border-white/10 bg-white/8 shadow-[0_0_80px_rgba(79,230,255,0.08)] md:h-[52vh] md:w-[28vw] md:min-w-[316px] md:max-w-[388px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutBeliefsSkeleton;
