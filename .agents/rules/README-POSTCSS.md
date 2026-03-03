# 🔒 Configuração PostCSS e Tailwind CSS - Guia Rápido

## Status Atual

✅ **PostCSS configurado corretamente** (`postcss.config.cjs`)
✅ **CSS usando sintaxe correta** (`globals.css`)
⚠️ **Tailwind CSS v4 detectado** - Requer downgrade para v3.4.x

## Como Validar

Execute o comando:

```bash
pnpm validate:postcss
```

Este comando verifica automaticamente:
- ✅ Configuração do PostCSS
- ✅ Sintaxe do CSS
- ✅ Versão do Tailwind CSS

## Como Corrigir Tailwind v4 → v3.4.x

Se o script detectar Tailwind v4, execute:

```bash
pnpm remove tailwindcss
pnpm add -D tailwindcss@3.4.19
pnpm install
```

Depois valide novamente:

```bash
pnpm validate:postcss
```

## Arquivos Protegidos

### 1. `postcss.config.cjs`
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

**❌ NUNCA ALTERE PARA:**
```javascript
// NÃO USAR
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // ❌ Plugin v4
  },
};
```

### 2. `src/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**❌ NUNCA ALTERE PARA:**
```css
/* NÃO USAR */
@import 'tailwindcss'; /* ❌ Sintaxe v4 */
```

## Documentação Completa

📖 Ver: `.agent/rules/postcss-tailwind-config.md`

## Comandos Úteis

```bash
# Validar configuração
pnpm validate:postcss

# Verificar versão do Tailwind
pnpm list tailwindcss

# Limpar cache e reiniciar
rm -rf .next && pnpm dev
```

## Integração com CI/CD

Adicione ao seu pipeline:

```yaml
- name: Validate PostCSS Config
  run: pnpm validate:postcss
```

---

**Criado em**: 2025-01-XX
**Última validação**: Execute `pnpm validate:postcss`
