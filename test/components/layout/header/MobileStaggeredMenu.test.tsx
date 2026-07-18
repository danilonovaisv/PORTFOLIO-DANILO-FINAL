import React, { useState } from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';

import MobileStaggeredMenu from '@/components/layout/header/MobileStaggeredMenu';
import { useMotionGate } from '@/hooks/useMotionGate';

jest.mock('@/hooks/useMotionGate', () => ({
  useMotionGate: jest.fn(),
}));

jest.mock('gsap/dist/CustomEase', () => ({
  CustomEase: { create: jest.fn(() => 'ghostEase') },
}));

jest.mock('gsap', () => {
  const runOnComplete = (args: unknown[]) => {
    const vars = args.find(
      (arg) =>
        typeof arg === 'object' &&
        arg !== null &&
        'onComplete' in arg &&
        typeof arg.onComplete === 'function'
    ) as { onComplete?: () => void } | undefined;

    vars?.onComplete?.();
  };

  const createAnimation = () => {
    const animation = {
      kill: jest.fn(),
      play: jest.fn(),
      to: jest.fn(),
    };
    animation.to.mockImplementation((...args: unknown[]) => {
      runOnComplete(args);
      return animation;
    });
    return animation;
  };

  const gsap = {
    context: jest.fn((callback: () => void) => {
      callback();
      return { revert: jest.fn() };
    }),
    registerPlugin: jest.fn(),
    set: jest.fn(),
    timeline: jest.fn(createAnimation),
    to: jest.fn((...args: unknown[]) => {
      const animation = createAnimation();
      runOnComplete(args);
      return animation;
    }),
  };

  return { __esModule: true, default: gsap, gsap };
});

jest.mock('motion/react', () => ({
  m: {
    div: ({
      children,
      variants: _variants,
      initial: _initial,
      animate: _animate,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) => (
      <div {...props}>{children}</div>
    ),
    h3: ({
      children,
      initial: _initial,
      animate: _animate,
      ...props
    }: React.HTMLAttributes<HTMLHeadingElement> & Record<string, unknown>) => (
      <h3 {...props}>{children}</h3>
    ),
    header: ({
      children,
      variants: _variants,
      initial: _initial,
      animate: _animate,
      ...props
    }: React.HTMLAttributes<HTMLElement> & Record<string, unknown>) => (
      <header {...props}>{children}</header>
    ),
  },
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    priority: _priority,
    unoptimized: _unoptimized,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} />
  ),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const navItems = [
  { label: 'home', href: '/' },
  { label: 'sobre', href: '/sobre' },
] as const;

const mockedUseMotionGate = useMotionGate as jest.MockedFunction<
  typeof useMotionGate
>;

function MenuHarness() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MobileStaggeredMenu
      navItems={[...navItems]}
      logoUrl="/logo.svg"
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      onNavigate={() => setIsOpen(false)}
      activeHref="/"
    />
  );
}

function renderMenu({ reducedMotion = false } = {}) {
  mockedUseMotionGate.mockReturnValue(reducedMotion);
  return render(<MenuHarness />);
}

function getPanel() {
  return screen.getByTestId('site-navigation');
}

function isInTabOrder(element: HTMLElement) {
  return element.tabIndex >= 0 && !element.closest('[inert]');
}

describe('MobileStaggeredMenu accessibility contract', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('marks the closed panel as hidden and inert', () => {
    renderMenu();

    const panel = getPanel();

    expect(panel).toHaveAttribute('aria-hidden', 'true');
    expect(panel).toHaveAttribute('inert');
  });

  it('removes pointer events from the closed panel', () => {
    renderMenu();

    const panel = getPanel();
    expect(panel).toHaveClass('pointer-events-none');
  });

  it('removes closed-panel links from the tab order', () => {
    renderMenu();

    const links = within(getPanel()).getAllByRole('link', { hidden: true });
    links.forEach((link) => expect(isInTabOrder(link)).toBe(false));
  });

  it('connects the trigger to the panel and keeps expanded state coherent', async () => {
    renderMenu();

    const openTrigger = screen.getByRole('button', { name: 'Abrir menu' });
    expect(openTrigger).toHaveAttribute('aria-controls', 'mobile-menu-panel');
    expect(openTrigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(openTrigger);

    const closeTrigger = await screen.findByRole('button', {
      name: 'Fechar menu',
    });
    expect(closeTrigger).toHaveAttribute('aria-controls', 'mobile-menu-panel');
    expect(closeTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(getPanel()).toHaveAttribute('aria-hidden', 'false');
  });

  it('opens and closes from the trigger, then restores focus', async () => {
    renderMenu();

    const openTrigger = screen.getByRole('button', { name: 'Abrir menu' });
    openTrigger.focus();
    fireEvent.click(openTrigger);

    const firstMenuLink = within(getPanel()).getAllByRole('link')[0];
    await waitFor(() => expect(firstMenuLink).toHaveFocus());

    fireEvent.click(screen.getByRole('button', { name: 'Fechar menu' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveFocus();
    });
  });

  it('closes on Escape and restores focus to the trigger', async () => {
    renderMenu();

    const openTrigger = screen.getByRole('button', { name: 'Abrir menu' });
    openTrigger.focus();
    fireEvent.click(openTrigger);

    const firstMenuLink = within(getPanel()).getAllByRole('link')[0];
    await waitFor(() => expect(firstMenuLink).toHaveFocus());

    fireEvent.keyDown(window, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveFocus();
    });
  });

  it('keeps the reduced-motion closed state non-interactive', () => {
    renderMenu({ reducedMotion: true });

    const panel = getPanel();
    expect(panel).toHaveAttribute('aria-hidden', 'true');
    expect(panel).toHaveClass('pointer-events-none');
    expect(panel).toHaveAttribute('inert');
  });
});
