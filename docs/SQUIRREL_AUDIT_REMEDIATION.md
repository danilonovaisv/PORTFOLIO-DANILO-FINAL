# Squirrel Audit Remediation Plan

**Generated:** 2026-02-11  
**Status:** Ready for Implementation  
**Priority:** Medium (Non-blocking, but improves quality)

---

## Executive Summary

The Squirrel audit identified **152 warnings** and **20 failures** across accessibility, performance, and video schema categories. While these don't block development, addressing them will improve:

- **SEO** (search engine rankings)
- **Accessibility** (WCAG compliance)
- **Performance** (Core Web Vitals)
- **User Experience** (especially for screen readers)

---

## Issues Breakdown

### 🔴 Critical (20 Failures)

#### 1. Duplicate ID ARIA (14 pages affected)

**Error:** `CSS is not defined` - Rule execution error

**Impact:** Accessibility testing framework error, may hide real issues

**Root Cause:** Squirrel scan configuration or CSS parsing issue

**Fix Priority:** HIGH (blocks other accessibility checks)

**Solution:**

```bash
# Update Squirrel scan or fix CSS imports
# This is likely a scanning tool issue, not code issue
```

---

#### 2. Duplicate ID Active (4 pages affected)

**Error:** `"portfolio-card-key-vision"` appears twice on focusable elements

**Impact:**

- Screen readers get confused
- Keyboard navigation breaks
- WCAG 2.1 Level A failure

**Affected Pages:**

- `/portfolio`
- `/portfolio?category=motion`
- `/portfolio?category=web`
- `/portfolio?category=branding`

**Root Cause:** Portfolio cards are rendered multiple times with same ID

**Fix Priority:** HIGH

**Solution:**

```typescript
// BEFORE (in PortfolioCard.tsx or similar)
<div id="portfolio-card-key-vision">

// AFTER (make IDs unique)
<div id={`portfolio-card-${project.slug}-${index}`}>
```

**Implementation:**

1. Find component generating portfolio cards
2. Make ID dynamic using project slug + index
3. Update ARIA labels to match new IDs
4. Test with keyboard navigation

---

### ⚠️ Warnings (152 total)

#### 3. Critical Request Chains (5 pages affected)

**Warning:** 4-5 critical request chains found

**Impact:** Slower initial page load (affects LCP metric)

**Affected Resources:**

- CSS: `750fb67cb1ff8f0c.css`, `2ed6dada56686e92.css`, etc.
- JS: `a6dad97d9634a72d.js`

**Fix Priority:** MEDIUM

**Solution:**

```typescript
// In app/layout.tsx or page.tsx
// Preload critical CSS
export const metadata = {
  other: {
    'link': [
      { rel: 'preload', href: '/_next/static/chunks/750fb67cb1ff8f0c.css', as: 'style' }
    ]
  }
}

// Or use Next.js font optimization
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], display: 'swap' })
```

---

#### 4. Lazy Loading Above Fold (4 pages affected)

**Warning:** 1 above-fold image with lazy loading

**Impact:** Slower LCP (Largest Contentful Paint)

**Affected Image:**

```
/_next/image?url=https://...supabase.co/.../campaign/thumb.webp
```

**Fix Priority:** MEDIUM

**Solution:**

```typescript
// BEFORE
<Image src={thumbUrl} alt="Campaign" loading="lazy" />

// AFTER (for above-fold images)
<Image 
  src={thumbUrl} 
  alt="Campaign" 
  priority  // Disables lazy loading for critical images
  loading="eager"
/>
```

**Implementation:**

1. Identify first visible portfolio card
2. Add `priority` prop to its image
3. Keep `loading="lazy"` for below-fold images

---

#### 5. Unminified JavaScript (15 pages affected)

**Warning:** 200.3KB unminified, ~47.2KB potential savings

**Impact:** Slower download, parsing, and execution

**Fix Priority:** LOW (Next.js should handle this in production)

**Solution:**

```bash
# Verify production build is minified
pnpm run build
# Check .next/static/chunks/ - files should be minified

# If not minified, check next.config.mjs
# Ensure no custom webpack config disables minification
```

---

#### 6. Color Contrast Issues (8 pages affected)

**Warning:** 3-4 potential low contrast elements

**Affected Elements:**

- `div` with class `"absolute inset-0 z-0 animate-p..."`
- `span` with class `"opacity-30..."`
- `span` with class `"text-xs font-bold tracking-wid..."`

**Impact:** Hard to read for users with visual impairments

**Fix Priority:** MEDIUM

**Solution:**

