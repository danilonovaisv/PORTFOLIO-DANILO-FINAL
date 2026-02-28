import { create } from 'zustand';
import type { Project } from '@/types/portfolio-grid';

type PortfolioModalState = {
  project: Project | null;
  isOpen: boolean;
  open: (_project: Project) => void;
  close: () => void;
};

export const usePortfolioModalStore = create<PortfolioModalState>((set) => ({
  project: null,
  isOpen: false,
  open: (project) => set({ project, isOpen: true }),
  close: () => set({ isOpen: false, project: null }),
}));
