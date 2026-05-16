'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { BRAND } from '@/config/brand';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useSiteAssetUrl } from '@/contexts/site-assets';
import { SITE_ASSET_KEYS } from '@/config/site-assets';

import type {
  NavItem,
  SiteHeaderProps,
} from '@/components/layout/header/types';
import DesktopFluidHeader from '@/components/layout/header/DesktopFluidHeader';
import MobileStaggeredMenu from '@/components/layout/header/MobileStaggeredMenu';
import { useActiveSection } from '@/components/layout/header/useActiveSection';
import { resolveActiveNavHref } from '@/components/layout/header/nav-state';

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
  if (!el) return false;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
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
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        document.documentElement.style.setProperty(
          '--header-height',
          `${entry.target.clientHeight}px`
        );
      }
    });
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);
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
  const normalizedNavItems: NavItem[] = useMemo(() => navItems, [navItems]);

  const activeHref = useMemo(
    () => resolveActiveNavHref(pathname, activeSection, normalizedNavItems),
    [pathname, activeSection, normalizedNavItems]
  );

  const onNavigate = useCallback(
    (href: string) => {
      const hash = getHashFromHref(href);

      if (hash) {
        const isHomePage = window.location.pathname === '/';
        const isTargetingCurrentPageHash =
          href.startsWith('#') || (href.startsWith('/#') && isHomePage);

        if (isTargetingCurrentPageHash) {
          setIsOpen(false);

          window.requestAnimationFrame(() => {
            const didScroll = scrollToHash(hash);
            if (!didScroll && hash === '#contact') {
              router.push('/#contact');
            }
          });
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

  const headerLogoLight =
    useSiteAssetUrl(
      SITE_ASSET_KEYS.logos.headerLight,
      BRAND.assets.logos.logoLight
    ) ?? BRAND.assets.logos.logoLight;
  const headerLogoDark =
    useSiteAssetUrl(
      SITE_ASSET_KEYS.logos.headerDark,
      BRAND.assets.logos.logoDark
    ) ?? BRAND.assets.logos.logoDark;
  const logoUrl = isOnLightSection ? headerLogoDark : headerLogoLight;
  const logoDesktop = logoUrl;
  const logoMobile = logoUrl;

  if (!isMounted) return null;

  return (
    <>
      {isDesktop ? (
        <DesktopFluidHeader
          ref={headerRef}
          navItems={normalizedNavItems}
          logoUrl={logoDesktop}
          isLight={isOnLightSection}
          onNavigate={onNavigate}
          activeHref={activeHref}
          accentColor={accentColor}
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
        />
      )}
    </>
  );
}
