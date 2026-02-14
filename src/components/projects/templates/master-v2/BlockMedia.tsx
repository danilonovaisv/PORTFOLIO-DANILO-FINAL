'use client';

import Image from 'next/image';
import { resolveSiteAssetUrl } from '@/lib/projects/template-schema';
import type { MasterProjectV2GalleryItem } from '@/types/project-template';


const VIDEO_PATTERN = /\.(mp4|webm|ogg|mov)$/i;

const isVideoAsset = (item: MasterProjectV2GalleryItem) =>
  item.kind === 'video' || VIDEO_PATTERN.test(item.src);

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
  const src = resolveSiteAssetUrl(item.src);

  if (!src) {
    return (
      <div
        className={`flex min-h-[220px] items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-sm text-white/65 ${aspectClassName}`}
      >
        Mídia indisponível
      </div>
    );
  }

  if (isVideoAsset(item)) {
    return (
      <div className={`overflow-hidden rounded-2xl ${aspectClassName}`}>
        <video
          className="h-full w-full object-cover"
          src={src}
          poster={resolveSiteAssetUrl(item.poster)}
          controls
          muted
          playsInline
          preload={priority ? 'metadata' : 'none'}
        >
        </video>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-2xl ${aspectClassName}`}>
      <Image
        src={src}
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
