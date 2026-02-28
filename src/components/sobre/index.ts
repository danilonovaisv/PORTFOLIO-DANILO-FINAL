// Main entry point - re-exports all sobre components
// This maintains backward compatibility with existing imports

// Page Sections
export {
  AboutHero,
  AboutOrigin,
  AboutWhatIDo,
  AboutMethod,
  AboutBeliefs,
  AboutClosing,
} from '@/components/sobre/sections';

// Shared Utilities
export { kw, motionTokens, motionSprings } from '@/components/sobre/shared';
