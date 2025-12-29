export function enforceDesignSystem(tokenUsed: boolean) {
  if (!tokenUsed) {
    throw new Error('[Design System] Token obrigatório não utilizado');
  }
  return true;
}
