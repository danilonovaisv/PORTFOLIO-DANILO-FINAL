'use client';

import React from 'react';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/SiteFooter';

import { useExperience } from '@/hooks/useExperience';

import { AntigravityDebugger } from '@/components/debug/AntigravityDebugger';

/**
 * Client-side layout wrapper that handles:
 * - Smooth scrolling (Lenis)
 * - Experience orchestration (device detection, WebGL flags)
 * - Header/Footer rendering
 * - Debug overlay
 */
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 🧠 ORQUESTRAÇÃO GLOBAL DA EXPERIÊNCIA
  useExperience();

  return (
    <SmoothScroll>
      <Header />
      {children}
      <Footer />
      <AntigravityDebugger />
    </SmoothScroll>
  );
}
