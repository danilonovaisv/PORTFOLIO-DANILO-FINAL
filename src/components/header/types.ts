export interface NavItem {
  label: string;
  href: string;
  ariaLabel: string;
  external?: boolean;
}

export interface SiteHeaderProps {
  navItems?: NavItem[];
  disableWebGL?: boolean;
  forcedMode?: 'desktop' | 'mobile';
  className?: string;
}

export interface DesktopFluidHeaderProps {
  navItems: NavItem[];
  glass: {
    ior: number;
    thickness: number;
    chromaticAberration: number;
    anisotropy: number;
    smoothness: number;
  };
  height?: number;
  onNavigate: (_href: string) => void;
  className?: string;
}

export interface MobileStaggeredMenuProps {
  navItems: NavItem[];
  logoUrl: string;
  gradient: [string, string];
  accentColor: string;
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
