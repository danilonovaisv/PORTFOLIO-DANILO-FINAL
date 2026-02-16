➜  AUDITORIA-squirrelscan squirrel audit https://portfoliodanilo.com

 ▄█▀ ▄▀█ █ █ █ █▀▄ █▀▄ █▀▀ █   ▄█▀ ▄▀▀ ▄▀█ █▄ █
 ▀▄  █ █ █ █ █ ██▀ ██▀ █▀  █   ▀▄  █   █▀█ █ ▀█
 █▄▀ ▀▀█ ▀▄▀ █ █ █ █ █ █▄▄ █▄▄ █▄▀ ▀▄▄ █ █ █  █

  v0.0.33  •  https://squirrelscan.com
────────────────────────────────────────────
Config: (none, using defaults)
Auditing: https://portfoliodanilo.com
Coverage: surface (max 100 pages)

⠋ InitializingDatabase: /Users/danilonovais/.squirrel/projects/portfoliodanilo-com/project.db
New crawl: https://portfoliodanilo.com
✓ Audited 13 pages in 54.1s    

Audit stored in database. Use 'squirrel report' to view latest audit.
Use 'squirrel report --list' to see all stored audits.


──────────────────────────────────────────────────
SQUIRRELSCAN REPORT
https://portfoliodanilo.com • 13 pages • 57/100 (F)
──────────────────────────────────────────────────

Health Score: 57/100 (F)

Category Breakdown:
──────────────────────────────────────────────────
Accessibility          ██████████████████░░   91%   ✓396  ⚠11  ✗21
Core SEO               █████████████████░░░   87%   ✓112  ⚠ 6  ✗13
Content                █████████████████░░░   86%   ✓ 41  ⚠16  ✗ 2
Security               ████████████████░░░░   81%   ✓ 72  ⚠12  ✗ 2
Images                 ███████████████░░░░░   74%   ✓ 66  ⚠17  ✗ 1
Crawlability           █████████████████░░░   86%   ✓ 52  ⚠ 4  ✗ 1
Performance            ███████████████░░░░░   77%   ✓156  ⚠62  ✗ 0
Video                  ████████████░░░░░░░░   60%   ✓  8  ⚠13  ✗ 0
Structured Data        ██████████████░░░░░░   71%   ✓  9  ⚠ 8  ✗ 0
Links                  █████████████████░░░   85%   ✓104  ⚠ 3  ✗ 0
E-E-A-T                ████████████████████  100%   ✓  6  ⚠ 0  ✗ 0
Internationalization   ████████████████████  100%   ✓ 12  ⚠ 0  ✗ 0
Legal Compliance       ████████████████████  100%   ✓ 12  ⚠ 0  ✗ 0
Mobile                 ████████████████████  100%   ✓ 41  ⚠ 0  ✗ 0
Social Media           ████████████████████  100%   ✓ 46  ⚠ 0  ✗ 0
URL Structure          ████████████████████  100%   ✓ 72  ⚠ 0  ✗ 0

Total: 1205 passed, 152 warnings, 40 errors

ISSUES

Crawlability (1 error, 4 warnings)
  crawl/sitemap-domain Sitemap Domain (error)
    ✗ sitemap-domain: 14 URL(s) point to different domain(s)
      → http://localhost:3000
      → http://localhost:3000/portfolio
      → http://localhost:3000/sobre
      → http://localhost:3000/contato
      → http://localhost:3000/privacidade
      ... +9 more
  crawl/canonical-chain Canonical Chain (warning)
    ⚠ canonical-protocol: Canonical points to HTTP instead of HTTPS (2 pages)
      → /projects/brand-video
      → /projects/key-vision
  crawl/sitemap-coverage Sitemap Coverage (warning)
    ⚠ sitemap-coverage: 12 indexable page(s) not in sitemap (100%)
      → https://portfoliodanilo.com/
      → https://portfoliodanilo.com/portfolio?category=motion
      → https://portfoliodanilo.com/portfolio?category=branding
      → https://portfoliodanilo.com/portfolio
      → https://portfoliodanilo.com/portfolio?category=web
      ... +7 more
    ⚠ sitemap-orphans: 13 sitemap URL(s) were not crawled
      → http://localhost:3000
      → http://localhost:3000/portfolio
      → http://localhost:3000/sobre
      → http://localhost:3000/contato
      → http://localhost:3000/privacidade
      ... +8 more

