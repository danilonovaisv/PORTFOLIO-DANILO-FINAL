import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ManifestoScrollSection } from '@/components/sobre/sections/ManifestoScrollSection';

// Mock matchMedia for useMotionGate
beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    };
});

describe('ManifestoScrollSection Quality & Accessibility', () => {
  it('renders section, headings, phrases and accessible dots', () => {
    render(<ManifestoScrollSection />);

    // Section exists
    expect(screen.getByTestId('beliefs-section')).toBeInTheDocument();

    // Screen reader accessible title
    expect(
      screen.getByRole('heading', { level: 2, name: /o que me move/i })
    ).toBeInTheDocument();

    // Tab buttons have touch target and WAI-ARIA role="tab"
    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBe(4);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');

    // Pause/Play toggle exists
    expect(
      screen.getByRole('button', {
        name: /pausar troca automática de manifesto/i,
      })
    ).toBeInTheDocument();
  });

  it('supports full keyboard WAI-ARIA arrow navigation between tabs', () => {
    render(<ManifestoScrollSection />);

    const tabs = screen.getAllByRole('tab');

    // ArrowRight navigates to tab 2
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');

    // ArrowLeft navigates back to tab 1
    fireEvent.keyDown(tabs[1], { key: 'ArrowLeft' });
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');

    // End navigates to last tab
    fireEvent.keyDown(tabs[0], { key: 'End' });
    expect(tabs[3]).toHaveAttribute('aria-selected', 'true');

    // Home navigates to first tab
    fireEvent.keyDown(tabs[3], { key: 'Home' });
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  });

  it('allows user to pause and resume autoplay', () => {
    render(<ManifestoScrollSection />);

    const pauseBtn = screen.getByRole('button', {
      name: /pausar troca automática de manifesto/i,
    });
    fireEvent.click(pauseBtn);

    // Button flips label to resume
    expect(
      screen.getByRole('button', {
        name: /reproduzir troca automática de manifesto/i,
      })
    ).toBeInTheDocument();
  });
});
