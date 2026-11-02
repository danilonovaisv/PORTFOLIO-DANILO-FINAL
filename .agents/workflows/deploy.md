---
name: deploy
description: Workflow canônico para validação de integridade, build e deploy no Firebase Hosting com SSR Guardrail.
---

# /deploy — Production Release Workflow

Workflow canônico de build e publicação do Ghost System no Firebase Hosting e Supabase.

---

## 🛠️ Passo a Passo do Deploy

### Passo 1: Preflight & Integridade Local
1. **Validação de Variáveis de Ambiente:**
   ```bash
   pnpm run validate-env
   ```
2. **Auditoria de Storage & Assets Supabase:**
   ```bash
   pnpm run verify:assets
   pnpm run audit:supabase-storage
   ```
3. **Preflight do Firebase:**
   ```bash
   pnpm run firebase:preflight
   ```

### Passo 2: Testes Automatizados & Quality Gate
1. **Checagem Completa (Typecheck + Lint):**
   ```bash
   pnpm run build-check
   ```
2. **Suíte de Testes Unitários:**
   ```bash
   pnpm run test
   ```

### Passo 3: Compilação de Produção
1. **Compilação Next.js Standalone:**
   ```bash
   pnpm run build
   ```
2. **Verificação do Manifesto de Servidor:**
   Garante que `.next/standalone` e o manifesto de servidor foram gerados antes do envio (SSR Guardrail).

### Passo 4: Publicação no Firebase
1. **Deploy de Produção:**
   ```bash
   pnpm run deploy
   ```
2. **Smoke Test Pós-Deploy:**
   - Validar carregamento do Hero WebGL em <https://portfoliodanilo.com>.
   - Validar sessão e login em `/admin`.
   - Validar ausência de erros 500 no Firebase Console.
