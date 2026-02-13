import { render } from '@testing-library/react';
import { GhostFireflies } from '@/components/canvas/home/hero/GhostFireflies';
import React from 'react';

// Mock @react-three/fiber
jest.mock('@react-three/fiber', () => ({
  useFrame: jest.fn(),
  extend: jest.fn(),
}));

describe('GhostFireflies Benchmark', () => {
  it('renders 0 PointLights and 2 InstancedMeshes (optimized)', () => {
    // Render the component
    // Suppress console.error for "using incorrect casing" warning from React
    const originalError = console.error;
    console.error = jest.fn();

    const { container } = render(<GhostFireflies />);

    console.error = originalError;

    // Count pointLight elements
    const pointLights = container.querySelectorAll('pointlight');

    // We expect 0 now!
    expect(pointLights.length).toBe(0);

    // Count instancedMesh elements
    const instancedMeshes = container.querySelectorAll('instancedmesh');
    expect(instancedMeshes.length).toBe(2);
  });
});
