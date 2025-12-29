'use client';

import React from 'react';
import DesktopFluidHeader from './DesktopFluidHeader';
import MobileStaggeredMenu from './MobileStaggeredMenu';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function SiteHeader() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return isDesktop ? <DesktopFluidHeader /> : <MobileStaggeredMenu />;
}
