import { Metadata } from 'next';
import HomeHero from '@/components/home/HomeHero';
import ManifestoSection from '@/components/home/ManifestoSection';
import PortfolioShowcase from '@/components/home/PortfolioShowcase';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Clients from '@/components/home/Clients';
import Contact from '@/components/home/Contact';

export const metadata: Metadata = {
  title: 'Danilo Novais | Creative Developer & Interactive Designer',
  description:
    'Exploração visual e técnica de Danilo Novais. Creative Developer especializado em WebGL, R3F e experiências digitais interativas de alto impacto.',
};

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-surface-main overflow-x-hidden">
      <HomeHero />
      <ManifestoSection />
      <PortfolioShowcase />
      <FeaturedProjects />
      <Clients />
      <Contact />
    </main>
  );
}
