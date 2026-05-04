/**
 * Z-INDEX HIERARCHY - Ghost Era Design System v4
 * SINGLE SOURCE OF TRUTH for layering.
 * Follows .context/GHOST-DESIGN-SYSTEM.md scale.
 */

export const Z_INDEX = {
  negative: -1,
  base: 0,
  background: 1,
  
  // Content layers
  content: 10,
  contentTop: 20,
  
  // Section specific (Beliefs, etc)
  beliefs: {
    background: 0,
    overlay: 10,
    header: 30,
    scrollText: 40,
    manifesto: 50,
    ghost: 70,
  },

  // Global components
  sticky: 50,
  navigation: 100,
  overlay: 100,
  
  // UI Overlays
  modal: 500,
  dropdown: 600,
  tooltip: 700,
  
  // System layers
  preloader: 1000,
  cursor: 9999,
} as const;
