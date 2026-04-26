'use client';

import dynamic from 'next/dynamic';
import AboutBeliefsSkeleton from '@/components/sobre/sections/AboutBeliefsSkeleton';

const AboutBeliefs = dynamic(
  () =>
    import('@/components/sobre/sections/AboutBeliefsClient').then(
      (mod) => mod.AboutBeliefsClient
    ),
  {
    ssr: false,
    loading: () => <AboutBeliefsSkeleton />,
  }
);

export default function AboutBeliefsNoSSR() {
  return <AboutBeliefs />;
}
