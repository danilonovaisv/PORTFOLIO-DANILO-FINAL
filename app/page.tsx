import React from 'react';
import Hero from '../components/home/Hero';
import PortfolioShowcase from '../components/home/PortfolioShowcase';
import PortfolioSection from './components/PortfolioSection';
import Clients from '../components/home/Clients';
import Contact from '../components/home/Contact';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfólio — Danilo Novais | Design, não é só estética.',
  description:
    'Design estratégico, UX, motion design e experiências digitais em WebGL/3D. Portfólio de Danilo Novais com projetos que unem intenção, estratégia e experiência.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <PortfolioShowcase />
      <PortfolioSection />
      <Clients />
      <Contact />
    </>
  );
}
