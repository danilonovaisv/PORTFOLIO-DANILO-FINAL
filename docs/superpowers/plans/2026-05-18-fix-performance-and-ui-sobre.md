# Fix Performance and UI (Sobre) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Executar correções de performance e UI (Core Web Vitals) na página `/sobre`, corrigir a hierarquia de fontes no componente `AboutWhatIDo`, alinhar com o Ghost Design System, e preparar a página para a rodada final do Squirrel Audit.

**Architecture:** A abordagem será refatorar o `AboutWhatIDo` para resolver problemas com múltiplos `h2`, consolidar as classes do Ghost Design System na página "Sobre", e posteriormente rodar o script local do `/squirrel-audit`.

**Tech Stack:** Next.js 16, Tailwind CSS 4, Framer Motion, React Three Fiber.

---

### Task 1: Fix Typography Hierarchy in AboutWhatIDo

**Files:**
- Modify: `src/components/sobre/sections/AboutWhatIDo.tsx:98-175`

- [ ] **Step 1: Write the minimal implementation to fix headers**
Na versão mobile do header em `AboutWhatIDo.tsx`, a tag é um `<p>` com `aria-hidden="true"`, mas usa classes de cabeçalho. Para satisfazer os testes que podem procurar por dois cabeçalhos ou para corrigir a hierarquia (onde o mobile oculta o elemento `<h2>`), devemos unificar o ID ou usar uma tag consistente (dois `h2` sem atributos conflitantes) de forma que a tela leia corretamente. No entanto, o problema descrito é "resulting in only one rendered header instead of the expected two". Isto indica que o teste espera *dois* elementos `<h2>` na tela (provavelmente o `<h2 id="what-i-do-heading">` do desktop e outro `<h2>` correspondente no mobile).
Devemos alterar a tag mobile `<p>` para `<h2>` e ajustar a hierarquia.

```tsx
          {/* Header — referencia o mesmo H2 do desktop via aria-labelledby */}
          <header
            className="mb-10 text-center px-4"
          >
            <h2
              className="text-h2 font-black tracking-tight text-text text-balance"
            >
              Do <span className="text-bluePrimary">insight</span> ao{' '}
              <span className="text-bluePrimary">impacto</span>.
            </h2>
            <p className="mt-2 text-h3 font-black tracking-tight text-text/90 text-balance">
              Mesmo quando você não percebe.
            </p>
          </header>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sobre/sections/AboutWhatIDo.tsx
git commit -m "fix: restore expected h2 typography hierarchy in AboutWhatIDo mobile layout"
```

### Task 2: Executar Workflow /squirrel-audit

**Files:**
- No file changes, script execution only.

- [ ] **Step 1: Executar script squirrel-audit**
Execute o comando fornecido no workflow `/squirrel-audit`. (Nota: requer servidor localhost rodando).
Se o servidor não estiver rodando, devemos inicializá-lo em segundo plano antes.

```bash
# Terminal command
pnpm run build
pnpm start &
sleep 5
AUDIT_ID=$(squirrel audit "http://localhost:3000/sobre" | tail -1)
squirrel report "$AUDIT_ID" --format llm > .agent/temp_audit.md
```

- [ ] **Step 2: Verificar Resultados da Auditoria**
```bash
cat .agent/temp_audit.md
```

- [ ] **Step 3: Implementar Correções Residuais Baseadas na Auditoria**
Aplicar qualquer correção detectada do Next.js, R3F, Framer Motion com base no Phase B do workflow.
