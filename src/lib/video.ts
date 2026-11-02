import { COLORS } from '@/config/colors';

export const DEFAULT_VIDEO_POSTER = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${COLORS.background}"/>
        <stop offset="50%" stop-color="${COLORS.neutral}"/>
        <stop offset="100%" stop-color="${COLORS.background}"/>
      </linearGradient>
    </defs>
    <rect width="1600" height="900" fill="url(#g)"/>
  </svg>`
)}`;

export const DEFAULT_CAPTIONS = '/captions/ambient.vtt';
