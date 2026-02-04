'use client';

// Canonical Header Component
import SiteHeader from '@/components/layout/header/SiteHeader';
import { BRAND } from '@/config/brand';
import { NAVIGATION } from '@/config/navigation';

export default function Header() {
  return (
    <SiteHeader
      navItems={NAVIGATION.header || []}
      gradient={['rgba(0,87,255,0.55)', 'rgba(82,39,255,0.45)']}
      accentColor={BRAND.colors.bluePrimary}
    />
  );
}
