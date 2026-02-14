import React from 'react';
import { render } from '@testing-library/react';
import { GlassPlane } from '@/components/canvas/header/HeaderGlassCanvas';
import * as THREE from 'three';

// Mocks
jest.mock('three', () => {
  const original = jest.requireActual('three');
  return {
    ...original,
    ShaderMaterial: jest.fn().mockImplementation((config) => {
      return {
        uniforms: config.uniforms, // pass through the uniforms object created in component
        vertexShader: config.vertexShader,
        fragmentShader: config.fragmentShader,
        dispose: jest.fn(),
      };
    }),
  };
});

jest.mock('@react-three/fiber', () => ({
  useFrame: jest.fn(),
  // Mock primitives as simple HTML elements to avoid React warnings in JSDOM
  // However, since we mock three, we assume the component renders <mesh><primitive/></mesh>
}));

describe('GlassPlane Performance & Memory Leak', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    // Suppress console errors about unrecognized elements <mesh>, <primitive>, <planeGeometry>
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation((msg) => {
      // Filter out React warnings about lowercase custom elements
      if (
        typeof msg === 'string' &&
        (msg.includes('<mesh>') ||
          msg.includes('<primitive>') ||
          msg.includes('<planeGeometry>') ||
          msg.includes('recognized in this browser'))
      ) {
        return;
      }
      // console.error(msg);
    });
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create ShaderMaterial only once and update uniform on prop change', () => {
    const { rerender, unmount } = render(<GlassPlane accentColor="#ff0000" />);

    // Initial render check
    expect(THREE.ShaderMaterial).toHaveBeenCalled();
    const firstCallConfig = (THREE.ShaderMaterial as unknown as jest.Mock).mock
      .calls[0][0];
    const initialColor = firstCallConfig.uniforms.uAccent.value;
    expect(initialColor.getHexString()).toBe('ff0000');

    // Get the material instance returned by the first call
    const materialInstance = (THREE.ShaderMaterial as unknown as jest.Mock).mock
      .results[0].value;

    // Clear mock to check subsequent calls
    (THREE.ShaderMaterial as unknown as jest.Mock).mockClear();

    // Rerender with new color
    rerender(<GlassPlane accentColor="#00ff00" />);

    // Expectation for OPTIMIZED code:
    // 1. ShaderMaterial should NOT be instantiated again
    expect(THREE.ShaderMaterial).not.toHaveBeenCalled();

    // 2. The SAME material instance should have its uniform updated
    expect(materialInstance.uniforms.uAccent.value.getHexString()).toBe(
      '00ff00'
    );

    // Unmount
    unmount();

    // 3. Check disposal
    expect(materialInstance.dispose).toHaveBeenCalledTimes(1);
  });
});
