import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ManifestoThumb from '@/components/home/hero/ManifestoThumb';

jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  useScroll: jest.fn(() => ({
    scrollYProgress: {
      get: () => 0,
      onChange: jest.fn(),
      destroy: jest.fn(),
      on: jest.fn(),
    },
  })),
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
    const { container } = render(<ManifestoThumb />);

    // Verifica se o container motion.div existe (sem aria-label conforme spec "zero UI")
    const motionDiv = container.querySelector('.fixed.z-40');
    expect(motionDiv).toBeInTheDocument();

    // Verifica se o vídeo está presente
    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
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
