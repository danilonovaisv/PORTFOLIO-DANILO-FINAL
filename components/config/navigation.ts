export type MainRouteId = 'home' | 'sobre' | 'portfolio' | 'contato';

export interface RouteConfig {
  id: MainRouteId;
  path: string;
  label: string;
  anchor?: string;
}

export const MAIN_ROUTES: RouteConfig[] = [
  {
    id: 'home',
    path: '/',
    label: 'home',
    anchor: '#hero',
  },
  {
    id: 'sobre',
    path: '/sobre',
    label: 'sobre',
    anchor: '#Sobre',
  },
  {
    id: 'portfolio',
    path: '/portfolio',
    label: 'portfólio showcase',
    anchor: '#portfolio-showcase',
  },
  {
    id: 'contato',
    path: '/',
    label: 'contato',
    anchor: '#contact',
  },
];
