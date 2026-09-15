<?xml version="1.0" encoding="UTF-8"?>
<audit version="0.0.38">
<site url="http://localhost:3000" crawled="9" date="2026-06-03T03:40:21.191Z"/>
<score overall="60" grade="D">
 <cat name="Structured Data" score="19"/>
 <cat name="Security" score="78"/>
 <cat name="Performance" score="68"/>
 <cat name="Crawlability" score="86"/>
 <cat name="Content" score="88"/>
 <cat name="Accessibility" score="98"/>
 <cat name="Video" score="80"/>
 <cat name="Images" score="97"/>
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
<summary passed="803" warnings="116" failed="18"/>
<issues>
 <category name="Crawlability" errors="1" warnings="2">
  <rule id="crawl/sitemap-domain" severity="error" status="fail" docs="https://docs.squirrelscan.com/rules/crawl/sitemap-domain">
   48 URL(s) point to different domain(s)
   Items (5/48):
    - https://portfoliodanilo.com [host: portfoliodanilo.com]
    - https://portfoliodanilo.com/portfolio [host: portfoliodanilo.com]
    - https://portfoliodanilo.com/portfolio?category=motion [host: portfoliodanilo.com]
    - https://portfoliodanilo.com/portfolio?category=branding [host: portfoliodanilo.com]
    - https://portfoliodanilo.com/portfolio?category=creative [host: portfoliodanilo.com]
  </rule>
  <rule id="crawl/sitemap-coverage" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/crawl/sitemap-coverage">
   8 indexable page(s) not in sitemap (100%); 20 sitemap URL(s) were not crawled
   Items (5/28):
    - /
    - /portfolio?category=motion
    - /portfolio?category=branding
    - /portfolio?category=web
    - /portfolio
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
    - https://www.linkedin.com/in/danilonovaisv (https://www.linkedin.com/in/danilonovaisv (999)) [status: 999] (from: /, /, /, /portfolio?category=motion, /portfolio?category=motion; +17 more)
  </rule>
 </category>
 <category name="Content" errors="0" warnings="11">
  <rule id="content/keyword-stuffing" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/content/keyword-stuffing">
   N word(s) may be overused
   Pages (5): /, /portfolio, /portfolio?category=branding, /portfolio?category=motion, /sobre
   Items (5/9):
    - voc (&quot;voc&quot; (5.8%)) [count: 8, density: 5.797101449275362]
    - deo (&quot;deo&quot; (6.8%)) [count: 9, density: 6.8181818181818175]
    - tags (&quot;tags&quot; (4.1%)) [count: 9, density: 4.072398190045249]
    - visual (&quot;visual&quot; (4.1%)) [count: 9, density: 4.072398190045249]
    - brand (&quot;brand&quot; (4.1%)) [count: 9, density: 4.072398190045249]
  </rule>
  <rule id="content/word-count" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/content/word-count">
   Thin content: N words (min N)
   Pages (5/6): /, /contato, /portfolio?category=branding, /portfolio?category=motion, /portfolio?category=web
   Items (5/6):
    - / (Thin content: 161 words (min 300))
    - /portfolio?category=motion (Thin content: 153 words (min 300))
    - /portfolio?category=branding (Thin content: 256 words (min 300))
    - /portfolio?category=web (Thin content: 85 words (min 300))
    - /contato (Thin content: 56 words (min 300))
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
 <category name="Images" errors="0" warnings="4">
  <rule id="images/dimensions" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/images/dimensions">
   N image(s) missing width/height (causes CLS)
   Pages (4): /, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (5/19):
    - /_next/image?url=%2Fsite.assets%2Fhome%2Fshowcase%2FBranding-Project.webp&amp;w=3840&amp;q=75 | &lt;img src=&quot;http://localhost:3000/_next/image?url=%2Fsite.assets%2Fhome%2Fshowcase%2FBranding-Project.webp&amp;w=3840&amp;q=75&quot; alt=&quot;Brand &amp; Campaigns&quot;&gt;
    - /_next/image?url=%2Fsite.assets%2Fhome%2Fshowcase%2FKey-Visual.webp&amp;w=3840&amp;q=75 | &lt;img src=&quot;http://localhost:3000/_next/image?url=%2Fsite.assets%2Fhome%2Fshowcase%2FKey-Visual.webp&amp;w=3840&amp;q=75&quot; alt=&quot;Websites &amp; Tech&quot;&gt;
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/portfolio-media/hellmann-s/hellmanns-parcerias/assets-do-projeto/cover-16x9/thumb-hellmas-16-9.4779abad5cf6a704.webp?width=3840&amp;quality=60&amp;format=webp | &lt;img src=&quot;https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/portfolio-media/hellmann-s/hellmanns-parcerias/assets-do-projeto/cover-16x9/thumb-hellmas-16-9.4779abad5cf6a704.webp?width=3840&amp;quality=60&amp;format=webp&quot; alt=&quot;Hellmann’s — Parcerias que criam valor para Hellmann’s&quot;&gt;
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/portfolio-media/hellmann-s/hellmanns-parcerias/assets-do-projeto/cover-1x1/thumb-hellmas-1-1.6341b09275286630.webp?width=3840&amp;quality=60&amp;format=webp | &lt;img src=&quot;https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/portfolio-media/hellmann-s/hellmanns-parcerias/assets-do-projeto/cover-1x1/thumb-hellmas-1-1.6341b09275286630.webp?width=3840&amp;quality=60&amp;format=webp&quot; alt=&quot;Hellmann’s — Parcerias que criam valor para Hellmann’s&quot;&gt;
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/portfolio-media/mercado-livre/ai-video-mp/assets-do-projeto/home-featured-logo/mp-logo.b35db998902eb999.png?width=800&amp;quality=85&amp;format=webp | &lt;img src=&quot;https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/portfolio-media/mercado-livre/ai-video-mp/assets-do-projeto/home-featured-logo/mp-logo.b35db998902eb999.png?width=800&amp;quality=85&amp;format=webp&quot; alt=&quot;Logo de Mercado Pago&quot;&gt;
  </rule>
 </category>
 <category name="Performance" errors="1" warnings="76">
  <rule id="perf/js-file-size" severity="error" status="fail" docs="https://docs.squirrelscan.com/rules/perf/js-file-size">
   1 JS file(s) exceed 1.0 MB; 3 JS file(s) exceed 250.0 KB
   Items (4):
    - /_next/static/chunks/0kpu_next_dist_compiled_react-dom_0o7ti-u._.js [sizeBytes: 1061927, size: 1.0 MB, status: 200, contentType: application/javascript; charset=UTF-8] (from: /, /portfolio?category=motion, /portfolio?category=branding, /portfolio?category=web, /portfolio; +3 more)
    - /_next/static/chunks/0kpu_next_dist_compiled_next-devtools_index_0mlvbpu.js [sizeBytes: 746744, size: 729.2 KB, status: 200, contentType: application/javascript; charset=UTF-8] (from: /, /portfolio?category=motion, /portfolio?category=branding, /portfolio?category=web, /portfolio; +3 more)
    - /_next/static/chunks/0kpu_next_dist_client_066hi91._.js [sizeBytes: 844341, size: 824.6 KB, status: 200, contentType: application/javascript; charset=UTF-8] (from: /, /portfolio?category=motion, /portfolio?category=branding, /portfolio?category=web, /portfolio; +3 more)
    - /_next/static/chunks/0kpu_next_dist_1ywhfwk._.js [sizeBytes: 281471, size: 274.9 KB, status: 200, contentType: application/javascript; charset=UTF-8] (from: /, /portfolio?category=motion, /portfolio?category=branding, /portfolio?category=web, /portfolio; +3 more)
  </rule>
  <rule id="perf/lcp-hints" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/lcp-hints">
   3 potential LCP image(s) without preload
   Pages (4): /, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (5/9):
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/portfolio-media/hellmann-s/hellmanns-parcerias/assets-do-projeto/cover-16x9/thumb-hellmas-16-9.4779abad5cf6a704.webp?width=3840&amp;quality=60&amp;format=webp
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/portfolio-media/hellmann-s/hellmanns-parcerias/assets-do-projeto/cover-1x1/thumb-hellmas-1-1.6341b09275286630.webp?width=3840&amp;quality=60&amp;format=webp
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/portfolio-media/mercado-livre/ai-video-mp/assets-do-projeto/home-featured-logo/mp-logo.b35db998902eb999.png?width=800&amp;quality=85&amp;format=webp
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/portfolio-media/down-qu-mica/video-manifesto/assets-do-projeto/cover-16x9/thumb-glad.ead956218f26b9c0.webp?width=3840&amp;quality=60&amp;format=webp
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/portfolio-media/down-qu-mica/video-manifesto/assets-do-projeto/cover-1x1/thumb-glad.ead956218f26b9c0.webp?width=3840&amp;quality=60&amp;format=webp
  </rule>
  <rule id="perf/ttfb" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/ttfb">
   Slow server response (Nms)
   Pages (2): /, /portfolio?category=branding
   Items (2):
    - / (Slow server response (625ms))
    - /portfolio?category=branding (Slow server response (666ms))
  </rule>
  <rule id="perf/css-file-size" severity="error" status="warn" docs="https://docs.squirrelscan.com/rules/perf/css-file-size">
   1 CSS file(s) exceed 150.0 KB
   Items (1):
    - /_next/static/chunks/PORTFOLIO-DANILO-FINAL_src_app_globals_11a5izv.css [sizeBytes: 292809, size: 285.9 KB, status: 200, contentType: text/css; charset=UTF-8] (from: /, /portfolio?category=motion, /portfolio?category=branding, /portfolio?category=web, /portfolio; +3 more)
  </rule>
  <rule id="perf/dom-size" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/dom-size">
   Element with N children found
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (5/8):
    - / (Element with 93 children found)
    - /portfolio?category=motion (Element with 91 children found)
    - /portfolio?category=branding (Element with 92 children found)
    - /portfolio?category=web (Element with 88 children found)
    - /portfolio (Element with 92 children found)
  </rule>
  <rule id="perf/total-byte-weight" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/total-byte-weight">
   Total tracked resources: 4090KB (heavy page)
  </rule>
  <rule id="perf/critical-request-chains" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/critical-request-chains">
   2 critical request chain(s) found
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (2):
    - CSS: /_next/static/chunks/PORTFOLIO-DANILO-FINAL_src_app_globals_11a5izv.css
    - JS: /_next/static/chunks/0kpu_next_dist_build_polyfills_polyfill-nomodule.js
  </rule>
  <rule id="perf/duplicate-js" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/duplicate-js">
   1 library(s) loaded multiple times
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (5):
    - portfolio-danilo-final (16x)
    - portfolio-danilo-final (18x)
    - portfolio-danilo-final (17x)
    - portfolio-danilo-final (15x)
    - portfolio-danilo-final (14x)
  </rule>
  <rule id="perf/lazy-above-fold" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/lazy-above-fold">
   N above-fold image(s) with lazy loading
   Pages (3): /, /contato, /sobre
   Items (5/8):
    - /_next/image?url=%2Fsite.assets%2Fhome%2Fshowcase%2FBranding-Project.webp&amp;w=3840&amp;q=75
    - /_next/image?url=%2Fsite.assets%2Fhome%2Fshowcase%2FKey-Visual.webp&amp;w=3840&amp;q=75
    - /_next/image?url=%2Fsite.assets%2Fabout%2Forigin%2Fabout.origin_image.1.webp&amp;w=3840&amp;q=60
    - /_next/image?url=%2Fsite.assets%2Fabout%2Forigin%2Fabout.origin_image.2.webp&amp;w=3840&amp;q=60
    - /_next/image?url=%2Fsite.assets%2Fabout%2Forigin%2Fabout.origin_image.3.webp&amp;w=3840&amp;q=60
  </rule>
  <rule id="perf/unminified-js" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/unminified-js">
   9 JavaScript file(s) appear unminified
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (5):
    - 0kpu_next_dist_compiled_next-devtools_index_0mlvbpu.js (729.2KB, ~532.7KB savings) [reason: high newlines (0.52%), 98 comments]
    - 0kpu_next_dist_compiled_react-dom_0o7ti-u._.js (1037.0KB, ~263.3KB savings) [reason: high newlines (1.58%), 81 comments, long function names, formatted code, excessive whitespace]
    - 0kpu_next_dist_compiled_react-server-dom-turbopack_197fi7i._.js (172.5KB, ~54.0KB savings) [reason: high newlines (1.64%), 17 comments, long function names, formatted code, excessive whitespace]
    - 0kpu_next_dist_compiled_1ziz2xa._.js (148.6KB, ~60.2KB savings) [reason: high newlines (1.92%), 169 comments, long function names, formatted code, excessive whitespace]
    - 0kpu_next_dist_client_066hi91._.js (824.6KB, ~333.9KB savings) [reason: high newlines (1.82%), 3241 comments, long function names, formatted code, excessive whitespace]
  </rule>
  <rule id="perf/cache-headers" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/cache-headers">
   no-cache without ETag or Last-Modified
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
  </rule>
  <rule id="perf/http2" severity="info" status="warn" docs="https://docs.squirrelscan.com/rules/perf/http2">
   HTTP/2 requires HTTPS
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (5/8):
    - / (HTTP/2 requires HTTPS)
    - /portfolio?category=motion (HTTP/2 requires HTTPS)
    - /portfolio?category=branding (HTTP/2 requires HTTPS)
    - /portfolio?category=web (HTTP/2 requires HTTPS)
    - /portfolio (HTTP/2 requires HTTPS)
  </rule>
  <rule id="perf/source-maps" severity="info" status="warn" docs="https://docs.squirrelscan.com/rules/perf/source-maps">
   11 potential source map(s) detected; 1 inline source map(s) found
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (5/11):
    - /_next/static/chunks/index.js.map (from /_next/static/chunks/0kpu_next_dist_compiled_next-devtools_index_0mlvbpu.js)
    - /_next/static/chunks/0kpu_next_dist_compiled_next-devtools_index_0mlvbpu.js.map (from /_next/static/chunks/0kpu_next_dist_compiled_next-devtools_index_0mlvbpu.js)
    - /_next/static/chunks/0kpu_next_dist_compiled_react-dom_0o7ti-u._.js.map (from /_next/static/chunks/0kpu_next_dist_compiled_react-dom_0o7ti-u._.js)
    - /_next/static/chunks/%22 (from /_next/static/chunks/0kpu_next_dist_compiled_react-server-dom-turbopack_197fi7i._.js)
    - /_next/static/chunks/0kpu_next_dist_compiled_react-server-dom-turbopack_197fi7i._.js.map (from /_next/static/chunks/0kpu_next_dist_compiled_react-server-dom-turbopack_197fi7i._.js)
  </rule>
 </category>
 <category name="Accessibility" errors="0" warnings="11">
  <rule id="a11y/color-contrast" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/a11y/color-contrast">
   1 potential color contrast issue(s)
   Pages (5): /, /portfolio, /portfolio?category=branding, /portfolio?category=motion, /portfolio?category=web
   Items (2):
    - div with class &quot;absolute inset-0 z-[var(--z-la...&quot; may have low contrast
    - div with class &quot;absolute inset-0 bg-[radial-gr...&quot; may have low contrast
  </rule>
  <rule id="a11y/video-captions" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/a11y/video-captions">
   N video(s) without caption tracks
   Pages (5/6): /, /portfolio, /portfolio?category=branding, /portfolio?category=motion, /portfolio?category=web
   Items (4):
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v
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

────────────────────────────────────────────────────────────
File issues: https://github.com/squirrelscan/squirrelscan/issues  •  Send feedback: squirrel feedback

