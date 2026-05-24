// =============================================================================
// Centralized Video Assets
// =============================================================================
// Supabase Storage public URLs are the source of truth for critical videos.
// Firebase deploys the app shell and validates these URLs before deployment.

export type ResponsiveVideoAsset = {
  desktop: string;
  mobile: string;
  desktopAspect: string;
  mobileAspect: string;
  fitPolicy: 'contain' | 'cover';
};

export const RESPONSIVE_VIDEOS = {
  homeManifesto: {
    desktop:
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/home/video.manifesto.desk.mp4',
    mobile:
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/home/video.manifesto.mobile.mp4',
    desktopAspect: '752 / 423',
    mobileAspect: '1 / 1',
    fitPolicy: 'contain',
  },
  aboutHero: {
    desktop:
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/hero/about.hero.desktop.compress.mp4',
    mobile:
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/hero/about.hero.mobile.compress.mp4',
    desktopAspect: '16 / 9',
    mobileAspect: '9 / 16',
    fitPolicy: 'contain',
  },
  aboutClosing: {
    desktop:
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/closing/video.closing.desk.mp4',
    mobile:
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/closing/video.closing.mobile.mp4',
    desktopAspect: '16 / 9',
    mobileAspect: '10 / 9',
    fitPolicy: 'contain',
  },
  aboutMethod: {
    desktop:
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/method/about.method.desktop_video.mp4',
    mobile:
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/method/about.method.mobile_video.mp4',
    desktopAspect: '16 / 9',
    mobileAspect: '1 / 1',
    fitPolicy: 'contain',
  },
  portfolioHero: {
    desktop:
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/portfolio/hero/portfolio.hero_desktop_video.mp4',
    mobile:
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/portfolio/hero/portfolio.hero_mobile_video.mp4',
    desktopAspect: '16 / 9',
    mobileAspect: '4 / 5',
    fitPolicy: 'cover',
  },
} as const satisfies Record<string, ResponsiveVideoAsset>;

export const CRITICAL_VIDEO_URLS = Object.values(RESPONSIVE_VIDEOS).flatMap(
  (asset) => [asset.desktop, asset.mobile]
);
