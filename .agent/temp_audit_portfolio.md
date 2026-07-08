<?xml version="1.0" encoding="UTF-8"?>
<audit version="0.0.38">
<site url="http://localhost:3000" crawled="9" date="2026-07-08T22:04:15.713Z"/>
<score overall="61" grade="D">
 <cat name="Performance" score="62"/>
 <cat name="Security" score="78"/>
 <cat name="Crawlability" score="86"/>
 <cat name="Content" score="88"/>
 <cat name="Accessibility" score="98"/>
 <cat name="Structured Data" score="71"/>
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
<summary passed="811" warnings="112" failed="18"/>
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
    - /portfolio
    - /sobre
    - /contato
    - /privacidade
    - /
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
    - https://www.linkedin.com/in/danilonovaisv (https://www.linkedin.com/in/danilonovaisv (999)) [status: 999] (from: /portfolio, /portfolio, /portfolio, /sobre, /sobre; +17 more)
  </rule>
 </category>
 <category name="Content" errors="0" warnings="11">
  <rule id="content/keyword-stuffing" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/content/keyword-stuffing">
   N word(s) may be overused
   Pages (5): /, /portfolio, /portfolio?category=branding, /portfolio?category=motion, /sobre
   Items (5/9):
    - deo (&quot;deo&quot; (5.5%)) [count: 18, density: 5.538461538461538]
    - tags (&quot;tags&quot; (4.6%)) [count: 15, density: 4.615384615384616]
    - brand (&quot;brand&quot; (3.7%)) [count: 12, density: 3.6923076923076925]
    - dire (&quot;dire&quot; (3.4%)) [count: 11, density: 3.3846153846153846]
    - visual (&quot;visual&quot; (3.1%)) [count: 10, density: 3.076923076923077]
  </rule>
  <rule id="content/word-count" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/content/word-count">
   Thin content: N words (min N)
   Pages (5/6): /, /contato, /portfolio?category=branding, /portfolio?category=motion, /portfolio?category=web
   Items (5/6):
    - /contato (Thin content: 56 words (min 300))
    - /privacidade (Thin content: 128 words (min 300))
    - / (Thin content: 161 words (min 300))
    - /portfolio?category=branding (Thin content: 256 words (min 300))
    - /portfolio?category=motion (Thin content: 153 words (min 300))
  </rule>
 </category>
 <category name="Structured Data" errors="0" warnings="6">
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
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-media/down-qu-mica/video-manifesto/assets-do-projeto/cover-16x9/thumb-glad.ead956218f26b9c0.webp | &lt;img src=&quot;https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-media/down-qu-mica/video-manifesto/assets-do-projeto/cover-16x9/thumb-glad.ead956218f26b9c0.webp&quot; alt=&quot;Video Manifesto GLAD para Down Química&quot;&gt;
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-media/down-qu-mica/video-manifesto/assets-do-projeto/cover-1x1/thumb-glad.ead956218f26b9c0.webp | &lt;img src=&quot;https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-media/down-qu-mica/video-manifesto/assets-do-projeto/cover-1x1/thumb-glad.ead956218f26b9c0.webp&quot; alt=&quot;Video Manifesto GLAD para Down Química&quot;&gt;
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-media/civic/key-visual/assets-do-projeto/cover-1x1/thumb-honda.c2d0c6ccb21001ea.webp | &lt;img src=&quot;https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-media/civic/key-visual/assets-do-projeto/cover-1x1/thumb-honda.c2d0c6ccb21001ea.webp&quot; alt=&quot;Honda Civic – Lançamento para Honda&quot;&gt;
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-media/mercado-livre/ai-video-mp/assets-do-projeto/cover-1x1/thumb-mercado-pago-1-1.1f603aece005b0c5.webp | &lt;img src=&quot;https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-media/mercado-livre/ai-video-mp/assets-do-projeto/cover-1x1/thumb-mercado-pago-1-1.1f603aece005b0c5.webp&quot; alt=&quot;Transforme o Seu Negócio para Mercado Pago&quot;&gt;
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-media/eudora/eudora/assets-do-projeto/cover-16x9/thumb-16-9.0eb82e6304067ac5.webp | &lt;img src=&quot;https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-media/eudora/eudora/assets-do-projeto/cover-16x9/thumb-16-9.0eb82e6304067ac5.webp&quot; alt=&quot;Juntas Somos Mais para Boticario&quot;&gt;
  </rule>
 </category>
 <category name="Performance" errors="9" warnings="72">
  <rule id="perf/js-file-size" severity="error" status="fail" docs="https://docs.squirrelscan.com/rules/perf/js-file-size">
   1 JS file(s) exceed 1.0 MB; 3 JS file(s) exceed 250.0 KB
   Items (4):
    - /_next/static/chunks/1rwx_next_dist_compiled_react-dom_0slzf2k._.js [sizeBytes: 1061381, size: 1.0 MB, status: 200, contentType: application/javascript; charset=UTF-8] (from: /portfolio, /sobre, /contato, /privacidade, /; +3 more)
    - /_next/static/chunks/1rwx_next_dist_compiled_next-devtools_index_074-sb2.js [sizeBytes: 746721, size: 729.2 KB, status: 200, contentType: application/javascript; charset=UTF-8] (from: /portfolio, /sobre, /contato, /privacidade, /; +3 more)
    - /_next/static/chunks/1rwx_next_dist_client_1nd5c9l._.js [sizeBytes: 830609, size: 811.1 KB, status: 200, contentType: application/javascript; charset=UTF-8] (from: /portfolio, /sobre, /contato, /privacidade, /; +3 more)
    - /_next/static/chunks/1rwx_next_dist_0pt7adv._.js [sizeBytes: 276640, size: 270.2 KB, status: 200, contentType: application/javascript; charset=UTF-8] (from: /portfolio, /sobre, /contato, /privacidade, /; +3 more)
  </rule>
  <rule id="perf/lcp-hints" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/lcp-hints">
   N potential LCP image(s) without preload
   Pages (5): /, /portfolio, /portfolio?category=branding, /portfolio?category=motion, /sobre
   Items (5/10):
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-media/down-qu-mica/video-manifesto/assets-do-projeto/cover-16x9/thumb-glad.ead956218f26b9c0.webp
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-media/down-qu-mica/video-manifesto/assets-do-projeto/cover-1x1/thumb-glad.ead956218f26b9c0.webp
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/portfolio-media/civic/key-visual/assets-do-projeto/cover-1x1/thumb-honda.c2d0c6ccb21001ea.webp
    - /_next/image?url=%2Fsite.assets%2Fabout%2Forigin%2Fabout.origin_image.1.webp&amp;w=3840&amp;q=60
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/render/image/public/portfolio-media/mercado-livre/ai-video-mp/assets-do-projeto/home-featured-logo/mp-logo.b35db998902eb999.png?width=800&amp;quality=85&amp;format=webp
  </rule>
  <rule id="perf/ttfb" severity="warning" status="fail" docs="https://docs.squirrelscan.com/rules/perf/ttfb">
   Very slow server response (Nms); Slow server response (739ms)
   Pages (5): /, /portfolio, /portfolio?category=branding, /portfolio?category=motion, /portfolio?category=web
   Items (5):
    - /portfolio (Very slow server response (2667ms))
    - / (Very slow server response (2542ms))
    - /portfolio?category=branding (Very slow server response (1296ms))
    - /portfolio?category=motion (Very slow server response (1588ms))
    - /portfolio?category=web (Slow server response (739ms))
  </rule>
  <rule id="perf/compression" severity="warning" status="fail" docs="https://docs.squirrelscan.com/rules/perf/compression">
   No compression detected (NKB uncompressed)
   Pages (4): /portfolio, /portfolio?category=branding, /portfolio?category=motion, /portfolio?category=web
   Items (4):
    - /portfolio (No compression detected (319KB uncompressed))
    - /portfolio?category=branding (No compression detected (268KB uncompressed))
    - /portfolio?category=motion (No compression detected (221KB uncompressed))
    - /portfolio?category=web (No compression detected (183KB uncompressed))
  </rule>
  <rule id="perf/css-file-size" severity="error" status="warn" docs="https://docs.squirrelscan.com/rules/perf/css-file-size">
   1 CSS file(s) exceed 150.0 KB
   Items (1):
    - /_next/static/chunks/src_app_globals_162hn9o.css [sizeBytes: 284131, size: 277.5 KB, status: 200, contentType: text/css; charset=UTF-8] (from: /portfolio, /sobre, /contato, /privacidade, /; +3 more)
  </rule>
  <rule id="perf/dom-size" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/dom-size">
   Element with N children found
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (5/8):
    - /portfolio (Element with 91 children found)
    - /sobre (Element with 123 children found)
    - /contato (Element with 80 children found)
    - /privacidade (Element with 78 children found)
    - / (Element with 92 children found)
  </rule>
  <rule id="perf/total-byte-weight" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/total-byte-weight">
   Total tracked resources: 4058KB (heavy page)
  </rule>
  <rule id="perf/critical-request-chains" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/critical-request-chains">
   2 critical request chain(s) found
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (2):
    - CSS: /_next/static/chunks/src_app_globals_162hn9o.css
    - JS: /_next/static/chunks/1rwx_next_dist_build_polyfills_polyfill-nomodule.js
  </rule>
  <rule id="perf/duplicate-js" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/duplicate-js">
   N library(s) loaded multiple times
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (5/6):
    - src (16x)
    - node (2x)
    - src (15x)
    - src (13x)
    - src (12x)
  </rule>
  <rule id="perf/lazy-above-fold" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/lazy-above-fold">
   N above-fold image(s) with lazy loading
   Pages (3): /, /contato, /sobre
   Items (5/7):
    - /_next/image?url=%2Fsite.assets%2Fabout%2Forigin%2Fabout.origin_image.2.webp&amp;w=3840&amp;q=60
    - /_next/image?url=%2Fsite.assets%2Fabout%2Forigin%2Fabout.origin_image.3.webp&amp;w=3840&amp;q=60
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/clients/clients.strip.1.svg
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/clients/clients.strip.2.svg
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/clients/clients.strip.3.svg
  </rule>
  <rule id="perf/unminified-js" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/unminified-js">
   9 JavaScript file(s) appear unminified
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (5):
    - 1rwx_next_dist_compiled_next-devtools_index_074-sb2.js (729.2KB, ~532.7KB savings) [reason: high newlines (0.52%), 98 comments]
    - 1rwx_next_dist_compiled_react-dom_0slzf2k._.js (1036.5KB, ~263.3KB savings) [reason: high newlines (1.58%), 81 comments, long function names, formatted code, excessive whitespace]
    - 1rwx_next_dist_compiled_react-server-dom-turbopack_06gvd91._.js (172.2KB, ~54.0KB savings) [reason: high newlines (1.64%), 17 comments, long function names, formatted code, excessive whitespace]
    - 1rwx_next_dist_compiled_1fq9zzx._.js (147.6KB, ~60.2KB savings) [reason: high newlines (1.93%), 169 comments, long function names, formatted code, excessive whitespace]
    - 1rwx_next_dist_client_1nd5c9l._.js (811.1KB, ~333.9KB savings) [reason: high newlines (1.85%), 3241 comments, long function names, formatted code, excessive whitespace]
  </rule>
  <rule id="perf/cache-headers" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/perf/cache-headers">
   no-cache without ETag or Last-Modified
   Pages (4): /, /contato, /privacidade, /sobre
  </rule>
  <rule id="perf/http2" severity="info" status="warn" docs="https://docs.squirrelscan.com/rules/perf/http2">
   HTTP/2 requires HTTPS
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (5/8):
    - /portfolio (HTTP/2 requires HTTPS)
    - /sobre (HTTP/2 requires HTTPS)
    - /contato (HTTP/2 requires HTTPS)
    - /privacidade (HTTP/2 requires HTTPS)
    - / (HTTP/2 requires HTTPS)
  </rule>
  <rule id="perf/source-maps" severity="info" status="warn" docs="https://docs.squirrelscan.com/rules/perf/source-maps">
   11 potential source map(s) detected; 1 inline source map(s) found
   Pages (5/8): /, /contato, /portfolio, /portfolio?category=branding, /portfolio?category=motion
   Items (5/11):
    - /_next/static/chunks/index.js.map (from /_next/static/chunks/1rwx_next_dist_compiled_next-devtools_index_074-sb2.js)
    - /_next/static/chunks/1rwx_next_dist_compiled_next-devtools_index_074-sb2.js.map (from /_next/static/chunks/1rwx_next_dist_compiled_next-devtools_index_074-sb2.js)
    - /_next/static/chunks/1rwx_next_dist_compiled_react-dom_0slzf2k._.js.map (from /_next/static/chunks/1rwx_next_dist_compiled_react-dom_0slzf2k._.js)
    - /_next/static/chunks/%22 (from /_next/static/chunks/1rwx_next_dist_compiled_react-server-dom-turbopack_06gvd91._.js)
    - /_next/static/chunks/1rwx_next_dist_compiled_react-server-dom-turbopack_06gvd91._.js.map (from /_next/static/chunks/1rwx_next_dist_compiled_react-server-dom-turbopack_06gvd91._.js)
  </rule>
 </category>
 <category name="Accessibility" errors="0" warnings="11">
  <rule id="a11y/color-contrast" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/a11y/color-contrast">
   1 potential color contrast issue(s)
   Pages (5): /, /portfolio, /portfolio?category=branding, /portfolio?category=motion, /portfolio?category=web
   Items (2):
    - div with class &quot;absolute inset-0 bg-[radial-gr...&quot; may have low contrast
    - div with class &quot;absolute inset-0 z-[var(--z-la...&quot; may have low contrast
  </rule>
  <rule id="a11y/video-captions" severity="warning" status="warn" docs="https://docs.squirrelscan.com/rules/a11y/video-captions">
   N video(s) without caption tracks
   Pages (5/6): /, /portfolio, /portfolio?category=branding, /portfolio?category=motion, /portfolio?category=web
   Items (5/8):
    - https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v
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


