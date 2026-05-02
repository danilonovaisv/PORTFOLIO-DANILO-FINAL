'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import Image from 'next/image';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class GhostErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Ghost System 3D Critical Failure:', error, errorInfo);
    // Here we could trigger a "Sentinel Prime" report
    // reportarErroWeb({ origin: 'GhostScene', error: error.message });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="absolute inset-0 z-[70] flex items-center justify-center overflow-hidden pointer-events-none"
          aria-label="3D experience unavailable - showing static fallback"
        >
          {/* Desktop Fallback */}
          <div className="hidden md:block absolute right-0 top-0 w-full h-full opacity-60">
            <Image
              src="/site.assets/3d/fallback-ghost.jpg"
              alt="Ghost Architecture Visual"
              fill
              className="object-contain object-right"
              priority
              unoptimized
            />
          </div>

          {/* Mobile Fallback */}
          <div className="block md:hidden absolute left-0 top-[10vh] w-full h-[80vh] opacity-50">
            <Image
              src="/site.assets/3d/fallback-ghost-mobile.png"
              alt="Ghost Architecture Visual"
              fill
              className="object-contain object-left"
              priority
              unoptimized
            />
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-[10px] tracking-[0.2em] uppercase font-mono">
            Static Fallback Mode // GHOST_SYSTEM_RESILIENCE
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
