'use client';

import dynamic from 'next/dynamic';

const AboutBeliefs = dynamic(
  () =>
    import('@/components/sobre/sections/AboutBeliefs').then(
      (mod) => mod.AboutBeliefs
    ),
  {
    ssr: false,
    loading: () => (
      <section
        className="relative w-full min-h-[550vh] md:min-h-[800vh] bg-background"
        aria-label="O Que Me Move"
        aria-busy="true"
      >
        <div className="std-grid py-24">
          <div className="h-10 w-40 bg-bluePrimary/30 rounded-md animate-pulse" />
        </div>
      </section>
    ),
  }
);

export default function AboutBeliefsNoSSR() {
  return <AboutBeliefs />;
}
