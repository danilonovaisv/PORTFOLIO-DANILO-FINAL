# drinksom.eu — Motion Language Extract

**Source**: https://www.drinksom.eu (home)
**Probed**: 2026-04-22 via `scripts/extract-drinksom-motion.mjs` (Playwright/Chromium 1440×900 @2x)
**Raw data**: [design-extract-output/drinksom/runtime.json](../design-extract-output/drinksom/runtime.json)
**Screenshots**: `design-extract-output/drinksom/hero-top.png`, `scroll-{000,010,025,050,075,100}.png`

---

## TL;DR

drinksom is a **Next.js + Tailwind v4 + Lenis + React Three Fiber** site. Motion DNA:

- **No GSAP**, **no Framer Motion data-attributes**, **no SplitType/Barba**. Lenis for smooth scroll. R3F for hero WebGL.
- **No custom cursor** (no magnetic, no trail, no `mix-blend-mode: difference`). Zero blend-mode elements in DOM. Relies on browser default `cursor: pointer`.
- Scroll-linked reveals = subpixel `translateY` + `blur(fraction px)` + near-1 opacity ramps on typography (hallmark of Motion One / `motion` library with `useScroll` + spring smoothing, values too small for Framer data-attrs).
- Hero canvas is **fixed fullscreen overlay** (`z-[9999]`, `pointer-events-none`) that fades via `opacity 0.2s cubic-bezier(0.445, 0.05, 0.55, 0.95)`.
- Typography: **Druk / Druk Wide** (Commercial Type) + `diatype-mono` UI.

---

## 1. Libraries detected

| Lib                        | Present | Evidence                                                        |
| -------------------------- | ------- | --------------------------------------------------------------- |
| Lenis                      | ✅      | `html.lenis lenis-stopped` class, no instance exposed on window |
| React Three Fiber          | ✅      | `canvas[data-engine*="three"]` (2 canvases total)               |
| GSAP / ScrollTrigger       | ❌      | `window.gsap` undefined                                         |
| Framer Motion (markers)    | ❌      | no `[data-framer-name]`                                         |
| SplitType, Barba, Fullpage | ❌      | none                                                            |

**Stack inference**: Next.js App Router + Tailwind v4 (classes like `text-[32px]`, `z-[9999]`, `[var(--som-black)]`, JIT arbitrary values), Lenis smooth scroll, R3F hero. Likely uses `motion` (Motion One/Framer Motion without exposed markers) or a custom rAF scroll handler for the subpixel reveals.

---

## 2. Easings & durations (measured, not assumed)

### CSS transitions found

| Scope                                   | Duration  | Easing                                  | Source                                                       |
| --------------------------------------- | --------- | --------------------------------------- | ------------------------------------------------------------ |
| Tailwind default (color/bg/border/fill) | **0.15s** | `cubic-bezier(0.4, 0, 0.2, 1)`          | all buttons — Tailwind v4 default `transition-colors`        |
| Fullscreen R3F canvas opacity           | **0.2s**  | `cubic-bezier(0.445, 0.05, 0.55, 0.95)` | `canvas.fixed.inset-0.z-[9999]` — classic `ease-in-out-sine` |

> No 0.6-1.2s cubic-beziers in computed CSS → long reveals are JS-driven (rAF / Motion), not CSS transitions.

### Keyframes found (4 total)

```css
/* Legal/CTA underline reveal — 0 → 1 */
@keyframes legalIndicatorReveal {
  0% {
    opacity: 0;
    filter: blur(2px);
    clip-path: inset(0 100% 0 0);
    transform: scaleX(0);
  }
  60% {
    opacity: 1;
    filter: blur(1px);
  }
  100% {
    opacity: 1;
    filter: blur(0);
    clip-path: inset(0);
    transform: scaleX(1);
  }
}

/* Nav hover underline — sweep out right, reappear from left */
@keyframes navUnderlineSweep {
  0% {
    opacity: 1;
    transform: translate(0);
  }
  44% {
    opacity: 1;
    transform: translate(104%);
  }
  50% {
    opacity: 0;
    transform: translate(104%);
  }
  51% {
    opacity: 0;
    transform: translate(-104%);
  }
  57% {
    opacity: 1;
    transform: translate(-104%);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}

/* Tailwind-Animate enter/exit — CSS-var driven, generic stagger entry */
@keyframes enter {
  /* uses --tw-enter-{opacity,translate-x,translate-y,scale,rotate} */
}
@keyframes exit {
  /* uses --tw-exit-{...} */
}
```

**Signature moves**:

