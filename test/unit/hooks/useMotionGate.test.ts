/**
 * @file useMotionGate.test.ts
 * @description Unit tests for the useMotionGate hook — god node with 62 dependents.
 * Any bug here breaks the entire Ghost System animation layer.
 *
 * Test coverage:
 * - SSR hydration safety: returns false before mount
 * - Reads OS prefers-reduced-motion correctly
 * - Reacts to MediaQueryList change events
 * - Reads Zustand global reducedMotion flag
 * - Cleanup: removes event listener on unmount
 */

import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, jest, beforeEach, afterEach } from '@jest/globals';

// ---------- Zustand store mock ----------
// Must be hoisted before hook import so Jest can replace the module
const mockFlags = { reducedMotion: false };
jest.mock('@/store/antigravity.store', () => ({
  useAntigravityStore: (_selector: (_s: { flags: typeof mockFlags }) => unknown) =>
    _selector({ flags: mockFlags }),
}));

// ---------- MediaQuery mock ----------
type MQLListener = (_e: MediaQueryListEvent) => void;

let mqlListeners: MQLListener[] = [];
let mqlMatches = false;

const createMqlMock = () => ({
  get matches() {
    return mqlMatches;
  },
  addEventListener: jest.fn((_event: string, cb: MQLListener) => {
    mqlListeners.push(cb);
  }),
  removeEventListener: jest.fn((_event: string, cb: MQLListener) => {
    mqlListeners = mqlListeners.filter((l) => l !== cb);
  }),
  // Deprecated fallback (for browsers without addEventListener)
  addListener: jest.fn((_cb: MQLListener) => {}),
  removeListener: jest.fn((_cb: MQLListener) => {}),
});

let mqlMock = createMqlMock();

// Helper: fire a change event on the mock MediaQueryList
function fireMqlChange(newMatches: boolean) {
  mqlMatches = newMatches;
  const event = { matches: newMatches } as MediaQueryListEvent;
  mqlListeners.forEach((cb) => cb(event));
}

// ---------- Import hook after mocks are in place ----------
import { useMotionGate } from '@/hooks/useMotionGate';

// ---------- Test suite ----------
describe('useMotionGate — ghost system motion gate (62 dependents)', () => {
  beforeEach(() => {
    mqlMatches = false;
    mqlListeners = [];
    mockFlags.reducedMotion = false;
    mqlMock = createMqlMock();
    window.matchMedia = jest.fn().mockReturnValue(mqlMock) as unknown as typeof window.matchMedia;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ------------------------------------------------------------------ //
  // 1. SSR hydration safety
  // ------------------------------------------------------------------ //
  it('returns false on initial render (SSR hydration safety)', () => {
    // Before useEffect fires, isMounted is false → hook must return false
    // to match server render and avoid hydration mismatch.
    const { result } = renderHook(() => useMotionGate());
    // Initial synchronous render — isMounted not yet set
    expect(result.current).toBe(false);
  });

  // ------------------------------------------------------------------ //
  // 2. Reads OS preference: no preference → false
  // ------------------------------------------------------------------ //
  it('returns false when OS has no reduced-motion preference', () => {
    mqlMatches = false;
    const { result } = renderHook(() => useMotionGate());

    act(() => {
      // Flush effects (setIsMounted + setPrefersReduced)
    });

    expect(result.current).toBe(false);
  });

  // ------------------------------------------------------------------ //
  // 3. Reads OS preference: prefers-reduced-motion: reduce → true
  // ------------------------------------------------------------------ //
  it('returns true when OS prefers reduced motion', () => {
    mqlMatches = true;
    const { result } = renderHook(() => useMotionGate());

    act(() => {});

    expect(result.current).toBe(true);
  });

  // ------------------------------------------------------------------ //
  // 4. Reacts to OS preference change event
  // ------------------------------------------------------------------ //
  it('updates when OS reduced-motion preference changes at runtime', () => {
    mqlMatches = false;
    const { result } = renderHook(() => useMotionGate());

    act(() => {});
    expect(result.current).toBe(false);

    // Simulate OS change → reduce
    act(() => {
      fireMqlChange(true);
    });

    expect(result.current).toBe(true);

    // Simulate OS change → back to normal
    act(() => {
      fireMqlChange(false);
    });

    expect(result.current).toBe(false);
  });

  // ------------------------------------------------------------------ //
  // 5. Respects Zustand global reducedMotion flag
  // ------------------------------------------------------------------ //
  it('returns true when store reducedMotion flag is set (even without OS pref)', () => {
    mqlMatches = false;
    mockFlags.reducedMotion = true;

    const { result } = renderHook(() => useMotionGate());
    act(() => {});

    expect(result.current).toBe(true);
  });

  // ------------------------------------------------------------------ //
  // 6. OR logic: either condition triggers gate
  // ------------------------------------------------------------------ //
  it('returns true when either OS pref OR store flag is set', () => {
    mqlMatches = true;
    mockFlags.reducedMotion = false;

    const { result: r1 } = renderHook(() => useMotionGate());
    act(() => {});
    expect(r1.current).toBe(true);

    mqlMatches = false;
    mockFlags.reducedMotion = true;

    const { result: r2 } = renderHook(() => useMotionGate());
    act(() => {});
    expect(r2.current).toBe(true);
  });

  // ------------------------------------------------------------------ //
  // 7. Cleanup: removeEventListener called on unmount
  // ------------------------------------------------------------------ //
  it('removes MediaQueryList event listener on unmount (no memory leak)', () => {
    const { unmount } = renderHook(() => useMotionGate());

    act(() => {});

    unmount();

    expect(mqlMock.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );
  });

  // ------------------------------------------------------------------ //
  // 8. Calls matchMedia with correct query
  // ------------------------------------------------------------------ //
  it('queries correct media feature (prefers-reduced-motion: reduce)', () => {
    renderHook(() => useMotionGate());

    act(() => {});

    expect(window.matchMedia).toHaveBeenCalledWith(
      '(prefers-reduced-motion: reduce)'
    );
  });
});
