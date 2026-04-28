'use client';

/**
 * Barrel export dos componentes Beliefs.
 * 'use client' aqui força o bundler a incluir todos os exports
 * no bundle client — previne erro de uso de hooks em Server Components.
 * Adicionado em 2026-02-22 (runtime guard).
 */

export { BeliefBackground } from './BeliefBackground';
export { BeliefOverlay } from './BeliefOverlay';
export { BeliefFixedHeader } from './BeliefFixedHeader';
export { BeliefScrollText } from './BeliefScrollText';
export { BeliefManifesto } from './BeliefManifesto';
