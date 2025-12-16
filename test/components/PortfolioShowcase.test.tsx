// @ts-nocheck
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, jest } from '@jest/globals';
import PortfolioShowcaseSection from '../../src/components/home/PortfolioShowcase';
import { CATEGORIES } from '../../src/lib/constants';

// Mock do Framer Motion para evitar complexidade de animação nos testes
jest.mock('framer-motion', () => ({
  motion: {
    create: (Component: any) => {
      return ({ children, ...props }: any) => {
        const validProps = { ...props };
        [
          'initial',
          'whileInView',
          'viewport',
          'variants',
          'animate',
          'transition',
          'exit',
          'layout',
          'custom',
          'whileHover',
          'whileTap',
        ].forEach((prop) => delete validProps[prop]);
        return <Component {...validProps}>{children}</Component>;
      };
    },
    section: ({ children, ...props }: any) => {
      const validProps = { ...props };
      [
        'initial',
        'whileInView',
        'viewport',
        'variants',
        'animate',
        'transition',
        'exit',
        'layout',
        'custom',
        'whileHover',
        'whileTap',
      ].forEach((prop) => delete validProps[prop]);
      return <section {...validProps}>{children}</section>;
    },
    div: ({ children, ...props }: any) => {
      const validProps = { ...props };
      [
        'initial',
        'whileInView',
        'viewport',
        'variants',
        'animate',
        'transition',
        'exit',
        'layout',
        'custom',
        'whileHover',
        'whileTap',
      ].forEach((prop) => delete validProps[prop]);
      return <div {...validProps}>{children}</div>;
    },
    h2: ({ children, ...props }: any) => {
      const validProps = { ...props };
      [
        'initial',
        'whileInView',
        'viewport',
        'variants',
        'animate',
        'transition',
        'exit',
        'layout',
        'custom',
        'whileHover',
        'whileTap',
      ].forEach((prop) => delete validProps[prop]);
      return <h2 {...validProps}>{children}</h2>;
    },
    h3: ({ children, ...props }: any) => {
      const validProps = { ...props };
      [
        'initial',
        'whileInView',
        'viewport',
        'variants',
        'animate',
        'transition',
        'exit',
        'layout',
        'custom',
        'whileHover',
        'whileTap',
      ].forEach((prop) => delete validProps[prop]);
      return <h3 {...validProps}>{children}</h3>;
    },
    p: ({ children, ...props }: any) => {
      const validProps = { ...props };
      [
        'initial',
        'whileInView',
        'viewport',
        'variants',
        'animate',
        'transition',
        'exit',
        'layout',
        'custom',
        'whileHover',
        'whileTap',
      ].forEach((prop) => delete validProps[prop]);
      return <p {...validProps}>{children}</p>;
    },
    span: ({ children, ...props }: any) => {
      const validProps = { ...props };
      [
        'initial',
        'whileInView',
        'viewport',
        'variants',
        'animate',
        'transition',
        'exit',
        'layout',
        'custom',
        'whileHover',
        'whileTap',
      ].forEach((prop) => delete validProps[prop]);
      return <span {...validProps}>{children}</span>;
    },
    li: ({ children, ...props }: any) => {
      const validProps = { ...props };
      [
        'initial',
        'whileInView',
        'viewport',
        'variants',
        'animate',
        'transition',
        'exit',
        'layout',
        'custom',
        'whileHover',
        'whileTap',
      ].forEach((prop) => delete validProps[prop]);
      return <li {...validProps}>{children}</li>;
    },
    a: ({ children, ...props }: any) => {
      const validProps = { ...props };
      [
        'initial',
        'whileInView',
        'viewport',
        'variants',
        'animate',
        'transition',
        'exit',
        'layout',
        'custom',
        'whileHover',
        'whileTap',
      ].forEach((prop) => delete validProps[prop]);
      return <a {...validProps}>{children}</a>;
    },
    button: ({ children, ...props }: any) => {
      const validProps = { ...props };
      [
        'initial',
        'whileInView',
        'viewport',
        'variants',
        'animate',
        'transition',
        'exit',
        'layout',
        'custom',
        'whileHover',
        'whileTap',
      ].forEach((prop) => delete validProps[prop]);
      return <button {...validProps}>{children}</button>;
    },
    ul: ({ children, ...props }: any) => {
      const validProps = { ...props };
      [
        'initial',
        'whileInView',
        'viewport',
        'variants',
        'animate',
        'transition',
        'exit',
        'layout',
        'custom',
        'whileHover',
        'whileTap',
      ].forEach((prop) => delete validProps[prop]);
      return <ul {...validProps}>{children}</ul>;
    },
    video: ({ children, ...props }: any) => {
      const validProps = { ...props };
      [
        'initial',
        'whileInView',
        'viewport',
        'variants',
        'animate',
        'transition',
        'exit',
        'layout',
        'custom',
        'whileHover',
        'whileTap',
      ].forEach((prop) => delete validProps[prop]);
      return <video {...validProps}>{children}</video>;
    },
    img: ({ ...props }: any) => {
      const validProps = { ...props };
      [
        'initial',
        'whileInView',
        'viewport',
        'variants',
        'animate',
        'transition',
        'exit',
        'layout',
        'custom',
        'whileHover',
        'whileTap',
      ].forEach((prop) => delete validProps[prop]);
      return <img {...validProps} />;
    },
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock do Lucide React
jest.mock('lucide-react', () => {
  return {
    ArrowRight: () => <div data-testid="arrow-right-icon" />,
    ArrowUpRight: () => <div data-testid="arrow-up-right-icon" />,
  };
});

// Mock do hook usePrefersReducedMotion
jest.mock('../../src/hooks/usePrefersReducedMotion', () => ({
  __esModule: true,
  default: () => false,
}));

describe('PortfolioShowcaseSection Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o título da seção corretamente', () => {
    render(<PortfolioShowcaseSection />);

    // Check for both parts of the title separately since they are in different span elements
    expect(screen.getByText('portfólio')).toBeInTheDocument();
    expect(screen.getByText('showcase')).toBeInTheDocument();

    // Check that they are both inside an h2 element
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('portfólio showcase');
  });

  it('deve renderizar todas as categorias', () => {
    render(<PortfolioShowcaseSection />);

    CATEGORIES.forEach((category) => {
      // Para a categoria especial 'websites-webcampaigns-tech', verificamos o texto dividido
      if (category.id === 'websites-webcampaigns-tech') {
        expect(screen.getByText('Web Campaigns,')).toBeInTheDocument();
        expect(screen.getByText('Websites & Tech')).toBeInTheDocument();
      } else {
        expect(screen.getByText(category.label)).toBeInTheDocument();
      }
    });
  });
});
