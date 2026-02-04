'use client';

import React, {
  Component,
  type PropsWithChildren,
  type ErrorInfo,
} from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary component to catch and display React errors in production.
 * Especially for debugging Error #62 (style prop as string).
 */
interface ErrorBoundaryProps extends PropsWithChildren {
  fallback?: React.ReactNode;
}

/**
 * ErrorBoundary component to catch and display React errors in production.
 * Especially for debugging Error #62 (style prop as string).
 */
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('=== ERROR BOUNDARY CAUGHT ===');
    console.error('Error:', error);
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
    console.error('Component Stack:', errorInfo.componentStack);
    console.error('=== END ERROR BOUNDARY ===');

    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-screen bg-red-900/20 flex items-center justify-center p-8">
          <div className="max-w-2xl w-full bg-black/90 text-white p-8 rounded-xl">
            <h1 className="text-2xl font-bold mb-4 text-red-400">
              🚨 Something went wrong
            </h1>

            <div className="mb-4 p-4 bg-red-900/30 rounded-lg">
              <p className="font-mono text-sm break-all">
                <strong>Error:</strong> {this.state.error?.message}
              </p>
            </div>

            {this.state.error?.stack && (
              <details className="mb-4">
                <summary className="cursor-pointer text-yellow-400 hover:text-yellow-300">
                  View full error stack
                </summary>
                <pre className="mt-2 p-4 bg-gray-900 text-xs overflow-auto max-h-64 rounded">
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            {this.state.errorInfo?.componentStack && (
              <details className="mb-4">
                <summary className="cursor-pointer text-yellow-400 hover:text-yellow-300">
                  View component stack
                </summary>
                <pre className="mt-2 p-4 bg-gray-900 text-xs overflow-auto max-h-64 rounded whitespace-pre-wrap">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-medium"
              >
                Reload Page
              </button>
              <button
                onClick={() => {
                  this.setState({
                    hasError: false,
                    error: null,
                    errorInfo: null,
                  });
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
