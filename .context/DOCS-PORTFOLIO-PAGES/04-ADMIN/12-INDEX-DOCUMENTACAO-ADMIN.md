# ÍNDICE DE DOCUMENTAÇÃO — ADMIN

## 1) Documentação da sessão (`SESSÕES-MD/ADMIN`)

- `SESSÕES-MD/ADMIN/ADMIN - PROTOTIPO INTERATIVO.md`
- `SESSÕES-MD/ADMIN/PROTOTIPO INTERATIVO DA LANDING PAGE.md`
- `SESSÕES-MD/ADMIN/POP-UP DE PROJETO (SEM LANDING PAGE).md`
- `SESSÕES-MD/ADMIN/LANDING-PAGE-MODEL.jpg`
- `SESSÕES-MD/ADMIN/01-AUTH-LOGIN.md`
- `SESSÕES-MD/ADMIN/02-PROTECTED-LAYOUT-SHELL.md`
- `SESSÕES-MD/ADMIN/03-DASHBOARD.md`
- `SESSÕES-MD/ADMIN/04-TRABALHOS.md`
- `SESSÕES-MD/ADMIN/05-TAGS.md`
- `SESSÕES-MD/ADMIN/06-MIDIA.md`
- `SESSÕES-MD/ADMIN/07-LANDING-PAGES.md`
- `SESSÕES-MD/ADMIN/08-SETTINGS-CONFIG.md`
- `SESSÕES-MD/ADMIN/09-COPY-AGENT.md`
- `SESSÕES-MD/ADMIN/10-SCENE-GENERATOR.md`
- `SESSÕES-MD/ADMIN/11-ANALISE-GLOBAL-DO-ADMIN.md`
- `SESSÕES-MD/ADMIN/12-INDEX-DOCUMENTACAO-ADMIN.md`
- `SESSÕES-MD/ADMIN/13-REFERENCIAS-CONTEXT7.md`
- `SESSÕES-MD/ADMIN/14-PLANO-DE-AJUSTES-ADMIN.md`

## 2) Documentação existente relacionada em `docs/`

- `docs/ADMIN_README.md`
- `docs/ADMIN/AGENT.md`
- `docs/ADMIN/prototipo-landing-template-mestre.md`
- `docs/ADMIN/prompts-criacao-agents.md`
- `docs/ADMIN/SYSTEM PROMPT — PORTFOLIO ART DIRECTION COPY AGENT.md`
- `docs/ADMIN/prompt cenas opal.md`
- `docs/ADMIN/bg-animado.md`
- `docs/ADMIN/LANDING-PAGE-MODEL.jpg`
- `docs/audit/ADMIN_AUDIT.md`
- `docs/walkthroughs/admin-scroll-fix.md`

## 3) Fontes de código mapeadas para ADMIN

- Auth:
  - `src/app/admin/(auth)/layout.tsx`
  - `src/app/admin/(auth)/login/page.tsx`
- Protected shell:
  - `src/app/admin/(protected)/layout.tsx`
  - `src/components/admin/AdminShell.tsx`
- Guardas:
  - `src/lib/admin/authz.ts`
  - `src/lib/admin/server-access.ts`
- Rotas centrais:
  - `src/app/admin/(protected)/page.tsx`
  - `src/app/admin/(protected)/trabalhos/page.tsx`
  - `src/app/admin/(protected)/tags/page.tsx`
  - `src/app/admin/(protected)/midia/page.tsx`
  - `src/app/admin/(protected)/landing-pages/page.tsx`
  - `src/app/admin/(protected)/settings/page.tsx`
  - `src/app/admin/(protected)/copy-agent/page.tsx`
  - `src/app/admin/(protected)/scene-generator/page.tsx`
