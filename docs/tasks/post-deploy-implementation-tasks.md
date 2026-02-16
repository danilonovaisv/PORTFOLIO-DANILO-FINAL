# 🛠️ Post-Deploy Implementation Tasks

**Created:** 2026-02-10T00:20:00-03:00  
**Status:** Ready for Implementation  
**Completed:** 2/11 issues  
**Remaining:** 9/11 issues  

---

## ✅ COMPLETED ISSUES

### DS-01: Mobile Typography Global Fix ✅

**Status:** COMPLETE  
**Files Modified:**

- `src/app/globals.css` (added `--font-body-enhanced` token + utility class)
- `docs/PORTFOLIO/GHOST-DESIGN-SYSTEM.md` (documented new class)

**New Class Available:** `.text-body-enhanced`  
**Usage:** Apply to mobile body text for better readability (18px mobile, 20px desktop)

---

### LAYOUT-01: Contact Mobile Order ✅

**Status:** COMPLETE  
**File Modified:** `src/components/home/contact/ContactSection.tsx`

**Changes:**

- Contact List: `order-2` → `order-1`
- Social Icons: `order-3` → `order-2`
- Form: `order-1` → `order-3`

**Result:** Correct mobile order: Title → Contact List → Social Icons → Form

---

## 🔧 REMAINING IMPLEMENTATION TASKS

---

## TASK 1: CTA-01 - Small CTA Inheritance Fix

**Priority:** HIGH  
**Complexity:** Medium  
**Estimated Time:** 15-20 minutes  

### Problem

Small CTAs (blue sphere with arrow, 48px circle) are inheriting styles from large CTA component, breaking their appearance in Portfolio Showcase section (3 menu cards).

### Location

- **Page:** Portfolio Showcase (`src/components/home/portfolio-showcase/PortfolioShowcase.tsx`)
- **Affected:** 3 menu cards with small circular CTAs

### Investigation Steps

1. Find `PortfolioShowcase.tsx` or similar component
2. Locate the 3 menu cards
3. Identify if they're using `.btn-icon-circle` class (correct) or `<AntigravityCTA />` component (wrong)

### Solution

**If using wrong component:**

```tsx
// WRONG
<AntigravityCTA size="small" />

// CORRECT
<button className="btn-icon-circle">
  <ArrowUpRight className="h-5 w-5" />
</button>
```

**If CSS specificity issue:**

- Ensure `.btn-icon-circle` class is defined in `globals.css` (already exists at line 254)
- Check for conflicting styles in parent components
- Add `!important` to critical `.btn-icon-circle` properties if needed

### Validation

- [ ] Small CTAs are 48px circles
- [ ] Blue background (`#0048ff`)
- [ ] Purple on hover (`#8705f2`)
- [ ] White arrow icon
- [ ] NO text label
- [ ] NO pill shape

---

## TASK 2: LAYOUT-02 - Hero Sobre Subtitle Mobile

**Priority:** MEDIUM  
**Complexity:** Low  
**Estimated Time:** 5 minutes  
**Dependency:** DS-01 (COMPLETE)

### Problem

Subtitle in "Sobre" (About) page hero is too small on mobile.

### Location

- **Page:** `src/app/sobre/page.tsx` or `src/components/sobre/Hero.tsx`

### Solution

Find the subtitle element and replace `.text-body` with `.text-body-enhanced`:

```tsx
// BEFORE
<p className="text-body ...other-classes">
  {subtitle}
</p>

// AFTER
<p className="text-body-enhanced ...other-classes">
  {subtitle}
</p>
```

### Validation

- [ ] Subtitle readable on mobile (18px minimum)
- [ ] Desktop unchanged (20px)
- [ ] Font weight: Medium (500)

---

## TASK 3: VIDEO-01 - About Closing Video (Mobile & Desktop)

**Priority:** CRITICAL  
**Complexity:** High  
**Estimated Time:** 30 minutes  

### Problem

1. Wrong video being displayed
2. Video cropped/resized incorrectly
3. Need separate mobile and desktop videos
4. Must display at real size (no forced crop)

### Location

- **Page:** `src/app/sobre/page.tsx`
- **Section:** "Closing" or final section of About page

### Investigation Steps

1. Find the video component in About/Sobre page
2. Check if it's using `<VideoManifesto />` or custom video component
3. Identify current video source

### Solution

#### Step 1: Identify Correct Videos

Check `src/config/brand.ts` or Supabase Storage for:

- Desktop video: `about-closing-desktop.mp4` (or similar)
- Mobile video: `about-closing-mobile.mp4` (or similar)

#### Step 2: Implement Responsive Video

```tsx
'use client';

import { useState, useEffect } from 'react';

export function AboutClosingVideo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const videoSrc = isMobile 
    ? '/videos/about-closing-mobile.mp4' // Replace with actual path
    : '/videos/about-closing-desktop.mp4';

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-background">
      <video
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-auto max-w-full object-contain"
        // NO object-cover, NO fixed height
      />
    </section>
  );
}
```

