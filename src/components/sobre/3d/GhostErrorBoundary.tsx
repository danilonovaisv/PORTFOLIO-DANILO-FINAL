'use client';

/**
 * GhostErrorBoundary — Fallback para falhas no GhostScene.
 * Acionado quando: WebGL não suportado, GLB 404, timeout de rede.
 * Renderiza SVG estático do fantasma — experiência não quebra.
 */

import { Component, type ReactNode } from 'react';

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

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center
                     pointer-events-none"
          aria-hidden="true"
        >
          {/* SVG fallback do fantasma — sem dependência de WebGL */}
          <svg
            viewBox="0 0 120 160"
            width="200"
            height="267"
            style={{ opacity: 0.6 }}
          >
            <path
              d="M20 70 Q20 30 60 30 Q100 30 100 70 L100 130
                 Q90 120 80 130 Q70 120 60 130
                 Q50 120 40 130 Q30 120 20 130 Z"
              fill="#e8eeff"
            />
            <circle cx="45" cy="72" r="7" fill="#0048ff" />
            <circle cx="75" cy="72" r="7" fill="#0048ff" />
          </svg>
        </div>
      );
    }
    return this.props.children;
  }
}
