export const runtime = 'edge';
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

  const secretKey = process.env.TURNSTILE_SECRET_KEY?.trim();

  if (secretKey && secretKey !== '0x4AAAAAAAreplaceMe_secret' && secretKey !== '1x0000000000000000000000000000000AA') {
    try {
      const turnstileVerify = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(turnstileToken)}`,
        }
      );

      const turnstileData = (await turnstileVerify.json().catch(() => null)) as {
        success?: boolean;
        'error-codes'?: string[];
      } | null;

      if (turnstileData && !turnstileData.success) {
        const errorCodes = turnstileData['error-codes'] || [];
        if (errorCodes.includes('invalid-input-secret')) {
          console.warn(
            '[api/contact] Server TURNSTILE_SECRET_KEY is invalid/mismatched. Bypassing check.',
            errorCodes
          );
        } else {
          console.error(
            '[api/contact] Turnstile verification failed:',
            turnstileData
          );
          if (isJson) {
            return NextResponse.json(
              { ok: false, message: 'Validação de segurança (CAPTCHA) falhou. Por favor, recarregue a verificação.' },
              { status: 400 }
            );
          }
          return NextResponse.redirect(
            new URL('/#contact?error=captcha', request.url),
            303
          );
        }
      }
    } catch (err) {
      console.error('[api/contact] Turnstile fetch warning:', err);
    }
  } else {
    console.warn(
      '[api/contact] TURNSTILE_SECRET_KEY is not configured or is placeholder. Token present; proceeding with submission.'
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

  // Observabilidade básica e logs de auditoria
  console.warn('[contact-form] submission received', {
    ip,
    userAgent: request.headers.get('user-agent') || 'unknown',
    ...normalizedPayload,
  });

  // Enviar e-mail usando Resend API via fetch nativo
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const toEmail = 'danilo@portfoliodanilo.com';

  if (resendApiKey && resendApiKey !== 're_placeholder_secret' && !resendApiKey.includes('replaceMe')) {
    try {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: `Contato Portfólio <${fromEmail}>`,
          to: [toEmail],
          subject: `Novo contato: ${normalizedPayload.name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e7; border-radius: 8px; color: #18181b;">
              <h2 style="color: #0048ff; margin-top: 0;">Nova mensagem de contato</h2>
              <p style="margin: 10px 0;"><strong>Nome:</strong> ${normalizedPayload.name}</p>
              <p style="margin: 10px 0;"><strong>E-mail:</strong> <a href="mailto:${normalizedPayload.email}" style="color: #0048ff; text-decoration: none;">${normalizedPayload.email}</a></p>
              <p style="margin: 10px 0;"><strong>Telefone:</strong> ${normalizedPayload.phone || 'Não informado'}</p>
              <p style="margin: 20px 0 10px 0;"><strong>Mensagem:</strong></p>
              <div style="background-color: #f4f4f5; border-left: 4px solid #0048ff; padding: 15px; margin: 10px 0; border-radius: 4px; font-style: italic; white-space: pre-wrap;">${normalizedPayload.message}</div>
              <hr style="border: 0; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
              <p style="font-size: 12px; color: #71717a; margin-bottom: 0;">Esta mensagem foi enviada a partir do formulário de contato em portfoliodanilo.com.</p>
            </div>
          `,
        }),
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json().catch(() => null);
        console.error('[api/contact] Resend API error details:', errorData);
      } else {
        console.warn('[api/contact] Email sent successfully via Resend');
      }
    } catch (emailErr) {
      console.error('[api/contact] Failed to send email via Resend:', emailErr);
    }
  } else {
    console.warn(
      '[api/contact] RESEND_API_KEY is not configured or is a placeholder. Skipping email dispatch.'
    );
  }

  if (isJson) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  return NextResponse.redirect(new URL('/#contact?sent=1', request.url), 303);
}
