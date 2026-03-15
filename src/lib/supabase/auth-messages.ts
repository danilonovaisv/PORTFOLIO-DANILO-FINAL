type ErrorLike =
  | string
  | Error
  | { message?: string | null }
  | null
  | undefined
  | unknown;

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
    return 'Não foi possível concluir a autenticação. Tente novamente.';
  }

  if (isCaptchaErrorMessage(rawMessage)) {
    return 'A verificação de segurança falhou. Atualize o captcha e tente novamente.';
  }

  if (message.includes('invalid login credentials')) {
    return 'Email ou senha inválidos.';
  }

  if (message.includes('email not confirmed')) {
    return 'Seu email ainda não foi confirmado.';
  }

  if (message.includes('user already registered')) {
    return 'Já existe uma conta com esse email.';
  }

  if (message.includes('provider is not enabled')) {
    return 'Esse provedor de login não está habilitado no projeto.';
  }

  if (message.includes('email rate limit exceeded')) {
    return 'Muitas tentativas por email. Aguarde alguns minutos antes de tentar novamente.';
  }

  if (message.includes('smtp')) {
    return 'O provedor de email recusou o envio. Revise a configuração de SMTP no Supabase.';
  }

  if (message.includes('unexpected_failure') || message.includes('500')) {
    return 'O serviço de autenticação respondeu com falha interna. Revise captcha, redirects e provedores.';
  }

  return rawMessage;
}
