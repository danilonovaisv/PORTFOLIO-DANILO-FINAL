<?xml version="1.0" encoding="UTF-8"?>
<audit version="0.0.97">
<site url="https://portfoliodanilo.com" crawled="1" date="2026-11-02T20:13:42.454Z"/>
<score overall="56" grade="F">
 <group name="SEO" score="72" errors="0" warnings="12"/>
 <group name="Performance" score="77" errors="1" warnings="8"/>
 <group name="Security" score="98" errors="0" warnings="1"/>
 <group name="Agents" score="64" errors="0" warnings="4"/>
 <cat name="Performance" score="77"/>
 <cat name="Agent Experience" score="64"/>
 <cat name="E-E-A-T" score="62"/>
 <cat name="Content" score="88"/>
 <cat name="Accessibility" score="97"/>
 <cat name="Images" score="86"/>
 <cat name="Links" score="93"/>
 <cat name="Security" score="98"/>
 <cat name="Blocking" score="100"/>
 <cat name="Core SEO" score="100"/>
 <cat name="Crawlability" score="100"/>
 <cat name="Internationalization" score="100"/>
 <cat name="Legal Compliance" score="100"/>
 <cat name="Local SEO" score="100"/>
 <cat name="Mobile" score="100"/>
 <cat name="Structured Data" score="100"/>
 <cat name="Social Media" score="100"/>
 <cat name="URL Structure" score="100"/>
 <cat name="Video" score="100"/>