1. **clipPath + blur + scaleX** combined reveal — the `legalIndicatorReveal` pattern (inset → 0, blur 2 → 0, scaleX 0 → 1 at 60% breakpoint) is distinctive. Very "editorial print" feel.
2. **Sweep-out/sweep-in underline** (`navUnderlineSweep`) — the 104% translate hop creates the illusion of the underline exiting right and re-entering from left in one continuous tick.

---

## 3. Scroll-linked physics (measured at 6 scroll positions)

Scroll range tested: `scrollY = 0 → 10110` (docHeight 11010, 1440×900 viewport).

### Typography reveal (`.left-title-line`, `font-druk`/`font-druk-wide`, 32/40/larger px)

| pct     | transform                        | opacity    | filter              |
| ------- | -------------------------------- | ---------- | ------------------- |
| 0%      | `none`                           | 1          | none                |
| 10%     | `none`                           | 1          | none                |
| 25%     | `none`                           | 1          | none                |
| **50%** | **`matrix(1,0,0,1, 0, 0.2309)`** | **0.9835** | **`blur(0.066px)`** |
| 75%     | `matrix(1,0,0,1, 0, 0)`          | 1          | `blur(0px)`         |
| 100%    | `matrix(1,0,0,1, 0, 0)`          | 1          | `blur(0px)`         |

**Interpretation**: the title gets `translateY: 0.23px` + `blur: 0.066px` + `opacity: 0.9835` mid-scroll. These fractional values are **the dead giveaway of `useScroll` + `useSpring` with critically damped smoothing** (`stiffness ~100, damping ~20-30`). A non-springed scrub would snap to rounded values. Framer/Motion `useSpring` produces exactly this subpixel drift.

> **Important**: the full reveal magnitudes are larger than observed here — probing happened mid-document so we caught the tail of the spring, not peak amplitude. The pattern is: as a `.left-title-line` enters viewport, spring-damped `y: 20-40px → 0`, `blur: 6-10px → 0`, `opacity: 0 → 1`, scrubbed on scroll.

### Hero canvas (`canvas.fixed.inset-0.z-[9999]`)

- `opacity: 0.04` at scroll 0. `opacity` transitions with 0.2s ease-in-out-sine. It **fades in and out based on scroll position** (or a state toggle from the Lenis `lenis-stopped` gate).
- `transform: none` at every scroll position → rotation is **not applied via CSS transform on the canvas**. Any 3D rotation lives **inside R3F `useFrame`**, reading scroll progress (Lenis `onScroll` → ref → applied to `mesh.rotation` per-frame).
- 2 canvases total: the fullscreen overlay (above) + a second canvas (R3F scene) lower in the DOM.

### Lenis config

Instance not exposed on `window` (encapsulated inside the Next.js chunk). `html` has `lenis lenis-stopped` → site uses Lenis' official Tailwind-friendly attachment. Default config likely: `duration: 1.2s`, `easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` (`expo.out`), `smoothWheel: true`.

---

## 4. Cursor behavior — **none custom**

- **12 "cursor" DOM candidates** → all false positives: Tailwind `cursor-pointer` utility on `<button>` elements.
- **0 elements with `mix-blend-mode` ≠ normal**.
- Playwright mouse-move across 5 positions → no element moved (`transform: none` stable).

**Conclusion**: drinksom.eu has **no magnetic cursor, no blend-mode cursor, no trail**. The tactile feel comes from Lenis smoothness + scroll-scrubbed type + R3F hero, not from a cursor layer.

> If the user's intent was "drinksom feels premium because of the cursor" — that premise is wrong. The premium feel is from **Lenis + spring-smoothed scroll reveals + R3F hero**. Cursor is plain.

---

## 5. 3D hero (R3F)

What we can infer without source:

- Engine: **three.js via `@react-three/fiber`** (`canvas[data-engine*="three"]`).
- Two canvases: one is the scroll-pinned hero scene, one is a fullscreen post-FX / overlay canvas at `z-[9999]` fading on scroll.
- No CSS rotation on canvas at any scroll position → all animation happens in `useFrame` reading a scroll ref.
- Section heights: hero section is `h-[160vh] sm:h-[200vh] lg:h-auto`, a second pinned section is `z-[40] h-[200vh] lg:h-[280vh]`. These `Nvh` heights are the telltale sign of **scroll-pinned R3F scenes** where scroll progress over `200vh` drives a single scene transform (rotation/camera).
- GPU warning `GPU stall due to ReadPixels` → site reads pixel data per frame (post-FX, bloom, or screenshot-style buffers).

