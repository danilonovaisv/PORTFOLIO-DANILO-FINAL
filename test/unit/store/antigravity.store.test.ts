import { useAntigravityStore } from '@/store/antigravity.store';
import { beforeEach, describe, expect, it } from '@jest/globals';

describe('Antigravity Store', () => {
  beforeEach(() => {
    // Reset store state before each test if necessary
    // Note: Zustand stores persist in memory during tests,
    // we use the actual implementation but reset specific values.
    useAntigravityStore.setState({
      flags: {
        mountWebGL: true,
        enableManifestoScroll: true,
        enableHoverInteractions: true,
        reducedMotion: false,
        debugMode: false,
      },
      narrativeState: 'IDLE',
      scrollProgress: 0,
      viewport: { width: 0, height: 0 },
    });
  });

  it('should have initial state correctly', () => {
    const state = useAntigravityStore.getState();
    expect(state.narrativeState).toBe('IDLE');
    expect(state.scrollProgress).toBe(0);
    expect(state.flags.mountWebGL).toBe(true);
  });

  it('should update specific flags correctly', () => {
    const { setFlag } = useAntigravityStore.getState();

    setFlag('reducedMotion', true);
    expect(useAntigravityStore.getState().flags.reducedMotion).toBe(true);

    setFlag('mountWebGL', false);
    expect(useAntigravityStore.getState().flags.mountWebGL).toBe(false);
  });

  it('should update multiple flags using setFlags', () => {
    const { setFlags } = useAntigravityStore.getState();

    setFlags({
      reducedMotion: true,
      debugMode: true,
    });

    const flags = useAntigravityStore.getState().flags;
    expect(flags.reducedMotion).toBe(true);
    expect(flags.debugMode).toBe(true);
    // Should preserve other flags
    expect(flags.mountWebGL).toBe(true);
  });

  it('should update narrative state', () => {
    const { setNarrativeState } = useAntigravityStore.getState();

    setNarrativeState('MANIFESTO_FULLSCREEN');
    expect(useAntigravityStore.getState().narrativeState).toBe(
      'MANIFESTO_FULLSCREEN'
    );
  });

  it('should update scroll progress', () => {
    const { setScrollProgress } = useAntigravityStore.getState();

    setScrollProgress(0.5);
    expect(useAntigravityStore.getState().scrollProgress).toBe(0.5);
  });

  it('should update viewport metrics', () => {
    const { setViewport } = useAntigravityStore.getState();

    setViewport(1920, 1080);
    expect(useAntigravityStore.getState().viewport).toEqual({
      width: 1920,
      height: 1080,
    });
  });
});
