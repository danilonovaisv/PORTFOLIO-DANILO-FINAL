import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ManifestoThumb from '@/components/home/ManifestoThumb';

// Mock do IntersectionObserver
beforeAll(() => {
  class MockIntersectionObserver {
    observe = jest.fn();
    disconnect = jest.fn();
    unobserve = jest.fn();
  }
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });

  // Mock para o window.matchMedia do useReducedMotion
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('ManifestoThumb Component', () => {
  it('deve renderizar a seção do manifesto corretamente', () => {
    render(<ManifestoThumb />);

    // Verifica se a section principal existe
    const section = screen.getByRole('region', { name: /manifesto/i });
    expect(section).toBeInTheDocument();

    // Verifica classes de layout
    expect(section).toHaveClass('pointer-events-none');
  });

  it('deve renderizar o vídeo com os atributos corretos de acessibilidade', () => {
    render(<ManifestoThumb />);

    // Procura o vídeo pelo aria-label definido no componente
    const video = screen.getByLabelText('Manifesto video presentation');
    expect(video).toBeInTheDocument();

    // Verifica atributos essenciais de vídeo
    expect(video).toHaveAttribute('playsInline');
    expect(video).toHaveAttribute('loop');
    expect((video as HTMLVideoElement).muted).toBe(true); // Verificamos a propriedade funcional
    expect((video as HTMLVideoElement).autoplay).toBe(true);
  });

  it('não deve exibir controles ou responder ao mouse', () => {
    render(<ManifestoThumb />);
    const video = screen.getByLabelText('Manifesto video presentation');
    expect(video).not.toHaveAttribute('controls');
  });
});
