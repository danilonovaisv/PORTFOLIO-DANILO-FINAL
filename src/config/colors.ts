/**
 * COLOR TOKENS - Ghost Era Design System v4
 * SINGLE SOURCE OF TRUTH for branding and UI colors.
 * These should match variables in globals.css @theme
 */

export const COLORS = {
  // Brand Colors
  bluePrimary: '#0048ff', // Main CTA, interactive
  blueAccent: '#4fe6ff', // Highlights, glows
  blueHover: '#2e85f2', // Hover state for primary buttons
  blueActive: '#0037c2', // Pressed/Active state
  
  purpleDetails: '#8705f2', // Secondary interactive, accents
  pinkDetails: '#f501d3', // Tertiary highlights
  
  // Backgrounds
  background: '#040013', // Void Black
  backgroundLight: '#f0f0f0', // Inverted surfaces
  
  // Text
  text: '#fcffff', // Main readable text
  textInverse: '#0e0e0e', // Dark text for light backgrounds
  textEmphasis: '#2e85f2', // Blue-toned emphasis
  textHighlight: '#4fe6ff', // Cyan-toned highlight
  textSecondary: '#a1a3a3', // Muted info
  
  // Utilities
  neutral: '#0b0d3a', // Dark abyss blue
  redAccent: '#e50914', // Errors, danger, critical accents
  neutralLight: '#f5f5f5', // Subtle light backgrounds
  contactForeground: '#fcffff',
  
  // Abyss Gradients
  abyssStart: '#0c1445',
  abyssMid: '#08031f',
} as const;