#### Step 3: Key CSS Rules

```css
/* CORRECT - Maintains aspect ratio */
video {
  width: 100%;
  height: auto;
  object-fit: contain; /* NOT cover */
}

/* WRONG - Crops video */
video {
  object-fit: cover; /* ❌ */
  height: 100vh; /* ❌ */
}
```

### Validation

- [ ] Correct video on desktop
- [ ] Correct video on mobile
- [ ] No cropping (full video visible)
- [ ] Maintains aspect ratio
- [ ] Centered in viewport
- [ ] Autoplay works
- [ ] No black bars (unless video aspect ratio requires)

---

## TASK 4: VIDEO-02 - Card Video Popup

**Priority:** HIGH  
**Complexity:** Medium  
**Estimated Time:** 20 minutes  

### Problem

1. Wrong video opens in popup
2. No autoplay
3. No sound enabled

### Location

- **Component:** Project cards (likely `src/components/home/featured-projects/` or `src/components/portfolio/`)
- **Popup:** Modal/Dialog component

### Investigation Steps

1. Find project card component
2. Locate video popup/modal trigger
3. Check video source mapping

### Solution

#### Step 1: Verify Video Data

Ensure project data includes correct video URL:

```typescript
// In project data structure
interface Project {
  id: string;
  title: string;
  videoUrl: string; // Must be populated
  // ...
}
```

#### Step 2: Fix Popup Component

```tsx
'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';

export function VideoPopup({ videoUrl, isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <video
          src={videoUrl}
          controls
          autoPlay // ✅ Enable autoplay
          muted={false} // ✅ Enable sound
          playsInline
          className="w-full h-auto"
        />
      </DialogContent>
    </Dialog>
  );
}
```

#### Step 3: Fallback Handling

```tsx
// In card component
const handleVideoClick = () => {
  if (!project.videoUrl) {
    console.error('Video URL missing for project:', project.id);
    return;
  }
  setVideoPopupOpen(true);
};
```

### Validation

- [ ] Correct video opens for each card
- [ ] Autoplay starts immediately
- [ ] Sound is enabled (not muted)
- [ ] Video controls visible
- [ ] Popup closes correctly
- [ ] No console errors

---

## TASK 5: NAV-01 - Menu Mobile Contact Navigation

**Priority:** CRITICAL  
**Complexity:** Medium  
**Estimated Time:** 15 minutes  

### Problem

Clicking "Contato" in mobile menu redirects to Home instead of scrolling to contact section on current page.

### Location

- **Component:** `src/components/layout/Header.tsx` or `src/components/layout/MobileMenu.tsx`

### Investigation Steps

1. Find mobile menu component
2. Locate "Contato" link
3. Check current `href` value

### Solution

#### Current (WRONG)

```tsx
<Link href="/#contact">Contato</Link>
// This redirects to home page
```

#### Fixed (CORRECT)

```tsx
'use client';

import { usePathname } from 'next/navigation';

export function MobileMenu() {
  const pathname = usePathname();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Scroll to contact section on current page
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu
      setMenuOpen(false);
    }
  };

  return (
    <a 
      href="#contact"
      onClick={handleContactClick}
      className="..."
    >
      Contato
    </a>
  );
}
```

### Alternative Solution (If using Lenis)

```tsx
import { useLenis } from '@studio-freight/react-lenis';

const lenis = useLenis();

const handleContactClick = (e: React.MouseEvent) => {
  e.preventDefault();
  lenis?.scrollTo('#contact', { offset: -80 }); // Adjust offset for header
  setMenuOpen(false);
};
```

### Validation

- [ ] Clicking "Contato" scrolls to contact section
- [ ] Works on all pages (Home, Sobre, Portfolio, etc.)
- [ ] Mobile menu closes after click
- [ ] Smooth scroll animation
- [ ] No page reload
- [ ] No redirect to home

---

## TASK 6: LAYOUT-03 - Portfolio Section Spacing

**Priority:** MEDIUM  
**Complexity:** Low  
**Estimated Time:** 10 minutes  

### Problem

Portfolio cards section has incorrect height/spacing, leaving empty space before next section.

### Location

- **Component:** `src/components/home/featured-projects/` or portfolio section wrapper

### Investigation Steps

1. Find portfolio section container
2. Check for fixed heights or excessive padding
3. Identify spacing between cards and next section

### Solution

#### Remove Fixed Heights

```tsx
// BEFORE
<section className="min-h-screen py-24"> {/* ❌ */}

// AFTER
<section className="py-16 md:py-24"> {/* ✅ */}
```

#### Adjust Bottom Spacing

