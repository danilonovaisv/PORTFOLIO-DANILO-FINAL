import React from 'react';
import type { Metadata } from 'next';
import Hero from '../components/sections/Hero';
import PortfolioShowcase from '../components/home/PortfolioShowcase';
import FeaturedProjects from '../components/home/FeaturedProjects';
import Clients from '../components/home/Clients';
import Contact from '../components/home/Contact';

export const metadata: Metadata = {
  title: 'Danilo Novais - Senior Frontend Engineer',
  description:
    'Design, não é só estética. Explore projetos de branding, motion design e web.',
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
