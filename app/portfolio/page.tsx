import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Portfolio | Danilo Novais',
  description: 'Confira meus projetos recentes: Brand, Campaigns, Videos e Web.',
};

export default function PortfolioPage() {
  return (
    <div className="pt-32 px-4 container mx-auto text-center min-h-[50vh]">
      <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
      <p className="text-gray-600">Página em construção...</p>
    </div>
  );
}
