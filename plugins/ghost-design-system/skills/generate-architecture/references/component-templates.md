# Component Templates — Full Implementations

## app/layout.tsx (Root Layout)

```typescript
import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Providers from '@/components/providers/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'My Project',
    template: '%s | My Project',
  },
  description: 'A high-performance, visually immersive web experience.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'My Project',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@yourtwitterhandle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="bg-surface text-text-primary antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

## app/(marketing)/page.tsx (Home Page — Server Component)

```typescript
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to My Project — an immersive web experience.',
};

// Dynamic import: 3D canvas never SSR'd
const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-surface" aria-hidden="true" />,
});

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* 3D layer — behind UI */}
      <div className="fixed inset-0 -z-10" aria-hidden="true">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>

      {/* UI layer */}
      <Hero />
    </main>
  );
}
```

## app/loading.tsx

```typescript
export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-surface"
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-surface-border border-t-brand-500" />
        <span className="text-sm text-text-muted">Loading…</span>
      </div>
    </div>
  );
}
```

## app/not-found.tsx

```typescript
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-surface px-4">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-brand-500">404</p>
        <h1 className="mt-2 text-display-md font-bold text-text-primary">Page not found</h1>
        <p className="mt-4 max-w-md text-text-secondary">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-full bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
      >
        Go home
      </Link>
    </main>
  );
}
```

## app/error.tsx

```typescript
'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-surface px-4">
      <div className="text-center">
        <h1 className="text-display-md font-bold text-text-primary">Something went wrong</h1>
        <p className="mt-3 text-text-secondary">{error.message ?? 'An unexpected error occurred.'}</p>
      </div>
      <button
        onClick={reset}
        className="rounded-full bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-brand-500"
      >
        Try again
      </button>
    </main>
  );
}
```

## components/ui/Button.tsx

```typescript
'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        primary:     'bg-brand-600 text-white hover:bg-brand-500 focus-visible:outline-brand-500 active:scale-95',
        secondary:   'bg-surface-overlay text-text-primary border border-surface-border hover:border-brand-500/50 hover:bg-surface-subtle focus-visible:outline-brand-500',
        ghost:       'text-text-secondary hover:text-text-primary hover:bg-surface-overlay focus-visible:outline-brand-500',
        destructive: 'bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-500',
      },
      size: {
        sm:  'px-4 py-2 text-sm min-h-[36px]',
        md:  'px-6 py-3 text-sm min-h-[44px]',    // 44px touch target
        lg:  'px-8 py-4 text-base min-h-[52px]',
        icon:'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        disabled={disabled ?? loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button, buttonVariants };
export type { ButtonProps };
```

## components/ui/Container.tsx

```typescript
import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'article' | 'main' | 'aside';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
  sm:   'max-w-2xl',
  md:   'max-w-4xl',
  lg:   'max-w-6xl',
  xl:   'max-w-7xl',
  full: 'max-w-full',
};

export function Container({
  as: As = 'div',
  size = 'xl',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <As
      className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeClasses[size], className)}
      {...props}
    >
      {children}
    </As>
  );
}
```

## components/ui/Section.tsx

```typescript
import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  background?: 'default' | 'subtle' | 'overlay' | 'transparent';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const bgClasses = {
  default:     'bg-surface',
  subtle:      'bg-surface-subtle',
  overlay:     'bg-surface-overlay',
  transparent: 'bg-transparent',
};

const paddingClasses = {
  none: '',
  sm:   'py-12 md:py-16',
  md:   'py-16 md:py-24',
  lg:   'py-24 md:py-32',
  xl:   'py-32 md:py-40',
};

