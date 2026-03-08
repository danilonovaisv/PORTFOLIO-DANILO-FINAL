const TURNSTILE_PUBLIC_SITE_KEY_FALLBACK = '0x4AAAAAACgcpmYImvbq_qQg';

export function getTurnstileSiteKey(): string {
  const envKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

  if (envKey && envKey !== '1x00000000000000000000AA') {
    return envKey;
  }

  return TURNSTILE_PUBLIC_SITE_KEY_FALLBACK;
}
