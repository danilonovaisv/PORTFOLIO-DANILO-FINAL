---
name: morphing-icons
description: Builds icons that morph through three shared SVG lines, including collapsed lines and rotation groups.
license: MIT
metadata:
  author: raphael-salaja
  version: "1.0.0"
  source: https://www.userinterface.wiki
---

# Morphing icons

This skill builds or reviews icons that morph by moving the same three SVG lines. Any icon can become any other because the line count never changes.

Every check is a pair. The broken line sits beside the line that replaces it.

Exactly three lines is required. A `14` viewBox is the published coordinate system, with center `7`. A two-line check that omits the third line is a finding. Press and hover timing for buttons around the icon belongs to `timing-functions`. The line morph itself uses the transition in this skill.

## When to use

Use this when asked to create morphing icons, to animate between two icons, or to review an icon component that interpolates SVG lines. Do not use it for a crossfade between two `<svg>` trees.

## 1. Lock the model

Each line is `{ x1, y1, x2, y2, opacity? }`. Each icon is `{ lines, rotation?, group? }` and `lines` is a tuple of three. The collapsed line is zero length at the center, with `opacity: 0`.

```ts
const CENTER = 7;
const collapsed = { x1: CENTER, y1: CENTER, x2: CENTER, y2: CENTER, opacity: 0 };
```

## 2. Draw within the constraint

Every icon has three lines. Unused lines are `collapsed`, never `null` and never omitted. Those are `morphing-three-lines` and `morphing-use-collapsed`. Every icon uses the same viewBox. The published size is `14` by `14`. That is `morphing-consistent-viewbox`.

A check keeps the third line collapsed. A menu uses three real strokes. A "more" icon uses three zero-length dots. Rotational variants, such as four arrows, share one line list, one `group` and a `rotation` of `0`, `90`, `180` or `-90`. Different point lists for `arrow-down` and `arrow-right` fail `morphing-group-variants`.

## 3. Move them

The stroke interpolation uses `ease: [0.19, 1, 0.22, 1]` and `duration: 0.4`. That duration is for the morph, not for press or hover. Rotation inside a group uses a spring via `useSpring`. Crossing groups calls `rotation.jump`, not an animated set. Those are `morphing-spring-rotation` and `morphing-jump-non-grouped`.

When `useReducedMotion()` is true, the transition duration is `0`. That is `morphing-reduced-motion`. Lines set `strokeLinecap="round"`. That is `morphing-strokelinecap-round`. The svg sets `aria-hidden="true"` when it is decorative. That is `morphing-aria-hidden`.

## 4. Report or build, then stop

If the user asked for a review, write findings and the summary. If they asked for an icon, build it in the project's component and do not add a second icon system beside an existing one.
## The pair

Every check is a pair. The broken line sits beside the line that replaces it.

| Rule | Broken | Replacement |
| --- | --- | --- |
| `morphing-three-lines` | A check icon with two line objects | A third line set to `collapsed` |
| `morphing-use-collapsed` | `null` in the lines tuple | The `collapsed` constant |
| `morphing-consistent-viewbox` | One icon in a `14` box and another in a `28` box | `VIEWBOX_SIZE = 14` for every icon |
| `morphing-group-variants` | `arrow-down` drawn with its own points | The same `arrowLines`, `group: "arrow"`, `rotation: 90` |
| `morphing-spring-rotation` | `transition={{ duration: 0.3 }}` on grouped rotation | `useSpring` for that rotation |
| `morphing-jump-non-grouped` | `rotation.set` when the groups differ | `rotation.jump` |
| `morphing-reduced-motion` | A morph with no reduced-motion branch | `duration: 0` when reduced motion is on |
| `morphing-strokelinecap-round` | `strokeLinecap="butt"` | `strokeLinecap="round"` |
| `morphing-aria-hidden` | `<svg width={size} height={size}>` | `aria-hidden="true"` |

## Reporting

**Severity.** `HIGH` is a line count other than three, or rotational variants that do not share a group and a line list. `MEDIUM` is a missing reduced-motion branch, or rotation that animates across groups. `LOW` is a butt cap or a missing `aria-hidden` on a decorative icon.

**Verification.** Read the declared values in the files in scope. A browser is optional. Mark any check you could not run as `Not verified`.

**Format.** One finding per root cause:

```
file:line - [rule-id] what is wrong
```

Then a summary:

| Rule | Count | Severity |
| --- | --- | --- |

`Block` when any `HIGH` remains. `Approve` otherwise, and leave lesser rows in the table. Never `Approve` a file you did not read. With nothing to report, say "No actionable findings" and list what was not verified.
