// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { siteMetadata, siteViewport } from '@/config/metadata';
import ClientLayout from '@/components/layout/ClientLayout';
import JsonLd from '@/components/ui/JsonLd';
import './globals.css';

const ttNorms = localFont({
  src: [
    { path: '../fonts/TT Norms Pro Thin.woff2', weight: '100' },
    { path: '../fonts/TT Norms Pro Light.woff2', weight: '300' },
    { path: '../fonts/TT Norms Pro Regular.woff2', weight: '400' },
    { path: '../fonts/TT Norms Pro Medium.woff2', weight: '500' },
    { path: '../fonts/TT Norms Pro Bold.woff2', weight: '700' },
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
      <body className="antialiased bg-ghost-void text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Pular para o conteúdo
        </a>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
