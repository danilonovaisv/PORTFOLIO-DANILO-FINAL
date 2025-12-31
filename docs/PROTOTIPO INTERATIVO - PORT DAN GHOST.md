

# Danilo Novais Portfolio Homepage
## Technical Documentation & Design Specifications

**Version:** 2.0  
**Last Updated:** December 31, 2025  
**Status:** ✅ Ready for Implementation

---

## 1. PROJECT OVERVIEW

### 1.1 Vision & Goals

Create a premium institutional portfolio that demonstrates design excellence not just through showcased work, but through the site's own execution. The homepage must:

- **Establish immediate credibility** through atmospheric visual design and editorial sophistication
- **Guide visitors intuitively** from brand introduction → work showcase → contact
- **Feel distinctive and memorable** without sacrificing usability or accessibility
- **Perform flawlessly** across all devices and connection speeds
- **Reflect the designer's philosophy**: "You don't see design. But it sees you."

**Success looks like:**
- Visitors spending 2+ minutes exploring the portfolio
- High engagement with featured projects (50%+ click-through)
- Contact form conversions from qualified leads
- Zero accessibility violations (WCAG AA minimum)
- Lighthouse scores: Performance 90+, Accessibility 100, Best Practices 100

### 1.2 Target Audience

**Primary:**
- **Brand managers and marketing directors** at mid-to-large companies seeking design partners
- **Creative agencies** looking for freelance brand designers or collaborators
- **Startups and scale-ups** needing brand identity and campaign work

**Secondary:**
- Design recruiters and HR professionals
- Fellow designers and creative community (peer recognition)
- Potential collaborators for interdisciplinary projects

**User Needs:**
- Quickly understand what Danilo does and his areas of expertise
- See evidence of high-quality work across branding, campaigns, and digital
- Assess cultural fit and working style
- Easily initiate contact

### 1.3 Key Success Metrics

- **Engagement:** Average session duration, scroll depth, interaction rate
- **Conversion:** Contact form submissions, portfolio page visits
- **Technical:** Page load time <3s, Core Web Vitals passing, 0 console errors
- **Accessibility:** WCAG AA compliance, keyboard navigation coverage

### 1.4 Technical Constraints

- **No localStorage/sessionStorage** in artifacts (Claude.ai environment restriction)
- **Self-hosted assets** where possible to avoid external dependencies
- **Graceful degradation** for WebGL/3D features (fallback to static alternatives)
- **Mobile-first** responsive design (majority of traffic expected from mobile)
- **Performance budget:** <2MB initial page weight, <5s time to interactive

---

## 2. DESIGN SYSTEM

### 2.1 Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#0048ff` | Primary brand color, interactive elements, CTAs |
| `accent` | `#4fe6ff` | Secondary highlights, Ghost atmosphere glow |
| `background` | `#0d003b` | Main dark background |
| `backgroundLight` | `#f0f0f0` | Light sections (forms, alternating backgrounds) |
| `text` | `#fcffff` | Primary text on dark backgrounds |
| `textInverse` | `#0e0e0e` | Text on light backgrounds |
| `textSecondary` | `#a1a3a3` | Secondary information, metadata |
| `neutral` | `#0b0d3a` | Gradient transitions, subtle backgrounds |
| `neutralLight` | `#F5F5F5` | Secondary section backgrounds |

### 2.2 Typography

**Primary Font:** TT Norms Pro (self-hosted, fallback: `ui-sans-serif, system-ui`)

| Element | Size | Weight | Usage |
|---------|------|--------|-------|
| H1 | `4rem–6rem` (64–96px) | Bold | Hero headlines |
| H2 | `2rem–3rem` (32–48px) | Bold | Section titles |
| H3 | `1.25rem–1.5rem` (20–24px) | Medium | Card titles, subsections |
| Body | `1rem–1.125rem` (16–18px) | Regular | Main content, descriptions |
| Small | `0.875rem` (14px) | Regular/Medium | Meta info, labels |
| Micro | `0.75rem` (12px) | Mono | Tags, system messages |

### 2.3 Spacing & Grid

**Container:** `max-width: 1680px`, horizontal padding `clamp(24px, 5vw, 96px)`

**Vertical Rhythm:**
- Section spacing: `py-16 md:py-24` (64–96px)
- Component spacing: `gap-8 md:gap-12` (32–48px)
- Element spacing: `gap-4 md:gap-6` (16–24px)

