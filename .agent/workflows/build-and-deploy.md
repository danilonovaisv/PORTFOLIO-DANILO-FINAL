# Build and Deploy Workflow

## Pré-Deploy Checklist

1. ✅ Verificar que todas as alterações estão commitadas
2. ✅ Executar testes localmente
3. ✅ Verificar build de produção
4. ✅ Validar variáveis de ambiente

## Comandos de Build

### Build Local

```bash
# Build de desenvolvimento
pnpm dev

# Build de produção
pnpm build

# Build com validações completas
pnpm build:prod
```

### Validações Pré-Build

```bash
# Validar variáveis de ambiente
pnpm validate-env

# Executar prebuild (gera build info)
pnpm prebuild

# Verificar tipos TypeScript
pnpm typecheck

# Executar linter
pnpm lint
```

## Deploy para Produção

### Deploy Completo

```bash
# Deploy com todas as validações
pnpm deploy

# Apenas hosting (Firebase)
pnpm deploy:hosting
```

### Preparação de Assets

```bash
# Reparar caminhos de assets
pnpm assets:repair

# Atualizar URLs do Supabase
pnpm assets:update-urls

# Verificar links de storage
pnpm assets:check-links

# Verificar correções
pnpm assets:verify-corrections
```

## Troubleshooting

### Build Falha

1. Limpar cache e rebuildar:

```bash
pnpm clean
pnpm install
pnpm build
```

2. Verificar versões de dependências:

```bash
pnpm list tailwindcss
pnpm list next
```

3. Verificar variáveis de ambiente:

```bash
pnpm validate-env
```

### Problemas com Tailwind CSS

- Usar versão 3.4.x (não 4.x devido a bugs conhecidos)
- Verificar `postcss.config.cjs` usa `tailwindcss` plugin
- Verificar `globals.css` usa `@tailwind` directives

### Problemas com Assets

```bash
# Auditoria completa de assets
pnpm audit:assets

# Reparar assets automaticamente
pnpm assets:repair

# Sincronizar assets
pnpm assets:sync
```

## Pós-Deploy

1. ✅ Verificar site em produção
2. ✅ Testar funcionalidades críticas
3. ✅ Verificar performance (Lighthouse)
4. ✅ Monitorar logs de erro
