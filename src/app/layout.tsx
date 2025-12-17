import React from 'react';
import { Inter, Outfit } from 'next/font/google';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${outfit.variable}`}>
      <body
        className={`${inter.className} bg-surface-main text-text-main selection:bg-[#0057FF] selection:text-white`}
      >
        <SmoothScroll>
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-[#0057FF]"
          >
            Pular para o conteúdo
          </a>
          <div className="min-h-screen font-sans">
            <Header />
            <main id="conteudo" className="pb-32">
              {children}
            </main>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
