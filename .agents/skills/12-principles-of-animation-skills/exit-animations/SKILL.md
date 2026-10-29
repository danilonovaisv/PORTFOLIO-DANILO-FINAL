---
name: exit-animations
description: Reviews Motion exit animations for AnimatePresence wrappers, keys, modes and nested exits.
license: MIT
metadata:
  author: raphael-salaja
  version: "1.0.0"
  source: https://www.userinterface.wiki
---

# Exit animations

This skill reviews how conditional Motion elements leave the screen. It checks the wrapper, the exit props, the list keys and the presence mode.

Every check is a pair. The broken line sits beside the line that replaces it.

A conditional `motion` element with an `exit` and no `AnimatePresence` is a finding. Mode choice is a finding when it doubles the wait or makes two layout boxes fight. Curve choice and the `300ms` cap belong to `timing-functions`. This skill only applies that cap to `mode="wait"`, which plays exit and enter in series.

## When to use

Use this when a component should animate out, a list should reorder, or an exit prop seems ignored. Use `timing-functions` for the easing of that exit. Use `pseudo-elements` when the transition is a shared element across a page, via `view-transition-name`.

## 1. Find conditional motion

Read the files in scope. List every `motion` element rendered with `&&`, a ternary or a `.map` inside a presence boundary. If the project does not use Motion, say so and stop.

## 2. Check the wrapper

A conditional element with `exit` sits inside `AnimatePresence`. That is `exit-requires-wrapper`. An element inside `AnimatePresence` defines `exit`. That is `exit-prop-required`. A list uses a stable id as `key`, not the array index. That is `exit-key-required`. `exit` mirrors `initial`. An enter of `{ opacity: 0, y: 20 }` exits to the same value. That is `exit-matches-initial`.

## 3. Check hooks, mode and nesting

Call `useIsPresent` in the child of `AnimatePresence`, not the parent. That is `presence-hook-in-child`. After async cleanup, call `safeToRemove` from `usePresence`. That is `presence-safe-to-remove`. Disable hits on an exiting child while `isPresent` is false. That is `presence-disable-interactions`.

`mode="wait"` runs exit then enter, so halve each duration or the total exceeds the `300ms` cap owned by `timing-functions`. A `0.3` duration under `wait` is about `600ms` and fails `mode-wait-doubles-duration`. `mode="sync"` lets the leaving and entering boxes share layout. Take the leaving box out of flow, or use `mode="popLayout"` for a list reorder. Those are `mode-sync-layout-conflict` and `mode-pop-layout-for-lists`.

Nested `AnimatePresence` sets `propagate`, or the children vanish when the parent exits. That is `nested-propagate-required`. Parent and child exit durations stay in the same range. A parent at `100ms` with a child at `500ms` is `nested-consistent-timing`.

## 4. Report and stop

Write findings, then the summary. Do not wrap unrelated motion that has no exit.
## The pair

Every check is a pair. The broken line sits beside the line that replaces it.

| Rule | Broken | Replacement |
| --- | --- | --- |
| `exit-requires-wrapper` | `{open && <motion.div exit={{ opacity: 0 }} />}` | Wrap that element in `AnimatePresence` |
| `exit-prop-required` | `initial` and `animate` inside `AnimatePresence`, no `exit` | `exit={{ opacity: 0 }}` |
| `exit-key-required` | `key={index}` inside `AnimatePresence` | `key={item.id}` |
| `exit-matches-initial` | `initial={{ opacity: 0, y: 20 }}` and `exit={{ scale: 0 }}` | `exit={{ opacity: 0, y: 20 }}` |
| `presence-hook-in-child` | `useIsPresent()` in the parent that renders `AnimatePresence` | Call it in the child |
| `presence-safe-to-remove` | Async cleanup that never calls `safeToRemove` | `cleanup().then(safeToRemove)` |
| `presence-disable-interactions` | An exiting `<button onClick={handleClick}>` | `disabled={!isPresent}` |
| `mode-wait-doubles-duration` | `mode="wait"` and `duration: 0.3` | `duration: 0.15` |
| `mode-sync-layout-conflict` | `mode="sync"` on siblings in normal flow | `mode="popLayout"` |
| `mode-pop-layout-for-lists` | A reordering list with no mode | `mode="popLayout"` |
| `nested-propagate-required` | Nested `AnimatePresence` without `propagate` | `propagate` on each level |
| `nested-consistent-timing` | Parent `duration: 0.1` and child `duration: 0.5` | Both near `0.2` |

## Reporting

**Severity.** `HIGH` is a missing `AnimatePresence`, a missing `exit`, an index key, or a nested tree that drops children on close. `MEDIUM` is a `wait` duration that doubles past `300ms`, a `sync` layout fight, or mismatched parent and child timing. `LOW` is an exit that does not mirror `initial` on a short fade.

**Verification.** Read the declared values in the files in scope. A browser is optional. Mark any check you could not run as `Not verified`.

**Format.** One finding per root cause:

```
file:line - [rule-id] what is wrong
```

Then a summary:

| Rule | Count | Severity |
| --- | --- | --- |

`Block` when any `HIGH` remains. `Approve` otherwise, and leave lesser rows in the table. Never `Approve` a file you did not read. With nothing to report, say "No actionable findings" and list what was not verified.
