'use client';

import type { PortfolioProject } from '@/types/project';
import { isVideo } from '@/lib/utils';

export function getModalHeroMedia(project: PortfolioProject) {
  const gallery = project.detail?.gallery ?? [];

  // Ghost v3.1: Identificadores de capas para filtragem
  const isCoverAsset = (url: string) =>
    url === project.image ||
    url === project.imageLandscape ||
    url === project.imageSquare ||
    url === project.thumbnailMedia;

  // Busca conteúdo específico (que não é uma das capas)
  const caseSpecificMedia = gallery.filter(item => !isCoverAsset(item));

  const featuredVideo = caseSpecificMedia.find(isVideo);
  const featuredImage = caseSpecificMedia.find(item => !isVideo(item));

  // 1. Prioridade Máxima: Vídeo específico do case (Imersivo)
  if (featuredVideo) return featuredVideo;

  // 2. Segunda prioridade: Variantes dedicadas de Hero
  if (project.imageLandscape) return project.imageLandscape;
  if (project.imageSquare) return project.imageSquare;

  // 3. Terceira prioridade: Imagem específica do case (da galeria)
  if (featuredImage) return featuredImage;

  // 4. Fallback: Imagem principal se for diferente da thumb
  const safePrimaryImage =
    project.image && project.image !== project.thumbnailMedia
      ? project.image
      : undefined;

  return (
    safePrimaryImage ??
    (gallery.length > 0 ? gallery[0] : undefined)
  );
}
