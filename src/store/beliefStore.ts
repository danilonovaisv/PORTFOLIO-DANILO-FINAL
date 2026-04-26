import { create } from 'zustand';

interface BeliefState {
  scrollProgress: number;
  ghostIntensity: number;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  setScrollProgress: (p: number) => void;
  setMobile: (v: boolean) => void;
  setReducedMotion: (v: boolean) => void;
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
