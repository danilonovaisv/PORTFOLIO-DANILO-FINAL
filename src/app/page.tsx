import type { Metadata } from 'next';
import HomeHero from '@/components/home/hero/HomeHero';
// ManifestoSection import removed

import PortfolioShowcase from '@/components/home/portfolio-showcase/PortfolioShowcase';
import FeaturedProjectsSection from '@/components/home/featured-projects/FeaturedProjectsSection';

import { SiteClosure } from '@/components/layout/SiteClosure';
import { VideoManifesto } from '@/components/home/hero/VideoManifesto';
import { BRAND } from '@/config/brand';

export const metadata: Metadata = {
  title: 'Danilo Novais | Creative Developer',
  description:
    'Você não vê o design. Mas ele vê você. Portfólio de Danilo Novais - Creative Developer especializado em WebGL, R3F, Next.js e experiências digitais interativas.',
  keywords: [
    'Danilo Novais',
    'Creative Developer',
    'WebGL',
    'R3F',
    'React Three Fiber',
    'Next.js',
    'Creative Development',
    'Brazil',
    'Portfolio',
    'Interactive Design',
  ],
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <VideoManifesto src={BRAND.assets.video.manifesto} />
      <PortfolioShowcase />
      <FeaturedProjectsSection />
      <SiteClosure />
    </>
  );
}
