import type { Metadata, Viewport } from 'next';
import '@/lib/polyfills';
import { siteMetadata, siteViewport } from '@/config/metadata';
import '@/app/globals.css'; // Fonts and styles are loaded here
import type { CSSProperties } from 'react';
import { BRAND } from '@/config/brand';
import AssetLoaderWrapper from '@/components/layout/AssetLoaderWrapper';
import SmoothScroll from '@/components/layout/SmoothScroll';

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

// Define a function to safely get environment variables
function getSupabaseBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '') ?? '';
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cssVars: Record<string, string> = {};
  const setVar = (name: string, value?: string) => {
    if (value) cssVars[name] = value;
  };

  const supabaseBaseUrl = getSupabaseBaseUrl();
  setVar('--supabase-url', supabaseBaseUrl);

  // Use default values from BRAND config for initial render
  setVar('--logo-light-url', BRAND.assets.logos.logoLight);
  setVar('--logo-dark-url', BRAND.assets.logos.logoDark);
  setVar('--favicon-light-url', BRAND.assets.logos.favicon);
  setVar('--favicon-dark-url', BRAND.assets.logos.favicon);

  // Ensure background and text colors are properly set as CSS variables
  setVar('--color-background', BRAND.colors.background);
  setVar('--color-text', BRAND.colors.text);

  const inlineStyle = cssVars as CSSProperties;

  return (
    <html
      lang="pt-BR"
      className="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        {/* Preload critical fonts to reduce FOIT and improve FCP */}
        <link
          rel="preload"
          href="/fonts/TT%20Norms%20Pro%20Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/TT%20Norms%20Pro%20Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/TT%20Norms%20Pro%20Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://assets.codepen.io" />
        {/* Preconnect to Supabase storage for faster LCP image delivery */}
        <link
          rel="preconnect"
          href={getSupabaseBaseUrl().replace(/\/+$/, '')}
          crossOrigin="anonymous"
        />
      </head>
      <body
        suppressHydrationWarning
        className="relative isolate antialiased bg-(--color-background) text-(--color-text) pb-0 lg:pb-[64px] overflow-x-hidden"
        style={inlineStyle}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-1300 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-md"
        >
          Pular para o conteúdo
        </a>
        <SmoothScroll>
          <div className="relative flex min-h-screen w-full flex-col flex-1">
            <AssetLoaderWrapper>{children}</AssetLoaderWrapper>
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