export function Section({
  background = 'default',
  padding = 'lg',
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(bgClasses[background], paddingClasses[padding], className)}
      {...props}
    >
      {children}
    </section>
  );
}
```

## components/layout/Navigation.tsx

```typescript
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-surface/80 backdrop-blur-xl border-b border-surface-border'
          : 'bg-transparent'
      )}
      role="banner"
    >
      <Container>
        <nav
          className="flex h-16 items-center justify-between md:h-20"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" className="text-lg font-bold text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm" aria-label="Go to homepage">
            MyProject
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm',
                    pathname === link.href ? 'text-text-primary' : 'text-text-secondary'
                  )}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:block">
            <Button size="sm" asChild>
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="flex md:hidden h-11 w-11 items-center justify-center rounded-lg text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="sr-only">{mobileOpen ? 'Close' : 'Open'} menu</span>
            <div className="flex h-5 w-5 flex-col justify-between" aria-hidden="true">
              <span className={cn('h-0.5 w-full bg-current transition-transform duration-200', mobileOpen && 'translate-y-2 rotate-45')} />
              <span className={cn('h-0.5 w-full bg-current transition-opacity duration-200', mobileOpen && 'opacity-0')} />
              <span className={cn('h-0.5 w-full bg-current transition-transform duration-200', mobileOpen && '-translate-y-2 -rotate-45')} />
            </div>
          </button>
        </nav>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={prefersReduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-surface-border bg-surface/95 backdrop-blur-xl md:hidden"
          >
            <Container>
              <ul className="flex flex-col gap-1 py-4" role="list">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'block rounded-lg px-4 py-3 text-base font-medium transition-colors',
                        pathname === link.href
                          ? 'bg-surface-overlay text-text-primary'
                          : 'text-text-secondary hover:bg-surface-overlay hover:text-text-primary'
                      )}
                      aria-current={pathname === link.href ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="border-t border-surface-border py-4">
                <Button className="w-full" asChild>
                  <Link href="/contact">Get in touch</Link>
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
```

## components/sections/Hero.tsx

```typescript
'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24"
      aria-labelledby="hero-heading"
    >
      <Container size="lg">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={prefersReduced ? {} : containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div variants={prefersReduced ? {} : itemVariants}>
            <span className="inline-flex items-center rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-400">
              Creative Technology
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="hero-heading"
            className="mt-6 text-display-xl font-bold tracking-tight text-text-primary md:text-display-2xl"
            variants={prefersReduced ? {} : itemVariants}
          >
            Build experiences
            <br />
            <span className="bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
              beyond the screen
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary"
            variants={prefersReduced ? {} : itemVariants}
          >
            A high-performance web foundation with Next.js, React Three Fiber,
            Framer Motion, and Supabase — ready for production.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            variants={prefersReduced ? {} : itemVariants}
          >
            <Button size="lg" asChild>
              <Link href="/work">View work</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/about">About me</Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={prefersReduced ? {} : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-surface-border p-1">
          <div className="h-2 w-1 rounded-full bg-text-muted" />
        </div>
      </motion.div>
    </section>
  );
}
```

## lib/utils.ts

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes safely, resolving conflicts */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Format date to human-readable string */
export function formatDate(date: string | Date, locale = 'en-US'): string {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Map a value from one range to another */
export function mapRange(
  value: number,
  inMin: number, inMax: number,
  outMin: number, outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}
```

## types/index.ts

```typescript
// ============================================================
// Shared TypeScript interfaces for the entire project
// ============================================================

/** Navigation link definition */
export interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

/** Project / portfolio item */
export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  coverImage: string;
  heroVideo?: string;
  liveUrl?: string;
  githubUrl?: string;
  publishedAt: string;
  featured: boolean;
}

/** Supabase storage asset */
export interface StorageAsset {
  id: string;
  name: string;
  bucket: string;
  path: string;
  publicUrl: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

/** Site-wide metadata */
export interface SiteMeta {
  title: string;
  description: string;
  url: string;
  ogImage?: string;
}

/** API response wrapper */
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

/** Scroll progress state */
export interface ScrollState {
  progress: number;  // 0–1
  direction: 'up' | 'down';
  y: number;
}

/** Three.js scene configuration */
export interface SceneConfig {
  camera: {
    position: [number, number, number];
    fov: number;
    near: number;
    far: number;
  };
  dpr: [number, number]; // min/max device pixel ratio
  shadows: boolean;
  gl: {
    antialias: boolean;
    alpha: boolean;
    powerPreference: 'high-performance' | 'default' | 'low-power';
  };
}
```
