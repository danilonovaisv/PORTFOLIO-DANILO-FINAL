'use client';

import { useRealtimeAsset } from '@/hooks/useRealtimeAssets';
import {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';

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

const VIDEO_EXTENSIONS_REGEX =
  /\.(mp4|webm|mov|m4v)(?:[?#].*)?$/i;

const isLikelyVideoUrl = (url?: string | null) => {
  if (!url) return false;
  if (url.startsWith('blob:') || url.startsWith('data:video/')) return true;
  return VIDEO_EXTENSIONS_REGEX.test(url);
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
    const normalizedFallback = fallbackUrl?.trim() || null;
    const safeAssetUrl = isLikelyVideoUrl(asset?.publicUrl)
      ? asset?.publicUrl
      : null;
    const [displayUrl, setDisplayUrl] = useState<string | null>(
      normalizedFallback
    );
    const internalVideoRef = useRef<HTMLVideoElement | null>(null);

    // Expose the internal video ref to forwarded ref
    useImperativeHandle(
      ref,
      () => internalVideoRef.current as HTMLVideoElement
    );

    useEffect(() => {
      if (safeAssetUrl && safeAssetUrl !== displayUrl) {
        setDisplayUrl(safeAssetUrl);
      }
    }, [safeAssetUrl, displayUrl]);

    useEffect(() => {
      if (internalVideoRef.current && playbackRate !== 1) {
        internalVideoRef.current.playbackRate = playbackRate;
      }
    }, [playbackRate, displayUrl]);

    const finalUrl = displayUrl || normalizedFallback;

    if (loading && !fallbackUrl) {
      return (
        <div
          className={`bg-slate-800/20 animate-pulse ${className}`}
          style={style}
        />
      );
    }

    if (!finalUrl && !loading) {
      return null;
    }

    if (error && finalUrl) {
      console.warn(
        `[DynamicAssetVideo] usando fallback para ${assetKey}`,
        error
      );
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
        onError={() => {
          if (normalizedFallback && finalUrl !== normalizedFallback) {
            setDisplayUrl(normalizedFallback);
          }
        }}
      />
    );
  }
);

DynamicAssetVideo.displayName = 'DynamicAssetVideo';
