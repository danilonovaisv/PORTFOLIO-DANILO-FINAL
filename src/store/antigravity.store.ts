import { create } from 'zustand';

// Define the Experience Flags interface
export interface ExperienceFlags {
  mountWebGL: boolean;
  enableManifestoScroll: boolean;
  enableHoverInteractions: boolean;
  reducedMotion: boolean;
  debugMode: boolean; // Add debugMode flag
}

// Define Narrative States
export type NarrativeState =
  | 'IDLE'
  | 'HERO_EDITORIAL'
  | 'MANIFESTO_TRANSITION'
  | 'MANIFESTO_FULLSCREEN'
  | 'EXPLORATION';

interface AntigravityState {
  // Experience Configuration
  flags: ExperienceFlags;
  setFlag: (_key: keyof ExperienceFlags, _value: boolean) => void;
  setFlags: (_flags: Partial<ExperienceFlags>) => void;

  // Real-time Context
  viewport: { width: number; height: number };
  setViewport: (_width: number, _height: number) => void;

  // Narrative Control
  narrativeState: NarrativeState;
  setNarrativeState: (_state: NarrativeState) => void;

  // Scroll Metrics
  scrollProgress: number;
  setScrollProgress: (_progress: number) => void;
}

export const useAntigravityStore = create<AntigravityState>((set) => ({
  // Defaults based on CI/Rules
  flags: {
    mountWebGL: true, // Will be overridden by hydration/device check
    enableManifestoScroll: true,
    enableHoverInteractions: true,
    reducedMotion: false,
    debugMode: process.env.NODE_ENV === 'development',
  },

  viewport: { width: 0, height: 0 },
  narrativeState: 'IDLE',
  scrollProgress: 0,

  setFlag: (key, value) =>
    set((state) => ({ flags: { ...state.flags, [key]: value } })),
  setFlags: (newFlags) =>
    set((state) => ({ flags: { ...state.flags, ...newFlags } })),

  setViewport: (width, height) => set({ viewport: { width, height } }),

  setNarrativeState: (state) => set({ narrativeState: state }),

  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}));
