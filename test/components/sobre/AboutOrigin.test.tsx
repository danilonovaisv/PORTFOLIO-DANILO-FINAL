import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AboutOrigin } from '@/components/sobre/sections/AboutOrigin';
import {
  ORIGIN_CHAPTERS,
  ORIGIN_INTRO,
  ORIGIN_BRIDGE,
} from '@/components/sobre/origin/data';

jest.mock('motion/react', () => {
  const React = require('react');
  const mockComponent = (tag: string) => {
    return React.forwardRef(
      (
        {
          children,
          className,
          whileHover: _whileHover,
          whileTap: _whileTap,
          whileInView: _whileInView,
          initial: _initial,
          animate: _animate,
          exit: _exit,
          transition: _transition,
          variants: _variants,
          viewport: _viewport,
          layout: _layout,
          layoutId: _layoutId,
          style: _style,
          onAnimationStart: _onAnimationStart,
          onAnimationComplete: _onAnimationComplete,
          onUpdate: _onUpdate,
          ...props
        }: any,
        ref: any
      ) => {
        return React.createElement(
          tag,
          { ...props, className, ref, style: _style },
          children
        );
      }
    );
  };

  return {
    motion: new Proxy(
      {},
      {
        get: (_target, prop: string) => mockComponent(prop),
      }
    ),
    m: new Proxy(
      {},
      {
        get: (_target, prop: string) => mockComponent(prop),
      }
    ),
    AnimatePresence: ({ children }: any) => children,
    useReducedMotion: jest.fn(() => false),
  };
});

jest.mock('@/hooks/useMotionGate', () => ({
  useMotionGate: jest.fn(() => false),
}));

jest.mock('@/contexts/site-assets', () => ({
  useSiteAssetUrl: jest.fn((_key: string) => undefined),
}));

jest.mock('gsap', () => {
  const mockTimeline = {
    addLabel: jest.fn().mockReturnThis(),
    to: jest.fn().mockReturnThis(),
    fromTo: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
  };

  return {
    registerPlugin: jest.fn(),
    timeline: jest.fn(() => mockTimeline),
    to: jest.fn(),
    fromTo: jest.fn(),
    set: jest.fn(),
    context: jest.fn((fn: () => void) => {
      fn();
      return { revert: jest.fn() };
    }),
    matchMedia: jest.fn(() => ({
      add: jest.fn((_query: string, fn: () => void) => {
        fn();
      }),
      revert: jest.fn(),
    })),
  };
});

jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    registerPlugin: jest.fn(),
    create: jest.fn(() => ({ kill: jest.fn() })),
    getById: jest.fn(() => null),
  },
}));

jest.mock('gsap/dist/CustomEase', () => ({
  CustomEase: {
    create: jest.fn((_name: string, _ease: string) => 'customEase'),
  },
}));

describe('AboutOrigin — Cinema Reel Component & TDD Verification', () => {
  it('renders section container, editorial header, and narrative bridge', () => {
    render(<AboutOrigin />);

    // Section container
    const section = document.getElementById('origem-criativa');
    expect(section).toBeInTheDocument();

    // Section header
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: new RegExp(ORIGIN_INTRO.headline, 'i'),
      })
    ).toBeInTheDocument();
    expect(screen.getByText(ORIGIN_INTRO.description)).toBeInTheDocument();

    // Section bridge
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: new RegExp(ORIGIN_BRIDGE.headline, 'i'),
      })
    ).toBeInTheDocument();
    expect(screen.getByText(ORIGIN_BRIDGE.text)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: new RegExp(ORIGIN_BRIDGE.ctaText, 'i') })
    ).toHaveAttribute('href', ORIGIN_BRIDGE.ctaHref);
  });

  it('renders all 4 cinema reel chapter stage frames with proper aspect ratio and fallback URLs', () => {
    const { container } = render(<AboutOrigin />);

    const frames = container.querySelectorAll('[data-origin-frame]');
    expect(frames).toHaveLength(4);

    ORIGIN_CHAPTERS.forEach((chapter, index) => {
      const frame = frames[index];
      expect(frame).toBeInTheDocument();

      // Check chapter code and titles
      expect(frame).toHaveTextContent(chapter.chapter);
      expect(frame).toHaveTextContent(chapter.category);

      // Check image element with dimensions
      const img = frame.querySelector('img[data-origin-parallax-img]');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('width', String(chapter.dimensions.width));
      expect(img).toHaveAttribute('height', String(chapter.dimensions.height));
      // Fallback or Supabase URL verification
      expect(img).toHaveAttribute('src', chapter.supabaseUrl);
    });
  });

  it('verifies alternating composition layout across chapters', () => {
    const { container } = render(<AboutOrigin />);

    const frames = container.querySelectorAll('[data-origin-frame]');
    expect(frames).toHaveLength(4);

    // Chapter 01 (textAlign: 'left'): narrative on left (lg:order-1)
    const frame01Narrative = frames[0].querySelector('.lg\\:col-span-8');
    expect(frame01Narrative).toHaveClass('lg:order-1');

    // Chapter 02 (textAlign: 'right'): narrative on right (lg:order-2)
    const frame02Narrative = frames[1].querySelector('.lg\\:col-span-8');
    expect(frame02Narrative).toHaveClass('lg:order-2');

    // Chapter 03 (textAlign: 'left'): narrative on left (lg:order-1)
    const frame03Narrative = frames[2].querySelector('.lg\\:col-span-8');
    expect(frame03Narrative).toHaveClass('lg:order-1');

    // Chapter 04 (textAlign: 'right'): narrative on right (lg:order-2)
    const frame04Narrative = frames[3].querySelector('.lg\\:col-span-8');
    expect(frame04Narrative).toHaveClass('lg:order-2');
  });

  it('opens and closes the DetailsPanel drawer when Trajetória Completa button is clicked', () => {
    render(<AboutOrigin />);

    // Click "Trajetória Completa" explore button on first frame
    const exploreButtons = screen.getAllByRole('button', {
      name: /Trajetória Completa/i,
    });
    expect(exploreButtons.length).toBeGreaterThan(0);

    fireEvent.click(exploreButtons[0]);

    // Drawer aside element should now be present
    const drawer = screen.getByRole('complementary', {
      name: new RegExp(`Detalhes: ${ORIGIN_CHAPTERS[0].title}`, 'i'),
    });
    expect(drawer).toBeInTheDocument();
    expect(
      within(drawer).getByRole('heading', {
        name: new RegExp(ORIGIN_CHAPTERS[0].title, 'i'),
      })
    ).toBeInTheDocument();
    expect(
      within(drawer).getByText(ORIGIN_CHAPTERS[0].story)
    ).toBeInTheDocument();

    // Close button
    const closeButton = within(drawer).getByRole('button', {
      name: /Fechar detalhes/i,
    });
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
  });
});
