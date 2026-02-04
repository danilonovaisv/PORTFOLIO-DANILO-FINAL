'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { BRAND } from '@/config/brand';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useSiteAssetUrl } from '@/contexts/site-assets';
import { SITE_ASSET_KEYS } from '@/config/site-assets';

import type { NavItem, SiteHeaderProps } from './types';
import DesktopFluidHeader from './DesktopFluidHeader';
import MobileStaggeredMenu from './MobileStaggeredMenu';
import { useActiveSection } from './useActiveSection';

function isHashHref(href: string) {
  return href.startsWith('#') || href.startsWith('/#');
}

function getHashFromHref(href: string) {
  if (href.startsWith('/#')) return href.substring(1);
  if (href.startsWith('#')) return href;
  return '';
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
  gradient,
  accentColor,
}: SiteHeaderProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isOnLightSection, setIsOnLightSection] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Hydration safety
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sectionIds = useMemo(
    () =>
      navItems
        .filter((n) => isHashHref(n.href))
        .map((n) => getHashFromHref(n.href).replace('#', '')),
    [navItems]
  );

  const activeSection = useActiveSection(sectionIds);
  const pathname = usePathname();

  const activeHref = useMemo(() => {
    if (pathname === '/') return activeSection;
    return pathname ?? undefined;
  }, [pathname, activeSection]);

  const isSobrePage = pathname?.startsWith('/sobre');

  const onNavigate = useCallback(
    (href: string) => {
      const hash = getHashFromHref(href);

      if (hash) {
        const isHomePage = window.location.pathname === '/';
        const isTargetingCurrentPageHash =
          href.startsWith('#') || (href.startsWith('/#') && isHomePage);

        if (isTargetingCurrentPageHash) {
          scrollToHash(hash);
          setIsOpen(false);
          return;
        }
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

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-light-section]')
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isLight = entries.some((e) => e.isIntersecting);
        setIsOnLightSection(isLight);
      },
      { threshold: 0.12, rootMargin: '-60px 0px 0px 0px' }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const logoUrl =
    useSiteAssetUrl(
      SITE_ASSET_KEYS.logos.headerLight,
      BRAND.assets.logos.logoLight
    ) ?? BRAND.assets.logos.logoLight;
  const logoDesktop = logoUrl;
  const logoMobile = logoUrl;

  if (!isMounted) return null;

  return (
    <>
      {isDesktop ? (
        <DesktopFluidHeader
          navItems={normalizedNavItems}
          logoUrl={logoDesktop}
          isLight={isOnLightSection}
          isPageActive={isSobrePage}
          onNavigate={onNavigate}
          activeHref={activeHref}
        />
      ) : (
        <MobileStaggeredMenu
          navItems={normalizedNavItems}
          logoUrl={logoMobile}
          isLight={isOnLightSection}
          gradient={gradient}
          accentColor={accentColor}
          isOpen={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          onNavigate={onNavigate}
          activeHref={activeHref}
          isPageActive={isSobrePage}
        />
      )}
    </>
  );
}
