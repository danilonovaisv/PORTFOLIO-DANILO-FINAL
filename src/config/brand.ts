/**
 * Design System Colors - Centralized color palette
 * Use these constants instead of hardcoded hex values
 */
export const COLORS = {
  // Primary Brand Colors
  primary: '#0057FF', // Main brand blue
  primaryHover: '#0046CC', // Darker variant for hover states
  primaryLight: '#4b8dff', // Light variant for accents

  // Void/Dark Theme
  void: '#050505', // Main background
  voidDeep: '#0a0a0a', // Deeper black
  voidGradientStart: '#0a0a16', // Gradient start
  voidGradientEnd: '#0f112b', // Gradient end

  // Ghost/Ethereal
  ghostGlow: '#0e5dff', // Emissive glow
  ghostCore: '#060a1f', // Ghost core color
  ghostParticles: '#6fd2ff', // Particle color
  ghostEyes: '#7cb6ff', // Eye highlight
  ghostAmbient: '#020214', // Ambient light

  // UI Colors
  textPrimary: '#F0F0F0', // Off-white text
  textSecondary: '#888888', // Dimmed text
  textDark: '#111111', // Dark text for light sections
  textMuted: '#666666', // Muted text

  // Surface Colors
  surfaceLight: '#F4F5F7', // Light section background
  surfaceWhite: '#ffffff', // White
  surfaceDark: '#0f172a', // Dark card surfaces

  // Focus/Accessibility
  focusRing: '#0057FF', // Focus visible ring
} as const;

export const BRAND = {
  name: 'Danilo Novais',
  typography: 'TT Norms Pro',
  logos: {
    light:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg',
    dark: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon.svg',
    favicon:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/logo.svg',
  },
  video: {
    manifesto:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4', // Usado na Hero e Manifesto
  },
  colors: COLORS,
};
