import type { Metadata, Viewport } from 'next';
import { siteMetadata, siteViewport } from '@/config/metadata';
import ClientLayout from '@/components/layout/ClientLayout';
import JsonLd from '@/components/ui/JsonLd';
import './globals.css'; // Fonts and styles are loaded here

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <head>
        <JsonLd />
      </head>
      <body className="antialiased bg-background text-text pb-0 lg:pb-[64px] overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-md"
        >
          Pular para o conteúdo
        </a>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
