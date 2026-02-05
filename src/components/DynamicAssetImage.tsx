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
}: DynamicAssetImageProps) {
    const { asset, loading, error } = useRealtimeAsset(assetKey);
    const [displayUrl, setDisplayUrl] = useState<string | null>(null);
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

    if (loading) {
        return (
            <div
                className={`animate-pulse bg-slate-800/50 ${className}`}
                style={{ width, height }}
            />
        );
    }

    if (error || !displayUrl) {
        return (
            <div
                className={`flex items-center justify-center bg-slate-900/50 text-slate-500 text-sm ${className}`}
                style={{ width, height }}
            >
                Asset not found
            </div>
        );
    }

    return (
        <div className={`relative ${className}`} style={{ width, height }}>
            <Image
                src={displayUrl}
                alt={alt}
                fill={!width && !height}
                width={width}
                height={height}
                priority={priority}
                className={`object-cover transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'
                    }`}
            />
        </div>
    );
}
