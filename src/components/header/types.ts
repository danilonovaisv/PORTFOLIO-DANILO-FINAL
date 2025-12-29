export interface NavItem {
  label: string;
  href: string; // "#hero" | "/sobre" | "/portfolio" etc
  external?: boolean;
}

export interface SiteHeaderProps {
  navItems: NavItem[];
  logoUrl: string; // Logo para desktop
  logoUrlMobile?: string; // Logo opcional para mobile (se não fornecido, usa logoUrl)
  gradient: [string, string]; // mobile overlay gradient
  accentColor: string;
  disableWebGL?: boolean;
}