**Grid System (Tailwind):**
- Mobile: Single column, full-width components
- Tablet: `md:grid-cols-2` for cards, maintain single column for hero/showcase
- Desktop: Custom column distributions per section (see Component Specifications)

### 2.4 Animation Principles

**Philosophy:** Animations should feel organic and purposeful, never arbitrary or attention-seeking.

**Core Library:** Framer Motion

**Guidelines:**
- **Animate only** `transform` and `opacity` for performance
- **Easing:** Prefer `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutExpo) for elegance
- **Duration:** 300–700ms for most transitions (longer for complex reveals)
- **Stagger:** 60–120ms delays between sequential elements
- **Respect `prefers-reduced-motion`:** Disable non-essential animations, keep critical layout changes instant

**Common Patterns:**
```javascript
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

**Logos:**
- Favicon: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/Favicon.svg`
- Favicon Light: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/FaviconLight.svg`
- Logo Light (full): `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg`
- Logo Dark (full): `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoDark.svg`

**Videos:**
- Manifesto Video: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`

**Client Logos:**
- 12 monochromatic SVG logos: `client1.svg` through `client12.svg`
- Base URL: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/`

---

## 3. SITE ARCHITECTURE

### 3.1 Information Architecture

```
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
```

### 3.2 Navigation Structure

**Primary Navigation (Header):**
- Home → `/` or `#hero`
- Sobre (About) → `/sobre`
- Portfólio → `/portfolio`
- Contato (Contact) → `#contact` (always anchors to contact section)

**Secondary Navigation (Footer):**
- Same as primary navigation
- Additional: Social media links

### 3.3 Section Flow

The homepage follows a narrative arc:

1. **Header:** Establishes brand identity and provides navigation
2. **Hero:** Creates emotional impact and communicates positioning
3. **Manifesto Video:** Deepens understanding through motion storytelling (desktop: integrated; mobile: separate section)
4. **Portfolio Showcase:** Introduces work categories with editorial rhythm
5. **Featured Projects:** Demonstrates quality through curated examples
6. **Clients/Brands:** Builds credibility through association
7. **Contact:** Provides clear conversion path
8. **Footer:** Reinforces brand and provides supplementary navigation

---

# **4. COMPONENT SPECIFICATIONS

# **4.1 Header

**Purpose:** Provide persistent, accessible navigation while complementing (not competing with) the Hero section.

#### Desktop (≥1024px): Fluid Glass Header

**Layout:**
- Position: `position: sticky`, `top: 0`, `z-index: 40`
- Width: Partial container (not full-width), horizontally centered
- Height: `56–72px`
- Style: Pill-shaped with rounded corners, translucent glass effect (blur + subtle gradient)

**Content:**
- Left: Logo (Favicon Light)
- Right: Horizontal navigation list (Home, Sobre, Portfólio, Contato)

**Interaction - Fluid Glass Effect:**
The header responds to cursor movement along the X-axis:
- **Follow behavior:** Subtle horizontal translation (`maxTranslateX: 40–60px`)
- **Spring physics:** `followDamping: 0.08–0.12s`, gentle overshoot
- **Scale:** Slight horizontal stretch (`maxScaleX: 1.05`) and vertical compression (`maxScaleY: 1.02`)
- **Visual:** Refraction distortion, chromatic aberration on edges, backdrop blur

**Fallback (no WebGL / reduced motion):**
- Same layout and typography
- Static positioning with standard backdrop-filter blur or solid/gradient background
- No cursor-following behavior

#### Mobile & Tablet (≤1023px): Staggered Menu Header

**Layout:**
- Position: Fixed bar at top, full-width
- Height: `48–64px`
- Content: Logo (left), Hamburger icon (right)

**Menu Overlay (when open):**
- Fullscreen or near-fullscreen overlay
- Gradient background (primary to neutral)
- Navigation items in vertical column, large text, generous spacing
- Social media icons at bottom

**Animation:**
- Open: Overlay fades in (`opacity: 0 → 1`, 200–250ms), panel slides in from right (`translateX: 100% → 0`, 260–320ms), hamburger morphs to X
- Items appear with stagger: `opacity: 0 → 1`, `translateY: 16px → 0`, `staggerDelay: 100ms`
- Close: Reverse sequence, items disappear in reverse order

