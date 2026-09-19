# HTML Video Remediation Plan (Gate 02)

> **Date**: 2026-09-19  
> **Project**: Portfolio Danilo Novais (`PORTFOLIO-DANILO-FINAL`)

---

## Remediation Table

| ID | Issue | Root Cause | Target Files | Solution | Risk | Test Case |
|---|---|---|---|---|---|---|
| **REM-01** | `SYSTEM_COVER_1X1` lacks HTML Video mode in Admin | `MediaUploadSection.tsx` only had toggles for 16:9 | `MediaUploadSection.tsx` | Add `squareMode` (`'file' \| 'html'`) and `squareHtml` `<textarea>` | Low | Case 03, Case 04 |
| **REM-02** | `ProjectForm.tsx` state doesn't track 1:1 HTML mode or auto-restore | State only tracked 16:9 | `ProjectForm.tsx` | Add `squareMode` & `squareHtml` state, auto-detect HTML on edit load, update validation | Low | Case 07, Case 09 |
| **REM-03** | `ProjectForm.tsx` `onSubmit` requires file upload for 1:1 | Hardcoded `if (!squareVariant && !hasExistingSquare)` check | `ProjectForm.tsx` | Update validation to accept `squareMode === 'html' && squareHtml.trim()` | Low | Case 03, Case 04 |
| **REM-04** | Zod schema ignores HTML string for 1:1 & 16:9 | Schema required URL format | `src/lib/admin/schemas/project.ts` | Allow optional HTML string format in `url_landscape` and `url_square` | Low | Case 01–04 |
| **REM-05** | Public cards fail to resolve hover HTML video for 16:9 / 1:1 | `resolveProjectHoverMedia` only checked `thumbnailHtml` | `src/lib/portfolio/card-media.ts` | Check `imageLandscape` / `imageSquare` for HTML tags in `resolveProjectHoverMedia` | Medium | Case 12, Case 13 |
| **REM-06** | `HTMLVideoBlock` frameless container forces `aspect-video` | Hardcoded `aspect-video` wrapper for `isFullHtmlDoc` | `src/components/ui/HTMLVideoBlock.tsx` | Use dynamic container class `h-full w-full` with `pointer-events-none` | Low | Case 10, Case 11 |
| **REM-07** | MediaCard iframe pointer events trap mouse hovers on cards | `iframe` captured mouse events | `src/components/ui/media/MediaCard.tsx` | Ensure `pointer-events-none` is active on frameless cards | Low | Case 15 |
