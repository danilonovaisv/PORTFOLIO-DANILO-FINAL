---
description: Hero Section Workflow (Ghost Atmosphere)
---

# Workflow: Hero Section Implementation

Implementação da seção Hero com atmosfera **Ghost Blue**.

## Arquitetura de Camadas

Z-60: Mobile Menu
Z-50: Preloader
Z-30: ManifestoThumb
Z-20: GhostStage (WebGL)
Z-10: HeroCopy

## Comportamento de Scroll

Stage 1: Pinned (Sticky).
Stage 2: Exit (Release scroll).

## Regras de Ouro

- WebGL Lerp no mouse.
- Mobile Fallback (sem WebGL pesado).
- Pre-loader obrigatório.
