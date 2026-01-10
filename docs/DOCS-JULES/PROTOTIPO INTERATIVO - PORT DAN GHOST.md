

# Danilo Novais Portfolio Homepage
## Technical Documentation & Design Specifications
Technical Documentation & Design Specifications
Version: 3.0
Last Updated: January 03, 2026
Status: ✅ Ready for Implementation

## 1. PROJECT OVERVIEW

### 1.1 Vision & Goals
Create a premium institutional portfolio that demonstrates design excellence not just through showcased work, but through the site's own execution. The homepage must:
- Establish immediate credibility through atmospheric visual design and editorial sophistication
- Guide visitors intuitively from brand introduction → work showcase → contact
- Feel distinctive and memorable without sacrificing usability or accessibility
- Perform flawlessly across all devices and connection speeds
- Reflect the designer's philosophy: "You don't see design. But it sees you."

Success looks like:
- Visitors spending 2+ minutes exploring the portfolio
- High engagement with featured projects (50%+ click-through)
- Contact form conversions from qualified leads
- Zero accessibility violations (WCAG AA minimum)
- Lighthouse scores: Performance 90+, Accessibility 100, Best Practices 100

### 1.2 Target Audience
Primary:
- Brand managers and marketing directors at mid-to-large companies seeking design partners
- Creative agencies looking for freelance brand designers or collaborators
- Startups and scale-ups needing brand identity and campaign work

Secondary:
- Design recruiters and HR professionals
- Fellow designers and creative community (peer recognition)
- Potential collaborators for interdisciplinary projects

User Needs:
- Quickly understand what Danilo does and his areas of expertise
- See evidence of high-quality work across branding, campaigns, and digital
- Assess cultural fit and working style
- Easily initiate contact

### 1.3 Key Success Metrics
Engagement: Average session duration, scroll depth, interaction rate
Conversion: Contact form submissions, portfolio page visits
Technical: Page load time <3s, Core Web Vitals passing, 0 console errors
Accessibility: WCAG AA compliance, keyboard navigation coverage

### 1.4 Technical Constraints
- No localStorage/sessionStorage in artifacts (Claude.ai environment restriction)
- Self-hosted assets where possible to avoid external dependencies
- Graceful degradation for WebGL/3D features (fallback to static alternatives)
- Mobile-first responsive design (majority of traffic expected from mobile)
- Performance budget: <2MB initial page weight, <5s time to interactive

## 2. DESIGN SYSTEM

### 2.1 Color Palette
| Token | Value | Usage |
| --- | --- | --- |
| primary | #0048ff | Primary brand color, interactive elements, CTAs |
| accent | #4fe6ff | Secondary highlights, Ghost atmosphere glow |
| background | #040013 | Main dark background |
| backgroundLight | #f0f0f0 | Light sections (forms, alternating backgrounds) |
| text | #fcffff | Primary text on dark backgrounds |
| textInverse | #0e0e0e | Text on light backgrounds |
| textSecondary | #a1a3a3 | Secondary information, metadata |
| neutral | #0b0d3a | Gradient transitions, subtle backgrounds |
| neutralLight | #F5F5F5 | Secondary section backgrounds |

### 2.2 Typography
Primary Font: TT Norms Pro (self-hosted, fallback: `ui-sans-serif, system-ui`)

| Element | Size | Weight | Usage |
| --- | --- | --- | --- |
| H1 | 4rem–6rem (64–96px) | Bold | Hero headlines |
| H2 | 2rem–3rem (32–48px) | Bold | Section titles |
| H3 | 1.25rem–1.5rem (20–24px) | Medium | Card titles, subsections |
| Body | 1rem–1.125rem (16–18px) | Regular | Main content, descriptions |
| Small | 0.875rem (14px) | Regular/Medium | Meta info, labels |
| Micro | 0.75rem (12px) | Mono | Tags, system messages |

### 2.3 Spacing & Grid
Container: `max-width: 1680px`, horizontal padding `clamp(24px, 5vw, 96px)`

Vertical Rhythm:
- Section spacing: `py-16 md:py-24` (64–96px)
- Component spacing: `gap-8 md:gap-12` (32–48px)
- Element spacing: `gap-4 md:gap-6` (16–24px)

Grid System (Tailwind):
- Mobile: Single column, full-width components
- Tablet: `md:grid-cols-2` for cards, maintain single column for hero/showcase
- Desktop: Custom column distributions per section (see Component Specifications)

### 2.4 Animation Principles
Philosophy: Animations should feel organic and purposeful, never arbitrary or attention-seeking.
Core Library: Framer Motion

Guidelines:
- Animate only `transform` and `opacity` for performance
- Easing: Prefer `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutExpo) for elegance
- Duration: 300–700ms for most transitions (longer for complex reveals)
- Stagger: 60–120ms delays between sequential elements
- Respect `prefers-reduced-motion`: Disable non-essential animations, keep critical layout changes instant

Common Patterns:
```jsx
// Scroll reveal
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}

// Hover (buttons, cards)
whileHover={{ scale: 1.02, y: -2 }}
transition={{ duration: 0.3 }}

// Staggered children
variants={{
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}}
```

### 2.5 Global Assets
Logos:
- Favicon: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/Favicon.svg`
- Favicon Light: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/FaviconLight.svg`
- Logo Light (full): `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg`
- Logo Dark (full): `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoDark.svg`

### 2.6 Fonts:
 -  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Thin.woff2') format('woff2');
  font-weight: 100;
  font-style: normal;
  font-display: swap;

- font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;

- font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;

- font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;

- font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;

/* Fallback para Black (900) usando Bold, já que não temos o arquivo Black */
@font-face {
  font-family: 'TT Norms Pro';
  src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Bold.woff2') format('woff2');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

/* Fonte Mono para Tags */
@font-face {
  font-family: 'PPSupplyMono';
  src: url('https://assets.codepen.io/7558/PPSupplyMono-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

Videos:
- Manifesto Video: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`

