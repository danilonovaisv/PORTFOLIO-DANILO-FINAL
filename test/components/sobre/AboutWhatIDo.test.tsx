import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AboutWhatIDo } from '@/components/sobre/sections/AboutWhatIDo';

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
        return React.createElement(tag, { ...props, className, ref }, children);
      }
    );
  };

  return {
    motion: {
      div: mockComponent('div'),
      article: mockComponent('article'),
      li: mockComponent('li'),
      ul: mockComponent('ul'),
      span: mockComponent('span'),
      p: mockComponent('p'),
      h2: mockComponent('h2'),
      nav: mockComponent('nav'),
      section: mockComponent('section'),
    },
    m: {
      div: mockComponent('div'),
      article: mockComponent('article'),
      li: mockComponent('li'),
      ul: mockComponent('ul'),
      span: mockComponent('span'),
      p: mockComponent('p'),
      h2: mockComponent('h2'),
      nav: mockComponent('nav'),
      section: mockComponent('section'),
    },
    useScroll: jest.fn(() => ({
      scrollYProgress: { get: () => 0, onChange: () => {} },
    })),
    useSpring: jest.fn((value) => value),
    useTransform: jest.fn(() => 0),
    AnimatePresence: ({ children }: any) => children,
    useReducedMotion: jest.fn(() => false),
  };
});

jest.mock('@/hooks/useMotionGate', () => ({
  useMotionGate: jest.fn(() => false),
}));

describe('AboutWhatIDo typography hierarchy', () => {
  it('applies section-scale header classes instead of oversized hero scale', () => {
    render(<AboutWhatIDo />);

    const headings = screen.getAllByRole('heading', {
      name: /Do\s+insight\s+ao\s+impacto\s*\./i,
    });

    expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveClass('text-h1');
    expect(headings[1]).toHaveClass('text-h2');

    const subtitles = screen.getAllByText(/Mesmo quando você não percebe\./i);
    expect(subtitles).toHaveLength(2);
    expect(subtitles[0]).toHaveClass('text-h2');
    expect(subtitles[1]).toHaveClass('text-h3');
  });

  it('renders all 7 service cards for desktop and mobile', () => {
    const { container } = render(<AboutWhatIDo />);

    // Each service has 2 li elements (one for desktop, one for mobile)
    const listItems = container.querySelectorAll('li');
    expect(listItems).toHaveLength(14);

    const _desktopCards = container.querySelectorAll(
      '.hidden.lg\\:block article'
    );
    // If cards are motion.li, they might not be articles.
    // Let's check the component source: it uses motion.li for desktop and motion.li for mobile.
    // Wait, the component says SERVICES.map((service, index) => (<motion.li ...>)) in BOTH layouts.
    // In desktop layout, it's motion.ul > motion.li.
    // In mobile layout, it's ul > motion.li.

    // Let's count all li elements.
    expect(container.querySelectorAll('li')).toHaveLength(14);

    // Check desktop cards scale (first 7)
    const cards = container.querySelectorAll('li');
    const firstCard = cards[0];

    // Check classes based on component source
    const number = firstCard.querySelector('span[aria-hidden="true"]');
    expect(number).toHaveClass('text-h3');

    const p = firstCard.querySelector('p');
    expect(p).toHaveClass('text-body-enhanced');
  });
});
