const ALLOWED_PROPERTIES = ['transform', 'opacity'];

export function validateMotion(propertiesUsed: string[]) {
  const invalid = propertiesUsed.filter(
    prop => !ALLOWED_PROPERTIES.includes(prop)
  );

  if (invalid.length > 0) {
    throw new Error(
      `[Motion Validation] Propriedades proibidas detectadas: ${invalid.join(', ')}`
    );
  }

  return true;
}