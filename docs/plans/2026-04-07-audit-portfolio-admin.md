# Auditoria Portfolio e Admin Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Realizar auditoria completa e correção de performance, autenticação realtime e consistência UI/UX nestas duas áreas críticas: A apresentação de alto impacto dos projetos (`/portfolio`) e o sistema fechado de gestão realtime (`/admin`).

**Architecture:** A auditoria do `/portfolio` garantirá a conformidade do layout de grids, loaders otimizados (para WebGL ou Imagens) e remoção total de "jank" via R3F constraints. A auditoria do `/admin` verificará se as proteções de autenticação e comunicação Realtime via `Zustand` & Supabase seguem estritamente as regras de "Zero Deploy".

**Tech Stack:** Next.js (App Router), Framer Motion, React Three Fiber, supabase-js (Realtime), Zustand.

---

### Task 1: Consistência do Grid e Loader no Portfolio

**Files:**
- Modify: `src/app/portfolio/page.tsx`
- Modify: `src/components/portfolio/Gallery.tsx` (ou componente análogo de listagem de projetos)

**Step 1: Escrever ou usar grep como verificação do estado isolado**

Run: `grep -rn "className=.*std-grid" src/app/portfolio/page.tsx || echo "Missing std-grid"`
Expected: Verificar se a wrapper box principal do portfólio atende ao Ghost Design standard (`.std-grid`).

**Step 2: Verificar otimizações de recursos visuais**

Certificar-se de que o Framer Motion segue a regra "Ethereal Easing", e que as imagens em `/portfolio` usam os carregamentos adequados (`next/image` e com qualities corretas).

**Step 3: Aplicar as correções base de UX/UI**

```tsx
// Exemplo estrutural esperado na route de portfolio
<main className="std-grid bg-[#040013] text-[#0048ff] min-h-screen">
    {/* Galeria */}
</main>
```

**Step 4: Executar Linting e Type Check na view `portfolio`**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS

**Step 5: Commit**

```bash
git add src/app/portfolio/ src/components/portfolio/
git commit -m "style: enforce ghost design system grid and motion on portfolio page"
```

---

### Task 2: Validação Zero Deploy & Realtime no Administrador

**Files:**
- Modify: `src/app/admin/page.tsx` (e layouts/componentes atrelados do admin)

**Step 1: Analisar verificações de autenticação**

Verifique se a sessão recuperada do Supabase garante o login da role de Admin antes da view inicializar, evitando flicker.
Run: `grep -rn "role:.*'admin'" src/app/admin/`
Expected: Localizar validação de segurança ou evidênciar sua ausência.

**Step 2: Verificar Subscriptions (WebSockets/Realtime) de Supabase no Admin**

Identificar se os `channel.subscribe()` são limpos adequadamente na desmontagem. Memory leaks devido a conexões WebSockets duplicadas afetam seriamente a performance do dashboard.

**Step 3: Refatorar o cleanup da subscrição Realtime**

```tsx
// Modificações gerais esperadas
useEffect(() => {
    const channel = supabase.channel('table_db_changes').on(/* ... */).subscribe();
    
    // Essencial para Performance!
    return () => {
        supabase.removeChannel(channel);
    };
}, []);
```

**Step 4: Rodar o test suite automatizado de E2E local**

Considerando falhas anteriores de redirect no "Admin Login", validaremos sua consistência agora em tempo de compilação/teste rápido (usando Playwright via check script).

Run: `npx tsc --noEmit`
Expected: Compilar os scripts do admin sem erros de Hydration.

**Step 5: Commit**

```bash
git add src/app/admin/ src/components/admin/
git commit -m "perf(admin): resolve realtime memory leaks and enforce auth access role rules"
```

---

### Task 3: Integração dos QA Reports (Auditoria Global)

**Files:**
- Update: `docs/QA-REPORT-2026-04-07-audit.md` (Arquivo anterior de Home/Sobre)

**Step 1: Compilar testes e formatar resultados combinados.**

Consolidar o que foi implementado em Home/Sobre com Portfolio/Admin.

**Step 2: Append de documentação**

```markdown
## Auditoria Portfolio & Admin
- `.std-grid` estrutural auditada na matriz do portfólio;
- Supabase WebSockets Realtime em `/admin` isolados e com `.removeChannel()` previnindo Memory Leaks.
- Admin Auth Roles testado em SSR constraints previnindo Flickering ("Zero Deploy").
```

**Step 3: Executar teste final**

Run: `npm run lint` ou `npm run build-check`
Expected: O painel inteiro obedece Type Safety. 

**Step 4: Commit Documentation**

```bash
git add docs/QA-REPORT-*.md
git commit -m "docs: append Portfolio and Admin fixes to overall UI/UX audit report"
```
