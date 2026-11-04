// =============================================================================
// Centralized Video Assets — Ghost System v3.0 (Zero Egress CDN Architecture)
// =============================================================================
import { buildSupabaseStorageUrl } from '@/lib/supabase/urls';

const resolveVideo = (path: string, fallbackUrl: string): string => {
  return buildSupabaseStorageUrl('site-assets', path) ?? fallbackUrl;
};

export type ResponsiveVideoAsset = {
  desktop: string;
  mobile: string;
  desktopAspect: string;
  mobileAspect: string;
  fitPolicy: 'contain' | 'cover';
};

export const RESPONSIVE_VIDEOS = {
  homeManifesto: {
    desktop: resolveVideo(
      'home/video.manifesto.desk.mp4',
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/home/video.manifesto.desk.mp4'
    ),
    mobile: resolveVideo(
      'home/video.manifesto.mobile.mp4',
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/home/video.manifesto.mobile.mp4'
    ),
    desktopAspect: '752 / 423',
    mobileAspect: '1 / 1',
    fitPolicy: 'contain',
  },
  aboutHero: {
    desktop: resolveVideo(
      'about/hero/about.hero.desktop.compress.mp4',
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/hero/about.hero.desktop.compress.mp4'
    ),
    mobile: resolveVideo(
      'about/hero/about.hero.mobile.compress.mp4',
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/hero/about.hero.mobile.compress.mp4'
    ),
    desktopAspect: '16 / 9',
    mobileAspect: '9 / 16',
    fitPolicy: 'contain',
  },
  aboutClosing: {
    desktop: resolveVideo(
      'about/closing/video.closing.desk.mp4',
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/closing/video.closing.desk.mp4'
    ),
    mobile: resolveVideo(
      'about/closing/video.closing.mobile.mp4',
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/closing/video.closing.mobile.mp4'
    ),
    desktopAspect: '16 / 9',
    mobileAspect: '10 / 9',
    fitPolicy: 'contain',
  },
  aboutMethod: {
    desktop: resolveVideo(
      'about/method/about.method.desktop_video.mp4',
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/method/about.method.desktop_video.mp4'
    ),
    mobile: resolveVideo(
      'about/method/about.method.mobile_video.mp4',
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/method/about.method.mobile_video.mp4'
    ),
    desktopAspect: '16 / 9',
    mobileAspect: '1 / 1',
    fitPolicy: 'contain',
  },
  portfolioHero: {
    desktop: resolveVideo(
      'portfolio/hero/portfolio.hero_desktop_video.mp4',
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/portfolio/hero/portfolio.hero_desktop_video.mp4'
    ),
    mobile: resolveVideo(
      'portfolio/hero/portfolio.hero_mobile_video.mp4',
      'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/portfolio/hero/portfolio.hero_mobile_video.mp4'
    ),
    desktopAspect: '16 / 9',
    mobileAspect: '4 / 5',
    fitPolicy: 'cover',
  },
} as const satisfies Record<string, ResponsiveVideoAsset>;
