# HTML Video Forensic Audit Report (Gate 01)

> **Date**: 2026-09-19  
> **Project**: Portfolio Danilo Novais (`PORTFOLIO-DANILO-FINAL`)  
> **Scope**: HTML Video support in Admin Project Creation/Editing (`NEW_PROJECT` / `SYSTEM_MODIFY`) and Public Frontend Rendering.

---

## 1. Executive Summary

A forensic audit of the project codebase was conducted following `docs/PORTFOLIO-ENGINEERING-SWARM.md`. The previous implementation attempt was evaluated against current runtime behavior, source code, data mapping logic, and database schemas.

The audit confirmed that:
1. **Admin Form Coverage is Incomplete**: Only `SYSTEM_COVER_16X9` (`url_landscape`) was provided with an HTML Video toggle and textarea. `SYSTEM_COVER_1X1` (`url_square`) lacked HTML Video input capabilities.
2. **Hover & Media Resolution Failure**: `resolveProjectHoverMedia` in `card-media.ts` only inspected `project.thumbnailHtml`, ignoring `project.imageLandscape` or `project.imageSquare` when they held HTML video strings, preventing public project cards from rendering hover HTML videos.
3. **Responsive & Aspect Ratio Constraints**: `HTMLVideoBlock.tsx` required aspect-aware frameless container handling for both 16:9 (`aspect-video`) and 1:1 (`aspect-square`) cards, ensuring full visibility without `object-fit: cover` cropping or distortion on landing pages.

---

## 2. Forensic Breakdown by System Layer

### A. Admin Form Layer (`MediaUploadSection.tsx`, `ProjectForm.tsx`)
- **Observed Behavior**: `MediaUploadSection.tsx` only exposed `landscapeMode` and `landscapeHtml` controls for `SYSTEM_COVER_16X9`. `SYSTEM_COVER_1X1` was hardcoded to `<input type="file">`.
- **Root Cause**: Missing state variables `squareMode` (`'file' | 'html'`) and `squareHtml` in `ProjectForm.tsx`, plus lack of form validation support for HTML video snippets in `url_square`.

### B. Persistence Layer (`project.ts`, `actions.ts`, Supabase)
- **Observed Behavior**: `url_landscape` and `url_square` in `portfolio_projects` PostgreSQL table store text strings.
- **Finding**: Direct text storage in `url_landscape` and `url_square` is supported by Supabase without schema changes, provided the Admin form correctly handles string inputs and Zod validation permits optional HTML code strings.

### C. Media Resolution Layer (`card-media.ts`, `project-mappers.ts`)
- **Observed Behavior**: `resolveProjectHoverMedia` only checked `project.thumbnailHtml`.
- **Root Cause**: `mapDbProjectToPortfolioProject` assigned `landscapeUrl` -> `imageLandscape` and `squareUrl` -> `imageSquare`, but `resolveProjectHoverMedia` did not check `project.imageLandscape` or `project.imageSquare` for HTML tags (`<video`, `<iframe`, `<!DOCTYPE`, etc.).

### D. Public Component Layer (`HTMLVideoBlock.tsx`, `MediaCard.tsx`)
- **Observed Behavior**: `HTMLVideoBlock.tsx` wrapped `isFullHtmlDoc` inside `aspect-video` even when `frameless` was active, which restricted square (1:1) cards to a 16:9 container height inside square cards.
- **Root Cause**: Hardcoded `aspect-video` wrapper in `HTMLVideoBlock.tsx` instead of using dynamic aspect classes passed from `MediaCard.tsx` (`MEDIA_FORMAT_CLASS`).

---

## 3. Security Findings (XSS & Sandbox Isolation)

- Raw HTML code inserted in the Admin panel presents potential XSS vectors if rendered directly on public pages.
- **Mitigation Strategy**: Full HTML documents (`<!DOCTYPE html>`, `<html`, `<script>`) MUST be rendered strictly inside an isolated `<iframe>` using:
  ```tsx
  <iframe
    srcDoc={html}
    title={title}
    className="h-full w-full border-0 pointer-events-none"
    sandbox="allow-scripts allow-same-origin allow-popups"
  />
  ```
- `pointer-events-none` on cards ensures mouse events (hovers and clicks) pass seamlessly to the parent project card link without being trapped by iframe internal elements.

---

## 4. Audit Conclusion & Gate 01 Sign-off

The forensic audit confirms the exact architectural gaps. Remediation can proceed to Gate 02 (Remediation Plan) and implementation.
