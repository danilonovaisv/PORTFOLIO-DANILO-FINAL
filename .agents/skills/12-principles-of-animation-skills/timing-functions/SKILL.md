---
name: timing-functions
description: Chooses springs, easing, linear time or no motion from the interaction, then checks duration.
license: MIT
metadata:
  author: raphael-salaja
  version: "1.0.0"
  source: https://www.userinterface.wiki
---

# Timing functions

This skill picks the timing function for a motion and checks its duration. It asks whether the motion is reacting to the user or the system is speaking.

Every check is a pair. The broken line sits beside the line that replaces it.

The bands below are exact. A gesture on a fixed `ease-out` is a finding. A spring that is not the sample pair `stiffness: 500` and `damping: 30` is a finding only when it visibly oscillates, as with `stiffness: 1000` and `damping: 5`. Staging, press scale and stagger belong to `animation-principles`. Mounting and exits of conditional trees belong to `exit-animations`.

## When to use

Use this when choosing or reviewing a transition, a spring or a decision to animate at all. Use it for drag, toggles, menus, hover, progress and page changes. Shared-element page transitions that should use the View Transitions API belong to `pseudo-elements`.

## 1. Classify the motion

Read the files in scope. For each transition, label it as one of: gesture, interruptible, system state, progress or time, or high-frequency. Say which label you used before judging the curve.

## 2. Match the function

Gesture-driven motion, including drag, flick and swipe, uses a spring. That is `spring-for-gestures`. Motion the user can reverse mid-flight uses a spring. That is `spring-for-interruptible`. On release, pass the pointer velocity into the spring, as in `velocity: info.velocity.x`. That is `spring-preserves-velocity`.

System state changes, such as a toast, use easing, not a spring. That is `easing-for-state-change`. Entrances use `ease-out`. Exits use `ease-in`. A view or mode change uses `ease-in-out`. Linear easing is only for progress or a clock. A card sliding on `linear` is `easing-linear-only-progress`.

## 3. Check duration, then stop

Press and hover sit in `120–180ms`. The sample is `150ms`. Small state changes sit in `180–260ms`. The sample is `200ms`. User-initiated motion does not exceed `300ms`. `laws-of-ux` owns a separate `400ms` rule for the first response, not for the animation length. If a motion feels slow, shorten the duration before changing the curve. That is `duration-shorten-before-curve`.

Typing, fast toggles and keyboard navigation do not animate. A context menu does not animate its entrance. It may animate its exit. Those are `none-high-frequency`, `none-keyboard-navigation` and `none-context-menu-entrance`.

Published samples, when the project has not already set these durations: drag release spring `stiffness: 500`, `damping: 30`. Modal enter `200ms` `ease-out`. Modal exit `150ms` `ease-in`. Page change `250ms` `ease-in-out`.
## The pair

Every check is a pair. The broken line sits beside the line that replaces it.

| Rule | Broken | Replacement |
| --- | --- | --- |
| `spring-for-gestures` | `drag` with `duration: 0.3, ease: "easeOut"` | `type: "spring"` and `velocity: info.velocity.x` |
| `spring-for-interruptible` | An open the user can reverse, on `duration: 0.3` | `type: "spring", stiffness: 400, damping: 25` |
| `spring-params-balanced` | `stiffness: 1000, damping: 5` | `stiffness: 500, damping: 30` |
| `easing-for-state-change` | A toast on `type: "spring"` | `duration: 0.2, ease: "easeOut"` |
| `easing-entrance-ease-out` | `.modal-enter { animation-timing-function: ease-in }` | `ease-out` |
| `easing-exit-ease-in` | `.modal-exit { animation-timing-function: ease-out }` | `ease-in` |
| `easing-transition-ease-in-out` | A page change on `ease-out` | `ease-in-out` over `250ms` |
| `easing-linear-only-progress` | `.card { transition: transform 200ms linear }` | `.progress-bar { transition: width 100ms linear }` |
| `duration-press-hover` | `.button:hover { transition: background-color 400ms }` | `150ms` |
| `duration-small-state` | A toggle at `400ms` | `200ms` |
| `duration-max-300ms` | `transition={{ duration: 0.5 }}` | `duration: 0.25` |
| `duration-shorten-before-curve` | `400ms` and a sharper curve to fake speed | `200ms ease-out` |
| `none-high-frequency` | `animate={{ scale: [1, 1.02, 1] }}` on each keystroke | No motion on the input |
| `none-keyboard-navigation` | `whileFocus={{ scale: 1.05 }}` | A static `:focus-visible` style |
| `none-context-menu-entrance` | `initial={{ opacity: 0, scale: 0.95 }}` on a menu | `exit` only |

## Reporting

**Severity.** `HIGH` is a gesture or interruptible motion on a fixed curve, motion on typing or keyboard navigation, or a context menu that animates in. `MEDIUM` is the wrong entrance or exit curve, a duration over `300ms`, or a spring that oscillates. `LOW` is a duration in the wrong band that is still under `300ms`.

**Verification.** Read the declared values in the files in scope. A browser is optional. Mark any check you could not run as `Not verified`.

**Format.** One finding per root cause:

```
file:line - [rule-id] what is wrong
```

Then a summary:

| Rule | Count | Severity |
| --- | --- | --- |

`Block` when any `HIGH` remains. `Approve` otherwise, and leave lesser rows in the table. Never `Approve` a file you did not read. With nothing to report, say "No actionable findings" and list what was not verified.