Client Logos:
- 12 monochromatic SVG logos: `client1.svg` through `client12.svg`
- Base URL: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/`

## 3. SITE ARCHITECTURE

### 3.1 Information Architecture
Homepage
├── Header (persistent navigation)
├── Hero + Manifesto Video
├── Portfolio Showcase (3 categories)
├── Featured Projects (4 highlighted works)
├── Clients/Brands (logo grid)
├── Contact (form + info)
└── Footer

Other Pages (linked from homepage)
├── /sobre (About page)
├── /portfolio (Full portfolio with filters)
└── /portfolio/[slug] (Individual project pages)

### 3.2 Navigation Structure
Primary Navigation (Header):
- Home → `/` or `#hero`
- Sobre (About) → `/sobre`
- Portfólio → `/portfolio`
- Contato (Contact) → `#contact` (always anchors to contact section)

Secondary Navigation (Footer):
- Same as primary navigation
- Additional: Social media links

### 3.3 Section Flow
The homepage follows a narrative arc:
1. Header: Establishes brand identity and provides navigation
2. Hero: Creates emotional impact and communicates positioning
3. Manifesto Video: Deepens understanding through motion storytelling
4. Portfolio Showcase: Introduces work categories with editorial rhythm
5. Featured Projects: Demonstrates quality through curated examples
6. Clients/Brands: Builds credibility through association
7. Contact: Provides clear conversion path
8. Footer: Reinforces brand and provides supplementary navigation

---

# **4. COMPONENT SPECIFICATIONS

# **4.1 Header**

**Purpose:** Provide persistent, accessible navigation using a clean, static interface.

#### Desktop (≥1024px): Static Glass Header

**Layout:**
- Position: `position: sticky`, `top: 24px` (or `top: 0` with padding), `z-index: 40`
- Width: Partial container (centered), or Full-width (based on preference, images suggest clean alignment)
- Height: `64px`
- Style: Pill-shaped or Bar, translucent glass effect (`backdrop-filter: blur(12px)`), subtle border.
- **Behavior:** COMPLETELY STATIC. No movement tracking, no physics.

**Content:**
- Left: Logo (SVG) - https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/FaviconLight.svg
- Right: Navigation Links (Home, Sobre, Portfólio, Contato)

**Interaction - Contrast Adaptation (Scroll):**
*Essential for visibility on the white 'Contato' section shown in designs.*
- **Trigger:** When the header overlaps a light-colored background (e.g., the white Contact section).
- **Action:**
    - Text/Icon color switches to **Blue** (Primary Brand Color).
    - Background may increase opacity for readability.
- **Transition:** `transition: all 0.3s ease`.

---

**Desktop (≥1024px): Fluid Glass Header**
- Layout:
  - Position: `position: sticky`, `top: 0`, `z-index: 40`
  - Width: Partial container (not full-width), horizontally centered
  - Height: `56–72px`
  - Style: Pill-shaped with rounded corners, translucent glass effect (blur + subtle gradient)
- Content:
  - Left: Logo (Favicon Light) https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/FaviconLight.svg
  - Right: Horizontal navigation list (Home, Sobre, Portfólio, Contato)
- Interaction - Fluid Glass Effect:
  - The header responds to cursor movement along the X-axis:
    - Follow behavior: Subtle horizontal translation (`maxTranslateX: 40–60px`)
    - Spring physics: `followDamping: 0.08–0.12s`, gentle overshoot
    - Scale: Slight horizontal stretch (`maxScaleX: 1.05`) and vertical compression (`maxScaleY: 1.02`)
    - Visual: Refraction distortion, chromatic aberration on edges, backdrop blur
- Fallback (no WebGL / reduced motion):
  - Same layout and typography
  - Static positioning with standard backdrop-filter blur or solid/gradient background
  - No cursor-following behavior

**Mobile & Tablet (≤1023px): Staggered Menu Header**
- Layout:
  - Position: Fixed bar at top, full-width
  - Height: `48–64px`
  - Content: Logo (left), Hamburger icon (right)
- Menu Overlay (when open):
  - Fullscreen or near-fullscreen overlay
  - Gradient background (primary to neutral)
  - Navigation items in vertical column, large text, generous spacing
  - Social media icons at bottom
- Animation:
  - Open: Overlay fades in (`opacity: 0 → 1`, 200–250ms), panel slides in from right (`translateX: 100% → 0`, 260–320ms), hamburger morphs to X
  - Items appear with stagger: `opacity: 0 → 1`, `translateY: 16px → 0`, `staggerDelay: 100ms`
  - Close: Reverse sequence, items disappear in reverse order
- Interactions:
  - Tap X icon: Close menu
  - Tap navigation item: Close menu + navigate
  - Tap overlay background: Close menu
- Accessibility:
  - `aria-label` on hamburger/X icon
  - `aria-expanded` state
  - Focus trap within open menu
  - ESC key closes menu
- Mobile-Specific Implementation Notes:
  - The header does not have the glass effect on mobile
  - The logo is positioned flush left with no additional spacing
  - The hamburger menu icon is positioned flush right with 16px padding
  - When open, the menu covers the entire viewport

----

# **4.2 Hero + Manifesto

**Purpose:** Create immediate visual and emotional impact, communicate brand positioning, introduce the manifesto video as a sensory layer.

#### Structure (Desktop)

**Z-Index Stack:**
1. **Z-50:** Preloader (Ghost Loader SVG animation)
2. **Z-30:** Manifesto Video Thumbnail (floating, bottom-right)
3. **Z-20:** Ghost Atmosphere (WebGL Canvas)
4. **Z-10:** Editorial Text Block (static, centered)
5. **Z-0:** Gradient Background (`#040013` to `#0b0d3a`)

#### Preloader

