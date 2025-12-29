import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { siteMetadata, siteViewport } from '@/config/metadata';
import ClientLayout from '@/components/layout/ClientLayout';
import './globals.css';

/**
 * TT Norms Pro Font Configuration
 */
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
});

/**
 * SEO Metadata Export (Server Component)
 * This fixes the metadataBase warning in builds
 */
export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

/**
 * Root Layout (Server Component)
 * Wraps the entire application with:
 * - HTML lang attribute
 * - Font variable injection
 * - Client-side layout wrapper
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={ttNorms.variable}>
      <body className="antialiased bg-ghost-void text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}