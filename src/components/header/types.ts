export interface NavItem {
  label: string;
  href: string;
  ariaLabel: string;
  external?: boolean;
}

export interface SiteHeaderProps {
  navItems?: NavItem[];
  logoUrl?: string; // Optional, defaults to BRAND
  gradient?: [string, string]; // defaults to dark theme
  accentColor?: string; // defaults to primary
  disableWebGL?: boolean;
  reducedMotion?: boolean;
  forcedMode?: 'desktop' | 'mobile';
  className?: string;
}

export interface DesktopFluidHeaderProps {
  navItems: NavItem[];
  logoUrl?: string;
  height?: number;
  onNavigate: (_href: string) => void;
  supportsWebGL?: boolean;
  glass: {
    ior: number;
    thickness: number;
    chromaticAberration: number;
    anisotropy: number;
    smoothness: number;
    maxTranslateX?: number;
    followDamping?: number;
  };
  className?: string;
}

export interface MobileStaggeredMenuProps {
  navItems: NavItem[];
  logoUrl: string;
  gradient: [string, string];
  accentColor: string;
  isOpen?: boolean; // Controlled from parent if needed, but usually internal state in previous implem. Spec says "controlado pelo SiteHeader" but current impl has state inside. We will lift state up if requested, but for now lets keep props flexible. actually spec says "isOpen: boolean // controlado pelo SiteHeader".
  isFixed?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  className?: string;
}

export interface HeaderFallbackProps {
  navItems: NavItem[];
  logoUrl: string;
  className?: string;
}
