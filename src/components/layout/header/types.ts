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
  logoUrl: string;
  logoUrlMobile?: string;
  gradient: [string, string]; // gradiente principal para mobile
  accentColor: string;
  disableWebGL?: boolean;
  reducedMotion?: boolean;
}

export interface DesktopFluidHeaderProps {
  navItems: NavItem[];
  logoUrl: string;
  height?: number;
  onNavigate: (_href: string) => void;
  activeHref?: string;
  glass?: {
    ior?: number;
    thickness?: number;
    chromaticAberration?: number;
    anisotropy?: number;
    smoothness?: number;
    maxTranslateX?: number;
    followDamping?: number;
  };
}

export interface MobileStaggeredMenuProps {
  navItems: NavItem[];
  logoUrl: string;
  gradient: [string, string];
  accentColor: string;
  isOpen: boolean;
  isFixed?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onNavigate?: (_href: string) => void;
  staggerDelay?: number;
}
