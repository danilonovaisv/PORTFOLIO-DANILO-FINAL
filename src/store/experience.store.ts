import { create } from 'zustand';
import { ExperienceFlags } from '@/antigravity';

interface ExperienceState {
  flags: ExperienceFlags;
  setFlags: (flags: ExperienceFlags) => void;
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  flags: {
    mountWebGL: false,
    enableManifestoScroll: false,
    enableHoverInteractions: false,
    reducedMotion: false
  },
  setFlags: (flags) => set({ flags })
}));