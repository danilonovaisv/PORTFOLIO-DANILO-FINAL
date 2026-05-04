import { NextRequest, NextResponse } from 'next/server';

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  _honey?: string;
  'cf-turnstile-response'?: string;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const ipRequestHistory = new Map<string, number[]>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entries = ipRequestHistory.get(ip) ?? [];
  const recent = entries.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipRequestHistory.set(ip, recent);
    return true;
  }

  recent.push(now);
  ipRequestHistory.set(ip, recent);
  return false;
}

function validatePayload(payload: ContactPayload): string | null {
  if (!payload.name?.trim()) return 'Nome é obrigatório.';
  if (!payload.email?.trim()) return 'Email é obrigatório.';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(payload.email)) return 'Email inválido.';

  if (!payload.message?.trim() || payload.message.trim().length < 10) {
    return 'Mensagem deve ter pelo menos 10 caracteres.';
  }

  return null;
}

async function readPayload(request: NextRequest): Promise<{
  payload: ContactPayload;
  isJson: boolean;
}> {
  const contentType = request.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  if (isJson) {
    const json = (await request.json()) as Partial<ContactPayload>;
    return {
      payload: {
        name: `${json.name || ''}`,
        email: `${json.email || ''}`,
        phone: json.phone ? `${json.phone}` : '',
        message: `${json.message || ''}`,
        _honey: json._honey ? `${json._honey}` : '',
        'cf-turnstile-response': json['cf-turnstile-response']
          ? `${json['cf-turnstile-response']}`
          : '',
      },
      isJson,
    };
  }

  const formData = await request.formData();
  return {
    payload: {
      name: `${formData.get('name') || ''}`,
      email: `${formData.get('email') || ''}`,
      phone: `${formData.get('phone') || ''}`,
      message: `${formData.get('message') || ''}`,
      _honey: `${formData.get('_honey') || ''}`,
      'cf-turnstile-response': `${formData.get('cf-turnstile-response') || ''}`,
    },
    isJson,
  };
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Muitas tentativas. Aguarde 1 minuto e tente novamente.',
      },
      { status: 429 }
    );
  }

  const { payload, isJson } = await readPayload(request);

  // Validate Cloudflare Turnstile token
  const turnstileToken = payload['cf-turnstile-response'] || '';
  if (!turnstileToken) {
    if (isJson) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Validação de segurança (CAPTCHA) falhou. Token ausente.',
        },
        { status: 400 }
      );
    }
    return NextResponse.redirect(
      new URL('/#contact?error=captcha', request.url),
      303
    );
  }

  try {
    const secretKey =
      process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';

    const turnstileVerify = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(turnstileToken)}`,
      }
    );

    const turnstileData = await turnstileVerify.json();

    if (!turnstileData.success) {
      console.error(
        '[api/contact] Turnstile verification failed:',
        turnstileData
      );
      if (isJson) {
        return NextResponse.json(
          { ok: false, message: 'SYSTEM_ERR: CAPTCHA_VALIDATION_FAILED' },
          { status: 400 }
        );
      }
      return NextResponse.redirect(
        new URL('/#contact?error=captcha', request.url),
        303
      );
    }
  } catch (err) {
    console.error('[api/contact] Unexpected CAPTCHA error:', err);
    // Em caso de erro de rede (como agora), falhamos com segurança
    if (isJson) {
      return NextResponse.json(
        { ok: false, message: 'SYSTEM_ERR: EXTERNAL_SERVICE_UNAVAILABLE' },
        { status: 503 }
      );
    }
    return NextResponse.redirect(
      new URL('/#contact?error=service_down', request.url),
      303
    );
  }

  // Honeypot: aceita silenciosamente para não sinalizar ao bot.
  if (payload._honey?.trim()) {
    if (isJson) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.redirect(new URL('/#contact?sent=1', request.url), 303);
  }

  const validationError = validatePayload(payload);
  if (validationError) {
    if (isJson) {
      return NextResponse.json(
        { ok: false, message: validationError },
        { status: 400 }
      );
    }
    return NextResponse.redirect(
      new URL('/#contact?error=1', request.url),
      303
    );
  }

  const normalizedPayload = {
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone?.trim() || null,
    message: payload.message.trim(),
    source: 'home-contact-form',
  };

  // Observabilidade básica até integração com provider de email/CRM.
  console.warn('[contact-form] submission', {
    ip,
    userAgent: request.headers.get('user-agent') || 'unknown',
    ...normalizedPayload,
  });

  if (isJson) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  return NextResponse.redirect(new URL('/#contact?sent=1', request.url), 303);
}
