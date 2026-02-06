'use client';

import { useRealtimeAsset } from '@/hooks/useRealtimeAssets';
import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';

type DynamicAssetVideoProps = {
    assetKey: string;
    className?: string;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    playsInline?: boolean;
    poster?: string;
    fallbackUrl?: string;
    playbackRate?: number;
    preload?: 'none' | 'metadata' | 'auto';
    style?: React.CSSProperties;
};

/**
 * Video component that automatically updates when the asset changes in the database.
 * Handles smooth transition between video sources and supports playbackRate.
 */
export const DynamicAssetVideo = forwardRef<
    HTMLVideoElement | null,
    DynamicAssetVideoProps
>(
    (
        {
            assetKey,
            className = '',
            autoPlay = true,
            muted = true,
            loop = true,
            playsInline = true,
            poster,
            fallbackUrl,
            playbackRate = 1,
            preload = 'metadata',
            style,
        },
        ref
    ) => {
        const { asset, loading, error } = useRealtimeAsset(assetKey);
        const [displayUrl, setDisplayUrl] = useState<string | null>(fallbackUrl || null);
        const internalVideoRef = useRef<HTMLVideoElement | null>(null);

        // Expose the internal video ref to forwarded ref
        useImperativeHandle(ref, () => internalVideoRef.current as HTMLVideoElement);

        useEffect(() => {
            if (asset?.publicUrl && asset.publicUrl !== displayUrl) {
                setDisplayUrl(asset.publicUrl);
            }
        }, [asset?.publicUrl, displayUrl]);

        useEffect(() => {
            if (internalVideoRef.current && playbackRate !== 1) {
                internalVideoRef.current.playbackRate = playbackRate;
            }
        }, [playbackRate, displayUrl]);

        const finalUrl = displayUrl || fallbackUrl;

        if (loading && !fallbackUrl) {
            return (
                <div
                    className={`bg-slate-800/20 animate-pulse ${className}`}
                    style={style}
                />
            );
        }

        if ((error || !finalUrl) && !loading) {
            return null;
        }

        return (
            <video
                ref={internalVideoRef}
                src={finalUrl!}
                className={className}
                autoPlay={autoPlay}
                muted={muted}
                loop={loop}
                playsInline={playsInline}
                poster={poster}
                preload={preload}
                style={style}
                key={finalUrl}
            />
        );
    }
);

DynamicAssetVideo.displayName = 'DynamicAssetVideo';
