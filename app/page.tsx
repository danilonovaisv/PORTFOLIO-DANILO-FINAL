import React from 'react';
import Hero from '../components/sections/Hero';
import PortfolioShowcase from '../components/home/PortfolioShowcase';
import FeaturedProjects from '../components/home/FeaturedProjects';
import Clients from '../components/home/Clients';
import Contact from '../components/home/Contact';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Danilo Novais | Portfolio',
  description: 'Design, não é só estética. É intenção, é estratégia, é experiência.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <PortfolioShowcase />
      <FeaturedProjects />
      <Clients />
      <Contact />
    </>
  );
}
