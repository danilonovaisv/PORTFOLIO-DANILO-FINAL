import React from 'react';
import Hero from '../components/home/Hero';
import Manifesto from '../components/home/Manifesto';
import PortfolioShowcase from '../components/sections/PortfolioShowcase';
import PortfolioSection from './components/PortfolioSection';
import Clients from '../components/home/Clients';
import Contact from '../components/home/Contact';

import { Metadata } from 'next';

const metaTitle = 'Portfólio — Danilo Novais | Design, não é só estética.';
const metaDescription =
  'Design estratégico, UX, motion design e experiências digitais em WebGL/3D. Portfólio de Danilo Novais com projetos que unem intenção, estratégia e experiência.';
const metaImage =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp';
const metaUrl = 'https://portfoliodanilo.com';

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    url: metaUrl,
    siteName: 'Danilo Novais Portfolio',
    images: [
      {
        url: metaImage,
        width: 1200,
        height: 630,
        alt: 'Capa do portfólio de Danilo Novais',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: metaTitle,
    description: metaDescription,
    creator: '@danilo_novais',
    images: [metaImage],
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <PortfolioShowcase />
      <PortfolioSection />
      <Clients />
      <Contact />
    </>
  );
}