Core SEO (13 errors, 6 warnings)
  core/meta-title Meta Title (error)
    ⚠ meta-title: Title too long (63 chars, max 60)
      → /portfolio?category=branding
  core/h1 H1 Tag (error)
    ⚠ h1: Multiple H1 tags found (2)
      → /sobre
    ✗ h1: No H1 tag found
      → /contato
  core/meta-description Meta Description (error)
    ⚠ meta-description: Description too short (100 chars, min 120)
      → /portfolio?category=motion
    ⚠ meta-description: Description too short (106 chars, min 120)
      → /portfolio?category=web
    ⚠ meta-description: Description too long (169 chars, max 160)
      → /portfolio/advertising-video
    ⚠ meta-description: Description too short (111 chars, min 120)
      → /projects/brand-video
  core/charset Charset (warning)
    ✗ charset: No charset declaration found (12 pages)
      → /
      → /portfolio?category=motion
      → /portfolio?category=branding
      → /portfolio
      → /portfolio?category=web
      ... +7 more

Security (2 errors, 12 warnings)
  security/leaked-secrets Leaked Environment Variables (error)
    ⚠ leaked-secrets-medium: 1 potential secret(s) detected (verify manually)
      → Found in external-script (https://portfoliodanilo.com/_next/static/chunks/bc76fe3944f82add.js)
  security/mixed-content Mixed Content (error)
    ✗ mixed-content: 1 HTTP resource(s) on HTTPS page (2 pages)
      → /projects/brand-video
      → /projects/key-vision
      → http://localhost:3000/projects/brand-video
      → http://localhost:3000/projects/key-vision
  security/csp Content Security Policy (warning)
    ⚠ csp-unsafe-scripts: CSP allows 'unsafe-inline' and 'unsafe-eval'
  security/form-captcha Form CAPTCHA (warning)
    ⚠ form-captcha: 1 public form(s) without CAPTCHA (9 pages)
      → /
      → /portfolio?category=motion
      → /portfolio?category=branding
      → /portfolio
      → /portfolio?category=web
      ... +4 more
      → [action="https://formsubmit.co/danilo@portfoliodanilo.com"]
  security/http-to-https HTTP to HTTPS Redirect (warning)
    ⚠ http-to-https: 12 HTTP URL(s) redirect to HTTPS
      → http://portfoliodanilo.com/ → https://portfoliodanilo.com/ (301)
      → http://portfoliodanilo.com/portfolio?category=motion → https://portfoliodanilo.com/portfolio?category=motion (301)
      → http://portfoliodanilo.com/portfolio?category=branding → https://portfoliodanilo.com/portfolio?category=branding (301)
      → http://portfoliodanilo.com/portfolio → https://portfoliodanilo.com/portfolio (301)
      → http://portfoliodanilo.com/portfolio?category=web → https://portfoliodanilo.com/portfolio?category=web (301)
      ... +7 more

Links (3 warnings)
  links/broken-external-links Broken External Links (warning)
    ⚠ broken-external-links: 1 broken external link(s): 1 with 999
      → https://linkedin.com/in/danilonovais (999)
        from /
        from /
        ... +28 more pages
  links/orphan-pages Orphan Pages (warning)
    ⚠ orphan-pages: 4 orphan page(s) with <2 incoming links
      → https://portfoliodanilo.com/portfolio/advertising-video
      → https://portfoliodanilo.com/portfolio/key-vision
      → https://portfoliodanilo.com/projects/brand-video
      → https://portfoliodanilo.com/projects/key-vision
  links/weak-internal-links Weak Internal Links (warning)
    ⚠ weak-internal-links: 4 page(s) have only 1 internal link
      → https://portfoliodanilo.com/portfolio/advertising-video
      → https://portfoliodanilo.com/portfolio/key-vision
      → https://portfoliodanilo.com/projects/brand-video
      → https://portfoliodanilo.com/projects/key-vision

Content (2 errors, 16 warnings)
  content/meta-in-body Meta Tags in Body (error)
    ✗ meta-in-body: Found 13 meta tags in <body> (2 pages)
      → /projects/brand-video
      → /projects/key-vision
      → description="Nem todo amor precisa ser explicado.  
Alguns apen..."
      → author="Danilo Novais"
      → keywords="Creative Developer,Creative Development,Creative t..."
      → creator="Danilo Novais"
      → publisher="Danilo Novais"
      ... +8 more
  content/keyword-stuffing Keyword Stuffing (warning)
    ⚠ keyword-stuffing: 1 word(s) may be overused (3 pages)
      → /
      → /projects/brand-video
      → /projects/key-vision
      → "voc" (6.8%)
      → "que" (6.4%)
      → "para" (5.5%)
    ⚠ keyword-stuffing: 2 word(s) may be overused
      → /sobre
      → "que" (4.8%)
      → "com" (4.1%)
  content/word-count Word Count (warning)
    ⚠ word-count: Thin content: 130 words (min 300)
      → /
    ⚠ word-count: Thin content: 132 words (min 300) (4 pages)
      → /portfolio?category=motion
      → /portfolio?category=branding
      → /portfolio
      → /portfolio?category=web
    ⚠ word-count: Thin content: 295 words (min 300)
      → /sobre
    ⚠ word-count: Thin content: 128 words (min 300)
      → /privacidade
    ⚠ word-count: Thin content: 45 words (min 300)
      → /contato
    ⚠ word-count: Thin content: 92 words (min 300)
      → /portfolio/advertising-video
    ⚠ word-count: Thin content: 85 words (min 300)
      → /portfolio/key-vision
    ⚠ word-count: Thin content: 172 words (min 300)
      → /projects/brand-video
    ⚠ word-count: Thin content: 214 words (min 300)
      → /projects/key-vision

Structured Data (8 warnings)
  schema/video Video Schema (warning)
    ⚠ video-schema: Page has video but no VideoObject schema (8 pages)
      → /
      → /portfolio?category=motion
      → /portfolio?category=branding
      → /portfolio
      → /portfolio?category=web
      ... +3 more

Images (1 error, 17 warnings)
  images/image-file-size Image File Size Too Large (error)
    ✗ image-file-size: 10 image(s) exceed 100.0 KB
      → https://portfoliodanilo.com/_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsite-assets%2Fhome%2Fshowcase%2FBranding-Project.webp&w=3840&q=75
        from /
      → https://portfoliodanilo.com/_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fportfolio-media%2Fprojects%2Fcampaign%2Fthumb.webp&w=3840&q=75
        from /portfolio?category=motion
        from /portfolio?category=branding
        ... +2 more pages
      → https://portfoliodanilo.com/_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsite-assets%2Flanding-pages%2Fbrand-video%2Fmaster-v3-block-image-4-media1.webp&w=3840&q=75
        from /projects/brand-video
      → https://portfoliodanilo.com/_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsite-assets%2Flanding-pages%2Fkey-vision%2Fblock-501fd6cc-8a6f-49ad-8904-9dff143a9185-media1.webp&w=3840&q=75
        from /projects/key-vision
      → https://portfoliodanilo.com/_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsite-assets%2Flanding-pages%2Fkey-vision%2Fblock-2a06568e-4018-4a9d-b86a-5a6a56b5da2e-media1.webp&w=3840&q=75
        from /projects/key-vision
      ... +5 more
  images/offscreen-lazy Offscreen Image Lazy Loading (warning)
    ⚠ offscreen-images-not-lazy: 3 below-fold image(s) without lazy loading (5 pages)
      → /
      → /portfolio?category=motion
      → /portfolio?category=branding
      → /portfolio
      → /portfolio?category=web
      → image
      → image
      → image
    ⚠ offscreen-images-not-lazy: 1 below-fold image(s) without lazy loading
      → /portfolio/key-vision
      → image
  images/dimensions Image Dimensions (warning)
    ⚠ image-dimensions: 15 image(s) missing width/height (causes CLS)
      → /
    ⚠ image-dimensions: 16 image(s) missing width/height (causes CLS) (4 pages)
      → /portfolio?category=motion
      → /portfolio?category=branding
      → /portfolio
      → /portfolio?category=web
    ⚠ image-dimensions: 12 image(s) missing width/height (causes CLS) (3 pages)
      → /sobre
      → /contato
      → /portfolio/advertising-video
    ⚠ image-dimensions: 13 image(s) missing width/height (causes CLS)
      → /portfolio/key-vision
    ⚠ image-dimensions: 7 image(s) missing width/height (causes CLS)
      → /projects/brand-video
    ⚠ image-dimensions: 1 image(s) missing width/height (causes CLS)
      → /projects/key-vision

Performance (62 warnings)
  perf/lcp-hints LCP Optimization Hints (warning)
    ⚠ lcp-preload: 3 potential LCP image(s) without preload (9 pages)
      → /
      → /portfolio?category=motion
      → /portfolio?category=branding
      → /portfolio
      → /portfolio?category=web
      ... +4 more
      → /_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsite-assets%2Fhome%2Fshowcase%2FBranding-Project.webp&w=3840&q=75
      → /_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsite-assets%2Fhome%2Fshowcase%2FBranding-Project.webp&w=3840&q=75
      → /_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsite-assets%2Fclients%2Fclients.strip.1.svg&w=3840&q=75
      → /_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fportfolio-media%2Fprojects%2Fcreative-direction%2Fthumb.webp&w=3840&q=75
      → /_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fportfolio-media%2Fprojects%2Fkey-vision%2Fthumb.webp&w=3840&q=75
      ... +2 more
    ⚠ lcp-preload: 1 potential LCP image(s) without preload
      → /projects/key-vision
      → /_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsite-assets%2Flanding-pages%2Fkey-vision%2Fcover-b43b60b2-fca1-435f-a78d-ea18a4b18152.webp&w=3840&q=75
  perf/ttfb Time to First Byte (warning)
    ⚠ ttfb: Slow server response (767ms)
      → /portfolio?category=motion
    ⚠ ttfb: Slow server response (762ms)
      → /portfolio?category=branding
    ⚠ ttfb: Slow server response (722ms)
      → /portfolio
    ⚠ ttfb: Slow server response (756ms)
      → /portfolio?category=web
  perf/dom-size DOM Size (warning)
    ⚠ dom-max-children: Element with 61 children found (5 pages)
      → /
      → /portfolio?category=motion
      → /portfolio?category=branding
      → /portfolio
      → /portfolio?category=web
  perf/render-blocking Render-Blocking Resources (warning)
    ⚠ render-blocking: 4 render-blocking resources (5 pages)
      → /
      → /portfolio?category=motion
      → /portfolio?category=branding
      → /portfolio
      → /portfolio?category=web
      → /_next/static/chunks/c33ef01ab3bbb1fe.css
      → /_next/static/chunks/2ed6dada56686e92.css
      → /_next/static/chunks/321d3b6f76e652df.css
      → /_next/static/chunks/664adc71bc2617c2.js
      → /_next/static/chunks/aec754b76c4752d6.css
  perf/total-byte-weight Total Page Weight (warning)
    ⚠ total-byte-weight: Total tracked resources: 3274KB (heavy page)
  perf/critical-request-chains Critical Request Chains (warning)
    ⚠ critical-request-chains: 4 critical request chain(s) found (5 pages)
      → /
      → /portfolio?category=motion
      → /portfolio?category=branding
      → /portfolio
      → /portfolio?category=web
      → CSS: /_next/static/chunks/c33ef01ab3bbb1fe.css
      → CSS: /_next/static/chunks/2ed6dada56686e92.css
      → CSS: /_next/static/chunks/321d3b6f76e652df.css
      → JS: /_next/static/chunks/664adc71bc2617c2.js
      → CSS: /_next/static/chunks/aec754b76c4752d6.css
    ⚠ critical-request-chains: 3 critical request chain(s) found (7 pages)
      → /sobre
      → /privacidade
      → /contato
      → /portfolio/advertising-video
      → /portfolio/key-vision
      ... +2 more
      → CSS: /_next/static/chunks/c33ef01ab3bbb1fe.css
      → CSS: /_next/static/chunks/2ed6dada56686e92.css
      → JS: /_next/static/chunks/664adc71bc2617c2.js
  perf/lazy-above-fold Lazy Loading Above Fold (warning)
    ⚠ lazy-above-fold: 1 above-fold image(s) with lazy loading (5 pages)
      → /
      → /portfolio?category=motion
      → /portfolio?category=branding
      → /portfolio
      → /portfolio?category=web
      → /_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fportfolio-media%2Fprojects%2Fkey-vision%2Fthumb.webp&w=3840&q=75
      → /_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fportfolio-media%2Fprojects%2Fcampaign%2Fthumb.webp&w=3840&q=75
    ⚠ lazy-above-fold: 3 above-fold image(s) with lazy loading
      → /projects/brand-video
      → /_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsite-assets%2Flanding-pages%2Fbrand-video%2Fmaster-v3-logo-c873b8e9-d80d-45b6-856e-243c42a85019.png&w=3840&q=75
      → https://img.youtube.com/vi/foQoNRHiCkY/hqdefault.jpg
      → /_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsite-assets%2Flanding-pages%2Fbrand-video%2Fmaster-v3-block-image-image-3-media1.jpeg&w=3840&q=75
    ⚠ lazy-above-fold: 2 above-fold image(s) with lazy loading
      → /projects/key-vision
      → /_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsite-assets%2Flanding-pages%2Fkey-vision%2Fblock-e313c22f-7631-4514-8cb5-74eaf73f0022-media1.webp&w=3840&q=75
      → /_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fsite-assets%2Flanding-pages%2Fkey-vision%2Fblock-aca551e6-5eaf-456b-a8dc-0717e93495b7-media1.webp&w=3840&q=75
  perf/unminified-js Unminified JavaScript (warning)
    ⚠ unminified-js: 1 JavaScript file(s) appear unminified (12 pages)
      → /
      → /portfolio?category=motion
      → /portfolio?category=branding
      → /portfolio
      → /portfolio?category=web
      ... +7 more
      → 200.3KB, ~47.2KB savings
  perf/cache-headers Cache Headers (warning)
    ⚠ cache-control: Cache-Control without max-age (6 pages)
      → /
      → /sobre
      → /privacidade
      → /contato
      → /portfolio/advertising-video
      ... +1 more

Accessibility (21 errors, 11 warnings)
  a11y/duplicate-id-aria Duplicate ID ARIA (error)
    ✗ a11y/duplicate-id-aria-error: Rule error: CSS is not defined (10 pages)
      → /
      → /portfolio?category=motion
      → /portfolio?category=branding
      → /portfolio
      → /portfolio?category=web
      ... +5 more
  a11y/aria-hidden-focus ARIA Hidden Focus (error)
    ✗ aria-hidden-focus: 1 focusable element(s) inside aria-hidden (9 pages)
      → /
      → /portfolio?category=motion
      → /portfolio?category=branding
      → /portfolio
      → /portfolio?category=web
      ... +4 more
      → input (self is focusable)
  a11y/label-content-name-mismatch Label Content Name Mismatch (error)
    ✗ label-content-name-mismatch: 2 element(s) where visible text doesn't match accessible name
      → /
      → a: visible="motionmercado pago /" vs aria-label="view details for pro"
      → a: visible="campanhaswift / 2024" vs aria-label="view details for pro"
  a11y/color-contrast Color Contrast (warning)
    ⚠ color-contrast: 3 potential color contrast issue(s) (3 pages)
      → /
      → /portfolio/advertising-video
      → /portfolio/key-vision
      → div with class "absolute inset-0 z-0 animate-p..." may have low contrast
      → span with class "opacity-30..." may have low contrast
      → div with class "absolute inset-0 opacity-30 hi..." may have low contrast
      → span with class "text-xs font-bold tracking-wid..." may have low contrast
      → span with class "block text-xs font-bold tracki..." may have low contrast
      ... +1 more
    ⚠ color-contrast: 1 potential color contrast issue(s)
      → /sobre
      → div with class "text-[clamp(44px,4.5vw,64px)] ..." may have low contrast
  a11y/landmark-one-main One Main Landmark (warning)
    ✗ landmark-one-main: Page has 2 main landmarks (should be 1)
      → /projects/brand-video
      → main#main-content
      → main#main-content
  a11y/video-captions Video Captions (warning)
    ⚠ video-captions: 4 video(s) without caption tracks
      → /
      → https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v
      → https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v
      → https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v
      → https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v
    ⚠ video-captions: 6 video(s) without caption tracks (4 pages)
      → /portfolio?category=motion
      → /portfolio?category=branding
      → /portfolio
      → /portfolio?category=web
      → https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v
      → https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v
      → https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v
      → https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v
      → https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v
      ... +1 more
    ⚠ video-captions: 2 video(s) without caption tracks
      → /sobre
      → https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v
      → https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v
  a11y/landmark-regions Landmark Regions (info)
    ⚠ landmark-main: Multiple main landmarks (2)
      → /projects/brand-video

Video (13 warnings)
  video/video-schema Video Schema (warning)
    ⚠ video-schema: Video content without VideoObject schema (8 pages)
      → /
      → /portfolio?category=motion
      → /portfolio?category=branding
      → /portfolio
      → /portfolio?category=web
      ... +3 more
  video/video-accessible Video Accessibility (warning)
    ⚠ video-accessible: No videos have caption tracks (5 pages)
      → /
      → /portfolio?category=motion
      → /portfolio?category=branding
      → /portfolio
      → /portfolio?category=web

──────────────────────────────────────────────────
1205 passed • 152 warnings • 40 failed
──────────────────────────────────────────────────


