'use client';

import { m } from 'motion/react';
import Image from 'next/image';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';
import { getAssetUrl } from '@/lib/utils';
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

    const mediaKind = (hero_top_media.kind as string) ?? 'image';

    if (mediaKind === 'html' && hero_top_media.html) {
      return (
        <m.div
          className="w-full max-w-5xl mx-auto mb-8"
          initial={revealInitial}
          animate={revealVisible}
          transition={{
            duration: MOTION_TOKENS.duration.normal,
            ease: GHOST_EASE,
            delay: 0.05,
          }}
        >
          <HTMLVideoBlock
            html={hero_top_media.html}
            frameless
            className="w-full aspect-video"
          />
        </m.div>
      );
    }

    if (mediaKind === 'video' && hero_top_media.src) {
      const videoSrc = getAssetUrl(hero_top_media.src, { isVideo: true });
      return (
        <m.div
          className="w-full max-w-5xl mx-auto mb-8 overflow-hidden"
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
            className="w-full h-auto block"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </m.div>
      );
    }

    if (hero_top_media.src) {
      const imageSrc = getAssetUrl(hero_top_media.src, { width: 1400 });
      return (
        <m.div
          className="relative w-full max-w-5xl mx-auto mb-8 overflow-hidden"
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
            width={1400}
            height={787}
            quality={80}
            sizes="(max-width: 768px) 100vw, 80vw"
            className="w-full h-auto object-cover block"
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
      revealInitial={revealInitial}
      revealVisible={revealVisible}
      zoomAsset={zoomAsset}
      closeAsset={closeAsset}
    >
      {renderHeroTopMedia()}
      {children}
    </AlpaLayout>
  );
}
