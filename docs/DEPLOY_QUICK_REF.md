# 🚀 Quick Deploy Reference

## ⚡ Método Rápido (Recomendado)

```bash
# 1. Validar configuração
pnpm run firebase:preflight

# 2. Deploy (se validação passar)
pnpm run deploy
```

## 🔄 Alternativas

### GitHub Actions (Automático)

```bash
git add .
git commit -m "feat: changes"
git push origin main
```

👉 Deploy automático via GitHub Actions

### Manual (Se local falhar)

```bash
# Corrigir dependências
bash scripts/firebase-preflight.sh

# Build
pnpm run build

# Deploy via Firebase Console
```

## 📚 Documentação Completa

- **Guia Detalhado:** `docs/DEPLOY_ALTERNATIVES.md`
- **Regras de Deploy:** `.agent/rules/GEMINI.md` (seção Firebase Deploy Guard)
- **Workflow CI/CD:** `.github/workflows/firebase-deploy.yml`

## 🐛 Problemas Comuns

### EUNSUPPORTEDPROTOCOL

```bash
# Auto-fix
pnpm run firebase:preflight
```

### EPERM (Permissões)

```bash
# Use GitHub Actions ou terminal com permissões completas
```

### Build Lock

```bash
rm -f .next/lock
pnpm run build
```

## ✅ Checklist

- [ ] Testes passando (`pnpm test`)
- [ ] Pre-flight OK (`pnpm run firebase:preflight`)
- [ ] Commit feito
- [ ] Deploy executado

---

**Dúvidas?** Consulte `docs/DEPLOY_ALTERNATIVES.md`
