# Skill Routing Contract

## Selection rules

Choose the narrowest skill that fits the current phase.

### Audit
- Whole portfolio page, section, component or UX flow: `portfolio-design-audit`
- Whole motion system: `improve-animations`
- Missing motion opportunities: `find-animation-opportunities`
- Mobile web platform behavior: `mobile-native`
- Apple-derived interaction principles: `apple-design`

### Planning
- Normalize terminology: `animation-vocabulary`
- Dependency decision: `pick-ui-library`
- Alternative solution exploration: `prototype`

### Implementation
- Web motion: `animate`
- React Native / Expo motion: `animate-expo`
- Sonner-specific feedback: `ask-sonner`
- Mobile web platform fixes: `mobile-native`

### Validation
- Local motion quality: `review-animations`
- Cross-check fluid interaction principle: `apple-design`
- Device-only behavior: mark unverified until tested on hardware

## Conflict resolution

1. Project evidence and approved requirements.
2. Existing design system / motion language.
3. Specialized skill relevant to the problem.
4. `apple-design` as a selective principle lens.
5. External reference patterns only when transferable.

Audit-only requests keep product code read-only. A user request that includes implementation authorizes the requested scope; apply the relevant construction skill and validate the result.
