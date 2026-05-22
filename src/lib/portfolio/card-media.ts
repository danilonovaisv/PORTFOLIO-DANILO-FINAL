import type { PortfolioProject } from '@/types/project';
import type { MediaFormat, ProjectMedia } from '@/lib/media/media-format';
import { isVideo } from '@/lib/utils';

const LEGACY_PROJECT_MEDIA_PATTERN =
  /(?:^|\/)projects\/[^/]+\/(?:thumb|hero)\.(?:avif|gif|jpe?g|png|webp|mp4|m4v|mov)$/i;

const stripAssetDecorators = (value?: string | null) =>
  value?.split('?')[0].split('#')[0] ?? '';

export const isLegacyProjectMediaAsset = (value?: string | null) =>
  LEGACY_PROJECT_MEDIA_PATTERN.test(stripAssetDecorators(value));

export type PreferredCover = 'landscape' | 'square';
export type MediaSlot =
  | 'portfolio-card-desktop'
  | 'portfolio-card-mobile'
  | 'home-featured';

type MediaCandidate = {
  src?: string | null;
  format: MediaFormat;
  explicitFormat?: MediaFormat;
};

export function getCardMediaCandidates(
  project: PortfolioProject,
  preferredCover: PreferredCover
): string[] {
  return getCardMediaCandidateRecords(project, preferredCover).map(
    (candidate) => candidate.src
  );
}

function getCardMediaCandidateRecords(
  project: PortfolioProject,
  preferredCover: PreferredCover
): Array<{ src: string; format: MediaFormat }> {
  const primaryCover =
    preferredCover === 'square' ? project.imageSquare : project.imageLandscape;
  const secondaryCover =
    preferredCover === 'square' ? project.imageLandscape : project.imageSquare;
  const primaryFormat =
    preferredCover === 'square'
      ? (project.imageSquareFormat ?? 'square')
      : (project.imageLandscapeFormat ?? 'landscape');
  const secondaryFormat =
    preferredCover === 'square'
      ? (project.imageLandscapeFormat ?? 'landscape')
      : (project.imageSquareFormat ?? 'square');

  const hasStructuredCover =
    Boolean(primaryCover || secondaryCover || project.image);
  const shouldPreferDedicatedCover =
    hasStructuredCover && isLegacyProjectMediaAsset(project.thumbnailMedia);

  const thumbnailCandidate: MediaCandidate = {
    src: project.thumbnailMedia,
    format: preferredCover,
    explicitFormat: project.thumbnailMediaFormat,
  };
  const primaryCandidate: MediaCandidate = {
    src: primaryCover,
    format: primaryFormat,
  };
  const secondaryCandidate: MediaCandidate = {
    src: secondaryCover,
    format: secondaryFormat,
  };
  const imageCandidate: MediaCandidate = {
    src: project.image,
    format: project.imageFormat ?? preferredCover,
  };
  const videoCandidate: MediaCandidate = {
    src: project.videoPreview,
    format: preferredCover,
    explicitFormat: project.videoPreviewFormat,
  };

  const orderedCandidates: MediaCandidate[] = shouldPreferDedicatedCover
    ? [
        primaryCandidate,
        secondaryCandidate,
        imageCandidate,
        thumbnailCandidate,
        videoCandidate,
      ]
    : [
        thumbnailCandidate,
        primaryCandidate,
        secondaryCandidate,
        imageCandidate,
        videoCandidate,
      ];

  return orderedCandidates
    .filter((candidate): candidate is MediaCandidate & { src: string } =>
      Boolean(candidate.src)
    )
    .map((candidate) => ({
      src: candidate.src,
      format: candidate.explicitFormat ?? candidate.format,
    }));
}

export function resolveProjectMedia(
  project: PortfolioProject,
  preferredCover: PreferredCover,
  options: { alt?: string; fit?: ProjectMedia['fit'] } = {}
): ProjectMedia | null {
  const candidate = getCardMediaCandidateRecords(project, preferredCover)[0];
  if (!candidate) return null;

  return {
    kind: isVideo(candidate.src) ? 'video' : 'image',
    src: candidate.src,
    format: candidate.format,
    fit: options.fit,
    alt: options.alt,
  };
}

export function getPreferredCoverForSlot(
  slot: MediaSlot,
  cardSize?: 'sm' | 'md' | 'lg' | 'wide' | 'tall'
): PreferredCover {
  if (slot === 'portfolio-card-mobile') return 'square';
  if (slot === 'home-featured') return 'landscape';
  return cardSize && ['lg', 'wide'].includes(cardSize) ? 'landscape' : 'square';
}
