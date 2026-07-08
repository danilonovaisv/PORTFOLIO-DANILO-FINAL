type ErrorLike =
  string | Error | { message?: string | null } | null | undefined | unknown;

function getErrorMessage(error: ErrorLike): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }
  return '';
}

export function isCaptchaErrorMessage(error: ErrorLike): boolean {
  const message = getErrorMessage(error).toLowerCase();

  return (
    message.includes('captcha verification process failed') ||
    message.includes('captcha') ||
    message.includes('turnstile') ||
    message.includes('security verification') ||
    message.includes('token')
  );
}

export function mapSupabaseAuthError(error: ErrorLike): string {
  const rawMessage = getErrorMessage(error);
  const message = rawMessage.toLowerCase();

  if (!message) {
    return 'SYSTEM_ERR: AUTH_SESSION_FAILED — RETRY_SESSION';
  }

  if (isCaptchaErrorMessage(rawMessage)) {
    return 'SYSTEM_ERR: SECURITY_VERIFICATION_FAILED — REFRESH_CAPTCHA_AND_RETRY';
  }

  if (message.includes('invalid login credentials')) {
    return 'SYSTEM_ERR: INVALID_CREDENTIALS — VERIFY_EMAIL_OR_ACCESS_KEY';
  }

  if (message.includes('email not confirmed')) {
    return 'SYSTEM_ERR: IDENTITY_UNCONFIRMED — CHECK_INBOX_FOR_VERIFICATION';
  }

  if (message.includes('user already registered')) {
    return 'SYSTEM_ERR: IDENTITY_CONFLICT — EMAIL_ALREADY_EXISTS';
  }

  if (message.includes('provider is not enabled')) {
    return 'SYSTEM_ERR: OAUTH_PROVIDER_DISABLED — CONTACT_KERNEL_ADMIN';
  }

  if (message.includes('email rate limit exceeded')) {
    return 'SYSTEM_ERR: RATE_LIMIT_EXCEEDED — COOLDOWN_ACTIVE_WAIT_BEFORE_RETRY';
  }

  if (message.includes('smtp')) {
    return 'SYSTEM_ERR: SMTP_HANDSHAKE_FAILURE — CHECK_SUPABASE_OUTBOUND_CONFIG';
  }

  if (message.includes('unexpected_failure') || message.includes('500')) {
    return 'SYSTEM_ERR: INTERNAL_CORE_FAILURE — REVIEW_LOGS_AND_REDIRECTS';
  }

  return `SYSTEM_ERR: RAW_EXCEPTION — ${rawMessage.toUpperCase()}`;
}
