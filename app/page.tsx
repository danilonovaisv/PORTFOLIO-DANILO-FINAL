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
    'Branding, campanhas, motion e experiências digitais com WebGL/3D. Design estratégico para impacto real.',
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
