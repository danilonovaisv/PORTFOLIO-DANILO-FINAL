'use client';

import React, { useMemo } from 'react';
import DesktopFluidHeader from './DesktopFluidHeader';
import { headerTokens } from '@/components/header/headerTokens.ts';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';
import type { SiteHeaderProps } from './types';
import { BRAND } from '@/config/brand';
import { NAVIGATION } from '@/config/navigation';

export default function SiteHeader({
  navItems,
  logoUrl,
  disableWebGL,
  reducedMotion,
  className,
}: SiteHeaderProps) {
  const supportsWebGL = useWebGLSupport();
  const prefersReducedMotion = usePrefersReducedMotion();
  const allowWebGL =
    supportsWebGL && !disableWebGL && !reducedMotion && !prefersReducedMotion;

  const items = useMemo(
    () => {
      // Use props if provided, otherwise config
      if (navItems && navItems.length > 0) return navItems;
      return NAVIGATION.header.map(link => ({
        ...link,
        ariaLabel: `Ir para ${link.label}`
      }));
    },
    [navItems]
  );

  return (
    <DesktopFluidHeader
      navItems={items}
      supportsWebGL={allowWebGL}
      glass={{
        ior: 1.15,
        thickness: 2,
        chromaticAberration: 0.05,
        anisotropy: 0.01,
        smoothness: 0.9,
        followDamping: headerTokens.motion.glass.followDamping,
        maxTranslateX: headerTokens.motion.glass.maxTranslateX,
      }}
      height={headerTokens.layout.height}
      onNavigate={() => undefined}
      className={className}
    />
  );
}
