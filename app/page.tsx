import React from 'react';
import Hero from '../components/sections/Hero';
import Manifesto from '../components/home/Manifesto';
import PortfolioShowcase from '../components/home/PortfolioShowcase';
import FeaturedProjects from '../components/home/FeaturedProjects';
import Clients from '../components/home/Clients';
import Contact from '../components/home/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <PortfolioShowcase />
      <FeaturedProjects />
      <Clients />
      <Contact />
    </>
  );
}
