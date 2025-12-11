import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';

export const metadata: Metadata = {
  title: 'Portfólio — Danilo Novais',
  description: 'Portfólio institucional de Danilo Novais Vilela.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#F4F5F7] text-[#111111] antialiased">
        <SiteHeader />
        <main className="pt-24 pb-24">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
