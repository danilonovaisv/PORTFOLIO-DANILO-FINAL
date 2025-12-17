import React from 'react';
import Hero from '../components/hero/Hero';
import PortfolioShowcase from '../components/home/PortfolioShowcase';
import FeaturedProjects from '../components/home/FeaturedProjects';
import Clients from '../components/home/Clients';
import Contact from '../components/home/Contact';

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
