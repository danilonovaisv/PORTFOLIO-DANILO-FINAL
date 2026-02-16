import React from 'react';
import { render, screen } from '@testing-library/react';
import { useLandingBackLink } from '@/components/projects/templates/useLandingBackLink';

let mockQuery = new URLSearchParams();

jest.mock('next/navigation', () => ({
  useSearchParams: () => mockQuery,
}));

function HookProbe() {
  const href = useLandingBackLink();
  return <span data-testid="back-href">{href}</span>;
}

describe('useLandingBackLink', () => {
  it('returns portfolio anchor when origin card exists', () => {
    mockQuery = new URLSearchParams({
      from: 'portfolio',
      originCard: 'AI video',
    });
    render(<HookProbe />);
    expect(screen.getByTestId('back-href')).toHaveTextContent(
      '/portfolio#portfolio-card-ai-video'
    );
  });

  it('returns portfolio root when origin card is missing', () => {
    mockQuery = new URLSearchParams({ from: 'portfolio' });
    render(<HookProbe />);
    expect(screen.getByTestId('back-href')).toHaveTextContent('/portfolio');
  });

  it('returns home portfolio anchor when source is home', () => {
    mockQuery = new URLSearchParams({ from: 'home' });
    render(<HookProbe />);
    expect(screen.getByTestId('back-href')).toHaveTextContent('/#portfolio');
  });

  it('falls back to portfolio for unknown source', () => {
    mockQuery = new URLSearchParams();
    render(<HookProbe />);
    expect(screen.getByTestId('back-href')).toHaveTextContent('/portfolio');
  });
});