```tsx
// Cards container
<div className="grid gap-8 mb-16 md:mb-24"> {/* Controlled bottom margin */}
  {projects.map(...)}
</div>
```

#### Check Grid Auto-Rows

```css
/* If using CSS Grid */
.portfolio-grid {
  grid-auto-rows: auto; /* NOT minmax(500px, auto) */
}
```

### Validation

- [ ] No excessive white space after cards
- [ ] Section height matches content
- [ ] Smooth transition to next section
- [ ] Responsive on all breakpoints

---

## TASK 7: NAV-02 - Landing Page Back Button

**Priority:** HIGH  
**Complexity:** Medium  
**Estimated Time:** 20 minutes  

### Problem

Landing pages (individual project pages) lack a back button to return to previous page.

### Location

- **Pages:** `src/app/projects/[slug]/page.tsx` or landing page template
- **Position:** Footer of Hero section

### Solution

#### Step 1: Create Back Button Component

```tsx
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    // Try to go back in history
    if (window.history.length > 1) {
      router.back();
    } else {
      // Fallback to portfolio page
      router.push('/portfolio');
    }
  };

  return (
    <button
      onClick={handleBack}
      className="btn-icon-circle" // Use small CTA style
      aria-label="Voltar"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
}
```

#### Step 2: Add to Hero Footer

```tsx
// In landing page Hero component
<section className="hero-section">
  <div className="hero-content">
    {/* Hero content */}
  </div>
  
  {/* Footer with back button */}
  <div className="hero-footer absolute bottom-8 left-8">
    <BackButton />
  </div>
</section>
```

#### Step 3: Positioning Rules

```css
.hero-footer {
  position: absolute;
  bottom: 2rem; /* 32px */
  left: 2rem;
  z-index: 10;
}

/* NOT at top */
/* NOT overlapping header */
```

### Validation

- [ ] Back button visible in hero footer
- [ ] Uses small CTA style (48px circle)
- [ ] Left arrow icon
- [ ] Returns to previous page
- [ ] Fallback to /portfolio if no history
- [ ] Not at top of page
- [ ] Not overlapping header
- [ ] Mobile responsive

---

## TASK 8: CTA-02 - Landing Page Final CTA

**Priority:** MEDIUM  
**Complexity:** Low  
**Estimated Time:** 10 minutes  

### Problem

Landing pages use non-standard CTA at the end instead of official `<AntigravityCTA />` component.

### Location

- **Pages:** `src/app/projects/[slug]/page.tsx`
- **Section:** Final CTA section (usually after case study content)

### Solution

#### Step 1: Locate Current CTA

Find the final CTA in landing page template:

```tsx
// BEFORE (non-standard)
<button className="custom-cta-button">
  Ver Mais Projetos
</button>
```

#### Step 2: Replace with Official Component

```tsx
import { AntigravityCTA } from '@/components/ui/AntigravityCTA';

// AFTER (standard)
<AntigravityCTA 
  href="/portfolio"
  label="Ver Mais Projetos"
  variant="primary"
/>
```

#### Step 3: Verify Component Props

Check `AntigravityCTA` component for available props:

- `href`: Link destination
- `label`: Button text
- `variant`: 'primary' | 'secondary'
- `size`: Should default to large for final CTA

### Validation

- [ ] Uses `<AntigravityCTA />` component
- [ ] Correct label text
- [ ] Links to /portfolio or appropriate page
- [ ] Matches design system (pill + circle)
- [ ] Hover animation works (circle turns purple)
- [ ] Responsive sizing

---

## TASK 9: MOTION-01 - About Origens Entry Sequence

**Priority:** HIGH  
**Complexity:** Medium  
**Estimated Time:** 15 minutes  
**Tool:** MCP Motion (optional) or Framer Motion  

### Problem

Image and text in "About Origens" section enter simultaneously. Should be staggered: image first, then text.

### Location

- **Page:** `src/app/sobre/page.tsx`
- **Section:** "Origens" or "Origins" section

### Investigation Steps

1. Find Origens section component
2. Locate current animation configuration
3. Check if using Framer Motion or custom animation

### Solution

#### Option A: Framer Motion (Recommended)

```tsx
import { motion } from 'framer-motion';

export function OrigensSection() {
  return (
    <section className="...">
      {/* Image - Enters FIRST */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.8, 
          delay: 0, // No delay
          ease: [0.22, 1, 0.36, 1] // Ghost easing
        }}
      >
        <img src="..." alt="..." />
      </motion.div>

      {/* Text - Enters SECOND */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.8, 
          delay: 0.3, // 300ms delay after image
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <h2>...</h2>
        <p>...</p>
      </motion.div>
    </section>
  );
}
```

#### Option B: MCP Motion

If using MCP Motion tool, request:

```
Create staggered entrance for About Origens section:
- Image: delay 0ms
- Text: delay 300ms
- Duration: 800ms
- Easing: Ghost (0.22, 1, 0.36, 1)
```

