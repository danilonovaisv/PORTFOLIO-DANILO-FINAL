import React from 'react';
import { render, waitFor } from '@testing-library/react';
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
      on: jest.fn(() => jest.fn()),
    },
  })),
  useSpring: jest.fn(() => ({
    get: () => 0,
    onChange: jest.fn(),
    destroy: jest.fn(),
    on: jest.fn(() => jest.fn()),
    set: jest.fn(),
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
    const { container } = render(<ManifestoThumb heroRef={heroRefMock} />);

    // Verifica se o container existe usando a nova classe
    const wrapper = container.querySelector('.video-wrapper');
    expect(wrapper).toBeInTheDocument();

    // Como o IO foi mockado para disparar, o vídeo deve estar presente após update de estado
    await waitFor(() => {
      const video = container.querySelector('video');
      expect(video).toBeInTheDocument();
    });
  });

  it('deve renderizar o vídeo com os atributos corretos', async () => {
    const heroRefMock = { current: document.createElement('div') };
    const { container } = render(<ManifestoThumb heroRef={heroRefMock} />);

    await waitFor(() => {
      const video = container.querySelector('video');
      expect(video).toBeInTheDocument();

      // Verifica atributos essenciais de vídeo
      expect(video).toHaveAttribute('playsInline');
      expect(video).toHaveAttribute('loop');
      // Not checking exact property values because JSDOM video implementation might vary or mocks might interfere
      // simple existence checks for attributes are often safer with raw DOM elements
    });
  });

  it('não deve exibir controles', async () => {
    const heroRefMock = { current: document.createElement('div') };
    const { container } = render(<ManifestoThumb heroRef={heroRefMock} />);

    await waitFor(() => {
      const video = container.querySelector('video');
      expect(video).toBeInTheDocument();
      expect(video).not.toHaveAttribute('controls');
    });
  });
});
