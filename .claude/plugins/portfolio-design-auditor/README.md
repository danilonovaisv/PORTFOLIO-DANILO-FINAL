# Portfolio Design Auditor - Skill Pack

Version 0.2.0 supports both Agent Plugins v1 and Codex, with skills for design, UX/UI, accessibility, interaction, motion and mobile-quality workflows.

## Purpose

The pack supports the workflow:

`CONTEXT → AUDIT → APPROVAL → PLAN → IMPLEMENT → VALIDATE → REPORT`

For an audit-only request, stop after reporting findings. When the user requests a fix or implementation, that request authorizes the stated scope; complete and validate the work without a separate approval step.

The Portfolio is the product. External references and `apple-design` are evaluation lenses, not visual targets to copy.

## Included skills

| Skill | Role in plugin |
|---|---|
| `portfolio-design-audit` | General evidence-based portfolio audit and routing |
| `apple-design` | Principles / evaluation lens |
| `animation-vocabulary` | Terminology normalization |
| `find-animation-opportunities` | Read-only opportunity discovery |
| `improve-animations` | Broad motion audit + implementation planning |
| `review-animations` | Localized review / validation |
| `animate` | Approved web motion implementation |
| `animate-expo` | Approved React Native / Expo motion implementation |
| `mobile-native` | Mobile web/PWA platform audit + fixes |
| `pick-ui-library` | Explicit dependency/library decision support |
| `prototype` | Approved UI exploration |
| `ask-sonner` | Sonner implementation/troubleshooting support |

## Routing

- Need to audit a whole motion system → `improve-animations`
- Need to audit a whole page, section, component or UX flow → `portfolio-design-audit`
- Need to review one animation/diff → `review-animations`
- Need to find places where motion would help → `find-animation-opportunities`
- Need to implement approved web motion → `animate`
- Need to implement approved Expo/RN motion → `animate-expo`
- Need Apple-derived fluid-interface principles → `apple-design`
- Need to name an effect → `animation-vocabulary`
- Need mobile web/PWA platform fixes → `mobile-native`
- Need a UI dependency decision → `pick-ui-library`
- Need to explore multiple UI solutions → `prototype`
- Need Sonner-specific setup/API/troubleshooting → `ask-sonner`

## Portable package structure

Agent Plugins v1 reads `plugin.json` at the plugin root. Codex reads `.codex-plugin/plugin.json`. Both manifests describe the same plugin version. Skills live as immediate children of `skills/` with one `SKILL.md` each.

This pack intentionally does **not** include `agents/`, `commands/`, hooks, `.claude-plugin/plugin.json`, `.mcp.json`, or `${CLAUDE_PLUGIN_ROOT}` requirements. Those are client-specific patterns, not Agent Plugins v1 core components.

No `mcp.json` is included because these skills do not require an MCP server to be portable.

## IDE agents

IDE-specific agents should consume the skill contracts rather than being represented as portable v1 components.

Recommended role mapping:

1. Portfolio Context Analyst → context discovery
2. Design Auditor → audit + relevant skills
3. Implementation Planner → approved findings to dependency-aware tasks
4. IDE Implementation Agent → `animate`, `animate-expo`, `mobile-native`, `ask-sonner`, etc. as selected
5. Audit Validator → `review-animations` + acceptance criteria

## Verification state

The package passes the Codex plugin validator and the new skill passes the Agent Skills quick validator; details are in `VALIDATION.md`.

Runtime behavior of third-party libraries, browser/device rendering and project-specific paths remain context-dependent and must be verified in the target repository/runtime.

## Attribution / source note

The adaptation was built from the user-provided `skills.zip`. Public `skills.sh` pages for the relevant Emil Kowalski skills were consulted as a secondary comparison source. `zdoc.app` did not provide a normative source for these skill formats.

See `NOTICE.md` for redistribution/licensing caveats.
