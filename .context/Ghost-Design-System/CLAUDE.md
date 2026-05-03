# Claude Code Configuration — Ghost System Portfolio

> **Projeto:** Portfolio institucional de Danilo Novais | **Codinome:** Ghost Era  
> **URL:** https://portfoliodanilo.com

---

## Stack Técnica

| Camada    | Tecnologia                                         |
| --------- | -------------------------------------------------- |
| Framework | Next.js 15 (App Router) + React 19                 |
| Linguagem | TypeScript (strict mode)                           |
| Estilo    | Tailwind CSS 4 (CSS-first config)                  |
| Animação  | Framer Motion 12 + GSAP 3 + Lenis 1                |
| 3D/WebGL  | React Three Fiber 9 + Three.js 0.183 + GLSL custom |
| Estado    | Zustand 5 + React Context                          |
| Backend   | Supabase SSR + Firebase                            |
| Runtime   | Node.js >=20, **pnpm** (nunca npm/yarn)            |

## Comandos

```bash
pnpm dev          # servidor local
pnpm build        # build de produção
pnpm typecheck    # TypeScript check
pnpm lint         # ESLint
pnpm test         # Jest (unit)
pnpm test:e2e     # Playwright (E2E)
pnpm deploy       # deploy
```

---

## Arquitetura & Convenções

- **Diretórios-chave:**
  - `src/components/ui` — primitivos atômicos Ghost
  - `src/components/canvas` — cenas R3F e shaders
  - `src/hooks` — lógica de animação e Supabase
  - `.context/` — fonte da verdade do estado atual do projeto (READ-WRITE)
  - `.agents/` — biblioteca de skills (READ-ONLY)
- **Nomenclatura:** PascalCase para componentes; camelCase para hooks e funções.
- **Server Components** por padrão; `"use client"` apenas para interatividade e R3F.
- **Arquivos:** máximo 500 linhas por arquivo.
- Após editar `src/`, sincronizar o documento correspondente em `.context/`.

## Design System — Ghost System

- **Primary:** Ghost Blue `#0048ff`
- **Background:** Void Black `#040013`
- **Easing padrão:** `[0.22, 1, 0.36, 1]`
- **Grid:** `.std-grid` (12 col desktop / 4 col mobile) — obrigatório em todos os layouts
- **Z-index:** ver `.context/GHOST-DESIGN-SYSTEM.md`
- **Performance:** FPS > 50 em cenas WebGL; DPR limitado em mobile

---

## Regras de Qualidade (Always Enforced)

- Faça exatamente o que foi pedido — nada mais, nada menos.
- Prefira editar arquivos existentes a criar novos.
- Nunca crie arquivos de documentação (`*.md`) proativamente sem pedido explícito.
- Nunca salve arquivos de trabalho ou testes na pasta raiz.
- Leia o arquivo antes de editá-lo.
- Nunca commite segredos, credenciais ou arquivos `.env`.
- **Acessibilidade:** Meta AA/AAA; `aria-label` obrigatório em elementos Canvas.
- **Performance:** `ssr: false` para Canvas; evitar repaints em scroll.
- **Resiliência:** fallbacks de mídia e skeletons para fetch de dados.
- **Silent Design:** animações decorativas agressivas são proibidas — movimento = respiração.

## Definition of Done

1. Código sem erros TypeScript/Lint.
2. Bugs reportados em `AUDIT_PENTEST.md`.
3. Documento correspondente em `.context/` atualizado.

---

## Referências (Single Source of Truth)

| Documento                         | Conteúdo                |
| --------------------------------- | ----------------------- |
| `.context/ARCHITECTURE.md`        | Arquitetura do sistema  |
| `.context/GHOST-DESIGN-SYSTEM.md` | Tokens, z-index, grid   |
| `.context/SITEMAP.md`             | Mapa de páginas         |
| `.context/active_state.md`        | Estado ativo da sprint  |
| `AGENTS.md`                       | Governança multi-agente |
