'use client';

import type { PortfolioProject } from '@/types/project';
import { isVideo } from '@/lib/utils';

export function getModalHeroMedia(project: PortfolioProject) {
  const gallery = project.detail?.gallery ?? [];
  const firstGalleryVideo = gallery.find((entry) => isVideo(entry));
  const firstGalleryImage = gallery.find((entry) => !isVideo(entry));
  const safePrimaryImage =
    project.image && project.image !== project.thumbnailMedia
      ? project.image
      : undefined;

  if (project.category === 'motion' && firstGalleryVideo) {
    return firstGalleryVideo;
  }

  return (
    project.imageLandscape ??
    project.imageSquare ??
    safePrimaryImage ??
    firstGalleryImage
  );
}
