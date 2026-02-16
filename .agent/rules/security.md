# SECURITY & COMPLIANCE PROTOCOLS

## 🛡️ Autenticação & RLS

1. **Auth Gate**: Middleware `src/middleware.ts` deve bloquear `/admin/(protected)` para não-autenticados.
2. **RLS (Row Level Security)**:
   - **Public**: `SELECT` permitido APENAS onde `status = 'published'`.
   - **Admin**: `ALL` permitido para roles autenticadas com claim de admin.
3. **Secrets**: Nunca commitar `.env`. Validar `NEXT_PUBLIC_SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`.

## 🚦 Regras de Execução (Agent Permissions)

- **Allowlist (Livre)**: `git status`, `ls`, `npm run typecheck`, `npm run build`.
- **Denislist (Requer Aprovação)**: `rm -rf`, `sudo`, `git push` (Agente faz stage, Humano faz push).
- **Modo Review**: O Agente deve pedir confirmação antes de alterações destrutivas no banco ou configurações de RLS.

## 🕵️ Ethical Pentest Protocol
>
> **STATUS**: INATIVO (Ativar apenas sob comando explícito: "INICIAR PENTEST")

1. **Scope Check**: Ler `targets/scope.txt`.
2. **No Destructive**: Proibido DoS ou exclusão de dados.
3. **PII Stop**: Se encontrar dados pessoais reais, PARAR e reportar.
4. **Artifacts**: Gerar relatório em `reports/final-pentest.md`.
