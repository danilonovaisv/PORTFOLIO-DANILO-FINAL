'use client';

import { Component, type ReactNode } from 'react';
// Fallback skeleton genérico do Design System

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * SectionErrorBoundary — Captura erros de runtime em seções específicas.
 * Evita que um erro em uma seção (ex: 3D, animação complexa) derrube a página inteira.
 */
export class SectionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log interno para o Sentinel Prime
    console.error(
      `[SectionErrorBoundary:${this.props.sectionName || 'Unknown'}]`,
      error,
      errorInfo
    );

    void this.reportError(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  private async reportError(error: Error, errorInfo: React.ErrorInfo) {
    try {
      await fetch('/api/report-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          component: this.props.sectionName ?? 'Unknown Section',
          metadata: {
            origem: 'Ghost System Section Boundary',
            component_stack: errorInfo.componentStack,
            status: 'SECTION_RECOVERY_ACTIVE',
          },
        }),
        keepalive: true,
      });
    } catch {
      // Silently fail if reporting fails
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative group">
          {this.props.fallback || (
            <div className="w-full min-h-[40vh] bg-background animate-pulse border border-white/5 flex items-center justify-center opacity-50">
              <div className="h-10 w-40 bg-bluePrimary/10 rounded-md" />
            </div>
          )}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <p className="text-white/60 text-sm mb-4 font-mono">
              Falha na seção: {this.props.sectionName}
            </p>
            <button
              onClick={this.handleRetry}
              className="px-6 py-2 bg-bluePrimary text-white rounded-full text-sm font-bold hover:bg-blueAccent transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
