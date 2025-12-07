import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Sobre | Danilo Novais',
  description: 'Conheça mais sobre minha trajetória e filosofia de design.',
};

export default function AboutPage() {
  return (
    <div className="pt-32 px-4 container mx-auto text-center min-h-[50vh]">
      <h1 className="text-4xl font-bold mb-4">Sobre</h1>
      <p className="text-gray-600">Página em construção...</p>
    </div>
  );
}
