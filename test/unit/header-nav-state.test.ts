import {
  isNavItemActive,
  resolveActiveNavHref,
} from '@/components/layout/header/nav-state';

const navItems = [
  { label: 'home', href: '/' },
  { label: 'sobre', href: '/sobre' },
  { label: 'portfólio', href: '/portfolio' },
  { label: 'contato', href: '/#contact' },
];

describe('header nav state', () => {
  it('destaca home na raiz quando nao ha secao especial ativa', () => {
    expect(resolveActiveNavHref('/', '#hero', navItems)).toBe('/');
  });

  it('destaca contato quando a secao de contato esta ativa na home', () => {
    expect(resolveActiveNavHref('/', '#contact', navItems)).toBe('/#contact');
  });

  it('destaca sobre na rota dedicada', () => {
    expect(resolveActiveNavHref('/sobre', undefined, navItems)).toBe('/sobre');
  });

  it('destaca portfolio em rotas internas de case', () => {
    expect(resolveActiveNavHref('/projects/case-alpha', undefined, navItems)).toBe(
      '/portfolio'
    );
  });

  it('compara item ativo de forma direta e padronizada', () => {
    expect(isNavItemActive('/portfolio', '/portfolio')).toBe(true);
    expect(isNavItemActive('/sobre', '/portfolio')).toBe(false);
  });
});
