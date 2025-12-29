'use client';

import React from 'react';
import localFont from 'next/font/local';
import type { Metadata, Viewport } from 'next';

import SmoothScroll from '@/components/layout/SmoothScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import { useExperience } from '@/hooks/useExperience';

import { AntigravityDebugger } from '@/components/debug/AntigravityDebugger';
import './globals.css';

const ttNorms = localFont({
  src: [
    { path: '../fonts/TT Norms Pro Thin.woff2', weight: '100' },
    { path: '../fonts/TT Norms Pro Light.woff2', weight: '300' },
    { path: '../fonts/TT Norms Pro Regular.woff2', weight: '400' },
    { path: '../fonts/TT Norms Pro Medium.woff2', weight: '500' },
    { path: '../fonts/TT Norms Pro Bold.woff2', weight: '700' }
  ],
  variable: '--font-tt-norms',
  display: 'swap'
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // 🧠 ORQUESTRAÇÃO GLOBAL DA EXPERIÊNCIA
  useExperience();

  return (
    <html lang="pt-BR" className={ttNorms.variable}>
      <body className="antialiased bg-[#06071f] text-white">
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
          <AntigravityDebugger />
        </SmoothScroll>
      </body>
    </html>
  );
}