### Critical: Regression Testing

**MUST verify that other text animations are NOT broken:**

- Check all other sections in About page
- Verify Home page animations still work
- Test Portfolio page animations

### Validation

- [ ] Image enters first
- [ ] Text enters 300ms after image
- [ ] Smooth, elegant animation
- [ ] No other animations broken
- [ ] Works on mobile and desktop
- [ ] Respects `prefers-reduced-motion`

---

## 📊 IMPLEMENTATION CHECKLIST

### Phase 1: Foundation ✅

- [x] DS-01: Mobile Typography
- [x] LAYOUT-01: Contact Order

### Phase 2: CTA & Layout

- [ ] CTA-01: Small CTA Inheritance
- [ ] LAYOUT-02: Hero Sobre Subtitle
- [ ] LAYOUT-03: Portfolio Spacing

### Phase 3: Video & Media

- [ ] VIDEO-01: About Closing Video
- [ ] VIDEO-02: Card Popup Video

### Phase 4: Navigation

- [ ] NAV-01: Menu Mobile Contact
- [ ] NAV-02: Landing Back Button

### Phase 5: Final Polish

- [ ] CTA-02: Landing Final CTA
- [ ] MOTION-01: About Origens Sequence

---

## 🧪 TESTING PROTOCOL

### Per-Issue Testing

After each fix:

1. ✅ Visual verification (desktop + mobile)
2. ✅ Functional testing (clicks, navigation, videos)
3. ✅ Regression check (nothing else broken)

### Final QA (After All 9 Complete)

1. **Desktop Testing:**
   - [ ] All pages load correctly
   - [ ] All CTAs work
   - [ ] All videos play
   - [ ] All navigation works
   - [ ] All animations smooth

2. **Mobile Testing:**
   - [ ] Contact section order correct
   - [ ] Typography readable
   - [ ] Videos display correctly
   - [ ] Menu navigation works
   - [ ] Touch targets 48px minimum

3. **Cross-Page Testing:**
   - [ ] Home → Portfolio → Landing → Back
   - [ ] Home → Sobre → Sections
   - [ ] Menu navigation from all pages

4. **Performance:**
   - [ ] No console errors
   - [ ] No layout shifts
   - [ ] Smooth animations (60fps)

---

## 🚀 DEPLOYMENT CHECKLIST

Before deploying:

- [ ] All 9 tasks complete
- [ ] TypeScript passes (`pnpm run typecheck`)
- [ ] ESLint passes (`pnpm run lint`)
- [ ] Build succeeds (`pnpm run build`)
- [ ] All tests pass (if applicable)
- [ ] Visual QA complete (desktop + mobile)
- [ ] Regression testing complete

---

## 📝 NOTES & TIPS

### File Locations (Quick Reference)

```
src/
├── app/
│   ├── page.tsx (Home)
│   ├── sobre/page.tsx (About)
│   ├── portfolio/page.tsx
│   └── projects/[slug]/page.tsx (Landings)
├── components/
│   ├── home/
│   │   ├── contact/ContactSection.tsx ✅
│   │   ├── portfolio-showcase/
│   │   └── featured-projects/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── MobileMenu.tsx
│   └── ui/
│       └── AntigravityCTA.tsx
└── app/globals.css ✅
```

### Common Pitfalls

1. **CTA Confusion:** Small CTA = `.btn-icon-circle`, Large CTA = `<AntigravityCTA />`
2. **Video Paths:** Check both `/public/videos/` and Supabase Storage
3. **Mobile Testing:** Always test on real device, not just DevTools
4. **Animation Delays:** Use milliseconds (300) not seconds (0.3s) in Framer Motion
5. **Navigation:** `router.push()` vs `scrollIntoView()` - know the difference

### Design System Reference

- **Colors:** `#0048ff` (Blue), `#8705f2` (Purple), `#040013` (Void)
- **Typography:** `.text-body-enhanced` for mobile body text
- **Spacing:** Use `py-16 md:py-24` for sections
- **Easing:** `[0.22, 1, 0.36, 1]` (Ghost easing)

---

## 🆘 TROUBLESHOOTING

### Issue: "Can't find component"

**Solution:** Use `find_by_name` or `grep_search` to locate files

### Issue: "Video not loading"

**Solution:** Check browser console, verify video path, check file format (mp4, webm)

### Issue: "Animation not working"

**Solution:** Check `useReducedMotion`, verify Framer Motion installed, check viewport settings

### Issue: "Mobile menu not closing"

**Solution:** Ensure state management (useState) is working, check event handlers

---

**Document Version:** 1.0  
**Last Updated:** 2026-02-10T00:20:00-03:00  
**Author:** Ghost Commander (Orchestration Agent)  
**Status:** Ready for Implementation
