'use client';

import { useRealtimeAsset } from '@/hooks/useRealtimeAssets';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type DynamicAssetImageProps = {
  assetKey: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallbackUrl?: string; // Optional fallback if asset is not in DB
  sizes?: string; // Next.js Image sizes attribute
};

/**
 * Image component that automatically updates when the asset changes in the database.
 * Uses cross-fade transition for smooth updates.
 */
export function DynamicAssetImage({
  assetKey,
  alt,
  className = '',
  width,
  height,
  priority = false,
  fallbackUrl,
  sizes,
  objectFit = 'cover',
}: DynamicAssetImageProps & {
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}) {
  const { asset, loading, error } = useRealtimeAsset(assetKey);
  const normalizedFallback = fallbackUrl?.trim() || null;
  const [displayUrl, setDisplayUrl] = useState<string | null>(
    normalizedFallback
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (asset?.publicUrl && asset.publicUrl !== displayUrl) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayUrl(asset.publicUrl);
        setIsTransitioning(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [asset?.publicUrl, displayUrl]);

  const finalUrl = displayUrl || normalizedFallback;

  if (loading && !fallbackUrl) {
    return (
      <div
        className={`animate-pulse bg-slate-800/50 ${className}`}
        style={{ width, height }}
      />
    );
  }

  if (!finalUrl && !loading) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-900/50 text-slate-500 text-sm ${className}`}
        style={{ width, height }}
      >
        Asset not found
      </div>
    );
  }

  if (error && finalUrl) {
    console.warn(`[DynamicAssetImage] usando fallback para ${assetKey}`, error);
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        src={finalUrl!}
        alt={alt}
        fill={!width && !height}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes || (!width && !height ? '(max-width: 768px) 100vw, 50vw' : undefined)}
        unoptimized={finalUrl?.toLowerCase().endsWith('.svg')}
        className={`object-${objectFit} transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
}
