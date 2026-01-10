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

    // Find the main H1
    const h1 = container.querySelector('h1');
    expect(h1).toBeInTheDocument();

    // Check for Mobile Wrapper (md:hidden)
    const mobileWrapper = h1?.querySelector('.md\\:hidden');
    expect(mobileWrapper).toBeInTheDocument();
    expect(mobileWrapper).toHaveTextContent('Você não');
    expect(mobileWrapper).toHaveTextContent('vê o');
    expect(mobileWrapper).toHaveTextContent('design.');

    // Check for Desktop Wrapper (hidden md:block)
    const desktopWrapper = h1?.querySelector('.md\\:block');
    expect(desktopWrapper).toBeInTheDocument();
    expect(desktopWrapper).toHaveClass('hidden');
    expect(desktopWrapper).toHaveTextContent('Você não vê');
    expect(desktopWrapper).toHaveTextContent('o design.');
  });
});