**Interactions:**
- Tap X icon: Close menu
- Tap navigation item: Close menu + navigate
- Tap overlay background: Close menu

**Accessibility:**
- `aria-label` on hamburger/X icon
- `aria-expanded` state
- Focus trap within open menu
- ESC key closes menu

---

# **4.2 Hero + Manifesto

**Purpose:** Create immediate visual and emotional impact, communicate brand positioning, introduce the manifesto video as a sensory layer.

#### Structure (Desktop)

**Z-Index Stack:**
1. **Z-50:** Preloader (Ghost Loader SVG animation)
2. **Z-30:** Manifesto Video Thumbnail (floating, bottom-right)
3. **Z-20:** Ghost Atmosphere (WebGL Canvas)
4. **Z-10:** Editorial Text Block (static, centered)
5. **Z-0:** Gradient Background (`#0d003b` to `#0b0d3a`)

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
- Static radial gradient background (`#0b0d3a` to `#06071f`)
- No 3D elements

**Reference:** Inspired by https://codepen.io/danilonovaisv/pen/azZbdQo

#### Editorial Text Block

**Content:**
- Tag: `[BRAND AWARENESS]` (12px, uppercase, mono)
- H1: "Você não vê o design." (5–8rem, Black, tracking-tight)
- H2: "Mas ele vê você." (5–8rem, Black, tracking-tight)
- CTA: "step inside →" (link to `/sobre`, hover effect: color change + arrow translation)
- Same CTA button at bottom

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
    •    Background: #06071f (matches Hero for visual continuity)
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
- Background: `#0d003b` (on hover, text becomes `#0057FF`)

**Interaction:**
```javascript
// Hover
background: { #0d003b }
text: { white → #0057FF }
arrow: { translateX: 4px }
duration: 300ms
```

**Destination:** `/portfolio`

#### Layout (Mobile)

- All cards stacked vertically
- Full-width, heights adapted to content/aspect ratio
- CTA card appears as last item

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

---

# **5. TECHNICAL IMPLEMENTATION

## **5.1 Technology Stack

**Frontend Framework:**
- React 18+ (with hooks: `useState`, `useEffect`, `useRef`)
- Next.js 13+ (App Router preferred) or Create React App

**Styling:**
- Tailwind CSS (core utility classes only — no custom compiler plugins)
- CSS Modules for component-specific styles (optional)

**Animation:**
- Framer Motion (scroll reveals, micro-interactions, layout animations)
- React Three Fiber + Three.js (WebGL for Ghost Atmosphere)

**Available Libraries (if needed):**
- Lucide React (icons)
- Recharts (if data visualization needed)
- Lodash (utility functions)
- D3, Plotly, Chart.js (advanced visualizations — use sparingly)

**Form Handling:**
- FormSubmit.co (serverless form backend)
- Alternative: Netlify Forms, Formspree

**Assets:**
- Self-hosted fonts (TT Norms Pro)
- External assets via Supabase Storage (images, videos, SVG logos)
- CDN: https://cdnjs.cloudflare.com (only approved scripts)

### 5.2 Performance Requirements

**Budgets:**
- Initial page weight: <2MB
- Time to Interactive (TTI): <5s on 3G
- First Contentful Paint (FCP): <2s
- Cumulative Layout Shift (CLS): <0.1

**Optimization Strategies:**
- **Images:** WebP format, lazy loading, responsive `srcset`
- **Videos:** Compressed, muted autoplay, lazy load below fold
- **Fonts:** Self-hosted, preloaded, subset if possible
- **JavaScript:** Code splitting, dynamic imports for WebGL (client-side only)
- **CSS:** Purge unused Tailwind classes in production
- **WebGL:** Max DPR of 2, antialias disabled, conditional loading based on device capability

**Monitoring:**
- Lighthouse CI (automate scores in build pipeline)
- Core Web Vitals tracking (Google Analytics or RUM)

### 5.3 Accessibility Standards

**Compliance:** WCAG 2.1 Level AA minimum

**Key Requirements:**
- **Keyboard Navigation:** All interactive elements focusable, logical tab order
- **Focus Indicators:** Visible on all focusable elements (`focus-visible:ring`)
- **Color Contrast:** Minimum 4.5:1 for normal text, 3:1 for large text
- **Semantic HTML:** Use `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<button>`, `<a>` appropriately
- **ARIA:** Use `aria-label`, `aria-expanded`, `aria-hidden` where needed
- **Alt Text:** Descriptive alt text for all images (decorative images: `alt=""`)
- **Screen Reader Support:** Test with NVDA, JAWS, or VoiceOver
- **Motion:** Respect `prefers-reduced-motion` (disable non-essential animations)
- **Touch Targets:** Minimum 48×48px on mobile