</score>
<summary passed="179" warnings="28" failed="1"/>
<issues>
 <rule id="schema/organization" severity="info" category="Structured Data" group="seo" status="warn" docs="https://docs.squirrelscan.com/rules/schema/organization">
  3 known social account(s) missing from schema sameAs
  Pages (1): /
  Items (3):
   - https://facebook.com/danilonovaisvilela (Facebook) (from: /)
   - https://instagram.com/danilo_novais (Instagram) (from: /)
   - https://twitter.com/danilo_novais (X (Twitter)) (from: /)
 </rule>
 <rule id="ax/agents-md" severity="info" category="Agent Experience" group="ai" status="warn" docs="https://docs.squirrelscan.com/rules/ax/agents-md">
  No AGENTS.md found — this site publishes llms.txt, so consider an AGENTS.md for coding agents too
 </rule>
 <rule id="ax/markdown-response" severity="info" category="Agent Experience" group="ai" status="warn" docs="https://docs.squirrelscan.com/rules/ax/markdown-response">
  No Markdown response — consider honoring Accept: text/markdown or publishing a .md variant so agents get clean content
 </rule>
 <rule id="security/csp" severity="warning" category="Security" group="security" status="warn" docs="https://docs.squirrelscan.com/rules/security/csp">
  CSP allows &apos;unsafe-inline&apos;
 </rule>
 <rule id="links/broken-external-links" severity="warning" category="Links" group="seo" status="warn" docs="https://docs.squirrelscan.com/rules/links/broken-external-links">
  1 broken external link(s): 1 with 999
  Items (1):
   - https://www.linkedin.com/in/danilonovaisv (https://www.linkedin.com/in/danilonovaisv (999)) [status: 999]
 </rule>
 <rule id="content/keyword-stuffing" severity="warning" category="Content" group="seo" status="warn" docs="https://docs.squirrelscan.com/rules/content/keyword-stuffing">
  1 word(s) may be overused
  Pages (1): /
  Items (1):
   - voc (&quot;voc&quot; (5.9%)) [count: 8, density: 5.88235294117647] (from: /)
 </rule>
 <rule id="content/word-count" severity="warning" category="Content" group="seo" status="warn" docs="https://docs.squirrelscan.com/rules/content/word-count">
  Thin content: 160 words (min 300)
  Pages (1): /
  Items (1):
   - / (Thin content: 160 words (min 300))
 </rule>
 <rule id="content/stale-copyright" severity="warning" category="Content" group="seo" status="warn" docs="https://docs.squirrelscan.com/rules/content/stale-copyright">
  Footer copyright year is 2025, behind the current year 2026
  Pages (1): /
 </rule>
 <rule id="images/image-file-size" severity="warning" category="Images" group="seo" status="warn" docs="https://docs.squirrelscan.com/rules/images/image-file-size">
  1 image(s) exceed 200.0 KB
  Pages (1): /
  Items (1):
   - /_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fportfolio-media%2Fhellmann-s%2Fhellmanns-parcerias%2Fassets-do-projeto%2Fcover-16x9%2Fthumb-hellmas-16-9.4779abad5cf6a704.webp&amp;w=3840&amp;q=60 [sizeBytes: 711142, size: 694.5 KB, status: 200, contentType: image/webp] (from: /)
 </rule>
 <rule id="images/dimensions" severity="warning" category="Images" group="seo" status="warn" docs="https://docs.squirrelscan.com/rules/images/dimensions">
  4 image(s) missing width/height (causes CLS)
  Pages (1): /
  Items (4):
   - /_next/image?url=%2Fsite.assets%2Fhome%2Fshowcase%2FBranding-Project.webp&amp;w=3840&amp;q=75 | &lt;img src=&quot;https://portfoliodanilo.com/_next/image?url=%2Fsite.assets%2Fhome%2Fshowcase%2FBranding-Project.webp&amp;w=3840&amp;q=75&quot; alt=&quot;Brand &amp; Campaigns&quot;&gt; (from: /)
   - /_next/image?url=%2Fsite.assets%2Fhome%2Fshowcase%2FKey-Visual.webp&amp;w=3840&amp;q=75 | &lt;img src=&quot;https://portfoliodanilo.com/_next/image?url=%2Fsite.assets%2Fhome%2Fshowcase%2FKey-Visual.webp&amp;w=3840&amp;q=75&quot; alt=&quot;Websites &amp; Tech&quot;&gt; (from: /)
   - /_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fportfolio-media%2Fcartoon-network%2Fpacking%2Fassets-do-projeto%2Fcover-16x9%2Fthumb-16-9.4e7b48e091c2bfec.webp&amp;w=3840&amp;q=60 | &lt;img src=&quot;https://portfoliodanilo.com/_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fportfolio-media%2Fcartoon-network%2Fpacking%2Fassets-do-projeto%2Fcover-16x9%2Fthumb-16-9.4e7b48e091c2bfec.webp&amp;w=3840&amp;q=60&quot; alt=&quot;TOPZ × Cartoon Network para TOPZ&quot;&gt; (from: /)
   - /_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fportfolio-media%2Fhellmann-s%2Fhellmanns-parcerias%2Fassets-do-projeto%2Fcover-16x9%2Fthumb-hellmas-16-9.4779abad5cf6a704.webp&amp;w=3840&amp;q=60 | &lt;img src=&quot;https://portfoliodanilo.com/_next/image?url=https%3A%2F%2Fumkmwbkwvulxtdodzmzf.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fportfolio-media%2Fhellmann-s%2Fhellmanns-parcerias%2Fassets-do-projeto%2Fcover-16x9%2Fthumb-hellmas-16-9.4779abad5cf6a704.webp&amp;w=3840&amp;q=60&quot; alt=&quot;Hellmann’s — Parcerias que criam valor para Hellmann’s&quot;&gt; (from: /)
 </rule>
 <rule id="perf/js-file-size" severity="warning" category="Performance" group="performance" status="warn" docs="https://docs.squirrelscan.com/rules/perf/js-file-size">
  1 JS file(s) exceed 250.0 KB
  Pages (1): /
  Items (1):
   - /_next/static/chunks/c23c07e0-a1dd651bee053dca.js [sizeBytes: 385860, size: 376.8 KB, status: 200, contentType: text/javascript] (from: /)
 </rule>
 <rule id="perf/lcp-hints" severity="warning" category="Performance" group="performance" status="warn" docs="https://docs.squirrelscan.com/rules/perf/lcp-hints">
  3 likely-LCP images loaded without preload
  Pages (1): /
  Items (1):
   - / (3 likely-LCP images loaded without preload)
 </rule>
 <rule id="perf/ttfb" severity="warning" category="Performance" group="performance" status="warn" docs="https://docs.squirrelscan.com/rules/perf/ttfb">
  Slow server response (802ms)
  Pages (1): /
 </rule>
 <rule id="perf/css-file-size" severity="warning" category="Performance" group="performance" status="warn" docs="https://docs.squirrelscan.com/rules/perf/css-file-size">
  1 CSS file(s) exceed 150.0 KB
  Pages (1): /
  Items (1):
   - /_next/static/css/71533fc67cf7ed73.css [sizeBytes: 224647, size: 219.4 KB, status: 200, contentType: text/css] (from: /)
 </rule>
 <rule id="perf/dom-size" severity="warning" category="Performance" group="performance" status="warn" docs="https://docs.squirrelscan.com/rules/perf/dom-size">
  Element with 83 children found
  Pages (1): /
  Items (1):
   - / (Element with 83 children found)
 </rule>
 <rule id="perf/total-byte-weight" severity="warning" category="Performance" group="performance" status="warn" docs="https://docs.squirrelscan.com/rules/perf/total-byte-weight">
  Total tracked resources: 2502KB (heavy page)
 </rule>
 <rule id="perf/bad-caching" severity="warning" category="Performance" group="performance" status="fail" docs="https://docs.squirrelscan.com/rules/perf/bad-caching">
  1/1 pages lack an ETag or Last-Modified validator
  Pages (1): /
 </rule>
 <rule id="perf/critical-request-chains" severity="warning" category="Performance" group="performance" status="warn" docs="https://docs.squirrelscan.com/rules/perf/critical-request-chains">
  2 critical request chain(s) found
  Pages (1): /
  Items (2):
   - CSS: /_next/static/css/71533fc67cf7ed73.css (from: /)
   - JS: /_next/static/chunks/polyfills-42372ed130431b0a.js (from: /)
 </rule>
 <rule id="perf/lazy-above-fold" severity="warning" category="Performance" group="performance" status="warn" docs="https://docs.squirrelscan.com/rules/perf/lazy-above-fold">
  1 above-fold image(s) with lazy loading
  Pages (1): /
  Items (1):
   - /_next/image?url=%2Fsite.assets%2Fhome%2Fshowcase%2FKey-Visual.webp&amp;w=3840&amp;q=75 (from: /)
 </rule>
 <rule id="a11y/color-contrast" severity="warning" category="Accessibility" group="seo" status="warn" docs="https://docs.squirrelscan.com/rules/a11y/color-contrast">
  1 potential color contrast issue(s)
  Pages (1): /
  Items (1):
   - div with class &quot;absolute inset-0 z-[var(--z-la...&quot; may have low contrast (from: /)
 </rule>
 <rule id="a11y/video-captions" severity="warning" category="Accessibility" group="seo" status="warn" docs="https://docs.squirrelscan.com/rules/a11y/video-captions">
  2 video(s) without caption tracks
  Pages (1): /
  Items (1):
   - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v (from: /)
 </rule>
 <rule id="a11y/input-types" severity="warning" category="Accessibility" group="seo" status="warn" docs="https://docs.squirrelscan.com/rules/a11y/input-types">
  1 multi-field form(s) set no enterkeyhint
  Pages (1): /
  Items (1):
   - form[action=&quot;/api/contact&quot;] (4-field form, no field sets enterkeyhint) | &lt;form class=&quot;space-y-8&quot; action=&quot;/api/contact&quot; method=&quot;POST&quot;&gt; [reason: missing-enterkeyhint, fields: 4] (from: /)
 </rule>
 <rule id="eeat/about-page" severity="warning" category="E-E-A-T" group="seo" status="warn" docs="https://docs.squirrelscan.com/rules/eeat/about-page">
  No About page found
 </rule>
 <rule id="eeat/contact-page" severity="warning" category="E-E-A-T" group="seo" status="warn" docs="https://docs.squirrelscan.com/rules/eeat/contact-page">
  No Contact page found
 </rule>
 <rule id="eeat/privacy-policy" severity="warning" category="E-E-A-T" group="seo" status="warn" docs="https://docs.squirrelscan.com/rules/eeat/privacy-policy">
  No Privacy Policy page found
 </rule>
 <rule id="ai/page-type-match" severity="warning" category="Agent Experience" group="ai" status="warn" docs="https://docs.squirrelscan.com/rules/ai/page-type-match">
  Page reads as &quot;homepage&quot; but declares CollectionPage structured data
  Pages (1): /
 </rule>
 <rule id="ax/agent-blocking" severity="warning" category="Agent Experience" group="ai" status="warn" docs="https://docs.squirrelscan.com/rules/ax/agent-blocking">
  GPTBot is blocked (HTTP 403) while the browser gets 200 — often an intentional training opt-out, but confirm it was deliberate
 </rule>
 <rule id="ax/token-weight" severity="warning" category="Agent Experience" group="ai" status="warn" docs="https://docs.squirrelscan.com/rules/ax/token-weight">
  Visible text is under 15% of the page HTML — agents pay token cost mostly for markup, scripts, and styles
  Pages (1): /
  Items (1):
   - / (~1% of HTML is visible text (~47,545 est. tokens)) (from: /)
 </rule>
 <rule id="ax/ai-crawlers" severity="warning" category="Agent Experience" group="ai" status="warn" docs="https://docs.squirrelscan.com/rules/ax/ai-crawlers">
  robots.txt blocks archive crawlers — this removes the site from the Wayback Machine and/or the Common Crawl corpus, the archives AI training sets are built from. Blocking CCBot opts you out of every model trained on Common Crawl, not just one vendor.
  Items (1):
   - CCBot (CCBot (Common Crawl, open crawl corpus) — blocked)
 </rule>
</issues>
</audit>