**Visual:**
- SVG ghost icon (white, floating animation)
- Text: "Summoning spirits" (uppercase, mono font, tracking-wide)
- Progress bar: Gradient fill (`#0057FF` to `#5227FF`), 2s duration
- Background: Dark gradient (`#0a0a0a` to `#1a1a1a`)

**Behavior:**
- Displays immediately on page load
- Fades out after 1.5–2s (`opacity: 1 → 0`, 1s duration)

#### Ghost Atmosphere (WebGL Canvas)

**Visual Description:**
Ethereal, organic 3D atmosphere inspired by the "Ghost Blue" aesthetic. Main elements:
- **Ghost Mesh:** Emissive spherical form (`#0057FF`), harmonic pulsing, floating vertically
- **Reactive Eyes:** Glow intensity increases with mouse movement
- **Particles:** Organic floating particles orbiting the ghost
- **Fireflies:** Small light points adding depth

**Post-Processing:**
- **Bloom Pass:** HDR glow effect (intensity: 2.8)
- **Analog Decay Pass:** Film grain, scanlines, subtle jitter, vignette

**Interaction:**
- Ghost follows cursor slowly (`lerp: 0.05`)
- Sinusoidal organic movement (`sin(time * 0.8)` vertical, `sin(time * 0.3)` horizontal)

**Performance:**
- DPR: Max 2
- Antialias: False
- Disabled entirely on `prefers-reduced-motion`

**Fallback:**
- Static radial gradient background (`#040013` to `#06071f`)
- No 3D elements

**Reference:** Inspired by https://codepen.io/danilonovaisv/pen/azZbdQo

#### Editorial Text Block

**Content:**
- Tag: `[BRAND AWARENESS]` (12px, uppercase, mono) TT Norms Pro Normal
- H1: "Você não vê o design." (5–8rem, TT Norms Pro Black, tracking-tight)
- H2: "Mas ele vê você." (4–6rem, TT Norms Pro Black, tracking-tight)
- CTA: "step inside →" (link to `/sobre`, hover effect: color change + arrow translation)
- Same CTA button at bottom
**Primary Font:** TT Norms Pro (self-hosted, fallback: `ui-sans-serif, system-ui`)

**Behavior:**
- 100% static (no scroll-triggered animations or fades)
- Centered vertically and horizontally
- Color: `#d9dade` on `#06071f` background
Here’s your updated and clarified description with all the new desktop behaviors (full-page for 2s, scroll hold, fixed position on the side, and sound logic) integrated and cleaned up 👇

#### Manifesto Video Thumbnail (Desktop)

**Initial State:**
- Position: `bottom-right`, with gutter spacing
- Size: ~30vw width, 16:9 aspect ratio
- Style: Rounded corners (`border-radius: 12–16px`), subtle shadow
- Video: Autoplay, **muted**, loop, `playsInline`
- URL: (Manifesto video from assets)

**Scroll Behavior & Positioning (Desktop):**
- While the Hero section is in view and the video is transitioning from thumbnail → fullscreen:
  - The video stays **fixed** to the viewport (anchored to `bottom-right`) and does **not** scroll with the page content.
  - As the user scrolls, the video:
    - Scales up toward fullscreen
    - Moves from `bottom-right` toward the center
    - Gradually loses its rounded corners
  - Only after the animation completes and the video reaches the **fullscreen state** does it stop being a small “floating” thumbnail.

**Scroll Animation (Desktop):**
The video grows and centers as the user scrolls:

javascript
// Pseudo-code (Framer Motion / GSAP style idea)
scaleVideo: [0.3, 1]              // from 30% to 100% viewport
posXVideo: ["100%", "50%"]        // from bottom-right → center (example)
posYVideo: ["100%", "50%"]        // from bottom-right → center (example)
borderRadius: ["16px", "0px"]     // from rounded to square
opacityText: [1, 0]               // editorial text fades out
position: ["fixed", "fixed"]      // stays pinned to viewport during scroll

Trigger:
    •    Driven by scroll progress through the Hero section:
scrollYProgress: [0, 1]

⸻

Fullscreen Hold & Sound Logic (Desktop)
When the video reaches its fullscreen state (covers the entire viewport, scaleVideo = 1, borderRadius = 0):
    1.    Fullscreen Hold (2 seconds):
    •    The video remains in full-page fullscreen for 2 seconds.
    •    During these 2 seconds:
    •    The scroll is effectively held/locked on the Hero section (the page does not immediately move to the next section).
    •    The video stays centered and covers the full viewport.
    2.    Sound Behavior (Desktop):
    •    Before fullscreen:
    •    Video plays muted (thumbnail and transition states are always muted).
    •    When fullscreen state is reached:
    •    After reaching fullscreen, the video unmutes and audio plays while in this full-page state.
    •    After leaving fullscreen / going to the next section:
    •    When the user scrolls beyond the Hero section into the next section, the video is muted again.
    •    If the user scrolls back up into the Hero and hits fullscreen again, the same logic repeats:
    •    Muted during transition, unmute only in fullscreen, mute again when exiting.

Implementation Hint (State Machine):
    •    state = "thumbnail" | "transition" | "fullscreenHold" | "released"
    •    On scrollYProgress reaching 1.0:
    •    Enter fullscreenHold:
    •    Unmute video
    •    Start a 2-second timer before allowing scroll to continue normally.
    •    On scroll beyond Hero (next section in view):
    •    Mute video again and move to released.

⸻

Entrance Animation (on page load):

initial: { 
  opacity: 0, 
  scale: 0.92, 
  translateY: 60, 
  filter: "blur(10px)" 
}
animate: { 
  opacity: 1, 
  scale: [1.02, 1],         // settle with a slight overshoot
  translateY: 0,
  filter: "blur(0px)"
}
duration: 1.2s
easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)

Hover (Desktop):
    •    Scale: 1 → 1.05
    •    Duration: 500ms

Click (Desktop):
    •    Clicking the thumbnail:
    •    Jumps directly to the fullscreen state (skips the gradual scroll animation).
    •    Triggers the same 2-second fullscreen hold and sound logic:
    •    Video unmutes while fullscreen,
    •    Video mutes again once the user scrolls to the next section.