**Testing Tools:**
- axe DevTools (browser extension)
- Lighthouse Accessibility audit
- Manual keyboard navigation testing
- Manual screen reader testing



### 5.4 WebGL Implementation (Ghost Atmosphere)

**Purpose:** Create atmospheric visual layer in Hero section without controlling layout or text.

**Tech Stack:**
- React Three Fiber (declarative Three.js)
- Three.js r128 (CDN: https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js)
- Post-processing: Bloom, custom Analog Decay pass

**Component Architecture:**
```
components/
├── canvas/
│   ├── GhostCanvas.tsx (wrapper, handles loading/fallback)
│   ├── Ghost.tsx (main mesh: emissive sphere, eyes, movement)
│   ├── Particles.tsx (floating particle system)
│   ├── Fireflies.tsx (small light points)
│   └── postprocessing/
│       ├── BloomPass.ts
│       └── AnalogDecayPass.ts
```

**Critical Rules:**
- **Dynamic import:** Load WebGL only client-side (`import('...')`)
- **No THREE.CapsuleGeometry:** Not available in r128, use alternatives
- **Performance:** DPR max 2, no antialias, instancing for particles
- **Fallback:** If WebGL fails or `prefers-reduced-motion`, show static gradient background
- **WebGL is decorative:** If Canvas crashes, site remains fully functional

**Ghost Movement:**
```javascript
useFrame((state, delta) => {
  // Follow cursor
  ghost.position.lerp(targetPosition, 0.05);
  
  // Organic sine wave motion
  ghost.position.y += Math.sin(state.clock.elapsedTime * 0.8) * 0.001;
  ghost.position.x += Math.sin(state.clock.elapsedTime * 0.3) * 0.0005;
  
  // Emissive pulse
  material.emissiveIntensity = 1 + Math.sin(state.clock.elapsedTime) * 0.2;
});
```

**Reduced Motion:**
```javascript
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reducedMotion) {
  // Disable WebGL entirely or use static version
  return <StaticGradientBackground />;
}
```


# CTA Button Component Specification

**Component:** Primary Call-to-Action Button  
**Usage:** Portfolio Showcase, Featured Projects, Contact section  
**Status:** ✅ Standardized Pattern

---

## Visual Design

### Structure

The CTA button consists of two nested elements creating a composite interactive component:

```html
<div class="button-wrapper">
  <a href="#" class="flex items-stretch group">
    <span class="button-text">view projects</span>
    <span class="button-icon">→</span>
  </a>
</div>
```

### Layout Components

**Text Container:**
- Rounded left side (pill shape)
- Background: `#0048ff` (primary blue)
- Text: White, medium weight, uppercase tracking
- Padding: `px-6 py-3` (24px horizontal, 12px vertical)

**Icon Container:**
- Circular badge attached to right side
- Background: `#0048ff` (same as text container)
- Icon: White arrow (→) centered
- Size: Matches height of text container (creates pill + circle composite)

**Visual Reference:** See provided image — pill-shaped button with integrated circular arrow badge on dark navy background.

---

## Interaction & Animation

### Hover State (Desktop)

**Primary Animation:**
```css
/* Applied to the <a> element */
.cta-button:hover {
  transform: translateY(-1px);
  transition: transform 200ms ease-out;
}
```

**Behavior:**
- **Trigger:** Mouse enters button area (entire composite element)
- **Effect:** Button lifts vertically by 1 pixel upward
- **Duration:** 200ms
- **Easing:** `ease-out` (starts fast, decelerates at end)
- **Properties animated:** `transform` only (GPU-accelerated, performant)

**Visual Feedback:**
- Subtle elevation effect suggesting the button is "floating" up
- Creates tactile, responsive feel without being aggressive
- Maintains visual clarity and professionalism

### Secondary Interactions

**Optional Enhancements (based on section context):**

1. **Arrow Translation (Portfolio Showcase, Featured Projects):**
   ```css
   .cta-button:hover .button-icon {
     transform: translateX(4px);
     transition: transform 300ms ease-out;
   }
   ```
   - Arrow slides right by 4px
   - Reinforces directionality and forward motion

