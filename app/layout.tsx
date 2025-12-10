import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="min-h-screen bg-[#F4F5F7] text-[#111111] font-sans selection:bg-[#0057FF] selection:text-white">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
