'use client';

import React, { useCallback, useMemo, useState } from 'react';
import type { NavItem, SiteHeaderProps } from './types';
import DesktopFluidHeader from './DesktopFluidHeader';
import MobileStaggeredMenu from './MobileStaggeredMenu';
import { useActiveSection } from './useActiveSection';
import { useRouter } from 'next/navigation';

function isHashHref(href: string) {
  return href.startsWith('#');
}

function scrollToHash(hashHref: string) {
  const id = hashHref.replace('#', '');
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function isExternalHref(href: string) {
  return (
    /^https?:\/\//.test(href) ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  );
}

export default function SiteHeader({
  navItems,
  logoUrl,
  logoUrlMobile,
  gradient,
  accentColor,
  disableWebGL,
}: SiteHeaderProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const sectionIds = useMemo(
    () =>
      navItems
        .filter((n) => isHashHref(n.href))
        .map((n) => n.href.replace('#', '')),
    [navItems]
  );

  const activeHref = useActiveSection(sectionIds);

  const onNavigate = useCallback(
    (href: string) => {
      if (isHashHref(href)) {
        scrollToHash(href);
        setIsOpen(false);
        return;
      }

      if (isExternalHref(href)) {
        window.open(href, '_blank', 'noopener,noreferrer');
        setIsOpen(false);
        return;
      }

      router.push(href);
      setIsOpen(false);
    },
    [router]
  );

  const normalizedNavItems: NavItem[] = useMemo(() => navItems, [navItems]);

  return (
    <>
      <DesktopFluidHeader
        navItems={normalizedNavItems}
        logoUrl={logoUrl}
        accentColor={accentColor}
        disableWebGL={disableWebGL}
        onNavigate={onNavigate}
        activeHref={activeHref}
      />

      <MobileStaggeredMenu
        navItems={normalizedNavItems}
        logoUrl={logoUrlMobile || logoUrl}
        gradient={gradient}
        accentColor={accentColor}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
}
