// app/page.tsx
'use client';

import { Suspense } from 'react';
import Hero from '@/components/sections/Hero';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Clients from '@/components/home/Clients';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Manifesto from '@/components/home/Manifesto';
import PortfolioShowcase from '@/components/home/PortfolioShowcase';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F5F7]">
      <Header />
      <main className="flex-grow">
        <Suspense
          fallback={
            <div className="h-screen w-full flex items-center justify-center">
              Carregando...
            </div>
          }
        >
          <Hero />
          <PortfolioShowcase />
          <FeaturedProjects />
          {/* Manifesto deve vir antes de clients se for parte do flow */}
          <Manifesto />
          <Clients />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
