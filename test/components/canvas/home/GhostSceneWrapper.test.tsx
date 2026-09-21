import React from 'react';
import { render, screen } from '@testing-library/react';
import GhostSceneWrapper from '@/components/canvas/home/hero/GhostSceneWrapper';
import * as webglHook from '@/hooks/useWebGLSupport';

// Mock dynamic import
jest.mock('next/dynamic', () => () => {
  const DynamicMock = () => <div data-testid="mock-ghost-scene">Ghost Scene 3D</div>;
  DynamicMock.displayName = 'DynamicGhostSceneMock';
  return DynamicMock;
});

describe('GhostSceneWrapper Guardrails', () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_DISABLE_3D;
    jest.restoreAllMocks();
  });

  it('renders fallback HTML when WebGL is unsupported', () => {
    jest.spyOn(webglHook, 'useWebGLSupport').mockReturnValue(false);

    const { container } = render(<GhostSceneWrapper />);
    expect(screen.queryByTestId('mock-ghost-scene')).not.toBeInTheDocument();
    expect(container.firstChild).toHaveClass('bg-background');
  });

  it('renders fallback HTML when 3D is disabled via environment variable', () => {
    process.env.NEXT_PUBLIC_DISABLE_3D = 'true';
    jest.spyOn(webglHook, 'useWebGLSupport').mockReturnValue(true);

    const { container } = render(<GhostSceneWrapper />);
    expect(screen.queryByTestId('mock-ghost-scene')).not.toBeInTheDocument();
    expect(container.firstChild).toHaveClass('bg-background');
  });

  it('renders GhostScene when WebGL is supported and 3D is enabled', () => {
    jest.spyOn(webglHook, 'useWebGLSupport').mockReturnValue(true);

    render(<GhostSceneWrapper />);
    expect(screen.getByTestId('mock-ghost-scene')).toBeInTheDocument();
  });
});
