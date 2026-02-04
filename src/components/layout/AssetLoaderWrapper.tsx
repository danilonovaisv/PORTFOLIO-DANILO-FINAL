'use client';

import React, { useState, useEffect } from 'react';
import { SiteAssetsProvider } from '@/contexts/site-assets';
import { getClientSiteAssets } from '@/lib/supabase/site-assets-client';
import type { NormalizedSiteAsset } from '@/lib/supabase/site-asset-utils';
import ClientLayout from '@/components/layout/ClientLayout';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

interface AssetLoaderWrapperProps {
  children: React.ReactNode;
}

export default function AssetLoaderWrapper({
  children,
}: AssetLoaderWrapperProps) {
  const [assets, setAssets] = useState<NormalizedSiteAsset[]>([]);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const loadedAssets = await getClientSiteAssets();
        setAssets(loadedAssets);
      } catch (error) {
        console.error(
          'Falha ao carregar site_assets:',
          error instanceof Error ? error.message : error
        );

        // Try fallback API call
        try {
          const response = await fetch('/api/site-assets');
          if (response.ok) {
            const assetsData = await response.json();
            setAssets(assetsData);
          } else {
            console.error(
              'Erro ao buscar site_assets via API:',
              response.status,
              response.statusText
            );
          }
        } catch (fallbackError) {
          console.error(
            'Erro fallback de site_assets:',
            fallbackError instanceof Error
              ? fallbackError.message
              : fallbackError
          );
        }
      } finally {
        setAssetsLoaded(true);
      }
    };

    loadAssets();
  }, []);

  // If assets haven't loaded yet, render the children without the provider
  // This allows the page to render while assets are being fetched
  if (!assetsLoaded) {
    return <ClientLayout>{children}</ClientLayout>;
  }

  return (
    <ErrorBoundary>
      <SiteAssetsProvider assets={assets}>
        <ClientLayout>{children}</ClientLayout>
      </SiteAssetsProvider>
    </ErrorBoundary>
  );
}
