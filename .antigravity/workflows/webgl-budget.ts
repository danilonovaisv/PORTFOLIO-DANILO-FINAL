export interface WebGLBudgetConfig {
  dpr: number;
  antialias: boolean;
  postprocessingPasses: number;
}

export function validateWebGLBudget(config: WebGLBudgetConfig) {
  if (config.dpr > 2) {
    throw new Error('[WebGL Budget] DPR acima do permitido (max 2)');
  }

  if (config.antialias === true) {
    throw new Error('[WebGL Budget] Antialias deve ser false');
  }

  if (config.postprocessingPasses > 2) {
    throw new Error('[WebGL Budget] Muitos post-process passes');
  }

  return true;
}