Click (Mobile):
    •    Toggles sound (mute/unmute) on the mobile fullscreen video section (see below).

⸻

Manifesto Section (Mobile)
On mobile, the manifesto video appears as a separate fullscreen section immediately below the Hero (no floating thumbnail).

Layout:
    •    Full viewport width, aspect-video height
    •    Background: #040013 (matches Hero for visual continuity)
    •    Video:
    •    Autoplay, loop, muted by default, playsInline
    •    Sound can be enabled by user interaction (tap)
    •    When the user scrolls away from this section, the video should revert to muted state

Animation (scroll reveal):

initial: { opacity: 0, scale: 0.95, y: 20 }
animate (when in view): { opacity: 1, scale: 1, y: 0 }
duration: 0.6s
easing: cubic-bezier(0.22, 1, 0.36, 1)

Accessibility:
    •    Video has no audio by default (muted until user explicitly enables sound).
    •    Provide a clear control (icon/button) to toggle sound on/off.
    •    Show a visible focus indicator if the video or sound toggle is focusable/tappable.


**Desktop (≥1024px)**
- Z-Index Stack:
  - Z-50: Preloader (Ghost Loader SVG animation)
  - Z-30: Manifesto Video Thumbnail (floating, bottom-right)
  - Z-20: Ghost Atmosphere (WebGL Canvas)
  - Z-10: Editorial Text Block (static, centered)
  - Z-0: Gradient Background (`#040013` to `#0b0d3a`)
- Preloader:
  - Visual: SVG ghost icon (white, floating animation), Text: "Summoning spirits", Progress bar
  - Behavior: Fades out after 1.5–2s
- Ghost Atmosphere (WebGL Canvas):
  - Visual Description: Ethereal 3D atmosphere with ghost mesh, reactive eyes, particles, fireflies
  - Performance: DPR max 2, antialias disabled
  - Fallback: Static radial gradient background
- Editorial Text Block:
  - Content: Tag, H1, H2, CTA
  - Position: Centered vertically and horizontally
  - Color: `#d9dade` on `#06071f` background
- Manifesto Video Thumbnail:
  - Initial State: Position: `bottom-right`, size: ~30vw width
  - Scroll Behavior & Positioning:
    - Video stays fixed to viewport during scroll
    - Scales up toward fullscreen as user scrolls
    - Gradually loses rounded corners
  - Fullscreen Hold & Sound Logic:
    - 2-second hold at fullscreen
    - Video muted during transition, unmuted at fullscreen
    - Muted again when scrolling to next section
  - Entrance Animation: Initial opacity 0, scale 0.92, translateY 60
  - Hover: Scale 1 → 1.05 over 500ms
  - Click: Jumps directly to fullscreen state

**Mobile & Tablet (≤1023px)**
- Manifesto Section:
  - Layout: Full viewport width, aspect-video height
  - Background: `#040013` (matches Hero)
  - Video: Autoplay, loop, muted by default, playsInline
  - Behavior: 
    - The manifesto video appears as a separate fullscreen section immediately below the Hero
    - No floating thumbnail behavior
    - Video starts playing automatically when section comes into view
    - Sound can be enabled by user interaction (tap)
    - Video reverts to muted state when scrolled away
  - Animation: 
    - Scroll reveal: `initial: { opacity: 0, scale: 0.95, y: 20 }`, `animate: { opacity: 1, scale: 1, y: 0 }`
    - Duration: 0.6s, easing: cubic-bezier(0.22, 1, 0.36, 1)
  - Accessibility:
    - Clear sound toggle button visible
    - Focus indicator on interactive elements
    - No audio by default (muted until user explicitly enables sound)
- Hero Section:
  - The editorial text is centered and occupies the full width of the screen
  - The ghost atmosphere is simplified due to performance constraints
  - The "step inside" CTA button is centered with appropriate spacing
  - No video thumbnail in the hero section (it appears as a separate section below)

---

# **4.3 Portfolio Showcase

**Purpose:** Clearly present work categories with editorial sophistication, guiding users toward specific areas of interest.

#### Layout (Desktop)

**Structure:**
- Centered headline: "portfólio showcase" (mixed color: "portfólio" in white, "showcase" in `#0048ff`)
- Floating label: "[what we love working on]" (`#4fe6ff`, positioned absolute, left-aligned near first stripe)
- Three interactive stripes (accordion-style rows), each with alternating alignment:
  1. **Brand & Campaigns** — aligned right
  2. **Videos & Motions** — centered
  3. **Web Campaigns, Websites & Tech** — aligned left (text breaks into two lines)
- CTA button below: "let's build something great →" (center-aligned)

**Stripe Structure:**
Each stripe contains:
- **Thumbnail** (hidden by default, reveals on hover): 288px width, aspect ratio ~16:9, rounded corners
- **Category Title**: Large text (2xl–5xl), medium weight
- **Icon**: Blue circular badge with arrow icon (rotates from -45° to 0° on hover)

#### Interactions (Desktop)

**Hover on Stripe:**
```javascript
// Thumbnail reveal
imageWrapper: { width: "0 → 288px", opacity: "0 → 1" }
duration: 700ms
easing: cubic-bezier(0.22, 1, 0.36, 1)

// Content gap adjustment
contentGap: { gap: "gap-7 → gap-10" }
duration: 300ms

// Arrow rotation
arrowIcon: { rotation: "-45deg → 0deg" }
duration: 500ms
```

**Scroll Reveal:**
- Trigger: 30% intersection with viewport
- Animation: Staggered fade-up, category titles turn blue (`#0057FF`)
  ```javascript
  opacity: 0 → 1
  translateY: 24px → 0px
  duration: 0.8s ease-out
  stagger: 120ms between stripes
  ```

**Click:**
- Navigates to `/portfolio` with category filter applied

