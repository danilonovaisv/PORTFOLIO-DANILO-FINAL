---
description:
---

# Workflow: Auditoria e Limpeza Estrutural

**Contexto:**
Manter a sanidade do repositório, garantindo que a estrutura de pastas siga o padrão Next.js App Router e que arquivos de documentação/referência não poluam o código-fonte de produção.

**Agente Responsável:** @TechLead
**Gatilho:** `/cleanup` ou quando a estrutura parecer desorganizada.

---

## 1. Fase de Análise (Audit)

O agente deve primeiro listar e categorizar a estrutura atual sem fazer alterações.

### Checklist de Verificação:

1.  **Validação do `src/`:**
    - Todo código-fonte (componentes, libs, hooks, utils) está dentro de `src/`?
    - Existem arquivos de configuração (exceto `next.config.mjs`, `tailwind.config.ts`, etc.) perdidos na raiz?
2.  **Detecção de Lixo (Debris):**
    - Identificar pastas de cache commitadas indevidamente (`.next/`, `.firebase/`, `node_modules/`, `dist/`).
    - Verificar se há arquivos `.zip`, `.log` ou `.DS_Store` rastreados.
3.  **Pasta `docs/`:**
    - A pasta `docs/` deve conter apenas documentação Markdown e assets de referência.
    - Se houver código morto ou backups antigos (ex: `docs/AJUSTE HERO/...`), sinalizar para exclusão ou arquivamento.

---

## 2. Regras de Organização (Enforcement)

O agente deve propor movimentações baseadas nestas regras estritas:

### A. Estrutura de Componentes (`src/components/`)

Adotar estrutura por **Funcionalidade (Feature-based)** para seções grandes e **Tipo** para genéricos.

- **`src/components/ui/`**: Componentes primitivos reutilizáveis (Buttons, Inputs, Cards). Sem lógica de negócio.
- **`src/components/home/`**: Componentes exclusivos da Home Page (Hero, Manifesto, Grid).
- **`src/components/layout/`**: Header, Footer, Wrappers de Grid.
- **`src/components/canvas/`**: Cenas WebGL/R3F isoladas (ex: `GhostScene.tsx`, `Torus.tsx`). _Não misturar DOM com Canvas._

### B. Utilitários e Hooks

- **`src/hooks/`**: Apenas Custom Hooks (ex: `useScrollProgress`).
- **`src/lib/`**: Configurações de terceiros (Supabase, Three.js helpers, Utils puros).
- **`src/styles/`**: Se houver CSS Modules ou globals além do Tailwind.

---

## 3. Plano de Execução (Cleanup Actions)

Se aprovado pelo usuário, executar sequencialmente:

1.  **Limpeza do `.gitignore`:**
    - Garantir que as seguintes entradas existam:
      ```gitignore
      .next/
      node_modules/
      .firebase/
      out/
      build/
      .DS_Store
      *.zip
      .env
      .env.local
      ```

2.  **Saneamento de Referências (Docs):**
    - Mover arquivos pesados ou de referência (PDFs, Zips de exemplo) para fora do repositório ou adicionar ao `.gitignore` se forem apenas para dev.
    - **Ação Crítica:** Verificar se a pasta `docs/AJUSTE HERO/DIAMANTE.zip` e seu conteúdo extraído estão sendo usados. Se for código antigo, sugerir remoção.

3.  **Padronização de Imports:**
    - Substituir imports relativos longos (`../../../components`) por Alias Imports (`@/components`).
    - O agente deve rodar um script ou regex para corrigir isso em massa.

4.  **Remoção de Código Morto:**
    - Verificar componentes que não são importados em nenhum lugar (Dead Code Elimination).

---

## 4. Validação Final

Após a reorganização:

1.  Rodar `npm run build` para garantir que nenhum import foi quebrado.
2.  Verificar se o tamanho do repositório diminuiu (remoção de assets pesados indevidos).
