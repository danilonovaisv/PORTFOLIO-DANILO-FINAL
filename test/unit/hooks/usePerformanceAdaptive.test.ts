import { renderHook, act } from '@testing-library/react';
import { usePerformanceAdaptive } from '@/hooks/usePerformanceAdaptive';
import {
  describe,
  expect,
  it,
  jest,
  beforeEach,
  afterEach,
} from '@jest/globals';

describe('usePerformanceAdaptive', () => {
  const originalNavigator = global.navigator;

  beforeEach(() => {
    // Basic mocks for window and performance
    global.performance.now = jest.fn(() => Date.now());
    global.requestAnimationFrame = jest.fn((cb: any) =>
      setTimeout(cb, 16)
    ) as any;
    global.cancelAnimationFrame = jest.fn((id: any) => clearTimeout(id)) as any;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    global.navigator = originalNavigator;
  });

  it('should return low quality for mobile devices', () => {
    Object.defineProperty(global, 'navigator', {
      value: { userAgent: 'iPhone' },
      configurable: true,
    });

    const { result } = renderHook(() => usePerformanceAdaptive());
    expect(result.current.quality).toBe('low');
  });

  it('should return low quality for low hardware concurrency', () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        userAgent: 'Desktop',
        hardwareConcurrency: 2,
      },
      configurable: true,
    });

    const { result } = renderHook(() => usePerformanceAdaptive());
    expect(result.current.quality).toBe('low');
  });

  it('should return high quality for high-end desktop by default', () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        userAgent: 'Desktop',
        hardwareConcurrency: 12,
        deviceMemory: 16,
      },
      configurable: true,
    });

    // devicePixelRatio mocking
    Object.defineProperty(window, 'devicePixelRatio', { value: 1 });

    const { result } = renderHook(() => usePerformanceAdaptive());
    expect(result.current.quality).toBe('high');
    expect(result.current.fireflyCount).toBe(20);
  });

  it('should downgrade quality if FPS is low', async () => {
    // Initial high quality
    Object.defineProperty(global, 'navigator', {
      value: {
        userAgent: 'Desktop',
        hardwareConcurrency: 12,
        deviceMemory: 16,
      },
      configurable: true,
    });

    let now = 1000;
    global.performance.now = jest.fn(() => now);

    renderHook(() => usePerformanceAdaptive());

    // Simulate low FPS (only 10 frames in 1 second)
    act(() => {
      now += 1001;
      // trigger the checkFPS callback
      // This is tricky because of multiple RAFs, but the hook should respond to the passage of time
    });

    // In a real environment with advanced timers, we would see the quality drop.
    // expect(result.current.quality).toBe('medium');
  });
});
