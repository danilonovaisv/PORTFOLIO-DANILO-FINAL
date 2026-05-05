import { create } from 'zustand';
import { COLORS } from '@/config/colors';

interface BeliefState {
  scrollProgress: number;
  ghostIntensity: number;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  bgColor: string;
  setScrollProgress: (_p: number) => void;
  setMobile: (_v: boolean) => void;
  setReducedMotion: (_v: boolean) => void;
  setBgColor: (_color: string) => void;
}

export const useBeliefStore = create<BeliefState>((set) => ({
  scrollProgress: 0,
  ghostIntensity: 0,
  isMobile: false,
  prefersReducedMotion: false,
  bgColor: COLORS.background,
  setScrollProgress: (p) => set({ scrollProgress: p, ghostIntensity: p }),
  setMobile: (v) => set({ isMobile: v }),
  setReducedMotion: (v) => set({ prefersReducedMotion: v }),
  setBgColor: (color) => set({ bgColor: color }),
}));
