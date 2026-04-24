'use client';

import { Component, type ReactNode } from 'react';
import AboutBeliefsSkeleton from '@/components/sobre/sections/AboutBeliefsSkeleton';

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
    // Log interno para o Sentinel Prime (simulado via console por enquanto)
    console.error(`[SectionErrorBoundary:${this.props.sectionName || 'Unknown'}]`, error, errorInfo);
    
    // Poderíamos disparar o reportError aqui também se quisermos granularidade
    void this.reportError(error, errorInfo);
  }

  private async reportError(error: Error, errorInfo: React.ErrorInfo) {
    try {
      await fetch('/api/report-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origem: 'Ghost System Section Boundary',
          secao: this.props.sectionName,
          erro_detectado: error.message,
          stack: error.stack,
          component_stack: errorInfo.componentStack,
          status: 'SECTION_RECOVERY_ACTIVE',
        }),
        keepalive: true,
      });
    } catch (err) {
      // Silently fail if reporting fails
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <AboutBeliefsSkeleton className="opacity-50 grayscale" />;
    }

    return this.props.children;
  }
}
