# About Method Adjustments Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adjust the "Como Eu Trabalho" section so the background video is full-bleed and the text/list block exactly matches the reference design.

**Architecture:** We will modify the existing `AboutMethod.tsx` component to remove layout constraints on the video, remove the dark card background from the text block, and refactor the list items to match the reference (horizontal blue dividers and plain text numbers instead of badges).

**Tech Stack:** Next.js, React, Tailwind CSS, Framer Motion

---

### Task 1: Make Background Video Full-Bleed

**Files:**
- Modify: `src/components/sobre/sections/AboutMethod.tsx`

- [ ] **Step 1: Remove max-width constraint from the video container**

Locate the `motion.div` wrapping the video in `src/components/sobre/sections/AboutMethod.tsx` and remove the `max-w-[1680px]` class.

```tsx
// Before:
<motion.div
  style={{ y: 0 }}
  className="w-full h-full max-w-[1680px] lg:h-[120%]"
>

// After:
<motion.div
  style={{ y: 0 }}
  className="w-full h-full lg:h-[120%]"
>
```

### Task 2: Refactor Text Block and List Styling

**Files:**
- Modify: `src/components/sobre/sections/AboutMethod.tsx`

- [ ] **Step 1: Remove the dark panel styling from the content wrapper**

Find the `div` that wraps the content (the "card") and remove its solid background, border, and shadow.

```tsx
// Before:
<div className="w-full max-w-[44rem] rounded-[28px] border border-white/10 bg-[rgba(4,0,19,0.9)] px-6 py-7 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.88)] backdrop-blur-none lg:px-8 lg:py-9">

// After:
<div className="w-full max-w-[44rem] px-6 py-7 lg:px-8 lg:py-9">
```

- [ ] **Step 2: Update the `<ul>` and `<li>` borders**

Change the list's top and bottom borders to match the reference (using `bluePrimary/30` or similar instead of `white/10`).

```tsx
// Before (ul):
className="flex w-full flex-col border-t border-white/10 pt-3"

// After (ul):
className="flex w-full flex-col border-t border-bluePrimary/30 pt-0"

// Before (li):
className="group grid grid-cols-[auto_1fr] items-start gap-4 border-b border-white/10 py-4 last:border-b-0 lg:gap-5"

// After (li):
className="group flex flex-row items-center gap-4 border-b border-bluePrimary/30 py-4 lg:gap-5 lg:py-5"
```

- [ ] **Step 3: Simplify the list number and text formatting**

Remove the rounded badge from the step ID and the left border from the text paragraph. Use the "0X" format for numbers.

```tsx
// Before:
<span className="mt-0.5 inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-bluePrimary/35 bg-bluePrimary/10 px-3 font-bold tabular-nums text-bluePrimary">
  {step.id}
</span>
<p className="border-l-2 border-bluePrimary/55 pl-4 text-left text-small font-medium leading-[1.45] text-text transition-colors group-hover:text-blueAccent md:text-body lg:text-body-enhanced">
  {step.text}
</p>

// After:
<span className="font-display text-xl md:text-2xl font-bold tabular-nums text-bluePrimary">
  {String(step.id).padStart(2, '0')}
</span>
<p className="text-left text-base font-medium leading-[1.45] text-text transition-colors group-hover:text-blueAccent md:text-lg lg:text-xl">
  {step.text}
</p>
```

- [ ] **Step 4: Run tests/lint and Commit**

```bash
npm run type-check
npm run lint
git add src/components/sobre/sections/AboutMethod.tsx
git commit -m "style: refine AboutMethod to match reference design (full video, table-like list)"
```
