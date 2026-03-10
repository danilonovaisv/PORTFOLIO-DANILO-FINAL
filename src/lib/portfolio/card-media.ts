import type { PortfolioProject } from '@/types/project';

const LEGACY_PROJECT_MEDIA_PATTERN =
  /(?:^|\/)projects\/[^/]+\/(?:thumb|hero)\.(?:avif|gif|jpe?g|png|webp|mp4|m4v|mov)$/i;

const stripAssetDecorators = (value?: string | null) =>
  value?.split('?')[0].split('#')[0] ?? '';

export const isLegacyProjectMediaAsset = (value?: string | null) =>
  LEGACY_PROJECT_MEDIA_PATTERN.test(stripAssetDecorators(value));

type PreferredCover = 'landscape' | 'square';

export function getCardMediaCandidates(
  project: PortfolioProject,
  preferredCover: PreferredCover
): string[] {
  const primaryCover =
    preferredCover === 'square' ? project.imageSquare : project.imageLandscape;
  const secondaryCover =
    preferredCover === 'square' ? project.imageLandscape : project.imageSquare;

  const hasStructuredCover =
    Boolean(primaryCover || secondaryCover || project.image);
  const shouldPreferDedicatedCover =
    hasStructuredCover && isLegacyProjectMediaAsset(project.thumbnailMedia);

  const orderedCandidates = shouldPreferDedicatedCover
    ? [
        primaryCover,
        secondaryCover,
        project.image,
        project.thumbnailMedia,
        project.videoPreview,
      ]
    : [
        project.thumbnailMedia,
        primaryCover,
        secondaryCover,
        project.image,
        project.videoPreview,
      ];

  return orderedCandidates.filter((candidate): candidate is string => !!candidate);
}
