import { create } from 'zustand';
import { ExperienceFlags } from '@/lib/antigravity/antigravity';

interface ExperienceState {
  flags: ExperienceFlags;
  setFlags: (_flags: ExperienceFlags) => void;
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  flags: {
    mountWebGL: false,
    enableManifestoScroll: false,
    enableHoverInteractions: false,
    reducedMotion: false,
    debugMode: false,
  },
  setFlags: (flags) => set({ flags }),
}));