#### Layout (Mobile)

- Full-width cards stacked vertically
- No floating label
- No thumbnail reveal (thumbnails remain hidden or shown static)
- All cards center-aligned
- Same CTA button at bottom

#### Categories & Assets

1. **Brand & Campaigns**
   - Slug: `brand-campaigns`
   - Thumbnail: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp`

2. **Videos & Motions**
   - Slug: `videos-motions`
   - Thumbnail: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif`

3. **Web Campaigns, Websites & Tech**
   - Slug: `websites-webcampaigns-tech`
   - Thumbnail: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp`

#### CTA Button

**Text:** "let's build something great →"  
**Destination:** `/#contact`  
**Hover:** Background changes to `#4fe6ff`, arrow translates right (`translateX: 4px`)  
**Optional:** Subtle looping animation on arrow in idle state (`translateX: 0 → 4px → 0`)


**Desktop (≥1024px)**
- Layout:
  - Centered headline: "portfólio showcase" (mixed color)
  - Floating label: "[what we love working on]" (absolute positioned)
  - Three interactive stripes (accordion-style rows) with alternating alignment:
    - Brand & Campaigns — aligned right
    - Videos & Motions — centered
    - Web Campaigns, Websites & Tech — aligned left
  - CTA button below: "let's build something great →" (center-aligned)
- Stripe Structure:
  - Each stripe contains: thumbnail (hidden by default), category title, icon
- Interactions:
  - Hover on Stripe: Thumbnail reveal, content gap adjustment, arrow rotation
  - Scroll Reveal: Staggered fade-up, category titles turn blue
  - Click: Navigates to `/portfolio` with category filter

**Mobile & Tablet (≤1023px)**
- Layout:
  - Full-width cards stacked vertically
  - No floating label
  - No thumbnail reveal (thumbnails remain hidden or shown static)
  - All cards center-aligned
  - Same CTA button at bottom
- Specific Implementation Details:
  - The three category stripes are displayed as full-width blocks with equal spacing
  - The category titles are center-aligned on mobile
  - The arrow icons are positioned on the right side of each stripe
  - The CTA button is centered with appropriate vertical spacing (48px above)
  - The "portfólio showcase" headline is centered with reduced spacing from the CTA
- Content Adaptation:
  - The "what we love working on" label is removed on mobile
  - Category titles wrap to multiple lines if necessary
  - The right-aligned, center-aligned, and left-aligned pattern from desktop is replaced with a consistent center-aligned pattern on mobile



---

# **4.4 Featured Projects

**Purpose:** Showcase curated, high-quality work examples in an editorial, magazine-style layout (Bento Grid).

#### Layout (Desktop)

Irregular grid resembling a magazine spread:

```
┌──────────────┐    ┌───────────────────────────────────┐
│   Card 1     │    │           Card 2                  │
│  (336×500)   │    │         (840×500)                 │
└──────────────┘    └───────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                      Card 3                             │
│                  (1176×600)                             │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────┐  ┌──────────┐
│               Card 4                    │  │   CTA    │
│            (784×400)                    │  │ (392×400)│
└─────────────────────────────────────────┘  └──────────┘
```

**Grid Implementation (Tailwind):**
```javascript
// Row 1
<div className="md:col-span-5"><ProjectCard /></div>
<div className="md:col-span-7"><ProjectCard /></div>

// Row 2
<div className="md:col-span-12"><ProjectCard /></div>

// Row 3
<div className="md:col-span-8"><ProjectCard /></div>
<div className="md:col-span-4"><CTAProjectCard /></div>
```

#### Project Cards

**Structure:**
- **Image/Video:** Covers card, object-fit cover
- **Pills (tags):** Positioned absolute, top-right, semi-transparent background (`#E6EFEF` at 70% opacity), small text
- **Info Block (below image):**
  - Title (H3, medium weight)
  - Meta: Client • Year (`#6B7280`, small text)
  - Arrow icon in blue circle (translates right on hover)

**Interaction (Desktop):**
```javascript
// Hover on card
image: { scale: 1.03, translateY: -1 }
duration: 500ms

arrow: { translateX: 20px }
duration: 700ms ease-out

shadow: { shadow-xl shadow-blue-500/10 }
```

**Scroll Reveal:**
```javascript
container: { opacity: 0 → 1, y: 40px → 0 }
cards: { scale: 0.96 → 1, staggerChildren: 0.12 }
duration: 0.7s ease-out
```

#### Featured Projects Content

1. **Magic — devolvendo a magia ao rádio**
   - Slug: `magic-radio-branding`
   - Category: branding & campanha
   - Client: Magic
   - Year: 2023
   - Image: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp`

2. **Uma marca ousada e consistente**
   - Slug: `branding-project-01`
   - Category: branding
   - Client: Cliente confidencial
   - Year: 2022
   - Image: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp`

3. **Key visual para campanha sazonal**
   - Slug: `key-visual-campaign`
   - Category: campanha
   - Client: Cliente confidencial
   - Year: 2021
   - Image: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp`

4. **Experiência web em movimento**
   - Slug: `webdesigner-motion`
   - Category: web & motion
   - Client: Cliente confidencial
   - Year: 2023
   - Image: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif`

#### CTA Card

**Content:**
- Headline: "Like what you see?"  - font normal - (on hover, text becomes `#0057FF`)
- Button: "view projects →" with arrow icon
- Background: `#040013` (on hover, text becomes `#0057FF`)

**Interaction:**
```javascript
// Hover
background: { #040013 }
text: { white → #0057FF }
arrow: { translateX: 4px }
duration: 300ms
```

**Destination:** `/portfolio`

#### Layout (Mobile)

- All cards stacked vertically
- Full-width, heights adapted to content/aspect ratio
- CTA card appears as last item



**Desktop (≥1024px)**
- Layout:
  - Irregular grid resembling a magazine spread (Bento Grid)
  - 4 project cards with varying sizes and positions
  - CTA card in bottom-right position
