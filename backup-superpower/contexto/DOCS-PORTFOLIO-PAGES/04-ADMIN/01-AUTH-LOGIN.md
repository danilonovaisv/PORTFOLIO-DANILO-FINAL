# 01-AUTH-LOGIN

## 0. Estrutura de arquivos da sessão

- `src/app/admin/(auth)/layout.tsx`
- `src/app/admin/(auth)/login/page.tsx`
- `src/components/admin/LoginForm.tsx`
- `src/lib/supabase/auth-actions.ts`

## 1. Objetivo da sessão

Controlar entrada no CMS com autenticação Supabase e experiência de login enxuta.

## 2. Estrutura

- layout isolado para auth com card central.
- página de login client-side com fallback `Suspense`.

## 3. Acessibilidade e SEO

- robots `noindex/nofollow` no grupo auth.
- fluxo claro de foco visual no formulário.

## 4. Considerações técnicas

- usa autenticação por email/senha via Supabase.
- depende de credenciais server/client válidas.

## 5. Inconformidades observadas

- Inconformidade baixa: completar atributos `autoComplete` nos campos de login para melhorar UX e conformidade de browser hints.
