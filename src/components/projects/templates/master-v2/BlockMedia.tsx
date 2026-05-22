'use client';

import Image from 'next/image';
import type { MasterProjectV2GalleryItem } from '@/types/project-template';
import { YouTubePlayer } from '@/components/ui/YouTubePlayer';
import {
  extractYoutubeId,
  resolveLandingAsset,
} from '@/lib/media/asset-contract';

const isVideoAsset = (item: MasterProjectV2GalleryItem) =>
  item.kind === 'video' || /\.(mp4|webm|ogg|mov)$/i.test(item.src);

type BlockMediaProps = {
  item: MasterProjectV2GalleryItem;
  title: string;
  priority?: boolean;
  aspectClassName?: string;
  sizes?: string;
};

export default function BlockMedia({
  item,
  title,
  priority = false,
  aspectClassName = 'aspect-[16/10]',
  sizes = '(max-width: 1024px) 100vw, 80vw',
}: BlockMediaProps) {
  const resolved = resolveLandingAsset(
    item.src,
    isVideoAsset(item) ? 'video' : 'image'
  );

  if (!resolved.ok) {
    return (
      <div
        className={`flex min-h-[220px] items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-sm text-white/65 ${aspectClassName}`}
      >
        Mídia indisponível
      </div>
    );
  }

  const videoId =
    resolved.asset.provider === 'youtube'
      ? extractYoutubeId(resolved.asset.url)
      : null;
  if (videoId) {
    return (
      <div className={`overflow-hidden rounded-2xl ${aspectClassName}`}>
        <YouTubePlayer
          videoId={videoId}
          className="h-full w-full"
          autoplay={false}
        />
      </div>
    );
  }

  if (resolved.asset.type === 'video') {
    const poster = resolveLandingAsset(item.poster, 'image');
    return (
      <div className={`overflow-hidden rounded-2xl ${aspectClassName}`}>
        <video
          className="h-full w-full object-cover"
          src={resolved.asset.url}
          poster={poster.ok ? poster.asset.url : undefined}
          controls
          playsInline
          preload={priority ? 'metadata' : 'none'}
        ></video>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-2xl ${aspectClassName}`}>
      <Image
        src={resolved.asset.url}
        alt={item.alt || title}
        width={1920}
        height={1080}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