- Grid Implementation (Tailwind):
  ```jsx
  // Row 1
  <div className="md:col-span-5"> <ProjectCard /> </div>
  <div className="md:col-span-7"> <ProjectCard /> </div>

  // Row 2
  <div className="md:col-span-12"> <ProjectCard /> </div>

  // Row 3
  <div className="md:col-span-8"> <ProjectCard /> </div>
  <div className="md:col-span-4"> <CTAProjectCard /> </div>
  ```
- Project Cards:
  - Structure: Image/Video, Pills (tags), Info Block
  - Interaction: Hover effects on image, arrow, and shadow
  - Scroll Reveal: Container and cards with staggered animation

**Mobile & Tablet (≤1023px)**
- Layout:
  - All cards stacked vertically
  - Full-width, heights adapted to content/aspect ratio
  - CTA card appears as last item
- Specific Implementation Details:
  - Each project card takes 100% of the container width
  - Cards have consistent vertical spacing (32px)
  - Project images maintain aspect ratio but scale to fit width
  - Tags/pills are positioned at the top of the card
  - The CTA card is simplified to a full-width button with text "view projects →"
  - The grid layout is replaced with a simple vertical stack
  - Project titles and metadata are center-aligned
- Content Adaptation:
  - The irregular bento grid is replaced with a clean vertical list
  - Project cards have consistent height on mobile
  - The CTA card no longer has a separate section but is integrated as a full-width button
  - The hover effects are replaced with touch-friendly tap effects

---




# **4.5 Clients/Brands

**Purpose:** Build credibility by displaying recognizable brands previously worked with.

#### Layout

**Desktop & Mobile:**
- Full-width blue bar: `bg-[#0048ff]`
- Centered headline: "marcas com as quais já trabalhei" (white, bold, 2xl)
- Grid of logos: Responsive grid (3–4 columns on mobile, 6+ on desktop)
- Logos: White (apply `filter: brightness(0) invert` to SVGs)

#### Interaction

**Hover (Desktop):**
```javascript
logo: { scale: 1.04, brightness: 1.1 }
duration: 300ms
```

**Scroll Reveal:**
```javascript
title: { opacity: 0 → 1, y: 16 → 0 }
logos: { 
  staggerChildren: 0.03,
  each: { opacity: 0 → 1, y: 12 → 0, scale: 0.9 → 1 }
}
```

#### Client Logos (12 total)

