# Weekly Audit Adjustments — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve 10 critical and minor issues identified in the Weekly Audit Report (2026-05-14) to ensure the portfolio meets the Ghost Design System (SSOT) standards and performance targets.

**Architecture:** 
- Visual fixes in `PortfolioShowcase` and `FeaturedProjects`.
- Performance optimizations in `HomeHero` and `AboutMethod`.
- Scroll-driven animation implementation in `AboutWhatIDo` using Framer Motion.
- Structural cleanup in `PortfolioClient` and `ProjectsGallery`.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Framer Motion, Tailwind CSS v4, R3F.

---

## User Review Required

> [!IMPORTANT]
> **Task 6 (Horizontal Scroll)**: Implementation uses `useScroll` + `useTransform`. A fine-tuning of the `-38%` offset might be needed after visual verification.
> **Task 9 (Dynamic Header)**: Introduces a global CSS variable `--header-height` via `ResizeObserver` in `SiteHeader`.

## Proposed Changes

### [Home] Portfolio Showcase & Featured Projects

#### [MODIFY] [PortfolioShowcase.tsx](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/home/portfolio-showcase/PortfolioShowcase.tsx)
- Invert color classes in the heading: `portfólio` -> `text-white`, `showcase` -> `text-bluePrimary`.

#### [MODIFY] [CategoryStripe.tsx](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/home/portfolio-showcase/CategoryStripe.tsx)
- Render floating label `[what we love working on]` conditionally.
- Add rotation animation to the badge arrow (`-45deg -> 0deg`).

#### [MODIFY] [FeaturedProjectsSection.tsx](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/home/featured-projects/FeaturedProjectsSection.tsx)
- Update grid gap to `lg:gap-8` (32px).

### [About] What I Do & Method

#### [MODIFY] [AboutWhatIDo.tsx](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/sobre/sections/AboutWhatIDo.tsx)
- Implement horizontal scroll animation for desktop cards.

#### [MODIFY] [AboutMethod.tsx](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/sobre/sections/AboutMethod.tsx)
- Replace JS-based video swap with CSS-based `hidden/block` to prevent flash.

### [Portfolio] Gallery & Performance

#### [MODIFY] [ProjectCard.tsx](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/portfolio/ProjectCard.tsx)
- Set `viewport: { once: true }` to comply with Silent Design.

#### [MODIFY] [PortfolioClient.tsx](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/app/portfolio/PortfolioClient.tsx)
- Remove redundant `std-grid` wrapper.

#### [MODIFY] [ProjectsGallery.tsx](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/portfolio/ProjectsGallery.tsx)
- Use dynamic `--header-height` variable for LERP track positioning.

#### [MODIFY] [SiteHeader.tsx](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/layout/header/SiteHeader.tsx)
- Add `ResizeObserver` to track and set `--header-height`.

### [Core] Home Hero & Preloader

#### [MODIFY] [HomeHero.tsx](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/home/hero/HomeHero.tsx)
- Connect preloader dismissal to WebGL readiness signal.

#### [MODIFY] [GhostSceneWrapper.tsx](file:///Users/danilonovais/PORTFOLIO-DANILO-FINAL/src/components/canvas/home/hero/GhostSceneWrapper.tsx)
- Add `onReady` prop to emit signal after first frame.

---

## Verification Plan

### Automated Tests
- `pnpm run typecheck` to ensure no regression in types.
- `pnpm run build` to verify bundle integrity.
- Playwright E2E tests for `AboutWhatIDo` horizontal scroll.

### Manual Verification
- Visual check of `PortfolioShowcase` title colors.
- Resize test for `AboutMethod` video flash.
- Scroll test for `AboutWhatIDo` cards.
- WebGL preloader timing check.
