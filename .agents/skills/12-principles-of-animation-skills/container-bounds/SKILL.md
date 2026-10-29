---
name: container-bounds
description: Animates container width and height by measuring an inner element and transitioning an outer one.
license: MIT
metadata:
  author: raphael-salaja
  version: "1.0.0"
  source: https://www.userinterface.wiki
---

# Container bounds

This skill reviews width and height animation that follows content. It keeps measurement and animation on different elements so the layout does not feed itself.

Every check is a pair. The broken line sits beside the line that replaces it.

Measuring and animating the same node is a finding. Animating from `0` on the first frame is a finding. Use this pattern rarely. Curves for the transition belong to `timing-functions`. The published container transition is `duration: 0.2` and `delay: 0.05`.

## When to use

Use this for a button label swap, an accordion, a disclosure or a small panel whose bounds change with content. Do not use it for a static page section or for every card on a screen.

## 1. Find size animations

Read the files in scope. List animators of `width` or `height`. Also list any `useMeasure`, `ResizeObserver` or `getBoundingClientRect` tied to them. If the size never changes, say so and stop.

## 2. Split measure from motion

The outer element animates. The inner element is measured. The same node must not do both. That is `container-two-div-pattern`. On the first frame bounds are `0`. Animate `bounds.width > 0 ? bounds.width : "auto"` so the open does not grow from nothing. That is `container-guard-initial-zero`.

Measure with `ResizeObserver`, not `getBoundingClientRect` in a render effect. That is `container-use-resize-observer`. Hold the node in state via a callback ref, not a `useRef` read once on mount. That is `container-callback-ref`. Disconnect the observer in the effect cleanup.

The outer element sets `overflow: "hidden"` while the size changes. That is `container-overflow-hidden`. The published transition is `duration: 0.2` and `delay: 0.05`, so the box follows the content. That is `container-transition-delay`.

## 3. Ask whether it should animate

Keep the pattern on loading buttons, expandable sections, accordions, FAQs and content reveals. A static layout that animates its own bounds is `container-no-excessive-use`. Remove the animation rather than tuning it.

## 4. Report and stop

Write findings, then the summary. Do not introduce `ResizeObserver` on a box the user did not ask to animate.
## The pair

Every check is a pair. The broken line sits beside the line that replaces it.

| Rule | Broken | Replacement |
| --- | --- | --- |
| `container-two-div-pattern` | `ref` and `animate={{ height: bounds.height }}` on the same node | Outer animates, inner holds `ref` |
| `container-guard-initial-zero` | `animate={{ width: bounds.width }}` | `bounds.width > 0 ? bounds.width : "auto"` |
| `container-use-resize-observer` | `getBoundingClientRect()` in an effect with no observer | `new ResizeObserver` |
| `container-callback-ref` | `useRef` observed once on `[]` | `useCallback` ref that stores the node |
| `container-overflow-hidden` | A height tween with no overflow | `style={{ overflow: "hidden" }}` on the outer node |
| `container-no-excessive-use` | A static page section animating its own bounds | Remove the tween |
| `container-transition-delay` | A size tween with no delay | `duration: 0.2, delay: 0.05` |

## Reporting

**Severity.** `HIGH` is measuring and animating the same element, which loops. `MEDIUM` is a first-frame animation from `0`, a missing observer cleanup, or overflow during the tween. `LOW` is a missing `0.05` delay on an otherwise correct pair.

**Verification.** Read the declared values in the files in scope. A browser is optional. Mark any check you could not run as `Not verified`.

**Format.** One finding per root cause:

```
file:line - [rule-id] what is wrong
```

Then a summary:

| Rule | Count | Severity |
| --- | --- | --- |

`Block` when any `HIGH` remains. `Approve` otherwise, and leave lesser rows in the table. Never `Approve` a file you did not read. With nothing to report, say "No actionable findings" and list what was not verified.