- `client1.svg` through `client12.svg`
- Base URL: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/`

#### Accessibility

- Logos have descriptive `alt` text (e.g., "Logo da empresa X")
- Keyboard navigable (if logos link anywhere)
- Respect `prefers-reduced-motion` (disable entrance stagger)



**Desktop & Mobile**
- Layout:
  - Full-width blue bar: `bg-[#0048ff]`
  - Centered headline: "marcas com as quais já trabalhei"
  - Grid of logos: Responsive grid (3–4 columns on mobile, 6+ on desktop)
  - Logos: White (apply `filter: brightness(0) invert` to SVGs)
- Interaction:
  - Hover (Desktop): logo scale and brightness increase
  - Scroll Reveal: title and logos with staggered animation
- Mobile-Specific Details:
  - Grid changes to 2 columns on small mobile, 3 columns on larger mobile/tablet
  - Logos are scaled to 70% of their desktop size on mobile
  - Vertical spacing between logo rows is 24px on mobile
  - The headline is smaller (1.5rem vs 2rem on desktop)
  - Logo grid has 16px padding on all sides on mobile
  - The blue background extends full width with no horizontal container constraints
---




# **4.6 Contact

**Purpose:** Provide clear contact information and enable message submission.

#### Layout (Desktop)

Two-column layout:
- **Left column:** Contact info + social media links
- **Right column:** Contact form

#### Layout (Mobile)

Single column, vertically stacked:
1. Headline + subheadline
2. Contact info
3. Contact form
4. Social media links

#### Content

**Headline:** "contato"  
**Subheadline:** "Tem uma pergunta ou quer trabalhar junto?"

#### Contact Information

**Direct Channels:**
- **Phone:** `+55 (11) 98396-6838`
  - Icon: Phone
  - Link: `tel:+5511983966838`
- **Email (primary):** `danilo@portfoliodanilo.com`
  - Icon: Envelope
  - Link: `mailto:danilo@portfoliodanilo.com`
- **Email (secondary):** `dannovaisv@gmail.com`
  - Icon: Envelope
  - Link: `mailto:dannovaisv@gmail.com`

**Interaction:**
- Text color: `#111111`
- Hover: Underline + color change to `#0057FF`
- Icons match text color

**Social Media & Portfolio:**
- Icons only (no text labels)
- Platforms: Instagram, Facebook, LinkedIn, Portfolio site, Twitter
- Color: `#111111`, hover: `#0057FF` + `scale(1.1)`
- All open in new tab (`target="_blank"`, `rel="noopener noreferrer"`)

**Links:**
- Instagram: `https://instagram.com/danilo_novais`
- Facebook: `https://facebook.com/danilonovaisvilela`
- LinkedIn: `https://linkedin.com/in/danilonovais`
- Portfolio: `https://portfoliodanilo.com`
- Twitter: `https://twitter.com/danilo_novais`

#### Contact Form

**Fields:**
- Name (text input, required)
- Email (email input, required)
- Message (textarea, required)

**Submit Button:**
- Label: "Enviar Mensagem"
- Background: `#0048ff`
- Text: White
- Hover: Slight elevation (`translateY: -1px`), `scale(1.02)`
- Tap: `scale(0.98)`

**Form Action:**
- Method: POST
- Endpoint: `https://formsubmit.co/danilo@portfoliodanilo.com`

**States:**
- **Focus on input:** Border color `#0057FF`, shadow `ring-2 ring-blue-500`
- **Error:** Show validation message below field
- **Success:** Show success message, clear form
- **Loading:** Disable button, show spinner

#### Interactions & Animations

**Scroll Reveal:**
```javascript
section: { opacity: 0 → 1, y: 24 → 0 }
form fields: { staggerChildren: 60ms }
duration: 0.6s
```

**Form Interactions:**
```javascript
// Input focus
ring-2 ring-blue-500 ring-offset-2

// Button hover
{ scale: 1.02, y: -1 }

// Button tap
{ scale: 0.98 }
```

**Desktop (≥1024px)**
- Layout:
  - Two-column layout: Left column (contact info), Right column (contact form)
- Content:
  - Headline: "contato"
  - Subheadline: "Tem uma pergunta ou quer trabalhar junto?"
  - Contact Information: Direct channels (phone, emails), Social media
  - Contact Form: Name, Email, Message fields, Submit button

**Mobile & Tablet (≤1023px)**
- Layout:
  - Single column, vertically stacked:
    - Headline + subheadline
    - Contact info
    - Contact form
    - Social media links
- Specific Implementation Details:
  - All elements are full-width with appropriate spacing
  - Form fields have larger touch targets (minimum 48×48px)
  - The contact info section has increased vertical spacing between items
  - Social media icons are displayed in a single row at the bottom
  - The form submit button is full-width with increased height
  - The headline and subheadline are center-aligned
  - The contact information is simplified to a vertical list
- Content Adaptation:
  - The two-column layout collapses to a single column
  - Social media icons are reduced to just the icons (no text)
  - Form fields have increased padding for touch interaction
  - The "Enviar Mensagem" button has a minimum width of 100% on mobile
  
#### Accessibility

- All inputs have associated `<label>` elements
- Keyboard navigable
- Focus indicators (`focus-visible`)
- Error messages programmatically associated with fields
- Minimum touch target size: 48×48px (mobile)

---




# **4.7 Footer

**Purpose:** Provide legal information, supplementary navigation, and social links while respecting the overall editorial aesthetic.

#### Desktop (≥1024px)

**Layout:**
- Fixed bar at bottom of viewport
- Persistent (always visible)
- Horizontal layout: Copyright (left) | Navigation + Social (right)
- Height: `48–64px`

**Behavior:**
- `position: fixed`, `bottom: 0`, `z-index: 10`
- Does not scroll away

#### Mobile & Tablet (≤1023px)

**Layout:**
- Static section in document flow (last element on page)
- Vertical stack: Copyright → Navigation → Social
- **Never fixed**
- **Never overlaps content**

**Spacing:**
- Generous vertical padding: `py-10`
- Spacing between blocks: `space-y-6`
- Minimum touch target: 48×48px

#### Content

**Copyright:**
- "© 2025 Danilo Novais Vilela — todos os direitos reservados"
- Color: White
- Small text

**Navigation Links:**
- Home → `#hero`
- Portfólio Showcase → `#portfolio-showcase`
- Sobre → `/sobre`
- Contato → `#contact`

**Social Media:**
- Same icons and links as Contact section
- White icons, hover: slight opacity reduction (desktop) or focus indicator (mobile)

#### Background

- Solid blue: `bg-[#0057FF]`
- Text: White

#### Interactions

**Desktop:**
```javascript
// Hover on links
opacity: 1 → 0.8
underline animation
duration: 200ms

// Hover on social icons
scale: 1.05
duration: 200ms
```

**Mobile:**
- No hover dependencies
- Feedback only on `:active` / `:focus-visible`


**Desktop (≥1024px)**
- Layout:
  - Fixed bar at bottom of viewport
  - Persistent (always visible)
  - Horizontal layout: Copyright (left) | Navigation + Social (right)
  - Height: `48–64px`
- Behavior:
  - `position: fixed`, `bottom: 0`, `z-index: 10`
  - Does not scroll away

**Mobile & Tablet (≤1023px)**
- Layout:
  - Static section in document flow (last element on page)
  - Vertical stack: Copyright → Navigation → Social
  - Never fixed, never overlaps content
- Specific Implementation Details:
  - The footer is the last element on the page, not fixed to bottom
  - Content is center-aligned with generous vertical padding
  - Navigation links are displayed in a single row
  - Social media icons are displayed in a single row below navigation
  - Copyright text is smaller (0.875rem) on mobile
  - The blue background extends full width with no container constraints
  - Spacing between elements is increased (32px) for touch accessibility
- Content Adaptation:
  - The fixed position behavior is removed on mobile
  - The horizontal layout is converted to a vertical stack
  - The navigation and social links are consolidated into fewer rows
  - The height is variable based on content rather than fixed
---

#### Accessibility

- All links have `aria-label` where needed
- Keyboard navigable
- Logical tab order
- Contrast: White on `#0057FF` meets WCAG AA
- Touch targets meet minimum 48×48px

#### Non-Negotiables

- Footer is **fixed only on desktop**
- Footer is **not fixed on mobile**
- No competition with Hero, Manifesto, or CTAs
- Clean, unobtrusive design

----



# **5. TECHNICAL IMPLEMENTATION


## 1. Visão Geral da Tecnologia (Tech Stack)

### Frontend Core
- **Framework:** React 18+ (com Hooks)
- **Meta-framework:** Next.js 13+ (App Router)
- **Linguagem:** TypeScript (implícito pela stack moderna)

### Estilização e UI
- **CSS:** Tailwind CSS (apenas classes utilitárias core)
- **Animações de Interface:** Framer Motion
- **3D / WebGL:** React Three Fiber + Three.js

### Infraestrutura e Assets
- **Formulários:** FormSubmit.co
- **Assets:** Fontes self-hosted; Assets externos via Supabase Storage
- **Build/Deploy:** Vercel, Netlify ou Cloudflare Pages

---

## 2. Requisitos de Performance e Acessibilidade

### 2.1 Orçamento de Performance (Performance Budget)
- **Peso Inicial da Página:** < 2MB
- **Time to Interactive (TTI):** < 5s (em 3G)
- **First Contentful Paint (FCP):** < 2s
- **Cumulative Layout Shift (CLS):** < 0.1

### 2.2 Estratégias de Otimização
- **Imagens:** Formato WebP, lazy loading, `srcset` responsivo.
- **Vídeos:** Comprimidos, autoplay mudo, lazy load (abaixo da dobra).
- **Fontes:** Self-hosted, preloaded, *subsetting* se possível.
- **JavaScript:** Code splitting, imports dinâmicos para WebGL.
- **CSS:** Purge de classes Tailwind não utilizadas em produção.
- **WebGL:** Max DPR de 2, antialias desativado.

### 2.3 Padrões de Acessibilidade (WCAG 2.1 Level AA)
- **Contraste:** Mínimo 4.5:1 para texto normal.
- **Navegação:** Totalmente operável via teclado (Focus Indicators visíveis).
- **Semântica:** Uso correto de HTML semântico e atributos ARIA.
- **Movimento:** Respeitar a preferência `prefers-reduced-motion`.
- **Mobile:** Áreas de toque mínimas de 48×48px.

---

## 3. Especificação de Componentes Críticos

### 3.1 Botão CTA (Primary Call-to-Action)

**Design Visual:**
- **Formato:** Compósito (Pílula à esquerda + Círculo à direita).
- **Cor:** Azul Primário (`#0048ff`). Texto Branco.
- **Texto:** Uppercase, tracking médio, padding `px-6 py-3`.
- **Ícone:** Seta (→) centralizada no círculo.

**Interações e Animações:**
1.  **Hover (Desktop):** O botão inteiro sobe 1px (`translateY(-1px)`).
2.  **Seta (Opcional):** Desliza 4px para a direita no hover.
3.  **Click (Mobile):** Efeito de compressão (`scale(0.98)`).
4.  **Foco (Teclado):** Outline de 2px sólido cor `#4fe6ff` com offset de 4px.

**Exemplo de Implementação (Framer Motion):**
```tsx
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const CTAButton = ({ href, children, variant = 'primary' }) => {
  return (
    <motion.a
      href={href}
      className="inline-flex items-stretch rounded-full bg-[#000022] text-white group focus-visible:outline-2 focus-visible:outline-[#4fe6ff]"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <span className="px-6 py-3 font-medium uppercase tracking-wide">{children}</span>
      <motion.span 
        className="flex items-center justify-center w-12 h-12 rounded-full"
        whileHover={{ x: 4 }}
      >
        <ArrowRight className="w-5 h-5" />
      </motion.span>
    </motion.a>
  );
};

```

### 3.2 Atmosfera "Ghost" (WebGL)

**Propósito:** Camada visual atmosférica na seção Hero (decorativo).
**Regras Críticas:**

* Carregamento via **Dynamic Import** (apenas client-side).
* Fallback para gradiente estático se falhar ou se `prefers-reduced-motion` estiver ativo.
* Não deve controlar layout ou bloquear texto.

**Arquitetura de Pastas Sugerida:**

```text
components/
├── canvas/
│   ├── GhostCanvas.tsx
│   ├── Ghost.tsx
│   ├── Particles.tsx
│   ├── Fireflies.tsx
│   └── postprocessing/

```

---

## 4. Estrutura de Conteúdo e Páginas

### 4.1 Inventário de Conteúdo

1. **Hero:** Manchete editorial, submanchete, CTA principal, Atmosfera WebGL.
2. **Portfolio Showcase:** Título, lista de categorias, labels flutuantes, CTA.
3. **Featured Projects:** Grid Bento, metadados dos projetos.
4. **Clients/Brands:** Grid de logotipos.
5. **Contact:** Formulário (2 colunas desktop, 1 mobile), info de contato, sociais.
6. **Footer:** Copyright 2025, navegação.

### 4.2 Comportamento Responsivo

* **Header:**
* Desktop: Efeito "Glass" fluido.
* Mobile: Menu "Hambúrguer" com animação escalonada (staggered).


* **Footer:**
* Desktop: Fixo na base (se o design pedir reveal) ou estático.
* Mobile: Sempre estático no fluxo do documento (nunca fixo).



---

## 5. Build, Deploy e Variáveis

**Comando de Build:** `pnpm run build`

**Variáveis de Ambiente (`.env.local`):**

```bash
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X
NEXT_PUBLIC_SUPABASE_URL=[https://aymuvxysygrwoicsjgxj.supabase.co](https://aymuvxysygrwoicsjgxj.supabase.co)
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>

```

**Checklist Pré-Deployment:**

* [ ] Auditoria Lighthouse (Score > 90).
* [ ] Teste em dispositivos móveis reais (iOS/Android).
* [ ] Validação de envio de formulários.
* [ ] Verificação de links externos (abrir em nova aba).
* [ ] Teste de vídeos (autoplay mudo).
* [ ] Teste de `prefers-reduced-motion`.

---

## 6. Checklist de Garantia de Qualidade (QA)

### Visual

* [ ] **Hero:** Texto legível sobre o WebGL.
* [ ] **Manifesto:** Vídeo inicia pequeno e expande no scroll.
* [ ] **Projetos:** Grid Bento proporcional no desktop, pilha vertical no mobile.
* [ ] **Logos:** Grid adapta colunas (2-3 no mobile).

### Funcionalidade

* [ ] Links de navegação (âncoras e rotas) funcionais.
* [ ] Formulário envia dados corretamente.
* [ ] Ícones sociais abrem em novas abas.
* [ ] Sem erros no console do navegador.
* [ ] Sem scroll horizontal indesejado no mobile.

### Performance & Acessibilidade

* [ ] Carregamento < 3s em 3G.
* [ ] Navegação completa via Tab (Teclado).
* [ ] Screen Readers leem o conteúdo corretamente.
* [ ] CLS < 0.1 (Layout estável).

```

---
