# Auditoria Home e Sobre Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Realizar auditoria completa e correção de performance, memory leaks em WebGL e inconsistências de UI/UX (Grid/Tipografia) na Home (`/`) e na página `/sobre`.

**Architecture:** A auditoria começa pela estruturação do Grid (adequando ao GHOST-DESIGN-SYSTEM), seguida de refatorações de Framer Motion (Easing estrito de Ghost) e, por fim, performance em WebGL (removendo alocações de `Vector3` de dentro do `useFrame`). As correções devem ser atômicas e testadas/validadas passo a passo.

**Tech Stack:** Next.js (App Router), React Three Fiber, Framer Motion, Tailwind CSS v4.

---

### Task 1: Conformidade do Grid e Tipografia na Home

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/home/Hero.tsx` (ou arquivo equivalente do Hero da Home)

**Step 1: Check compliance metrics com script de teste (Test-first approach)**

Crie um pequeno script de auditoria para checar ausências da classe `.std-grid`. (Simulação de teste automatizado local)
Run: `grep -rn "className=.*std-grid" src/app/page.tsx || echo "Missing std-grid"`
Expected: Alguma indicação do estado atual.

**Step 2: Identificar violações de design e cores erradas**

Run: `grep -rn "text-purple" src/app/page.tsx src/components/home/ || echo "No purple rule violation"`
Expected: Identificar se existe alguma cor roxa (proibida no Ghost Design System).

**Step 3: Escrever/Aplicar a correção minimalista na Home**

Envolver as seções principais que não estão usando grid no container padrão, e remover cores inapropriadas:
```tsx
// Modificações esperadas em src/app/page.tsx
<main className="std-grid bg-[#040013] text-[#0048ff]">
    {/* resto do codigo */}
</main>
```

**Step 4: Validar as alterações buildando ou rodando o linter**

Run: `npm run lint` ou `npx tsc --noEmit`
Expected: PASS

**Step 5: Commit**

```bash
git add src/app/page.tsx src/components/home/
git commit -m "style: enforce ghost design system grid and colors on home page"
```

---

### Task 2: Correção de Framer Motion e Easing em /sobre

**Files:**
- Modify: `src/app/sobre/page.tsx`
- Modify: `src/components/sobre/beliefs/BeliefSection.tsx`

**Step 1: Identificar animações desalinhadas**

Run: `grep -rn "transition:" src/components/sobre/`
Expected: Lista de durações genéricas e easings que não correspondem a `[0.22, 1, 0.36, 1]`.

**Step 2: Aplicar Ethereal Motion constraint**

Atualizar as transições de todos os `motion.div` em `/sobre` para usar as diretrizes estritas do Ghost.
```tsx
transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
```

**Step 3: Checar warnings de Lint**

Verificar especificamente o componente de Belief onde sabemos que havia um warning de `bgColor` não usado.
Run: `npx eslint src/components/sobre/beliefs/BeliefSection.tsx`
Expected: Warning de 'bgColor' (se ainda existir).

**Step 4: Corrigir o Lint Warning e aplicar o Layout**

Remover a `bgColor` prop subutilizada e consertar o z-index da Section se precisar de camada de sobreposição (`z-indices.ts`).

**Step 5: Commit**

```bash
git add src/app/sobre/page.tsx src/components/sobre/
git commit -m "style: enforce ethereal motion easing and grid on about page"
```

---

### Task 3: Performance e Zero Alocação de Memória R3F (WebGL)

**Files:**
- Modify: `src/components/3d/GhostScene.tsx` (ou os componentes do R3F usados em Home e Sobre)

**Step 1: Encontrar violações dentro de `useFrame`**

Run: `grep -rn "new THREE.Vector3" src/components/3d/` 
Expected: Encontrar instâncias sendo criadas dentro da render loop (o que causa memory leaks pesados).

**Step 2: Refatorar alocações (Move outside of useFrame)**

```tsx
// Fora do componente ou fora do useFrame hook
const tempVector = new THREE.Vector3();

// Dentro do hook
useFrame((state) => {
    tempVector.set(state.pointer.x, state.pointer.y, 0);
    ref.current.position.lerp(tempVector, 0.1);
});
```

**Step 3: Compilar para testar Typos TypeScripts na refatoração**

Run: `npx tsc --noEmit`
Expected: PASS sem novos erros 3D ou WebGL.

**Step 4: Commit**

```bash
git add src/components/3d/
git commit -m "perf(3d): eliminate useframe vector allocations to hit 60fps mandate"
```

---

### Task 4: Revisão de Responsividade e QA Checklist

**Files:**
- Create: `docs/QA-REPORT-2026-04-07-audit.md`

**Step 1: Iniciar QA Checklist do Ghost Design**

Criar um artefato final garantindo que os padding/margins sigam os 15% requeridos e textos verticais estejam bem configurados na visão Mobile vs Desktop.

**Step 2: Documentar as ações tomadas**

```markdown
# QA Report - Audit Home & Sobre
- Validado `.std-grid` uniformemente.
- Cores auditadas (uso apenas de #0048ff e #040013 majoritariamente).
- Framer Motion "Ethereal Easing" universalizado em /sobre.
- Alocações do R3F zeradas (60FPS WebGL garantido).
```

**Step 3: Commit Documentation**

```bash
git add docs/QA-REPORT-*.md
git commit -m "docs: finalize UI/UX and Performance audit report for Home and Sobre"
```
