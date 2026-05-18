<?xml version="1.0" encoding="UTF-8"?>
<audit version="0.0.38">
<site url="http://localhost:3001" crawled="9" date="2026-05-18T08:04:00.012Z"/>
<score overall="59" grade="F">
 <cat name="Structured Data" score="19"/>
 <cat name="Security" score="78"/>
 <cat name="Performance" score="67"/>
 <cat name="Crawlability" score="82"/>
 <cat name="Content" score="88"/>
 <cat name="Accessibility" score="98"/>
 <cat name="Images" score="95"/>
 <cat name="Video" score="84"/>
 <cat name="Links" score="94"/>
 <cat name="Core SEO" score="100"/>
 <cat name="E-E-A-T" score="100"/>
 <cat name="Internationalization" score="100"/>
 <cat name="Legal Compliance" score="100"/>
 <cat name="Local SEO" score="100"/>
 <cat name="Mobile" score="100"/>
 <cat name="Social Media" score="100"/>
 <cat name="URL Structure" score="100"/>
</score>
<summary passed="797" warnings="120" failed="19"/>
<issues>
 <category name="Crawlability" errors="1" warnings="3">
  <rule id="crawl/sitemap-domain" severity="error" status="fail" docs="https://docs.squirrelscan.com/rules/crawl/sitemap-domain">
   39 URL(s) point to different domain(s)
   Items (5/39):
    - https://portfoliodanilo.com [host: portfoliodanilo.com]
    - https://portfoliodanilo.com/portfolio [host: portfoliodanilo.com]
    - https://portfoliodanilo.com/portfolio?category=motion [host: portfoliodanilo.com]
    - https://portfoliodanilo.com/portfolio?category=branding [host: portfoliodanilo.com]
    - https://portfoliodanilo.com/portfolio?category=creative [host: portfoliodanilo.com]
  </rule>
  <rule id="crawl/sitemap-4xx" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/crawl/sitemap-4xx">
   17 sitemap URL(s) return 4XX
   Items (5/17):
    - https://portfoliodanilo.com/projects/brand-video [status: 404]
    - https://portfoliodanilo.com/projects/key-vision [status: 404]
    - https://portfoliodanilo.com/portfolio/video-manifesto [status: 404]
    - https://portfoliodanilo.com/portfolio/swift-week [status: 404]
    - https://portfoliodanilo.com/portfolio/key-visual [status: 404]
  </rule>
  <rule id="crawl/sitemap-coverage" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/crawl/sitemap-coverage">
   8 indexable page(s) not in sitemap (100%); 26 sitemap URL(s) were not crawled
   Items (5/34):
    - /sobre
    - /
    - /contato
    - /portfolio
    - /privacidade
  </rule>
 </category>
 <category name="Security" errors="8" warnings="1">
  <rule id="security/https" severity="error" status="fail" docs="https://docs.squirrelscan.com/rules/security/https">
   Page not served over HTTPS
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
  </rule>
  <rule id="security/csp" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/security/csp">
   CSP allows &apos;unsafe-inline&apos; and &apos;unsafe-eval&apos;
  </rule>
 </category>
 <category name="Links" errors="0" warnings="1">
  <rule id="links/broken-external-links" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/links/broken-external-links">
   1 broken external link(s): 1 with 999
   Items (1):
    - https://www.linkedin.com/in/danilonovaisv (https://www.linkedin.com/in/danilonovaisv (999)) [status: 999] (from: /sobre, /sobre, /sobre, /, /; +17 more)
  </rule>
 </category>
 <category name="Content" errors="0" warnings="11">
  <rule id="content/keyword-stuffing" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/content/keyword-stuffing">
   N word(s) may be overused
   Pages (5): /, /portfolio, /portfolio?category=branding, /portfolio?category=motion, /sobre
   Items (5/9):
    - que (&quot;que&quot; (7.0%)) [count: 46, density: 7.044410413476264]
    - voc (&quot;voc&quot; (5.9%)) [count: 8, density: 5.9259259259259265]
    - deo (&quot;deo&quot; (5.5%)) [count: 18, density: 5.538461538461538]
    - tags (&quot;tags&quot; (4.6%)) [count: 15, density: 4.615384615384616]
    - brand (&quot;brand&quot; (3.7%)) [count: 12, density: 3.6923076923076925]
  </rule>
  <rule id="content/word-count" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/content/word-count">
   Thin content: N words (min N)
   Pages (5/6): /, /contato, /portfolio?category=branding, /portfolio?category=motion, /portfolio?category=web
   Items (5/6):
    - / (Thin content: 159 words (min 300))
    - /contato (Thin content: 56 words (min 300))
    - /privacidade (Thin content: 128 words (min 300))
    - /portfolio?category=motion (Thin content: 153 words (min 300))
    - /portfolio?category=branding (Thin content: 256 words (min 300))
  </rule>
 </category>
 <category name="Structured Data" errors="8" warnings="6">
  <rule id="schema/json-ld-valid" severity="warning" status="fail" docs="https://docs.squirrelscan.com/rules/schema/json-ld-valid">
   Invalid JSON-LD syntax
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (2):
    - parse-0 (Validation: Organization.logo must be a string or array of strings)
    - Organization:logo (Organization missing logo) [message: Validation: Organization.logo must be a string or array of strings, severity: invalid, path: [&quot;logo&quot;]]
  </rule>
  <rule id="schema/video" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/schema/video">
   Page has video but no VideoObject schema
   Pages (5/6): /, /portfolio, /portfolio?category=branding, /portfolio?category=motion, /portfolio?category=web
  </rule>
 </category>
 <category name="Images" errors="0" warnings="7">
  <rule id="images/offscreen-lazy" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/images/offscreen-lazy">
   3 below-fold image(s) without lazy loading
   Pages (1): /sobre
   Items (3):
    - about.origin_image.1.webp
    - about.origin_image.2.webp
    - about.origin_image.3.webp
  </rule>
  <rule id="images/dimensions" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/images/dimensions">
   N image(s) missing width/height (causes CLS)
   Pages (5/6): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (5/38):
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/site-assets/about/origin/about.origin_image.1.webp?width=3840&amp;quality=60&amp;format=webp | &lt;img src=&quot;https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/site-assets/about/origin/about.origin_image.1.webp?width=3840&amp;quality=60&amp;format=webp&quot; alt=&quot;O QUE PERMANECE&quot;&gt;
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/site-assets/about/origin/about.origin_image.2.webp?width=3840&amp;quality=60&amp;format=webp | &lt;img src=&quot;https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/site-assets/about/origin/about.origin_image.2.webp?width=3840&amp;quality=60&amp;format=webp&quot; alt=&quot;DO TRAÇO À INTENÇÃO&quot;&gt;
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/site-assets/about/origin/about.origin_image.3.webp?width=3840&amp;quality=60&amp;format=webp | &lt;img src=&quot;https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/site-assets/about/origin/about.origin_image.3.webp?width=3840&amp;quality=60&amp;format=webp&quot; alt=&quot;A DESCOBERTA DO INVISÍVEL&quot;&gt;
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/site-assets/about/origin/about.origin_image.4.webp?width=3840&amp;quality=60&amp;format=webp | &lt;img src=&quot;https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/site-assets/about/origin/about.origin_image.4.webp?width=3840&amp;quality=60&amp;format=webp&quot; alt=&quot;EXPANSÃO COM PROPÓSITO&quot;&gt;
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/site-assets/about/origin/about.origin_image.1.webp?width=3840&amp;quality=60&amp;format=webp | &lt;img src=&quot;https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/site-assets/about/origin/about.origin_image.1.webp?width=3840&amp;quality=60&amp;format=webp&quot; alt=&quot;O QUE PERMANECE&quot;&gt;
  </rule>
 </category>
 <category name="Performance" errors="2" warnings="77">
  <rule id="perf/js-file-size" severity="error" status="fail" docs="https://docs.squirrelscan.com/rules/perf/js-file-size">
   1 JS file(s) exceed 1.0 MB; 3 JS file(s) exceed 250.0 KB
   Items (4):
    - /_next/static/chunks/0vrh_next_dist_compiled_react-dom_0u_x9-9._.js [sizeBytes: 1061381, size: 1.0 MB, status: 200, contentType: application/javascript; charset=UTF-8] (from: /sobre, /, /contato, /portfolio, /privacidade; +3 more)
    - /_next/static/chunks/0vrh_next_dist_compiled_next-devtools_index_0mn3.ah.js [sizeBytes: 746721, size: 729.2 KB, status: 200, contentType: application/javascript; charset=UTF-8] (from: /sobre, /, /contato, /portfolio, /privacidade; +3 more)
    - /_next/static/chunks/0vrh_next_dist_client_0aumzq7._.js [sizeBytes: 826625, size: 807.3 KB, status: 200, contentType: application/javascript; charset=UTF-8] (from: /sobre, /, /contato, /portfolio, /privacidade; +3 more)
    - /_next/static/chunks/0vrh_next_dist_0mhvqyt._.js [sizeBytes: 276640, size: 270.2 KB, status: 200, contentType: application/javascript; charset=UTF-8] (from: /sobre, /, /contato, /portfolio, /privacidade; +3 more)
  </rule>
  <rule id="perf/lcp-hints" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/lcp-hints">
   N potential LCP image(s) without preload
   Pages (5): /, /portfolio, /portfolio?category=branding, /portfolio?category=motion, /sobre
   Items (5/11):
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/site-assets/about/origin/about.origin_image.1.webp?width=3840&amp;quality=60&amp;format=webp
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/site-assets/about/origin/about.origin_image.2.webp?width=3840&amp;quality=60&amp;format=webp
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/site-assets/about/origin/about.origin_image.3.webp?width=3840&amp;quality=60&amp;format=webp
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/portfolio-media/hellmann-s/hellmanns-parcerias/assets-do-projeto/cover-16x9/thumb-hellmas-16-9.4779abad5cf6a704.webp?width=3840&amp;quality=60&amp;format=webp
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/portfolio-media/hellmann-s/hellmanns-parcerias/assets-do-projeto/cover-1x1/thumb-hellmas-1-1.6341b09275286630.webp?width=3840&amp;quality=60&amp;format=webp
  </rule>
  <rule id="perf/ttfb" severity="warning" status="fail" docs="https://docs.squirrelscan.com/rules/perf/ttfb">
   Slow server response (Nms); Very slow server response (1353ms)
   Pages (3): /contato, /portfolio, /privacidade
   Items (3):
    - /contato (Slow server response (745ms))
    - /privacidade (Slow server response (609ms))
    - /portfolio (Very slow server response (1353ms))
  </rule>
  <rule id="perf/css-file-size" severity="error" status="warn" docs="https://docs.squirrelscan.com/rules/perf/css-file-size">
   1 CSS file(s) exceed 150.0 KB
   Items (1):
    - /_next/static/chunks/src_app_globals_0p2ml0n.css [sizeBytes: 290480, size: 283.7 KB, status: 200, contentType: text/css; charset=UTF-8] (from: /sobre, /, /contato, /portfolio, /privacidade; +3 more)
  </rule>
  <rule id="perf/dom-size" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/dom-size">
   Element with N children found
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (5/8):
    - /sobre (Element with 89 children found)
    - / (Element with 95 children found)
    - /contato (Element with 81 children found)
    - /portfolio (Element with 92 children found)
    - /privacidade (Element with 79 children found)
  </rule>
  <rule id="perf/total-byte-weight" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/total-byte-weight">
   Total tracked resources: 3851KB (heavy page)
  </rule>
  <rule id="perf/critical-request-chains" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/critical-request-chains">
   2 critical request chain(s) found
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (2):
    - CSS: /_next/static/chunks/src_app_globals_0p2ml0n.css
    - JS: /_next/static/chunks/0vrh_next_dist_build_polyfills_polyfill-nomodule.js
  </rule>
  <rule id="perf/duplicate-js" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/duplicate-js">
   N library(s) loaded multiple times
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (5/6):
    - src (15x)
    - node (2x)
    - src (14x)
    - src (13x)
    - src (16x)
  </rule>
  <rule id="perf/lazy-above-fold" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/lazy-above-fold">
   N above-fold image(s) with lazy loading
   Pages (3): /, /contato, /portfolio?category=branding
   Items (5/6):
    - /_next/image?url=%2Fsite.assets%2Fhome%2Fshowcase%2FBranding-Project.webp&amp;w=3840&amp;q=75
    - /_next/image?url=%2Fsite.assets%2Fhome%2Fshowcase%2FKey-Visual.webp&amp;w=3840&amp;q=75
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/clients/clients.strip.1.svg
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/clients/clients.strip.2.svg
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/clients/clients.strip.3.svg
  </rule>
  <rule id="perf/unminified-js" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/unminified-js">
   9 JavaScript file(s) appear unminified
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (5):
    - 0vrh_next_dist_compiled_next-devtools_index_0mn3.ah.js (729.2KB, ~532.7KB savings) [reason: high newlines (0.52%), 98 comments]
    - 0vrh_next_dist_compiled_react-dom_0u_x9-9._.js (1036.5KB, ~263.3KB savings) [reason: high newlines (1.58%), 81 comments, long function names, formatted code, excessive whitespace]
    - 0vrh_next_dist_compiled_react-server-dom-turbopack_0gkec.k._.js (172.2KB, ~54.0KB savings) [reason: high newlines (1.64%), 17 comments, long function names, formatted code, excessive whitespace]
    - 0vrh_next_dist_compiled_0~ghb2~._.js (147.6KB, ~60.2KB savings) [reason: high newlines (1.93%), 169 comments, long function names, formatted code, excessive whitespace]
    - 0vrh_next_dist_client_0aumzq7._.js (807.3KB, ~331.7KB savings) [reason: high newlines (1.84%), 3224 comments, long function names, formatted code, excessive whitespace]
  </rule>
  <rule id="perf/cache-headers" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/cache-headers">
   no-cache without ETag or Last-Modified
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
  </rule>
  <rule id="perf/http2" severity="info" status="warn" docs="https://docs.squirrelscan.com/rules/perf/http2">
   HTTP/2 requires HTTPS
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (5/8):
    - /sobre (HTTP/2 requires HTTPS)
    - / (HTTP/2 requires HTTPS)
    - /contato (HTTP/2 requires HTTPS)
    - /portfolio (HTTP/2 requires HTTPS)
    - /privacidade (HTTP/2 requires HTTPS)
  </rule>
  <rule id="perf/source-maps" severity="info" status="warn" docs="https://docs.squirrelscan.com/rules/perf/source-maps">
   11 potential source map(s) detected; 1 inline source map(s) found
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (5/11):
    - /_next/static/chunks/index.js.map (from /_next/static/chunks/0vrh_next_dist_compiled_next-devtools_index_0mn3.ah.js)
    - /_next/static/chunks/0vrh_next_dist_compiled_next-devtools_index_0mn3.ah.js.map (from /_next/static/chunks/0vrh_next_dist_compiled_next-devtools_index_0mn3.ah.js)
    - /_next/static/chunks/0vrh_next_dist_compiled_react-dom_0u_x9-9._.js.map (from /_next/static/chunks/0vrh_next_dist_compiled_react-dom_0u_x9-9._.js)
    - /_next/static/chunks/%22 (from /_next/static/chunks/0vrh_next_dist_compiled_react-server-dom-turbopack_0gkec.k._.js)
    - /_next/static/chunks/0vrh_next_dist_compiled_react-server-dom-turbopack_0gkec.k._.js.map (from /_next/static/chunks/0vrh_next_dist_compiled_react-server-dom-turbopack_0gkec.k._.js)
  </rule>
 </category>
 <category name="Accessibility" errors="0" warnings="10">
  <rule id="a11y/color-contrast" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/a11y/color-contrast">
   1 potential color contrast issue(s)
   Pages (5): /, /portfolio, /portfolio?category=branding, /portfolio?category=motion, /portfolio?category=web
   Items (2):
    - div with class &quot;absolute inset-0 z-[var(--z-la...&quot; may have low contrast
    - div with class &quot;absolute inset-0 bg-[radial-gr...&quot; may have low contrast
  </rule>
  <rule id="a11y/video-captions" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/a11y/video-captions">
   N video(s) without caption tracks
   Pages (5): /portfolio, /portfolio?category=branding, /portfolio?category=motion, /portfolio?category=web, /sobre
   Items (3):
    - /site.assets/about/hero/about.hero.mobile.compress
    - /site.assets/portfolio/portfolio.hero_mobile_video
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v
  </rule>
 </category>
 <category name="Video" errors="0" warnings="4">
  <rule id="video/video-accessible" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/video/video-accessible">
   No videos have caption tracks
   Pages (4): /portfolio, /portfolio?category=branding, /portfolio?category=motion, /portfolio?category=web
  </rule>
 </category>
</issues>
</audit>
