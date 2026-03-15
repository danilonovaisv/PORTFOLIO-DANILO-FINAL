import type { NavItem } from '@/components/layout/header/types';

function normalizePathname(pathname?: string | null) {
  if (!pathname) return '/';
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed.length > 0 ? trimmed : '/';
}

function hasNavItem(navItems: NavItem[], href: string) {
  return navItems.some((item) => item.href === href);
}

export function resolveActiveNavHref(
  pathname: string | null | undefined,
  activeSection: string | undefined,
  navItems: NavItem[]
) {
  const normalizedPath = normalizePathname(pathname);

  if (normalizedPath === '/') {
    if (
      (activeSection === '#contact' || activeSection === '/#contact') &&
      hasNavItem(navItems, '/#contact')
    ) {
      return '/#contact';
    }

    return hasNavItem(navItems, '/') ? '/' : undefined;
  }

  if (normalizedPath.startsWith('/sobre') && hasNavItem(navItems, '/sobre')) {
    return '/sobre';
  }

  if (
    (normalizedPath.startsWith('/portfolio') ||
      normalizedPath.startsWith('/projects')) &&
    hasNavItem(navItems, '/portfolio')
  ) {
    return '/portfolio';
  }

  const directMatch = navItems.find(
    (item) => normalizePathname(item.href) === normalizedPath
  );

  return directMatch?.href;
}

export function isNavItemActive(itemHref: string, activeHref?: string) {
  return itemHref === activeHref;
}
