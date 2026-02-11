---
name: shader-lab
description: Skill to generate GLSL shader boilerplate with best practices.
---

# Shader Lab Skill

Trigger: "create shader", "new material", "glsl"

## Objectives

1. Create shader boilerplate in `src/shaders/`.
2. Ensure `precision mediump float;` is automatically applied to fragment shaders.

## Action Steps

1. **Identify Shader Name**: Determine the name for the new shader from the user request.
2. **Create Vertex Shader (`.vert`)**:
    - Create a file at `src/shaders/[name].vert`.
    - Content should include standard boilerplate (varying uv, position).
3. **Create Fragment Shader (`.frag`)**:
    - Create a file at `src/shaders/[name].frag`.
    - **CRITICAL**: usage of `precision mediump float;` at the very top.
    - Content should include standard boilerplate (uniform time, resolution).
4. **Confirm**: Verify files are created and syntax is correct.
