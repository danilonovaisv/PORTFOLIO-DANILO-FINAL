import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroCopy from '@/components/home/hero/HeroCopy';

// Filter out Framer Motion specific props
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
  ];
  const filtered: Record<string, unknown> = {};
  Object.keys(props).forEach((key) => {
    if (!motionProps.includes(key)) {
      filtered[key] = props[key];
    }
  });
  return filtered;
};

// Mock Framer Motion to render children immediately
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} {...filterMotionProps(props)}>
        {children}
      </div>
    ),
    span: ({ children, className, ...props }: any) => (
      <span className={className} {...filterMotionProps(props)}>
        {children}
      </span>
    ),
    h1: ({ children, className, ...props }: any) => (
      <h1 className={className} {...filterMotionProps(props)}>
        {children}
      </h1>
    ),
    h2: ({ children, className, ...props }: any) => (
      <h2 className={className} {...filterMotionProps(props)}>
        {children}
      </h2>
    ),
    svg: ({ children, className, ...props }: any) => (
      <svg className={className} {...filterMotionProps(props)}>
        {children}
      </svg>
    ),
  },
  useMotionValue: jest.fn(),
  useTransform: jest.fn(),
  animate: jest.fn(() => ({ stop: jest.fn() })),
  useReducedMotion: jest.fn(() => false),
}));

describe('HeroCopy Component Responsiveness', () => {
  it('should render both Desktop and Mobile text blocks with correct visibility classes', () => {
    const { container } = render(<HeroCopy />);

    // Verify SEO/Semantic H1
    const srH1 = container.querySelector('h1.sr-only');
    expect(srH1).toBeInTheDocument();
    expect(srH1).toHaveTextContent('Você não vê o design. Mas ele vê você.');

    // Find the Desktop Visual Block (div.hidden.lg:block)
    // Note: We search for the div that has both 'hidden' and 'lg:block' classes
    const desktopVisual = container.querySelector('div.hidden.lg\\:block');
    expect(desktopVisual).toBeInTheDocument();
    expect(desktopVisual).toHaveTextContent('Você não vê');
    expect(desktopVisual).toHaveTextContent('o design.');

    // Find the Mobile Visual Block (div.lg:hidden)
    const mobileVisual = container.querySelector('div.lg\\:hidden');
    expect(mobileVisual).toBeInTheDocument();
    expect(mobileVisual).toHaveTextContent('Você não');
    expect(mobileVisual).toHaveTextContent('vê o');
    expect(mobileVisual).toHaveTextContent('design.');
  });
});
