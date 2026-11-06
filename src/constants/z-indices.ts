/**
 * Ghost System Stacking Context & Layer Governance (Ghost DS §1.3 v3.2)
 * Single Source of Truth for Z-Index constants across TypeScript and CSS tokens.
 */
export const Z_INDEX = {
  base: 0,
  glass: 10,
  content: 20,
  '3d': 30,
  cta: 40,
  overlay: 50,
  header: 55,
  mobileText: 60,
  debugLow: 65,
  lightbox: 70,
  mobileHeader: 80,
  mobilePre: 85,
  mobileMenu: 90,
  mobileMenuControl: 92,
  modalScrim: 95,
  modal: 100,
  modalClose: 105,
  cursor: 110,
  preloader: 1000,
  skipLink: 1300,
  debugTop: 9999,
} as const;

export type ZIndexLayer = keyof typeof Z_INDEX;
