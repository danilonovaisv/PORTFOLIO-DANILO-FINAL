# [Beliefs Animation Fix] Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the `TypeError` in `BeliefBackground` and ensure consistent API usage in `BeliefScrollText` according to Motion 12 documentation.

**Architecture:** Correct the callback signature for `inView` to use the element directly as the first argument.

**Tech Stack:** Next.js 16, Motion 12.

---

### Task 1: Fix `BeliefBackground.tsx`

**Files:**
- Modify: `src/components/sobre/beliefs/BeliefBackground.tsx`

- [ ] **Step 1: Fix inView callback signature**

```tsx
    const stop = inView('.scroll-section', (element) => {
      const indexAttr = element.getAttribute('data-index');
      if (indexAttr === null) return;
      
      const index = parseInt(indexAttr, 10);
      const targetColor = COLOR_STOPS[index + 1] || COLOR_STOPS[0];

      if (bgRef.current) {
        animate(
          bgRef.current,
          { backgroundColor: targetColor },
          { duration: 0.9, ease: [0.17, 0.55, 0.55, 1] }
        );
      }
    });
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sobre/beliefs/BeliefBackground.tsx
git commit -m "fix(beliefs): correct inView callback signature to use element directly"
```

### Task 2: Verify and Refine `BeliefScrollText.tsx`

**Files:**
- Modify: `src/components/sobre/beliefs/BeliefScrollText.tsx`

- [ ] **Step 1: Ensure naming consistency**
(Verify that it uses the first argument as the element correctly).

- [ ] **Step 2: Commit**

```bash
git add src/components/sobre/beliefs/BeliefScrollText.tsx
git commit -m "style(beliefs): ensure consistent naming in scroll animations"
```

### Task 3: Final Verification

- [ ] **Step 1: Run dev server and verify no console errors**
- [ ] **Step 2: Manual scroll test in browser**

---
