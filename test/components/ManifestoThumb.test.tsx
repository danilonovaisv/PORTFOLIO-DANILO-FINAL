import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ManifestoThumb from '@/components/home/hero/ManifestoThumb';

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

    // Verifica se o container principal existe pelo label acessível
    const container = screen.getByLabelText('Assistir manifesto em fullscreen');
    expect(container).toBeInTheDocument();
  });

  it('deve renderizar o vídeo com os atributos corretos', () => {
    const { container } = render(<ManifestoThumb />);

    // Procura o vídeo dentro do componente
    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();

    // Verifica atributos essenciais de vídeo
    expect(video).toHaveAttribute('playsInline');
    expect(video).toHaveAttribute('loop');
    expect((video as HTMLVideoElement).muted).toBe(true);
    expect((video as HTMLVideoElement).autoplay).toBe(true);
  });

  it('não deve exibir controles', () => {
    const { container } = render(<ManifestoThumb />);
    const video = container.querySelector('video');
    expect(video).not.toHaveAttribute('controls');
  });
});