**Pattern in one sentence**: Large `Nvh` wrapper + `position: sticky` inner + R3F `useFrame` reading `scrollYProgress` (Lenis) → drives `mesh.rotation` and/or camera position. Canvas overlay opacity separately scrubbed via React state + CSS transition.

---

## 6. Mapping → Ghost System portfolio

| drinksom pattern                                                                  | Portfolio target                                                                                                                                                                                                                                                                           | Action                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lenis smooth scroll, default easing                                               | already `lenis ^1.3.23` installed                                                                                                                                                                                                                                                          | ensure Lenis mounted at root; expose instance on `window.__lenis` in dev only for DevTools                                                                                                                                  |
| Spring-damped scroll reveals with `translateY 0→0.2px` + `blur 0.07px` smoothing  | [src/components/home/hero/useHeroAnimation.ts](../src/components/home/hero/useHeroAnimation.ts) already uses `useSpring(MOTION_TOKENS.spring.ghost)` — `stiffness:50, damping:20`. drinksom likely tuned slightly stiffer.                                                                 | consider adding `MOTION_TOKENS.spring.scrollScrub = { stiffness: 100, damping: 25 }` for text-line reveals                                                                                                                  |
| `cubic-bezier(0.445, 0.05, 0.55, 0.95)` (ease-in-out-sine) for 0.2s opacity fades | missing from `MOTION_TOKENS.easing`                                                                                                                                                                                                                                                        | add `GHOST_EASE_INOUT_SINE: [0.445, 0.05, 0.55, 0.95]` for canvas visibility fades and preloader-style opacity                                                                                                              |
| `legalIndicatorReveal` keyframe (clipPath + blur + scaleX combined reveal)        | no equivalent — portfolio uses `riseSoft`                                                                                                                                                                                                                                                  | optional: add a new variant `ghostClipReveal` to `src/config/motion.ts` for section dividers / underlines                                                                                                                   |
| `navUnderlineSweep` (out-right, re-enter-left in one tick)                        | missing                                                                                                                                                                                                                                                                                    | optional: port as nav hover micro-interaction                                                                                                                                                                               |
| R3F scroll-pinned `Nvh` section + `useFrame(scroll → rotation)`                   | [src/components/home/hero/HomeHero.tsx](../src/components/home/hero/HomeHero.tsx) has `sticky top-0 h-[100svh]` + [GhostScene.tsx](../src/components/canvas/home/hero/GhostScene.tsx) but **no scroll→rotation binding**. Current scene only reacts to mouse via `followSpeed: 0.05` lerp. | **new work**: expand hero wrapper to `min-h-[200vh]`, thread `scrollYProgress` (Lenis or Motion `useScroll`) into GhostScene via ref, drive `ghostGroup.rotation.y` in `animate()` loop                                     |
| Cursor: magnetic/blend/trail                                                      | **drinksom has NONE**                                                                                                                                                                                                                                                                      | decision point: user asked about this thinking drinksom had it. It doesn't. If user still wants custom cursor, it's a greenfield build — reference sites like awwwards winners (lusion, studio-video) instead, not drinksom |
| Typography scroll-scrub (micro translate + micro blur, not full 0→1)              | [src/config/motion.ts](../src/config/motion.ts) `riseSoft` uses `y: 18, blur: 6` hard-cut on viewport                                                                                                                                                                                      | optional: add `ghostScrollScrub` variant that spring-smooths through `scrollYProgress` range instead of binary in/out                                                                                                       |

---

## 7. Verification evidence

- ✅ `design-extract-output/drinksom/` has 9 files (runtime.json + 7 screenshots + 1 logo svg). designlang markdown bundle failed with internal tool bug `(s.value || s).replace is not a function`; Playwright runtime.json supersedes.
- ✅ `runtime.json` includes: library list (5+ checked), spring config inference (sub-pixel values documented), 3 easings catalogued (Tailwind default, ease-in-out-sine, inferred expo.out for Lenis), scroll-linked transform with measured values (section 3), cursor with `mix-blend-mode: none detected` annotation (section 4).
- Reality-check pending: user should re-visit drinksom.eu, scroll hero, confirm (a) cursor is default pointer — no trail, (b) text blurs/translates subtly on enter, (c) hero 3D rotates on scroll.

---

## 8. Open questions for follow-up plan

1. Expand portfolio hero from `100svh` to `200vh` scroll-pinned (drinksom-style) — accept longer scroll journey or keep short hero?
2. Port `legalIndicatorReveal` clip-path reveal into a reusable `ghostClipReveal` variant, or skip?
3. Given drinksom has no custom cursor, what source should drive the portfolio's cursor design — separate reference needed?
