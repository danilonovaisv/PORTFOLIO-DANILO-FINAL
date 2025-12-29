export interface NavItem {
  label: string;
  href: string; // "#hero" | "/sobre" | "/portfolio" etc
  external?: boolean;
}

export interface SiteHeaderProps {
  navItems: NavItem[];
  logoUrl: string;
  gradient: [string, string]; // mobile overlay gradient
  accentColor: string;
  disableWebGL?: boolean;
}
