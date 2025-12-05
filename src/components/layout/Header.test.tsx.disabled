import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from './Header';
import { NAV_LINKS } from '../../lib/constants';

// Mock do Framer Motion para evitar complexidade de animação nos testes
vi.mock('framer-motion', () => ({
  motion: {
    header: ({ children, className, style, ...props }: any) => (
      <header className={className} style={style} {...props}>{children}</header>
    ),
    div: ({ children, className, onClick, ...props }: any) => (
      <div className={className} onClick={onClick} {...props}>{children}</div>
    ),
    li: ({ children, className, ...props }: any) => (
      <li className={className} {...props}>{children}</li>
    ),
  },
  useScroll: () => ({ scrollY: { get: () => 0, onChange: () => {} } }),
  useTransform: () => '0px',
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock do Lucide React
vi.mock('lucide-react', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    Menu: () => <span data-testid="menu-icon">Menu</span>,
    X: () => <span data-testid="close-icon">X</span>,
  }
})

describe('Header Component', () => {
  it('deve renderizar o logo corretamente', () => {
    render(<Header />);
    const logo = screen.getByRole('img', { name: /Danilo Novais/i });
    expect(logo).toBeInTheDocument();
  });

  it('deve renderizar todos os links de navegação desktop', () => {
    render(<Header />);
    
    // Filtra apenas os links visíveis no desktop (dentro do nav > ul)
    NAV_LINKS.forEach((link) => {
      // Usamos getAllByText porque o texto aparece tanto no desktop quanto no mobile menu (que está oculto mas renderizado no DOM ou mock)
      const links = screen.getAllByText(link.label);
      expect(links.length).toBeGreaterThan(0);
    });
  });

  it('deve alternar o menu mobile ao clicar no botão', () => {
    render(<Header />);
    
    // O menu mobile deve começar fechado
    // Verifica se o botão de menu está presente
    const toggleButton = screen.getByLabelText('Toggle menu');
    expect(toggleButton).toBeInTheDocument();
    
    // Verifica ícone de menu inicial
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();

    // Clica para abrir
    fireEvent.click(toggleButton);

    // Agora deve mostrar o ícone de fechar (X)
    expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('menu-icon')).not.toBeInTheDocument();

    // Clica para fechar
    fireEvent.click(toggleButton);

    // Deve voltar ao ícone de menu
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });
});
