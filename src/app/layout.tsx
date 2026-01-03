// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { siteMetadata, siteViewport } from '@/config/metadata';
import ClientLayout from '@/components/layout/ClientLayout';
import JsonLd from '@/components/ui/JsonLd';
import './globals.css';

// Configuração da Fonte Local
// Certifica-te que os nomes dos ficheiros na pasta src/fonts correspondem EXATAMENTE a estes.
// Se o erro "Can't resolve" continuar, remove os espaços dos nomes dos ficheiros.
const ttNorms = localFont({
  src: [
    {
      path: '../fonts/TT Norms Pro Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/TT Norms Pro Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/TT Norms Pro Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/TT Norms Pro Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/TT Norms Pro Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-tt-norms',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={ttNorms.variable}>
      <head>
        <JsonLd />
      </head>
      {/* Usamos bg-black como fallback seguro e text-white */}
      <body className="antialiased bg-black text-white selection:bg-blue-500/30">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:font-medium"
        >
          Pular para o conteúdo
        </a>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
