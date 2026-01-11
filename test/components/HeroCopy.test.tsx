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

    // Find the Desktop H1 (hidden md:block)
    const desktopH1 = container.querySelector('h1.md\\:block');
    expect(desktopH1).toBeInTheDocument();
    expect(desktopH1).toHaveClass('hidden');
    expect(desktopH1).toHaveTextContent('Você não vê');
    expect(desktopH1).toHaveTextContent('o design.');

    // Find the Mobile H1 (md:hidden)
    const mobileH1 = container.querySelector('h1.md\\:hidden');
    expect(mobileH1).toBeInTheDocument();
    expect(mobileH1).toHaveTextContent('Você não');
    expect(mobileH1).toHaveTextContent('vê o');
    expect(mobileH1).toHaveTextContent('design.');
  });
});
