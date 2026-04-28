// ============================================================================
// src/components/header/types.ts
// Tipos públicos do sistema de Header (mantendo a API descrita na especificação)
// ============================================================================

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SiteHeaderProps {
  navItems: NavItem[];
  logoUrl?: string;
  logoUrlMobile?: string;
  gradient: [string, string]; // gradiente principal para mobile
  accentColor: string;
  reducedMotion?: boolean;
}

export interface MobileStaggeredMenuProps {
  navItems: NavItem[];
  logoUrl: string;
  isLight?: boolean;
  gradient?: [string, string];
  accentColor?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: (_href: string) => void;
  activeHref?: string;
}
