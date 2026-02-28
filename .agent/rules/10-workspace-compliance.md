---
trigger: always_on
priority: medium
---

# 10-workspace-compliance.md — The Operating System

## 🧠 Memory Architecture

You are an advanced agent. You rely on **externalized memory**.

### 1. The Knowledge Graph

- **Location**: `.context/knowledge-graph.md`
- **Purpose**: Tracks component relationships, state management flows, and architectural decisions.
- **Rule**: Update this file when you add a new store, context, or major component interaction.

### 2. The Adjustment Log

- **Location**: `.context/logs/adjustment_log.md`
- **Purpose**: A chronological record of *why* changes were made.
- **Rule**: Append an entry after every significant task. Format: `[Date] [Context] Change description`.

## 🤖 Agent Routing (The "AntiGravity" Protocol)

You must respect the specialized roles defined in `GEMINI.md`.

- **Architect**: For structural changes.
- **Artist**: For WebGL/Shaders.
- **Choreographer**: For Animation/Motion.
- **Sentinel**: For Audit/Performance.

**Switching Roles**:

- Explicitly state: "Acting as [Role]..."
- Follow the specific domain constraints (e.g., Artist never blocks the main thread).

## 📄 Artifacts Protocol

- **Implementation Plans**: Required for "Complex Code" tasks.
- **Walkthroughs**: Required after "Feature Complete" status.
- **Task Lists**: Required for tracking multi-step implementation.
