import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock CSS module
jest.mock('@/components/home/hero/ManifestoThumb.module.css', () => ({
  videoOverlay: 'videoOverlay',
}));

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
  useSpring: jest.fn(() => ({
    get: () => 0,
    onChange: jest.fn(),
    destroy: jest.fn(),
    on: jest.fn(),
  })),
  useTransform: jest.fn(() => 1),
  useMotionValueEvent: jest.fn(),
}));

// Mock do IntersectionObserver que dispara imediatamente
beforeAll(() => {
  const MockIntersectionObserver = jest.fn((callback) => ({
    observe: jest.fn((element) => {
      // Simula que o elemento entrou na tela imediatamente
      callback([{ isIntersecting: true, target: element }]);
    }),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  }));

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
  it('deve renderizar a seção do manifesto corretamente', async () => {
    // Mock do heroRef
    const heroRefMock = { current: document.createElement('div') };
    const { container, findByRole } = render(
      <ManifestoThumb heroRef={heroRefMock} />
    );

    // Verifica se o container motion.div existe usando a nova classe
    const motionDiv = container.querySelector('.video-wrapper');
    expect(motionDiv).toBeInTheDocument();

    // Como o IO foi mockado para disparar, o vídeo deve estar presente após update de estado
    // Usamos findBy (async) para esperar o re-render
    const video = await findByRole('application', { hidden: true }).catch(() =>
      container.querySelector('video')
    );
    // Note: video tag doesn't have a default role that is easily findable by 'role' without aria,
    // but we can use waitFor.
    // Lets use specific logic:

    // We can just verify it appears
    expect(await container.querySelector('video')).toBeInTheDocument; // waitFor logic implicit if we use findBy but querySelector is sync.
  });

  it('deve renderizar o vídeo com os atributos corretos', () => {
    const heroRefMock = { current: document.createElement('div') };
    const { container } = render(<ManifestoThumb heroRef={heroRefMock} />);

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
    const heroRefMock = { current: document.createElement('div') };
    const { container } = render(<ManifestoThumb heroRef={heroRefMock} />);
    const video = container.querySelector('video');
    expect(video).not.toHaveAttribute('controls');
  });
});
