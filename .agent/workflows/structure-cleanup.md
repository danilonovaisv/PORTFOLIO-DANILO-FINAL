---
description: # Workflow: Auditoria e Limpeza Estrutural
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

1. **Validação do `src/`:**

- Todo código-fonte (componentes, libs, hooks, utils) está dentro de `src/`?

2. **Análise da Raiz (Root):**

- Identificar arquivos soltos na raiz que **não** sejam arquivos de configuração padrão (ex: `Home.tsx` perdido, `styles.css` fora de lugar).
- **Proteção de Documentação:** Confirmar a existência da pasta `/docs` (ou `DOCS-JULES`) e marcá-la como **INTOCÁVEL** nesta varredura.

3. **Detecção de Lixo (Debris):**

- Identificar pastas de cache commitadas indevidamente (`.next/`, `.firebase/`, `node_modules/`, `dist/`).
- Verificar se há arquivos `.zip`, `.log` ou `.DS_Store` rastreados.

---

## 2. Regras de Organização (Enforcement)

O agente deve propor movimentações baseadas nestas regras estritas:

### A. Estrutura de Componentes (`src/components/`)

Adotar estrutura por **Funcionalidade (Feature-based)** para seções grandes e **Tipo** para genéricos.

- **`src/components/ui/`**: Primitivos (Buttons, Inputs).
- **`src/components/home/`**: Exclusivos da Home Page.
- **`src/components/layout/`**: Header, Footer.
- **`src/components/canvas/`**: Cenas WebGL/R3F.

### B. Raiz do Projeto (Root)

A raiz deve conter **APENAS** arquivos de configuração e pastas de documentação.

- **Permitidos:** `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `.eslintrc`, `.gitignore`, `.env*`.
- **Proibidos:** Componentes `.tsx`, Estilos `.css` (exceto se config), Utils `.ts`.

---

## 3. Plano de Execução (Cleanup Actions)

Se aprovado pelo usuário, executar sequencialmente:

1. **Limpeza do `.gitignore`:**

- Garantir entradas padrão (`.next/`, `node_modules/`, `.ds_store`, etc.).

2. **Limpeza da Raiz (Root Sweep):**

- **Ação:** Mover qualquer arquivo de código solto na raiz (`.tsx`, `.ts`, `.js`, `.css`) para a pasta apropriada dentro de `src/` (ex: `src/app/` ou `src/components/`).
- **Proteção Crítica (/docs):**
- O agente **NÃO DEVE** alterar, mover, renomear ou excluir nada dentro da pasta `/docs` (ou `DOCS-JULES`).
- Esta pasta serve como "Fonte da Verdade" e deve ser preservada exatamente como está.

- **Arquivos de Config:** Manter intactos arquivos vitais (`next.config`, `tailwind.config`, etc.).

3. **Saneamento de Referências:**

- Verificar se há arquivos pesados (.zip, .pdf) fora de `/docs` e sugerir remoção ou `.gitignore`.

4. **Padronização de Imports:**

- Substituir imports relativos longos (`../../../components`) por Alias Imports (`@/components`).

5. **Remoção de Código Morto:**

- Verificar componentes sem importação (Dead Code Elimination).

---

## 4. Validação Final

Após a reorganização:

1. Rodar `npm run build` para garantir que a movimentação de arquivos da raiz para `src/` não quebrou caminhos.
2. Verificar visualmente se a raiz está limpa (apenas configs e `/docs`).
