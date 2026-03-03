# Regra: Configuração PostCSS e Tailwind CSS

## ⚠️ CONFIGURAÇÃO OBRIGATÓRIA

Esta regra garante que o projeto use a configuração correta do PostCSS com Tailwind CSS v3.4.x.

## Problema Conhecido

**Tailwind CSS v4.1.18** possui um bug crítico que causa:
```
RangeError: Invalid code point 11466107
Module not found: Can't resolve './&'
```

## Configuração Correta

### postcss.config.cjs

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### ❌ NUNCA USE

```javascript
// NÃO USAR - Plugin do Tailwind v4
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // ❌ ERRADO
  },
};
```

## Sintaxe CSS Correta

### globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### ❌ NUNCA USE (Sintaxe v4)

```css
@import 'tailwindcss'; /* ❌ ERRADO - Sintaxe v4 */
```

## Versões Aprovadas

- **Tailwind CSS**: `3.4.19` (ou 3.4.x estável)
- **PostCSS**: `8.x`
- **Autoprefixer**: `10.x`

## Validação

Antes de fazer commit, verifique:

1. ✅ `postcss.config.cjs` usa `tailwindcss` (não `@tailwindcss/postcss`)
2. ✅ `globals.css` usa `@tailwind` directives (não `@import 'tailwindcss'`)
3. ✅ `package.json` tem Tailwind CSS v3.4.x

## Comandos de Verificação

```bash
# Verificar versão do Tailwind
pnpm list tailwindcss

# Deve mostrar: tailwindcss@3.4.19 (ou 3.4.x)
```

## Se o Erro Aparecer

1. Verifique `postcss.config.cjs` - deve usar `tailwindcss`, não `@tailwindcss/postcss`
2. Verifique `package.json` - Tailwind deve ser v3.4.x
3. Limpe o cache: `rm -rf .next && pnpm dev`

## Referências

- SWEEP.md - Seção "Resolução de Problemas Conhecidos"
- Tailwind CSS v3 Docs: https://v3.tailwindcss.com/docs/installation/using-postcss
- Issue conhecida: Tailwind v4 incompatível com Next.js App Router + Turbopack

---

**Última atualização**: 2025-01-XX
**Status**: ✅ ATIVO - NÃO MODIFICAR SEM APROVAÇÃO
