import { useEffect, useState } from 'react';
import { buildSupabaseStorageUrl } from '@/lib/supabase/urls';

interface SiteAsset {
  id: string;
  key: string;
  file_path: string;
  bucket: string;
  asset_type: string;
  is_active: boolean;
  sort_order: number | null;
  page: string;
  href?: string | null;
  publicUrl: string;
  resolvedPage: string;
}

/**
 * Hook para obter a URL pública de um asset do site
 * @param asset - O objeto asset ou string de caminho do asset
 * @returns URL pública do asset ou string vazia se não encontrado
 */
export function useSiteAssetUrl(
  asset: string | Partial<SiteAsset> | undefined
): string {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    if (!asset) {
      setUrl('');
      return;
    }

    let resolvedUrl = '';

    if (typeof asset === 'string') {
      // Se for string, assume que é um caminho direto ou URL
      if (asset.startsWith('http')) {
        resolvedUrl = asset;
      } else {
        // Para caminhos locais, tenta construir a URL com o bucket padrão
        resolvedUrl = buildSupabaseStorageUrl('site-assets', asset) || '';
      }
    } else {
      // Se for um objeto asset
      if (asset.publicUrl) {
        resolvedUrl = asset.publicUrl;
      } else if (asset.file_path) {
        const bucket = asset.bucket || 'site-assets';
        resolvedUrl = buildSupabaseStorageUrl(bucket, asset.file_path) || '';
      } else {
        resolvedUrl = '';
      }
    }

    setUrl(resolvedUrl);
  }, [asset]);

  return url;
}
