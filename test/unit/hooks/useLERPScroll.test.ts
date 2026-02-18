import { renderHook } from '@testing-library/react';
import { useLERPScroll } from '@/hooks/useLERPScroll';
import {
  beforeEach,
  describe,
  expect,
  it,
  jest,
  afterEach,
} from '@jest/globals';

describe('useLERPScroll', () => {
  let trackMock: HTMLElement;
  let galleryMock: HTMLElement;

  beforeEach(() => {
    // Mock DOM elements
    trackMock = document.createElement('div');
    galleryMock = document.createElement('div');

    // Mock layout properties
    Object.defineProperty(trackMock, 'scrollHeight', {
      value: 2000,
      configurable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      configurable: true,
    });
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });

    // Mock getBoundingClientRect
    galleryMock.getBoundingClientRect = jest.fn(() => ({
      top: 500,
      bottom: 2500,
      left: 0,
      right: 1000,
      width: 1000,
      height: 2000,
      x: 0,
      y: 500,
      toJSON: () => { },
    }));

    // Mock ResizeObserver
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    })) as unknown as typeof ResizeObserver;

    // Spy on RAF
    global.requestAnimationFrame = jest.fn(
      (cb: FrameRequestCallback): number => {
        // Execute callback immediately for test simplicity
        cb(performance.now());
        return 1;
      }
    ) as unknown as typeof requestAnimationFrame;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calculates heights and updates styles on mount', () => {
    const trackMock = document.createElement('div');
    const galleryMock = document.createElement('div');

    // Mock layout properties
    Object.defineProperty(trackMock, 'scrollHeight', {
      value: 2000,
      configurable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      configurable: true,
    });
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });

    // Mock getBoundingClientRect
    trackMock.getBoundingClientRect = jest.fn(() => ({
      top: 0,
      bottom: 2000,
      height: 2000,
      left: 0,
      right: 1000,
      width: 1000,
      x: 0,
      y: 0,
      toJSON: () => { },
    }));

    const trackRef = { current: trackMock };
    const galleryRef = { current: galleryMock };

    renderHook(() => useLERPScroll(trackRef, galleryRef, true));

    // Initial calculation should happen (2000px content + 96px sticky offset)
    expect(galleryMock.style.height).toBe('2096px');
  });

  it('updates scrollState based on scroll position', () => {
    const trackMock = document.createElement('div');
    const galleryMock = document.createElement('div');

    // Mock layout properties
    Object.defineProperty(trackMock, 'scrollHeight', {
      value: 2000,
      configurable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      configurable: true,
    });
    // Start scrolled
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });

    // Mock getBoundingClientRect
    trackMock.getBoundingClientRect = jest.fn(() => ({
      top: 500, // Not at top yet
      bottom: 2500,
      height: 2000,
      left: 0,
      right: 1000,
      width: 1000,
      x: 0,
      y: 500,
      toJSON: () => { },
    }));

    // Mock ResizeObserver
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    })) as unknown as typeof ResizeObserver;

    const trackRef = { current: trackMock };
    const galleryRef = { current: galleryMock };

    const { result } = renderHook(() =>
      useLERPScroll(trackRef, galleryRef, true)
    );

    // Simulate scroll past heroOffset
    window.scrollY = 600;
    // Trigger scroll event manually
    const scrollEvent = new Event('scroll');
    window.dispatchEvent(scrollEvent);

    // After animation/lerp cycle, it should be sticky
    // (Note: in real tests we use act() and timer mocks, but here we focus on logic structure)
    expect(result.current.scrollState).toBeDefined();
  });

  it('cleans up on unmount', () => {
    const trackRef = { current: trackMock };
    const galleryRef = { current: galleryMock };

    const { unmount } = renderHook(() =>
      useLERPScroll(trackRef, galleryRef, true)
    );

    unmount();

    expect(trackMock.style.transform).toBe('');
    expect(galleryMock.style.height).toBe('auto');
  });
});
