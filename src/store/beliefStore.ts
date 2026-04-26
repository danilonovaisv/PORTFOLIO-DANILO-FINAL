import { create } from 'zustand';

interface BeliefState {
  scrollProgress: number;
  ghostIntensity: number;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  setScrollProgress: (_p: number) => void;
  setMobile: (_v: boolean) => void;
  setReducedMotion: (_v: boolean) => void;
}

export const useBeliefStore = create<BeliefState>((set) => ({
  scrollProgress: 0,
  ghostIntensity: 0,
  isMobile: false,
  prefersReducedMotion: false,
  setScrollProgress: (p) => set({ scrollProgress: p, ghostIntensity: p }),
  setMobile: (v) => set({ isMobile: v }),
  setReducedMotion: (v) => set({ prefersReducedMotion: v }),
}));
