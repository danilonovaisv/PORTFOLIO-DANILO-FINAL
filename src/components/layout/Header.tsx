'use client';

// Canonical Header Component
import SiteHeader from '@/components/layout/header/SiteHeader';
import { BRAND } from '@/config/brand';
import { NAVIGATION } from '@/config/navigation';

export default function Header() {
  return (
    <SiteHeader
      navItems={NAVIGATION.header || []}
      gradient={['rgba(0,72,255,0.55)', 'rgba(79,230,255,0.35)']}
      accentColor={BRAND.colors.bluePrimary}
    />
  );
}
