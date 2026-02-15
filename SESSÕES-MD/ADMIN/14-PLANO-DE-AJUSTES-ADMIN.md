# 14-PLANO-DE-AJUSTES-ADMIN

## Escopo

Plano de execução para os itens apontados em `SESSÕES-MD/ADMIN/11-ANALISE-GLOBAL-DO-ADMIN.md`, com foco em:

1. hardening de segurança/admin governance (Alta),
2. padronização de validações UI + server actions (Média),
3. fallback/observabilidade para módulos de IA (Média),
4. refinamento UX de formulários (Baixa).

## Skills aplicadas no plano

- `.agent/skills/3d-web-experience/SKILL.md`
- `.agent/skills/framer-motion/SKILL.md`
- `.agent/skills/audit-website/SKILL.md`
- `.agent/skills/nextjs-react-expert/SKILL.md`
- `.agent/skills/supabase/SKILL.md`

## Referências técnicas (MCP Context7)

- Next.js App Router/Server boundaries: https://context7.com/vercel/next.js/llms.txt?tokens=100000
- Framer Motion (reduced motion, transition discipline): https://context7.com/grx7/framer-motion/llms.txt
- Supabase SSR/Auth middleware: https://context7.com/supabase/ssr/llms.txt

## Faseamento recomendado

### Fase 0 — Baseline e inventário de risco (0.5 dia)

- Consolidar baseline de segurança e operação:
  - auth guard server-side,
  - server actions críticas,
  - exposição de variáveis no settings.
- Registrar matriz de risco por domínio:
  - acesso/admin,
  - integridade de dados (CMS),
  - dependências IA (OpenAI).

### Fase 1 — Hardening de segurança do Admin (Alta, 1-2 dias)

Objetivo: reduzir superfície de risco e alinhar least privilege ponta a ponta.

Arquivos-alvo:

- `src/lib/admin/server-access.ts`
- `src/lib/admin/authz.ts`
- `src/lib/admin/audit.ts`
- `src/app/admin/(protected)/settings/page.tsx`
- `supabase/schemas/02_security.sql`
- `supabase/migrations/20260207183000_harden_admin_rbac.sql`

Ações:

- Tornar explícita a política de uso de `service_role`:
  - somente em server context,
  - fallback controlado quando indisponível,
  - log de degradação de permissão.
- Revisar o settings para não expor estado de credenciais sensíveis além do necessário.
- Reforçar auditoria administrativa:
  - incluir metadados úteis de operação (ação, recurso, erro),
  - padronizar taxonomia de erro para triagem.
- Validar RLS/policies com checklist objetivo (read/write por perfil admin x público).

Critérios de aceite:

- Rotas admin sem dependência de permissão ampla no cliente.
- Policies alinhadas ao papel admin (sem broad grants desnecessários).
- Trilha de auditoria suficiente para investigar falhas operacionais.

### Fase 2 — Validações de negócio unificadas (Média, 1-2 dias)

Objetivo: impedir divergência entre validação client-side e server-side.

Arquivos-alvo:

- `src/components/admin/ProjectForm.tsx`
- `src/app/admin/(protected)/trabalhos/actions.ts`
- `src/app/admin/(protected)/copy-agent/actions.ts`
- `src/app/admin/(protected)/scene-generator/actions.ts`
- `src/lib/admin/` (novo módulo de schema compartilhado)

Ações:

- Extrair schemas compartilhados (Zod) para um módulo central (`src/lib/admin/schemas/*`).
- Reusar os mesmos contracts no formulário e na server action.
- Padronizar mensagens de erro por campo (UI) e por operação (server).
- Criar validações de consistência:
  - campos obrigatórios por tipo de projeto,
  - limites de mídia,
  - coerência entre flags de publicação/destaque.

Critérios de aceite:

- Mesma regra de validação no client e no server para cada entidade.
- Erros previsíveis e consistentes no fluxo de edição/criação.

### Fase 3 — Fallback e observabilidade dos módulos IA (Média, 1 dia)

Objetivo: manter operação mesmo com indisponibilidade parcial de IA.

Arquivos-alvo:

- `src/app/admin/(protected)/copy-agent/actions.ts`
- `src/app/admin/(protected)/scene-generator/actions.ts`
- `src/app/admin/(protected)/scene-generator/types.ts`
- `src/app/admin/(protected)/copy-agent/page.tsx`
- `src/app/admin/(protected)/scene-generator/page.tsx`

Ações:

- Definir fallback funcional por módulo:
  - copy-agent: template mínimo editável quando API indisponível,
  - scene-generator: mensagem operacional + retry guidado.
- Expor status de capacidade real de modelo (não só constante local).
- Registrar eventos de falha para suporte interno (erro, modelo, payload resumido).
- Garantir mensagens de erro acionáveis para usuário admin.

Critérios de aceite:

- Fluxo IA não quebra silenciosamente.
- Usuário recebe caminho de ação claro em falha.
- Logs permitem diagnóstico pós-incidente.

### Fase 4 — UX de formulários e acessibilidade operacional (Baixa, 0.5 dia)

Objetivo: melhorar usabilidade sem alterar domínio.

Arquivos-alvo:

- `src/components/admin/LoginForm.tsx`
- `src/components/admin/ProjectForm.tsx`
- `src/components/admin/TagForm.tsx` (se necessário)

Ações:

- Login:
  - `autocomplete="email"` e `autocomplete="current-password"`,
  - feedback de erro com `aria-live`.
- Formulários CMS:
  - mensagens de erro por campo com padrão visual único,
  - consistência de foco após erro.

Critérios de aceite:

- Melhor preenchimento assistido no login.
- Feedback de erro acessível e consistente.

### Fase 5 — Validação final e fechamento (0.5 dia)

- Auditoria web:
  - `squirrel audit https://portfoliodanilo.com/admin/login --format llm --coverage full --max-pages 30`
- Smoke checklist:
  - login/logout,
  - CRUD de projetos/tags,
  - copy-agent e scene-generator com cenário de erro.
- Registro de evidências em nota de fechamento.

## Backlog priorizado (resumo)

1. Alta: hardening de segurança/admin governance.
2. Média: validações de negócio unificadas.
3. Média: fallback/observabilidade de IA.
4. Baixa: refinamento de UX em formulários.

## Riscos e mitigação

- Risco: quebra de fluxo ao endurecer políticas.
  - Mitigação: rollout em fases com checklist de CRUD por módulo.
- Risco: duplicação de schema durante migração.
  - Mitigação: mover regra por entidade com feature flag/local adapter.
- Risco: ruído de logs em IA.
  - Mitigação: normalizar categorias e campos mínimos por evento.

## Definition of Done (Admin)

- Segurança/hardening concluídos com checklist de policies.
- Schemas unificados entre UI e server.
- IA com fallback e diagnóstico operacional.
- Login/formulários com ajustes de UX/a11y.
- Auditoria final registrada.
