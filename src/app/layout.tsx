import type { Metadata, Viewport } from 'next';
import { siteMetadata, siteViewport } from '@/config/metadata';
import JsonLd from '@/components/ui/JsonLd';
import './globals.css'; // Fonts and styles are loaded here
import type { CSSProperties } from 'react';
import { BRAND } from '@/config/brand';
import AssetLoaderWrapper from '@/components/layout/AssetLoaderWrapper';

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

  const inlineStyle = cssVars as CSSProperties;
  const jsonLdLogoUrl = BRAND.assets.logos.logoLight;

  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <JsonLd logoUrl={jsonLdLogoUrl} />
      </head>
      <body
        className="antialiased bg-background text-text pb-0 lg:pb-[64px] overflow-x-hidden"
        style={inlineStyle}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-md"
        >
          Pular para o conteúdo
        </a>
        <AssetLoaderWrapper>{children}</AssetLoaderWrapper>
      </body>
    </html>
  );
}
