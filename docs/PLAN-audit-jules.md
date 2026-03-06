# PLAN-audit-jules

## Phase 1: Context Analysis (The "Why")

- **Target User / Core Problem:** The platform has minor deviations from the Ghost System design, WebGL/Motion bugs, and potential middleware bypass risks.
- **Goal:** Execute corrections across 4 domains (Home, Portfolio, Sobre, Admin) to ensure flawless performance, exact design fidelity, and strict security compliance.

## Phase 2: Requirement Definition (The "What")

- **Must Have:**
  - Fix Header active states (Ghost Motion, no `layoutId`) and accessibility (`prefers-reduced-motion`).
  - Implement 2-second Fullscreen Hold on Video Manifesto.
  - Standardize `PortfolioHero.tsx` to Tailwind CSS (remove CSS Modules).
  - Use `posterUrl` vs `thumbnailUrl` correctly in images/videos across Featured Projects and Project Details.
  - Validate Firebase AppCheck and Middleware Admin roles (`app_metadata.role`).
- **Should Have:**
  - Container padding consistency on the Sobre page.
  - Retain reading flow (`max-w-prose`) on the Sobre page.
- **Acceptance Criteria:**
  - Given a user on Desktop, when scrolling to Video Manifesto, then scroll locks for 2s and audio plays.
  - Given the Portfolio Hero, when inspecting elements, then no CSS Modules are loaded.
  - Given an attacker, when falsifying `user_metadata.role`, then middleware rejects access to `/admin`.

## Phase 3: Technical Blueprint (The "How")

- **Tech Stack:** Next.js 14, Framer Motion, Tailwind CSS v4, Supabase (Auth/Middleware).
- **Architecture:**
  - Update `SiteHeader.tsx` animation logic.
  - Update `VideoManifesto.tsx` with a scroll-lock state machine.
  - Extract `PortfolioHeroGallery.module.css` into Tailwind utilities.
  - Audit properties passed in Bento Grid and Single Project views.

## Phase 4: Task Orchestration (The "Plan")

### Task 1: Header Refactoring

- **Assigned Agent:** Spectral Artist (Frontend Specialist)
- **Required Skills:** Framer Motion, Tailwind, Accessibility
- **Input:** `src/components/.../SiteHeader.tsx`
- **Output:** Active state using `scaleX`, color inversion handling, `prefers-reduced-motion` compliance.
- **Verify:** Visual check for active underline animation and checking system settings for reduced motion.

### Task 2: Video Manifesto Scroll-Hold

- **Assigned Agent:** Spectral Artist (Frontend Specialist)
- **Required Skills:** Framer Motion (`useScroll`, `useTransform`), React Hooks
- **Input:** `src/components/.../VideoManifesto.tsx`
- **Output:** Scroll lock for 2s upon reaching full viewport, audio unmuted during hold, fallback block for mobile.
- **Verify:** Manual scroll testing to ensure the lock engages and releases smoothly.

### Task 3: PortfolioHero CSS Standardization

- **Assigned Agent:** Code Archaeologist & Spectral Artist
- **Required Skills:** Tailwind CSS, React
- **Input:** `PortfolioHero.tsx`, `PortfolioHeroGallery.module.css`
- **Output:** Pure Tailwind implementation, CSS module deleted.
- **Verify:** Visual consistency matches the original design without relying on the `.css` module.

### Task 4: Media Attributes Audit (`posterUrl` vs `thumbnailUrl`)

- **Assigned Agent:** Spectral Artist
- **Required Skills:** React, HTML Media Tags
- **Input:** `FeaturedProjectCard.tsx`, `/portfolio/[slug]` media grid components
- **Output:** Correct image metadata fallback props passed to `<img>` and `<video>` tags.
- **Verify:** Inspect network tab to ensure large videos aren't downloaded as image thumnails.

### Task 5: Sobre Page Consistency

- **Assigned Agent:** Spectral Artist
- **Required Skills:** Tailwind CSS
- **Input:** `src/app/sobre/page.tsx` or related components
- **Output:** Applied `Container` standardization and `max-w-prose` for readability.
- **Verify:** Padding matches HomePage; text lines are restricted to 60-75 characters.

### Task 6: Security & Admin AppCheck Validation

- **Assigned Agent:** Data Sentinel (Supabase Audit)
- **Required Skills:** Next.js Middleware, Firebase AppCheck
- **Input:** `src/middleware.ts`
- **Output:** Confirmed `app_metadata.role` enforcement (bypassing `user_metadata`).
- **Verify:** Attempt access to `/admin` with a mock user token missing the correct `app_metadata.role`.