```css
/* BEFORE */
.opacity-30 { opacity: 0.3; }

/* AFTER (increase opacity for text) */
.opacity-30 { opacity: 0.5; }  /* Or use different color */

/* OR use WCAG-compliant colors */
/* Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text */
```

**Tools to verify:**

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools Accessibility Panel

---

#### 7. Video Schema Missing (10 pages affected)

**Warning:** Video content without VideoObject schema

**Impact:**

- Reduced SEO for video content
- Videos won't appear in Google Video Search
- Missing rich snippets

**Fix Priority:** LOW (nice to have for SEO)

**Solution:**

```typescript
// Add to pages with video content
export const metadata = {
  other: {
    'script': [{
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "Portfolio Hero Video",
        "description": "Ghost animation showcase",
        "thumbnailUrl": "https://...supabase.co/.../thumb.webp",
        "uploadDate": "2026-02-01",
        "contentUrl": "https://...supabase.co/.../hero.mp4",
        "embedUrl": "https://danilonovais.com"
      })
    }]
  }
}
```

---

## Implementation Plan

### Phase 1: Critical Fixes (HIGH Priority)

**Estimated Time:** 2-3 hours

1. **Fix Duplicate IDs** (Issue #2)
   - [ ] Locate portfolio card component
   - [ ] Make IDs dynamic with slug + index
   - [ ] Test keyboard navigation
   - [ ] Verify with screen reader

2. **Investigate CSS Error** (Issue #1)
   - [ ] Update Squirrel scan tool
   - [ ] Verify CSS imports are correct
   - [ ] Re-run scan

**Success Criteria:**

- Zero duplicate ID errors
- Keyboard navigation works on all portfolio pages
- Squirrel scan completes without rule errors

---

### Phase 2: Performance Optimizations (MEDIUM Priority)

**Estimated Time:** 3-4 hours

1. **Fix Lazy Loading** (Issue #4)
   - [ ] Add `priority` to first portfolio card image
   - [ ] Verify LCP improvement with Lighthouse

2. **Improve Color Contrast** (Issue #6)
   - [ ] Audit all low-contrast elements
   - [ ] Increase opacity or change colors
   - [ ] Verify with contrast checker

3. **Optimize Critical Chains** (Issue #3)
   - [ ] Add preload hints for critical CSS
   - [ ] Optimize font loading
   - [ ] Measure improvement

**Success Criteria:**

- LCP under 2.5s
- All text meets WCAG AA contrast (4.5:1)
- Reduced critical request chains

---

### Phase 3: SEO Enhancements (LOW Priority)

**Estimated Time:** 2-3 hours

1. **Add Video Schema** (Issue #7)
   - [ ] Create VideoObject schema helper
   - [ ] Add to all pages with video
   - [ ] Verify with Google Rich Results Test

2. **Verify Minification** (Issue #5)
   - [ ] Check production build
   - [ ] Ensure all JS is minified

**Success Criteria:**

- Videos appear in Google Video Search
- Production bundle is fully minified

---

## Testing Checklist

After each phase:

- [ ] Run Squirrel scan: `npx squirrelscan`
- [ ] Run Lighthouse audit: Chrome DevTools
- [ ] Test with screen reader (VoiceOver on macOS)
- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Verify color contrast with DevTools
- [ ] Check Google Rich Results Test (for schema)

---

## Automation

Add to `package.json`:

```json
{
  "scripts": {
    "audit:a11y": "npx squirrelscan --filter=a11y",
    "audit:perf": "npx squirrelscan --filter=perf",
    "audit:full": "npx squirrelscan",
    "audit:lighthouse": "lighthouse http://localhost:3000 --view"
  }
}
```

---

## Expected Results

### Before

- 20 failures
- 152 warnings
- Accessibility score: ~70%
- Performance score: ~80%

### After (All Phases Complete)

- 0 failures
- <20 warnings (non-critical)
- Accessibility score: ~95%
- Performance score: ~90%

---

## Notes

- **Squirrel Scan:** Some warnings may be false positives (e.g., CSS error)
- **Performance:** Production build will be better than dev
- **Accessibility:** Test with real users if possible
- **SEO:** Video schema is optional but recommended

---

## Next Steps

1. **Review this plan** with the team
2. **Prioritize phases** based on launch timeline
3. **Assign tasks** to developers
4. **Set up CI/CD** to run audits automatically
5. **Monitor metrics** after deployment

---

**Questions?**

- Check `docs/SETUP_GUIDE.md` for environment setup
- Review `.agent/rules/23-design-system.md` for color tokens
- Run `/debug` workflow for systematic investigation
