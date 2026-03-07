'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';

type ResponsiveCaptionTrackProps = {
  src: string;
  srcLang?: string;
  label?: string;
  hideOnMobile?: boolean;
};

export function ResponsiveCaptionTrack({
  src,
  srcLang = 'pt-BR',
  label = 'Português',
  hideOnMobile = true,
}: ResponsiveCaptionTrackProps) {
  const isMobile = useMediaQuery('(max-width: 767px)');

  if (!src || (hideOnMobile && isMobile)) {
    return null;
  }

  return <track kind="captions" src={src} srcLang={srcLang} label={label} />;
}
