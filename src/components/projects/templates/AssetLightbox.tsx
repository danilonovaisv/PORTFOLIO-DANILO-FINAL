'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { ResponsiveCaptionTrack } from '@/components/ui/ResponsiveCaptionTrack';
import { DEFAULT_CAPTIONS } from '@/lib/video';
import type { ZoomAsset } from './types';

interface AssetLightboxProps {
  asset: ZoomAsset | null;
  onClose: () => void;
}

export function AssetLightbox({ asset, onClose }: AssetLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!asset) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeElement = document.activeElement as HTMLElement;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [asset, onClose]);

  if (!asset) return null;

  return (
    <div
      className="fixed inset-0 z-[var(--z-layer-lightbox)] flex items-center justify-center bg-background/94 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Pré-visualização ampliada do asset"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden border border-white/15 bg-black"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 z-10 inline-flex min-h-12 min-w-12 items-center justify-center border border-white/20 bg-black/80 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          aria-label="Fechar visualização"
        >
          <X className="h-5 w-5" />
        </button>

        {asset.kind === 'image' ? (
          <div className="relative h-[82vh] w-full">
            <Image
              src={asset.src}
              alt={asset.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        ) : asset.kind === 'youtube' && asset.youtubeId ? (
          <div className="aspect-video w-full bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${asset.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${asset.youtubeId}&controls=1&modestbranding=1&rel=0&playsinline=1`}
              title={asset.alt || 'Vídeo do YouTube'}
              className="h-full w-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <video
            className="h-[82vh] w-full object-contain"
            src={asset.src}
            poster={asset.poster}
            autoPlay
            muted={false}
            loop={false}
            controls
            playsInline
            onLoadedMetadata={(event) => {
              event.currentTarget.muted = false;
              void event.currentTarget.play().catch(() => undefined);
            }}
          >
            <ResponsiveCaptionTrack src={DEFAULT_CAPTIONS} />
          </video>
        )}
      </div>
    </div>
  );
}