2. **Background Color Shift (high-emphasis CTAs):**
   ```css
   .cta-button:hover {
     background-color: #4fe6ff; /* accent light blue */
   }
   ```
   - Use sparingly for primary conversion actions
   - Example: Contact section "let's build something great →"

3. **Idle Loop Animation (optional, subtle attention-grabber):**
   ```css
   @keyframes arrow-pulse {
     0%, 100% { transform: translateX(0); }
     50% { transform: translateX(4px); }
   }
   
   .cta-button .button-icon {
     animation: arrow-pulse 2s ease-in-out infinite;
   }
   ```
   - Very subtle, slow oscillation of arrow
   - Pauses on hover (replaced by interactive animation)

### Active/Tap State (Mobile)

```css
.cta-button:active {
  transform: scale(0.98);
  transition: transform 100ms ease-out;
}
```

- Brief compression effect on tap
- Provides tactile feedback on touch devices
- Faster duration (100ms) for immediate response

### Focus State (Keyboard Navigation)

```css
.cta-button:focus-visible {
  outline: 2px solid #4fe6ff;
  outline-offset: 4px;
  transition: outline-offset 150ms ease-out;
}
```

- Clear, accessible focus indicator
- Offset prevents overlap with button edges
- Matches accent color for brand consistency

---

## Technical Implementation

### Framer Motion (Recommended)

```tsx
import { motion } from 'framer-motion';

export const CTAButton = ({ href, children, variant = 'primary' }) => {
  return (
    <motion.a
      href={href}
      className="cta-button flex items-stretch group"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <span className="button-text">{children}</span>
      <motion.span 
        className="button-icon"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        →
      </motion.span>
    </motion.a>
  );
};
```

### CSS-Only Implementation (Fallback)

```css
.cta-button {
  display: inline-flex;
  align-items: stretch;
  background-color: #0048ff;
  border-radius: 9999px;
  color: white;
  text-decoration: none;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: transform 200ms ease-out;
}

.cta-button:hover {
  transform: translateY(-1px);
}

.cta-button:active {
  transform: scale(0.98);
  transition-duration: 100ms;
}

.cta-button:focus-visible {
  outline: 2px solid #4fe6ff;
  outline-offset: 4px;
}

.button-text {
  padding: 0.75rem 1.5rem;
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: inherit;
  transition: transform 300ms ease-out;
}

.cta-button:hover .button-icon {
  transform: translateX(4px);
}
```

---

## Accessibility & Performance

### Accessibility Compliance

**WCAG Requirements:**
- ✅ **Contrast ratio:** 4.5:1 minimum (white text on `#0048ff` blue)
- ✅ **Focus indicator:** Clear 2px outline with 4px offset
- ✅ **Touch target:** Minimum 48×48px (pill height + icon width meet requirement)
- ✅ **Keyboard operable:** Fully navigable via Tab key
- ✅ **Screen reader friendly:** Semantic `<a>` element with descriptive text

**Reduced Motion Support:**
```css
@media (prefers-reduced-motion: reduce) {
  .cta-button,
  .cta-button *,
  .cta-button::before,
  .cta-button::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- Respects user's motion preferences
- Maintains layout and functionality
- Disables all non-essential animations

### Performance Considerations

**Why This Approach is Performant:**

1. **GPU Acceleration:** `transform` properties are composited on GPU, avoiding expensive repaints
2. **Single Property Animation:** Only animating `transform` reduces computational overhead
3. **Short Duration:** 200ms is fast enough to feel instant while remaining smooth
4. **No Layout Thrashing:** Transform doesn't trigger reflow/relayout (unlike animating `top`, `margin`, etc.)

**Performance Monitoring:**
```javascript
// Check animation frame rate in DevTools
const button = document.querySelector('.cta-button');
button.addEventListener('mouseenter', () => {
  performance.mark('hover-start');
});
button.addEventListener('transitionend', () => {
  performance.mark('hover-end');
  performance.measure('hover-animation', 'hover-start', 'hover-end');
});
```

**View Transitions API (Future Enhancement):**

For page-level transitions involving CTAs (e.g., navigating from homepage to portfolio):

```javascript
// Experimental - requires browser support check
if (document.startViewTransition) {
  document.startViewTransition(() => {
    // Update DOM/navigate
    window.location.href = ctaHref;
  });
}
```

- Provides smoother, more contextual transitions between pages
- Automatically handles element morphing and positioning
- Not applicable to simple hover states, but valuable for navigation flows

---

## Variants

### Primary CTA (Default)
- **Background:** `#0048ff`
- **Text:** White
- **Usage:** Main conversion actions (e.g., "view projects", "let's build something great")

