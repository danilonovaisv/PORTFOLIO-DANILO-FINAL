---
description: Seo Optimization
---

# 📈 SEO Optimization

**Trigger:** `/seo-boost` or SEO requests.
**Agent:** `agents/frontend-specialist.md`

## 1. Setup & Context

- **MCP Required:** `github`
- **Context:** Ensure the portfolio is indexable and shareable with optimized metadata and JSON-LD.

## 2. Steps (Skill-Based Execution)

### Step 1: Metadata API Integration

- **Instruction:** Configure `generateMetadata` for dynamic layout and page SEO.
- **Skill:** `use a skill seo-audit`
- **MCP Action:** None

### Step 2: Semantic Richness

- **Instruction:** Implement JSON-LD schemas (Person/Portfolio) and Open Graph images.
- **Skill:** `use a skill seo-audit`
- **MCP Action:** None

## 3. Completion Protocol

- **Validation:** `use a skill verification-before-completion`
- **Output:** Validated SEO structure and sitemap/robots.ts configuration.
