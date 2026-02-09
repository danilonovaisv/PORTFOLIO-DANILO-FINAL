import { create } from 'zustand';
import type { DbProject, DbAsset } from '@/types/admin';

interface ContentState {
  // Data Cache
  projects: Record<string, DbProject>; // Map by ID
  assets: Record<string, DbAsset>; // Map by Key (or ID)

  // Actions
  setProjects: (_projects: DbProject[]) => void;
  upsertProject: (_project: DbProject) => void;

  setAssets: (_assets: DbAsset[]) => void;
  upsertAsset: (_asset: DbAsset) => void;

  // GC
  clearCache: () => void;
}

export const useContentStore = create<ContentState>((set) => ({
  projects: {},
  assets: {},

  setProjects: (list) =>
    set((state) => ({
      projects: {
        ...state.projects,
        ...list.reduce((acc, p) => ({ ...acc, [p.id]: p }), {}),
      },
    })),

  upsertProject: (project) =>
    set((state) => ({
      projects: { ...state.projects, [project.id]: project },
    })),

  setAssets: (list) =>
    set((state) => ({
      assets: {
        ...state.assets,
        ...list.reduce((acc, a) => ({ ...acc, [a.key]: a }), {}),
      },
    })),

  upsertAsset: (asset) =>
    set((state) => ({
      assets: { ...state.assets, [asset.key]: asset },
    })),

  clearCache: () => set({ projects: {}, assets: {} }),
}));