### Secondary CTA (Outline)
- **Background:** Transparent
- **Border:** 2px solid `#0048ff`
- **Text:** `#0048ff`
- **Hover:** Background fills with `#0048ff`, text becomes white
- **Usage:** Secondary actions, alternative choices

### Accent CTA (High Emphasis)
- **Background:** `#4fe6ff` (light blue)
- **Text:** `#0e0e0e` (dark inverse text)
- **Hover:** Background darkens slightly to `#0048ff`, text becomes white
- **Usage:** Urgent or high-priority actions

---

## Usage Guidelines

### When to Use

**Primary CTAs:**
- End of Portfolio Showcase section: "let's build something great →"
- Featured Projects CTA card: "view projects →"
- Contact section: "Enviar Mensagem"

**Secondary CTAs:**
- "Ver todos os projetos →" (Portfolio Showcase alternate action)
- Newsletter signup (if implemented)

### When NOT to Use

- ❌ Navigation links (use simple text links or header navigation)
- ❌ Social media icons (use icon-only buttons)
- ❌ Inline text links within paragraphs

### Spacing

- Minimum 24px vertical spacing above/below CTA
- Center-align in sections (Portfolio Showcase, Featured Projects)
- Left-align in forms (Contact section submit button)

---

## QA Checklist

**Visual:**
- [ ] Button maintains pill + circle composite shape at all breakpoints
- [ ] Text and icon are vertically centered
- [ ] Icon is perfectly circular
- [ ] Colors match design tokens (`#0048ff`, white)

**Interaction (Desktop):**
- [ ] Hover lifts button by 1px smoothly
- [ ] Arrow translates right by 4px (if enabled)
- [ ] Transition feels snappy but not jarring (200ms)
- [ ] No layout shift or flickering

**Interaction (Mobile):**
- [ ] Tap produces subtle scale-down effect
- [ ] No hover animations triggered on touch
- [ ] Touch target is large enough (48×48px minimum)

**Accessibility:**
- [ ] Focus indicator visible when navigating via keyboard
- [ ] Screen reader announces button text correctly
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Reduced motion preference disables animations

**Performance:**
- [ ] No janky animation (smooth 60fps)
- [ ] DevTools Performance panel shows composited layers (green)
- [ ] No excessive repaints visible in Paint Flashing mode

---

## Code Example (Complete Component)

