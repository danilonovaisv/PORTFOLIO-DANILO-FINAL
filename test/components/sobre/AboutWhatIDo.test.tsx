import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AboutWhatIDo } from '@/components/sobre/sections/AboutWhatIDo';

const filterMotionProps = (props: Record<string, unknown>) => {
  const motionProps = [
    'whileHover',
    'whileTap',
    'whileFocus',
    'whileDrag',
    'whileInView',
    'variants',
    'initial',
    'animate',
    'exit',
    'transition',
    'layout',
    'layoutId',
    'viewport',
    'style',
  ];
  const filtered: Record<string, unknown> = {};

  Object.keys(props).forEach((key) => {
    if (!motionProps.includes(key)) {
      filtered[key] = props[key];
    }
  });

  return filtered;
};

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} {...filterMotionProps(props)}>
        {children}
      </div>
    ),
    article: ({ children, className, ...props }: any) => (
      <article className={className} {...filterMotionProps(props)}>
        {children}
      </article>
    ),
    li: ({ children, className, ...props }: any) => (
      <li className={className} {...filterMotionProps(props)}>
        {children}
      </li>
    ),
  },
  useScroll: jest.fn(() => ({ scrollYProgress: 0 })),
  useSpring: jest.fn((value) => value),
  useTransform: jest.fn(() => 0),
}));

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
    expect(headings[0]).not.toHaveClass('text-display');
    expect(headings[1]).toHaveClass('text-h2');
    expect(headings[1]).not.toHaveClass('text-display');

    const desktopSubtitle = screen.getAllByText(/Mesmo quando você não percebe\./i)[0];
    const mobileSubtitle = screen.getAllByText(/Mesmo quando você não percebe\./i)[1];

    expect(desktopSubtitle).toHaveClass('text-h2');
    expect(desktopSubtitle).not.toHaveClass('text-h1');
    expect(mobileSubtitle).toHaveClass('text-h3');
    expect(mobileSubtitle).not.toHaveClass('text-h2');
  });

  it('keeps desktop cards at body scale for better fit and readability', () => {
    const { container } = render(<AboutWhatIDo />);

    const desktopCards = container.querySelectorAll('article[data-what-i-do-card]');
    expect(desktopCards).toHaveLength(7);

    const number = desktopCards[0].querySelector('span[aria-hidden="true"]');
    const textBlock = desktopCards[0].querySelector('p');
    const keyword = desktopCards[0].querySelector('strong');
    const description = desktopCards[0].querySelector('span.mt-1');

    expect(number).toHaveClass('text-h3');
    expect(number).not.toHaveClass('text-display');
    expect(textBlock).toHaveClass('text-body-enhanced');
    expect(textBlock).not.toHaveClass('text-display');
    expect(keyword).toHaveClass('text-blueAccent');
    expect(description).toHaveClass('text-small');
  });
});
