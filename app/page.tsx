import React from 'react';
import Hero from '../components/home/Hero';
import PortfolioShowcase from '../components/home/PortfolioShowcase';
import FeaturedProjectsSection from './components/FeaturedProjectsSection';
import Clients from '../components/home/Clients';
import Contact from '../components/home/Contact';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Danilo Novais | Portfolio',
  description:
    'Design, não é só estética. É intenção, é estratégia, é experiência.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <PortfolioShowcase />
      <FeaturedProjectsSection />
      <Clients />
      <Contact />
    </>
  );
}