```tsx
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  arrowAnimation?: boolean;
  className?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({ 
  href, 
  children, 
  variant = 'primary',
  arrowAnimation = true,
  className = ''
}) => {
  const variants = {
    primary: 'bg-[#0048ff] text-white',
    secondary: 'bg-transparent border-2 border-[#0048ff] text-[#0048ff] hover:bg-[#0048ff] hover:text-white',
    accent: 'bg-[#4fe6ff] text-[#0e0e0e] hover:bg-[#0048ff] hover:text-white'
  };

  return (
    <motion.a
      href={href}
      className={`
        inline-flex items-stretch rounded-full
        font-medium uppercase tracking-wide
        transition-colors duration-300
        focus-visible:outline-2 focus-visible:outline-[#4fe6ff] focus-visible:outline-offset-4
        ${variants[variant]} ${className}
      `}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      <span className="px-6 py-3">{children}</span>
      <motion.span 
        className="flex items-center justify-center w-12 h-12 rounded-full"
        whileHover={arrowAnimation ? { x: 4 } : {}}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <ArrowRight className="w-5 h-5" />
      </motion.span>
    </motion.a>
  );
};
```

---

**Summary:** This CTA pattern balances visual elegance with technical performance. The 1px vertical lift on hover is subtle yet effective, creating a sense of depth without overwhelming the user. Animating only `transform` properties ensures GPU acceleration and smooth 60fps animations across devices. The composite pill + circle shape is distinctive and aligns with modern UI trends while remaining accessible and keyboard-navigable.
### 5.5 Build & Deployment

**Build Command (Next.js):**
```bash
npm run build
```

**Environment Variables:**
```bash
# If using analytics
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X

# If using Supabase for future features
NEXT_PUBLIC_SUPABASE_URL=https://aymuvxysygrwoicsjgxj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
```

**Deployment Platforms:**
- Vercel (recommended for Next.js)
- Netlify
- Cloudflare Pages

**Pre-Deployment Checklist:**
- [ ] Run Lighthouse audit (Performance 90+, Accessibility 100)
- [ ] Test on mobile devices (iOS Safari, Android Chrome)
- [ ] Validate all forms submit successfully
- [ ] Check all external links open correctly
- [ ] Verify videos autoplay (muted) on all browsers
- [ ] Test with `prefers-reduced-motion` enabled
- [ ] Confirm WebGL fallback works

---

# **6. APPENDICES

### A. Content Inventory

Comprehensive list of all text, media, and interactive content required:

**Text Content:**
- Hero headline, subheadline, CTA
- Portfolio Showcase: Section title, category names, floating label, CTA
- Featured Projects: Section title, 4 project titles + metadata
- Clients/Brands: Section title
- Contact: Section title, subheadline, form labels, contact info, social links
- Footer: Copyright, navigation labels

**Media Assets:**
- 4 logos (Favicon, Favicon Light, Logo Light, Logo Dark)
- 1 manifesto video (MP4)
- 3 portfolio showcase thumbnails
- 4 featured project images (3 static, 1 GIF)
- 12 client logos (SVG)

**Interactive Elements:**
- Header navigation (desktop glass effect, mobile staggered menu)
- Hero Ghost WebGL canvas
- Manifesto video (scroll-triggered growth on desktop)
- Portfolio showcase stripes (hover reveals)
- Featured project cards (hover interactions)
- Contact form (validation, submission)
- All CTAs and links

### B. Asset URLs

**Logos:**
- Favicon: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/Favicon.svg`
- Favicon Light: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/FaviconLight.svg`
- Logo Light: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg`
- Logo Dark: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoDark.svg`

**Videos:**
- Manifesto: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`

**Portfolio Showcase Thumbnails:**
- Brand & Campaigns: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp`
- Videos & Motions: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif`
- Web Campaigns/Websites/Tech: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp`

**Featured Projects:**
- Magic Radio: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp`
- Branding Project 01: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp`
- Key Visual Campaign: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp`
- Webdesigner Motion: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif`

**Client Logos:**
- Base URL: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/`
- Files: `client1.svg` through `client12.svg`

### C. Non-Negotiables Checklist

Critical requirements that must not be compromised:

#### Technical
- [ ] No localStorage/sessionStorage usage (Claude.ai artifact restriction)
- [ ] WebGL is decorative only — site functions fully if WebGL fails
- [ ] Text content never depends on shaders or WebGL rendering
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Mobile performance: No janky scrolling, smooth 60fps interactions

#### Design
- [ ] Hero: Static editorial text, no scroll-triggered text animations
- [ ] Header (desktop): Fluid glass effect with subtle cursor follow (no aggressive "chiclete" behavior)
- [ ] Header (mobile): Staggered menu with proper animation sequence
- [ ] Portfolio Showcase: Alternating stripe alignment (right, center, left)
- [ ] Featured Projects: Bento grid layout with irregular proportions
- [ ] Footer (desktop): Fixed at bottom
- [ ] Footer (mobile): Static in document flow, never fixed

#### Content
- [ ] Copyright year: 2025
- [ ] All project metadata accurate (client, year, category)
- [ ] Form action endpoint: `https://formsubmit.co/danilo@portfoliodanilo.com`
- [ ] All external links open in new tab with `rel="noopener noreferrer"`

#### Accessibility
- [ ] WCAG AA compliance minimum
- [ ] Keyboard navigation fully functional
- [ ] Focus indicators visible on all interactive elements
- [ ] Color contrast meets minimum ratios
- [ ] Touch targets minimum 48×48px on mobile

### D. QA Checklist

**Visual (Desktop)**
- [ ] Header: Fluid glass effect works, no layout shift on hover
- [ ] Hero: Ghost atmosphere loads, text remains centered and legible
- [ ] Manifesto video: Starts small (bottom-right), grows smoothly on scroll
- [ ] Portfolio Showcase: Stripes aligned correctly (right, center, left), thumbnails reveal on hover
- [ ] Featured Projects: Bento grid proportions match design, hover effects smooth
- [ ] Clients/Brands: Logo grid centered, logos scale subtly on hover
- [ ] Contact: Two-column layout, form validation works
- [ ] Footer: Fixed at bottom, links work

**Visual (Mobile)**
- [ ] Header: Hamburger opens staggered menu correctly
- [ ] Hero: Text legible, no WebGL performance issues
- [ ] Manifesto: Separate fullscreen section appears below Hero
- [ ] Portfolio Showcase: Cards stacked vertically, full-width
- [ ] Featured Projects: Cards stacked vertically
- [ ] Clients/Brands: Logo grid adapts to smaller columns
- [ ] Contact: Single-column layout, form fields large enough
- [ ] Footer: Static at bottom of page, not fixed

**Functionality**
- [ ] All navigation links work (internal anchors + page routes)
- [ ] Contact form submits successfully
- [ ] Videos autoplay muted
- [ ] Social media icons open correct URLs in new tabs
- [ ] No console errors
- [ ] No horizontal scrolling on mobile

**Performance**
- [ ] Lighthouse Performance score: 90+
- [ ] Lighthouse Accessibility score: 100
- [ ] Page loads in <3s on 3G
- [ ] No layout shift (CLS <0.1)
- [ ] Smooth scrolling and interactions

**Accessibility**
- [ ] Keyboard navigation: All interactive elements reachable via Tab
- [ ] Screen reader: All content announced correctly
- [ ] Focus indicators visible
- [ ] Color contrast passes WCAG AA
- [ ] Touch targets meet 48×48px minimum (mobile)
- [ ] `prefers-reduced-motion` disables non-essential animations

**Cross-Browser**
- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Firefox (desktop)
- [ ] Edge (desktop)

---

# **5. Final Check

### How Coherence Improved

1. **Unified language and terminology**: Standardized technical terms, component names, and references throughout the document (e.g., consistently using "Ghost Atmosphere" instead of mixing "Ghost Blue," "atmospheric layer," etc.)
2. **Clear separation of concerns**: Design system is now centralized, eliminating repeated color/typography definitions across sections
3. **Logical information flow**: Document progresses from high-level vision → design principles → component specs → technical details, matching natural mental models

### How Organization Improved

1. **Hierarchical structure with clear sections**: Main sections (Overview, Design System, Architecture, Components, Implementation, Appendices) make it easy to navigate to specific information
2. **Consistent component specification format**: Every component follows the same structure (Purpose → Layout → Interactions → Accessibility), making it predictable and scannable
3. **Consolidated reference materials**: All asset URLs, non-negotiables, and QA checklists are in appendices rather than scattered throughout

### How Clarity and Professionalism Improved

1. **Reduced redundancy**: Eliminated repetitive explanations of color values, fonts, and accessibility principles by centralizing them in the Design System section
2. **Precise, actionable language**: Replaced vague descriptions with specific measurements, code examples, and behavior definitions (e.g., "subtle movement" became "lerp factor of 0.05, max translateX: 40–60px")
3. **Visual aids and examples**: Added ASCII diagrams for layouts (Bento grid, z-index stack) and code snippets demonstrating exact animation parameters, making abstract concepts concrete

---

## Questions for You

1. **Success Metrics Validation**: Are the proposed metrics (session duration, click-through rates, form conversions) aligned with your actual business goals, or should different KPIs be prioritized?

2. **Content Completeness**: 
   - Are there any missing project details (awards, recognition, specific outcomes)?
   - Should any of the "Cliente confidencial" projects have real client names revealed?
   - Are the year dates (2021-2023) accurate, or should they be updated?

3. **Technical Constraints Clarification**:
   - Is Next.js the confirmed framework, or are you using a different React setup?
   - Do you have TT Norms Pro licensed and self-hosted, or should I suggest specific fallback strategies?
   - Are there any additional technical limitations from your hosting environment?

4. **WebGL Complexity**: The current spec describes a fairly complex 3D scene (Ghost mesh, particles, fireflies, post-processing). Have you tested this on target devices to confirm performance is acceptable, or should I simplify the fallback recommendations?

5. **Form Handling**: FormSubmit.co is specified, but have you tested this service for your needs (anti-spam, email delivery, etc.), or would you prefer recommendations for alternatives?

6. **Analytics & Tracking**: The document mentions tracking events but doesn't specify a platform. Should I add specific implementation notes for Google Analytics, Plausible, or another tool?
