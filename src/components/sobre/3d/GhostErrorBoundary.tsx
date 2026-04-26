'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

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
    console.error('R3F Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center text-white/70"
          aria-label="3D experience unavailable"
        >
          Experiência 3D indisponível
        </div>
      );
    }

    return this.props.children;
  }
}
