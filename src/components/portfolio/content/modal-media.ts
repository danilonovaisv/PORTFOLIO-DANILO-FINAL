'use client';

import type { PortfolioProject } from '@/types/project';
import { isVideo } from '@/lib/utils';

export function getModalHeroMedia(project: PortfolioProject) {
  const gallery = (project.detail?.gallery ?? []).filter(
    (item): item is string => typeof item === 'string' && item.trim() !== ''
  );

  // Ghost v3.1: capa e thumb ficam restritas ao grid/listagem.
  const isCoverAsset = (url: string) =>
    url === project.image ||
    url === project.imageLandscape ||
    url === project.imageSquare ||
    url === project.thumbnailMedia;

  const caseSpecificMedia = gallery.filter(item => !isCoverAsset(item));
  const featuredVideo = caseSpecificMedia.find(isVideo);
  const featuredImage = caseSpecificMedia.find(item => !isVideo(item));

  if (featuredVideo) return featuredVideo;
  if (featuredImage) return featuredImage;

  return undefined;
}
