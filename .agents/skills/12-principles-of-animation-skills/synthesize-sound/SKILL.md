---
name: synthesize-sound
description: Reviews Web Audio UI sounds for one shared context, exponential decay and click-sized parameters.
license: MIT
metadata:
  author: raphael-salaja
  version: "1.0.0"
  source: https://www.userinterface.wiki
---

# Synthesize sound

This skill reviews procedural UI sound built with the Web Audio API. It checks the context, the envelope and the click parameters.

Every check is a pair. The broken line sits beside the line that replaces it.

One `AudioContext` for the page is required. An exponential ramp must not target `0`. Whether a sound should exist at all belongs to `interface-sound`.

## When to use

Use this when implementing or reviewing a click, a pop or a confirmation tone made with oscillators or noise. Use `interface-sound` for mute, volume and which actions may play.

## 1. Find the graph

Read the files in scope. List each `AudioContext`, buffer, oscillator, filter and gain ramp. If sound is only from files, hand the review to `interface-sound`.

## 2. Check the context and the envelope

Reuse one context. A function that calls `new AudioContext()` per cue is `context-reuse-single`. If `state` is `"suspended"`, call `resume()` before starting a node. That is `context-resume-suspended`. On `onended`, `disconnect` the source and the gain. That is `context-cleanup-nodes`.

Decay is exponential. `linearRampToValueAtTime(0, ...)` is `envelope-exponential-decay`. The exponential target is a small value such as `0.001`, never `0`. That is `envelope-no-zero-target`. Call `setValueAtTime` before the ramp. That is `envelope-set-initial-value`. A published click envelope sets gain to `0.3`, then ramps to `0.001`.

## 3. Check the sound and its numbers

A click or tap is filtered noise, not a sine beep. That is `design-noise-for-percussion`. A tonal confirmation is an oscillator whose pitch moves, such as `400` to `600` over `0.04s`. A static `400` is `design-oscillator-for-tonal`. Shape noise with a bandpass. That is `design-filter-for-character`.

Click length is `5–15ms`. The published buffer is `sampleRate * 0.008`. `100ms` fails `param-click-duration`. Bandpass center sits in `3000–6000Hz`. The sample is `4000`. `500` fails `param-filter-frequency-range`. Gain stays at or under `1`. The sample is `0.3`. That is `param-reasonable-gain`. Q sits in `2–5`. The sample is `3`. `15` fails `param-q-value-range`.

When the user names a quality, translate it. Harsh means a lower frequency or a lower Q. Muffled means a higher frequency. Too long means a shorter buffer and a faster decay. An abrupt cut means an exponential ramp. Mechanical means a higher Q and a faster decay. Softer means lower gain.

## 4. Report and stop

Write findings, then the summary. Do not invent a second context to "isolate" one button.
## The pair

Every check is a pair. The broken line sits beside the line that replaces it.

| Rule | Broken | Replacement |
| --- | --- | --- |
| `context-reuse-single` | `new AudioContext()` inside `playSound` | One `getAudioContext()` for the page |
| `context-resume-suspended` | `start()` while `ctx.state` may be `"suspended"` | `ctx.resume()` first |
| `context-cleanup-nodes` | `source.start()` and nodes left connected | `source.onended` calls `disconnect()` |
| `envelope-exponential-decay` | `linearRampToValueAtTime(0, t + 0.05)` | `exponentialRampToValueAtTime(0.001, t + 0.05)` |
| `envelope-no-zero-target` | `exponentialRampToValueAtTime(0, t + 0.05)` | Target `0.001` |
| `envelope-set-initial-value` | A ramp with no start value | `setValueAtTime(0.3, t)` before the ramp |
| `design-noise-for-percussion` | A click from `osc.type = "sine"` | A noise buffer of about `8ms` |
| `design-oscillator-for-tonal` | `osc.frequency.value = 400` for a confirmation | Ramp `400` to `600` over `0.04s` |
| `design-filter-for-character` | Noise connected straight to the destination | Bandpass at `4000Hz`, Q `3` |
| `param-click-duration` | `sampleRate * 0.1` for a click | `sampleRate * 0.008` |
| `param-reasonable-gain` | `setValueAtTime(1.5, t)` | `setValueAtTime(0.3, t)` |

## Reporting

**Severity.** `HIGH` is a new `AudioContext` per cue, or an exponential ramp to `0`. `MEDIUM` is a linear decay, a missing `resume`, or a click built from a sine wave. `LOW` is a Q or a filter frequency outside the published band.

**Verification.** Read the declared values in the files in scope. A browser is optional. Mark any check you could not run as `Not verified`.

**Format.** One finding per root cause:

```
file:line - [rule-id] what is wrong
```

Then a summary:

| Rule | Count | Severity |
| --- | --- | --- |

`Block` when any `HIGH` remains. `Approve` otherwise, and leave lesser rows in the table. Never `Approve` a file you did not read. With nothing to report, say "No actionable findings" and list what was not verified.
