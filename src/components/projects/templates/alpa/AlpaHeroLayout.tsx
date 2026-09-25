'use client';

import { m } from 'motion/react';
import Image from 'next/image';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';
import { getAssetUrl, isVideo } from '@/lib/utils';
import { isHtmlMedia } from '@/lib/portfolio/card-media';
import type { MasterProjectTemplateV3HeroData } from '@/types/project-template';
import { AlpaLayout } from './AlpaLayout';
import { HTMLVideoBlock } from '@/components/ui/HTMLVideoBlock';

const DEFAULT_REVEAL_INITIAL = { opacity: 0, y: 32 };
const DEFAULT_REVEAL_VISIBLE = { opacity: 1, y: 0 };

interface AlpaHeroLayoutProps {
  project: MasterProjectTemplateV3HeroData;
  children: React.ReactNode;
  revealInitial?: any;
  revealVisible?: any;
  zoomAsset?: any;
  closeAsset?: () => void;
}

/**
 * AlpaHeroLayout — Template V3_ALPA_HERO_EXPANDED
 *
 * Extensão de AlpaLayout que aceita um campo `hero_top_media` opcional.
 * Quando presente, renderiza a mídia acima do conteúdo de blocos.
 * Suporta: image | video | html
 */
export function AlpaHeroLayout({
  project,
  children,
  revealInitial = DEFAULT_REVEAL_INITIAL,
  revealVisible = DEFAULT_REVEAL_VISIBLE,
  zoomAsset = null,
  closeAsset = () => {},
}: AlpaHeroLayoutProps) {
  const { hero_top_media } = project;

  const renderHeroTopMedia = () => {
    if (!hero_top_media) return null;

    const rawSrc = hero_top_media.src?.trim() || '';
    const rawHtml = hero_top_media.html?.trim() || '';
    const mediaKind = (hero_top_media.kind as string) ?? 'image';

    const isHtml =
      mediaKind === 'html' ||
      Boolean(rawHtml) ||
      isHtmlMedia(rawSrc);

    const resolvedHtml = rawHtml || (isHtml ? rawSrc : '');

    if (isHtml && resolvedHtml) {
      return (
        <m.div
          className="w-full max-w-5xl mx-auto mb-8 sm:mb-12 flex items-center justify-center"
          initial={revealInitial}
          animate={revealVisible}
          transition={{
            duration: MOTION_TOKENS.duration.normal,
            ease: GHOST_EASE,
            delay: 0.05,
          }}
        >
          <HTMLVideoBlock
            preserveVideoFrame
            html={resolvedHtml}
            frameless
            allowFullscreenToggle
            className="w-full aspect-video max-h-[85vh] flex items-center justify-center"
          />
        </m.div>
      );
    }

    const isVid = mediaKind === 'video' || isVideo(rawSrc);

    if (isVid && rawSrc) {
      const videoSrc = getAssetUrl(rawSrc, { isVideo: true });
      return (
        <m.div
          className="flex w-full max-w-5xl mx-auto mb-8 sm:mb-12 items-center justify-center overflow-hidden bg-transparent"
          initial={revealInitial}
          animate={revealVisible}
          transition={{
            duration: MOTION_TOKENS.duration.normal,
            ease: GHOST_EASE,
            delay: 0.05,
          }}
        >
          <video
            src={videoSrc}
            className="w-full h-auto max-h-[85vh] block object-contain object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </m.div>
      );
    }

    if (rawSrc) {
      const imageSrc = getAssetUrl(rawSrc, { width: 1600 });
      return (
        <m.div
          className="relative w-full max-w-5xl mx-auto mb-8 sm:mb-12 flex items-center justify-center overflow-hidden"
          initial={revealInitial}
          animate={revealVisible}
          transition={{
            duration: MOTION_TOKENS.duration.normal,
            ease: GHOST_EASE,
            delay: 0.05,
          }}
        >
          <Image
            src={imageSrc}
            alt={hero_top_media.alt || `Hero media de ${project.project_title}`}
            width={1600}
            height={900}
            quality={85}
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="w-full h-auto max-h-[85vh] object-contain block mx-auto"
            priority
          />
        </m.div>
      );
    }

    return null;
  };

  return (
    <AlpaLayout
      project={project as any}
      heroTopMedia={renderHeroTopMedia()}
      revealInitial={revealInitial}
      revealVisible={revealVisible}
      zoomAsset={zoomAsset}
      closeAsset={closeAsset}
    >
      {children}
    </AlpaLayout>
  );
}
