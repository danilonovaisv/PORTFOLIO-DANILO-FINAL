---
name: interface-typography
description: Sets tabular numbers, OpenType features, wrapping and uppercase spacing for interface text.
license: MIT
metadata:
  author: raphael-salaja
  version: "1.0.0"
  source: https://www.userinterface.wiki
---

# Interface typography

This skill reviews how interface text is set. It checks numeric figures, OpenType features, wrapping and uppercase spacing.

Every check is a pair. The broken line sits beside the line that replaces it.

The features below are exact when the font ships them. Do not invent a stylistic set the family does not have. `ss02` is the published disambiguation set for fonts that include it. Layout, measure and color contrast are out of scope. Wrapping rules here are the ones from userinterface.wiki, including `balance` on headings and `pretty` on body text.

## When to use

Use this when setting prices, tables, prose, headings, links, uppercase labels or `@font-face`. Use `visual-design` for spacing tokens that are not type. Use `laws-of-ux` when the issue is target size rather than glyphs.

## 1. Read the text styles

Read the files in scope. Note body, headings, data, code and uppercase labels separately. Record which font files are loaded.

## 2. Check figures and features

Columns, prices and dashboards use `font-variant-numeric: tabular-nums`. That is `type-tabular-nums-for-data`. Body prose uses `oldstyle-nums`. Tables and headings use `lining-nums`, with `tabular-nums` when they are data. That is `type-oldstyle-nums-for-prose`. Code-adjacent UI uses `slashed-zero`. That is `type-slashed-zero`. Fractions in running text use `diagonal-fractions`. That is `type-proper-fractions`.

Keep `calt` on. Do not set `"calt" 0`. That is `type-opentype-contextual-alternates`. Code-facing UI enables the font's disambiguation set, published as `"ss02"`, so `I`, `l` and `1` separate. That is `type-disambiguation-stylistic-set`. Leave `font-optical-sizing: auto`. That is `type-optical-sizing-auto`.

On retina displays set `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` on `body`. That is `type-antialiased-on-retina`. Display and icon fonts set `font-synthesis: none` so the browser does not fake a missing bold or italic. That is `type-no-font-synthesis`. Variable fonts may use intermediate weights such as `450` and `550`. That is `type-variable-weight-continuous`. `@font-face` sets `font-display: swap`. That is `type-font-display-swap`.

## 3. Check wrapping and case

Headings use `text-wrap: balance`. Body paragraphs use `text-wrap: pretty`. Those are `type-text-wrap-balance-headings` and `type-text-wrap-pretty`. Justified text also sets `hyphens: auto`. Justify without hyphens is `type-justify-with-hyphens`. Underlines set `text-underline-offset: 3px` and `text-decoration-skip-ink: auto`. That is `type-underline-offset`. Uppercase and small-caps labels add letter-spacing. The published sample is `0.05em` at `12px`. That is `type-letter-spacing-uppercase`.

## 4. Report and stop

Write findings, then the summary. Do not swap the product font.
## The pair

Every check is a pair. The broken line sits beside the line that replaces it.

| Rule | Broken | Replacement |
| --- | --- | --- |
| `type-tabular-nums-for-data` | `.price { font-variant-numeric: proportional-nums }` | `tabular-nums` |
| `type-oldstyle-nums-for-prose` | `oldstyle-nums` on a data table | `lining-nums tabular-nums` on the table, `oldstyle-nums` in prose |
| `type-slashed-zero` | Code UI with a plain zero | `font-variant-numeric: slashed-zero` |
| `type-disambiguation-stylistic-set` | `I`, `l` and `1` in the default code face | `font-feature-settings: "ss02"` when the font has it |
| `type-optical-sizing-auto` | `font-optical-sizing: none` | `font-optical-sizing: auto` |
| `type-opentype-contextual-alternates` | `font-feature-settings: "calt" 0` | `"calt" 1` |
| `type-font-display-swap` | `@font-face` with no display rule | `font-display: swap` |
| `type-text-wrap-balance-headings` | `p { text-wrap: balance }` | `h1 { text-wrap: balance }` and `p { text-wrap: pretty }` |
| `type-justify-with-hyphens` | `.article { text-align: justify }` | Add `hyphens: auto` |
| `type-underline-offset` | `a { text-decoration: underline }` | `text-underline-offset: 3px` |
| `type-letter-spacing-uppercase` | `text-transform: uppercase` at `12px` and default tracking | `letter-spacing: 0.05em` |
| `type-no-font-synthesis` | A display face that fakes a missing bold | `font-synthesis: none` |

## Reporting

**Severity.** `HIGH` is data that cannot be compared because figures are proportional, or text that stays invisible during font load because `font-display` blocks it. `MEDIUM` is the wrong `text-wrap`, faux bold on a display face, or justified text without hyphens. `LOW` is a missing underline offset or a missing uppercase tracking value.

**Verification.** Read the declared values in the files in scope. A browser is optional. Mark any check you could not run as `Not verified`.

**Format.** One finding per root cause:

```
file:line - [rule-id] what is wrong
```

Then a summary:

| Rule | Count | Severity |
| --- | --- | --- |

`Block` when any `HIGH` remains. `Approve` otherwise, and leave lesser rows in the table. Never `Approve` a file you did not read. With nothing to report, say "No actionable findings" and list what was not verified.
