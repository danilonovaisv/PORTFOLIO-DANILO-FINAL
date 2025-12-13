import React from 'react';
import { Inter } from 'next/font/google';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body
        className={`${inter.className} bg-surface-main text-text-main selection:bg-[#0057FF] selection:text-white`}
      >
        <div className="min-h-screen font-sans">
          <Header />
          <main className="pb-32 md:pb-0">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
