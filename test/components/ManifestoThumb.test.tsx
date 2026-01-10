import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ManifestoThumb from '@/components/home/hero/ManifestoThumb';

jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  useTransform: jest.fn(() => 1), // Returns constant for scale/borderRadius
  useMotionValueEvent: jest.fn(),
}));

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
    // Note: The aria-label in the component is "Preview em vídeo"
    const container = screen.getByLabelText('Preview em vídeo');
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
