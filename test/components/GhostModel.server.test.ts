/**
 * @jest-environment node
 */

import React from 'react';

const preloadMock = jest.fn(() => {
  throw new Error('useGLTF.preload should not run on the server');
});

// Stub R3F/Drei hooks so importing the component in a Node environment
// doesn't pull in WebGL or Worker-dependent code.
jest.mock('@react-three/drei', () => {
  const mockUseGLTF = Object.assign(
    jest.fn(() => ({ nodes: {}, materials: {} })),
    {
      preload: preloadMock,
    }
  );

  return {
    __esModule: true,
    useGLTF: mockUseGLTF,
    Float: ({ children }: { children: React.ReactNode }) =>
      React.createElement('div', null, children),
  };
});

jest.mock('@react-three/fiber', () => ({
  useFrame: jest.fn(),
}));

describe('GhostModel server import', () => {
  it('skips GLTF preloading when rendered during SSG/Node', async () => {
    await expect(
      import('@/components/sobre/3d/GhostModel')
    ).resolves.toBeDefined();
    expect(preloadMock).not.toHaveBeenCalled();
  });
});
