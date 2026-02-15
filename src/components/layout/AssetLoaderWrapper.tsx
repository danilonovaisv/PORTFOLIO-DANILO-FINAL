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
  const isDev = process.env.NODE_ENV !== 'production';

  useEffect(() => {
    const loadAssets = async () => {
      const toErrorMessage = (error: unknown) => {
        if (error instanceof Error) return error.message;
        if (typeof error === 'string') return error;
        try {
          return JSON.stringify(error);
        } catch {
          return 'unknown error';
        }
      };

      try {
        const loadedAssets = await getClientSiteAssets();
        setAssets(loadedAssets);
      } catch (error) {
        if (isDev) {
          console.warn(
            'Falha ao carregar site_assets no client. Tentando fallback via API.',
            toErrorMessage(error)
          );
        }

        // Try fallback API call
        try {
          const response = await fetch('/api/site-assets');
          if (response.ok) {
            const assetsData = (await response.json()) as
              | NormalizedSiteAsset[]
              | null;
            setAssets(Array.isArray(assetsData) ? assetsData : []);
          } else {
            if (isDev) {
              console.warn(
                'Erro ao buscar site_assets via API:',
                response.status,
                response.statusText
              );
            }
          }
        } catch (fallbackError) {
          if (isDev) {
            console.warn(
              'Erro no fallback de site_assets:',
              toErrorMessage(fallbackError)
            );
          }
        }
      }
    };

    void loadAssets();

    const refreshTimer = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      void loadAssets();
    }, 120000);

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        void loadAssets();
      }
    };

    const handleWindowFocus = () => {
      void loadAssets();
    };

    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(refreshTimer);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isDev]);

  return (
    <ErrorBoundary>
      <SiteAssetsProvider assets={assets}>
        <ClientLayout>{children}</ClientLayout>
      </SiteAssetsProvider>
    </ErrorBoundary>
  );
}
