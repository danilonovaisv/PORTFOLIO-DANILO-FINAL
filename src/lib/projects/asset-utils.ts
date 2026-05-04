import { type AssetKind } from '@/components/projects/templates/types';
import type { LandingPageBlock } from '@/types/landing-page';

export const VIDEO_PATTERN = /\.(mp4|webm|ogg|mov)$/i;
export const YOUTUBE_HOST_WHITELIST = ['youtube.com', 'm.youtube.com'];
export const YOUTUBE_PATTERN =
  /(youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/)/i;

export const getYouTubeId = (url: string): string | null => {
  const candidate = url.trim();
  if (!candidate) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(candidate)) return candidate;

  const withProtocol = candidate.startsWith('http')
    ? candidate
    : `https://${candidate}`;

  try {
    const parsed = new URL(withProtocol);
    const host = parsed.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = parsed.pathname.replace('/', '');
      return id.length === 11 ? id : null;
    }

    if (YOUTUBE_HOST_WHITELIST.includes(host)) {
      const videoParam = parsed.searchParams.get('v');
      if (videoParam && videoParam.length === 11) return videoParam;

      const pathParts = parsed.pathname.split('/').filter(Boolean);
      const embedIndex = pathParts.findIndex(
        (part) => part === 'embed' || part === 'shorts' || part === 'v'
      );
      if (embedIndex >= 0) {
        const id = pathParts[embedIndex + 1];
        return id && id.length === 11 ? id : null;
      }
    }
  } catch {
    return null;
  }

  return null;
};

export const getAssetKind = (
  src?: string,
  mediaType?: LandingPageBlock['content']['mediaType']
): AssetKind => {
  const value = src ?? '';
  if (YOUTUBE_PATTERN.test(value)) return 'youtube';

  if (mediaType === 'youtube') return 'youtube';
  if (mediaType === 'video') return 'video';

  if (!value) return 'image';
  if (VIDEO_PATTERN.test(value)) return 'video';
  return 'image';
};
