import type { Metadata, Viewport } from 'next';
import { siteMetadata, siteViewport } from '@/config/metadata';
import ClientLayout from '@/components/layout/ClientLayout';
import JsonLd from '@/components/ui/JsonLd';
import './globals.css'; // Fonts and styles are loaded here
import { getSiteAssets, type SiteAsset } from '@/lib/supabase/site-assets';
import { SiteAssetsProvider } from '@/contexts/site-assets';
import { SITE_ASSET_KEYS } from '@/config/site-assets';
import type { CSSProperties } from 'react';
import { BRAND } from '@/config/brand';

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let assets: SiteAsset[] = [];
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    'http://localhost:3000';

  try {
    assets = await getSiteAssets();
  } catch (error) {
    console.error('Falha ao carregar site_assets:', error);
    try {
      const response = await fetch(`${baseUrl}/api/site-assets`, {
        cache: 'no-store',
      });
      if (response.ok) {
        assets = await response.json();
      } else {
        console.error('Erro ao buscar site_assets via API:', response.status);
      }
    } catch (fallbackError) {
      console.error('Erro fallback de site_assets:', fallbackError);
    }
  }
  const assetMap = assets.reduce<Record<string, string>>((acc, asset) => {
    if (asset.key && asset.publicUrl) {
      acc[asset.key] = asset.publicUrl;
    }
    return acc;
  }, {});

  const cssVars: Record<string, string> = {};
  const setVar = (name: string, value?: string) => {
    if (value) cssVars[name] = value;
  };

  const supabaseBaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '') ?? '';
  setVar('--supabase-url', supabaseBaseUrl);

  setVar('--logo-light-url', assetMap[SITE_ASSET_KEYS.logos.headerLight]);
  setVar('--logo-dark-url', assetMap[SITE_ASSET_KEYS.logos.headerDark]);
  setVar('--favicon-light-url', assetMap[SITE_ASSET_KEYS.logos.faviconLight]);
  setVar('--favicon-dark-url', assetMap[SITE_ASSET_KEYS.logos.faviconDark]);
  setVar('--font-display-url', assetMap[SITE_ASSET_KEYS.fonts.display]);
  setVar('--font-h1-url', assetMap[SITE_ASSET_KEYS.fonts.h1]);
  setVar('--font-h2-url', assetMap[SITE_ASSET_KEYS.fonts.h2]);
  setVar('--font-h3-url', assetMap[SITE_ASSET_KEYS.fonts.h3]);
  setVar('--font-body-url', assetMap[SITE_ASSET_KEYS.fonts.body]);
  setVar('--font-light-url', assetMap[SITE_ASSET_KEYS.fonts.light]);

  const inlineStyle = cssVars as CSSProperties;
  const jsonLdLogoUrl =
    assetMap[SITE_ASSET_KEYS.logos.headerLight] ??
    BRAND.assets.logos.logoLight;

  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
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
        <SiteAssetsProvider assets={assets}>
          <ClientLayout>{children}</ClientLayout>
        </SiteAssetsProvider>
      </body>
    </html>
  );
}
