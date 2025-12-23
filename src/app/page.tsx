import HomeIntro from '@/components/home/HomeIntro';
import PortfolioShowcase from '@/components/home/PortfolioShowcase';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Clients from '@/components/home/Clients';
import Contact from '@/components/home/Contact';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Danilo Novais | Creative Developer & Motion Designer',
  description:
    'Portfólio de Danilo Novais. Design Intentional, Estratégia e Experiências Digitais Imersivas.',
};

export default function Page() {
  return (
    <>
      <HomeIntro />
      <PortfolioShowcase />
      <FeaturedProjects />
      <Clients />
      <Contact />
    </>
  );
}
